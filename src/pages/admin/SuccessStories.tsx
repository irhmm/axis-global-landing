import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SuccessStory {
  id: string;
  image_url: string;
  title: string;
  certification: string;
  category: string;
  description: string | null;
  tags: string[] | null;
  display_order: number;
  created_at: string;
}

const SuccessStories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<SuccessStory | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(stories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStories = stories.slice(startIndex, endIndex);

  useEffect(() => {
    fetchStories();

    const channel = supabase
      .channel("success-stories-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "success_stories",
        },
        () => {
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat kisah sukses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!storyToDelete) return;

    setDeleting(true);
    try {
      // Delete image from storage
      if (storyToDelete.image_url) {
        const fileName = storyToDelete.image_url.split("/").pop();
        if (fileName) {
          await supabase.storage
            .from("success-stories")
            .remove([fileName]);
        }
      }

      // Delete record from database
      const { error } = await supabase
        .from("success_stories")
        .delete()
        .eq("id", storyToDelete.id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Kisah sukses berhasil dihapus",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus kisah sukses",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setStoryToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Kisah Sukses</h1>
            <p className="text-muted-foreground">
              Kelola kisah sukses klien Anda
            </p>
          </div>
          <Button onClick={() => navigate("/admin/success-stories/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kisah Sukses
          </Button>
        </div>

        <Card>
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : stories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Belum ada kisah sukses
                </p>
                <Button onClick={() => navigate("/admin/success-stories/new")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Kisah Sukses Pertama
                </Button>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Foto</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Sertifikasi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentStories.map((story) => (
                      <TableRow key={story.id}>
                        <TableCell>
                          <img
                            src={story.image_url}
                            alt={story.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {story.title}
                        </TableCell>
                        <TableCell>{story.certification}</TableCell>
                        <TableCell>{story.category}</TableCell>
                        
                        {/* Description Column */}
                        <TableCell className="max-w-[300px]">
                          {story.description ? (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {story.description}
                            </p>
                          ) : (
                            <span className="text-xs text-muted-foreground/50 italic">
                              Tidak ada deskripsi
                            </span>
                          )}
                        </TableCell>
                        
                        {/* Tags Column */}
                        <TableCell>
                          {story.tags && story.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {story.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {story.tags.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                  +{story.tags.length - 3}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground/50 italic">
                              Tidak ada tags
                            </span>
                          )}
                        </TableCell>
                        
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/success-stories/${story.id}/edit`)
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setStoryToDelete(story);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) setCurrentPage(currentPage - 1);
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kisah Sukses?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus "{storyToDelete?.title}"? Aksi
              ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default SuccessStories;
