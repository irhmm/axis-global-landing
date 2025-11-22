import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const successStorySchema = z.object({
  title: z.string().min(1, "Judul harus diisi").max(200, "Judul maksimal 200 karakter"),
  certification: z.string().min(1, "Sertifikasi harus diisi").max(100, "Sertifikasi maksimal 100 karakter"),
  category: z.string().min(1, "Kategori harus diisi").max(500, "Kategori maksimal 500 karakter"),
  description: z.string().optional(),
  tags: z.string().optional(),
});

const SuccessStoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    certification: "",
    category: "",
    description: "",
    tags: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = Boolean(id);

  useEffect(() => {
    if (id) {
      fetchStory();
    }
  }, [id]);

  const fetchStory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title,
        certification: data.certification,
        category: data.category,
        description: data.description || "",
        tags: data.tags?.join(", ") || "",
      });
      setImagePreview(data.image_url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat data",
        variant: "destructive",
      });
      navigate("/admin/success-stories");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "Ukuran file maksimal 5MB" });
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrors({ ...errors, image: "Format file harus JPG, PNG, atau WEBP" });
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors({ ...errors, image: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    try {
      successStorySchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    // Check image
    if (!isEdit && !imageFile) {
      setErrors({ image: "Foto harus diupload" });
      return;
    }

    setSaving(true);
    try {
      let imageUrl = imagePreview;

      // Upload new image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("success-stories")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("success-stories")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;

        // Delete old image if editing
        if (isEdit && imagePreview) {
          const oldFileName = imagePreview.split("/").pop();
          if (oldFileName) {
            await supabase.storage
              .from("success-stories")
              .remove([oldFileName]);
          }
        }
      }

      // Get max display_order for new stories
      let displayOrder = 0;
      if (!isEdit) {
        const { data: maxOrderData } = await supabase
          .from("success_stories")
          .select("display_order")
          .order("display_order", { ascending: false })
          .limit(1)
          .single();

        displayOrder = (maxOrderData?.display_order || 0) + 1;
      }

      const storyData = {
        title: formData.title,
        certification: formData.certification,
        category: formData.category,
        description: formData.description || null,
        tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
        image_url: imageUrl,
        ...(isEdit ? {} : { display_order: displayOrder }),
      };

      if (isEdit) {
        const { error } = await supabase
          .from("success_stories")
          .update(storyData)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("success_stories")
          .insert([storyData]);

        if (error) throw error;
      }

      toast({
        title: "Berhasil",
        description: `Kisah sukses berhasil ${isEdit ? "diperbarui" : "ditambahkan"}`,
      });

      navigate("/admin/success-stories");
    } catch (error) {
      toast({
        title: "Error",
        description: `Gagal ${isEdit ? "memperbarui" : "menambahkan"} kisah sukses`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/success-stories")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEdit ? "Edit Kisah Sukses" : "Tambah Kisah Sukses"}
            </h1>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">
                Foto <span className="text-destructive">*</span>
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
              />
              {errors.image && (
                <p className="text-sm text-destructive">{errors.image}</p>
              )}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Format: JPG, PNG, WEBP. Maksimal 5MB
              </p>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Judul <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Contoh: Audit Lapangan"
                maxLength={200}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            {/* Certification */}
            <div className="space-y-2">
              <Label htmlFor="certification">
                Sertifikasi / Tag <span className="text-destructive">*</span>
              </Label>
              <Input
                id="certification"
                value={formData.certification}
                onChange={(e) =>
                  setFormData({ ...formData, certification: e.target.value })
                }
                placeholder="Contoh: ISO 14001:2015"
                maxLength={100}
              />
              {errors.certification && (
                <p className="text-sm text-destructive">
                  {errors.certification}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Kategori / Sub-header <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="Contoh: Sistem Manajemen Lingkungan"
                maxLength={500}
                rows={3}
              />
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Deskripsi Detail
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Jelaskan detail kisah sukses ini..."
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                Opsional - Deskripsi akan ditampilkan di lightbox
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">
                Tags
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="ISO9001, QualityManagement, Surabaya"
              />
              <p className="text-sm text-muted-foreground">
                Opsional - Pisahkan dengan koma. Contoh: ISO9001, Manufacturing, Jakarta
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/success-stories")}
                disabled={saving}
              >
                Batal
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SuccessStoryForm;
