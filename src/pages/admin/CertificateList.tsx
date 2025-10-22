import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";
import { Certificate } from "@/types/certificate";
import { Plus, Search, Edit, Trash2, ExternalLink, Award, Sparkles, FileType, BadgeCheck, Building2, QrCode, Loader2 } from "lucide-react";
import { generateQRCode, downloadQRCode } from "@/lib/qrcode";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { getTemplateMetadata, CERTIFICATE_TEMPLATES } from "@/constants/templates";
import { QRCodePreviewDialog } from "@/components/admin/QRCodePreviewDialog";
import { getPublicBaseUrl } from "@/lib/url";
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

export default function CertificateList() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [templateStats, setTemplateStats] = useState<Record<string, number>>({});
  const [generatingQR, setGeneratingQR] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [previewQRCode, setPreviewQRCode] = useState<string | null>(null);
  const [previewCertificate, setPreviewCertificate] = useState<Certificate | null>(null);
  const itemsPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    fetchCertificates();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = certificates.filter(
        (cert) =>
          cert.certificate_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.certificate_standard.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCertificates(filtered);
      setCurrentPage(1); // Reset to first page when searching
    } else {
      setFilteredCertificates(certificates);
    }
  }, [searchQuery, certificates]);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
      setFilteredCertificates(data || []);

      // Calculate template stats
      const stats: Record<string, number> = {};
      data?.forEach((cert) => {
        const template = cert.template_type || 'americo';
        stats[template] = (stats[template] || 0) + 1;
      });
      setTemplateStats(stats);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch certificates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("certificates")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Certificate deleted successfully",
      });

      fetchCertificates();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete certificate",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCertificates = filteredCertificates.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const getTemplateIcon = (template: string) => {
    if (template === 'americo') return Award;
    if (template === 'siscert') return BadgeCheck;
    if (template === 'equal') return Building2;
    if (template === 'modern') return Sparkles;
    return FileType;
  };

  const handleShowQRPreview = async (cert: Certificate) => {
    try {
      setGeneratingQR(cert.id);
      const qrCodeDataURL = await generateQRCode(cert.certificate_number);
      setPreviewQRCode(qrCodeDataURL);
      setPreviewCertificate(cert);
      setQrDialogOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setGeneratingQR(null);
    }
  };

  const handleDownloadQRCode = () => {
    if (previewCertificate && previewQRCode) {
      downloadQRCode(previewCertificate.certificate_number, previewQRCode);
      toast({
        title: "Success",
        description: `QR code for ${previewCertificate.certificate_number} downloaded successfully`,
      });
      handleCloseQRDialog();
    }
  };

  const handleCloseQRDialog = () => {
    setQrDialogOpen(false);
    setPreviewQRCode(null);
    setPreviewCertificate(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Template Selection Section */}
        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-bold">Certificate Templates</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select a template to create a new certificate
            </p>
          </div>

          <div className="space-y-2.5">
            {CERTIFICATE_TEMPLATES.map((template) => {
              const isDisabled = template.value !== 'americo' && template.value !== 'siscert' && template.value !== 'equal';
              const Icon = getTemplateIcon(template.value);
              const count = templateStats[template.value] || 0;

              const TemplateItem = (
                <Card className={`border-border/50 transition-all duration-200 ${
                  isDisabled
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:shadow-sm hover:border-primary/30 cursor-pointer'
                }`}>
                  <div className="flex items-center gap-3 p-3">
                    {/* Icon */}
                    <div className={`p-2.5 rounded-full ${template.color} shadow-sm flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Template Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-sm">{template.name}</h3>
                        {isDisabled ? (
                          <Badge variant="secondary" className="text-xs py-0 h-5">
                            Coming Soon
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs py-0 h-5">
                            Click to Create
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {template.description}
                      </p>
                    </div>

                    {/* Count */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-xs text-muted-foreground">used</p>
                    </div>
                  </div>
                </Card>
              );

              return isDisabled ? (
                <div key={template.value}>{TemplateItem}</div>
              ) : (
                <Link 
                  key={template.value} 
                  to={`/admin/certificates/new?template=${template.value}`}
                >
                  {TemplateItem}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Certificate List Section */}
        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">All Certificates</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredCertificates.length > 0 && (
                  `Showing ${startIndex + 1}-${Math.min(endIndex, filteredCertificates.length)} of ${filteredCertificates.length} certificates`
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-border/50"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="border border-border/50 rounded-lg overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate Number</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Standard</TableHead>
                    <TableHead className="text-center">Template</TableHead>
                    <TableHead className="text-center">Issue Date</TableHead>
                    <TableHead className="text-center">Expiry Date</TableHead>
                    <TableHead className="text-center">QR Code</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertificates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No certificates found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedCertificates.map((cert) => {
                      const templateMeta = getTemplateMetadata(cert.template_type || 'americo');
                      return (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">{cert.certificate_number}</TableCell>
                          <TableCell>{cert.company_name}</TableCell>
                          <TableCell>{cert.certificate_standard}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className={templateMeta.color}>
                              {templateMeta.name}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{formatDate(cert.issue_date)}</TableCell>
                          <TableCell className="text-center">{formatDate(cert.expiry_date)}</TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleShowQRPreview(cert)}
                              disabled={generatingQR === cert.id}
                              title="Preview QR Code"
                            >
                              {generatingQR === cert.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <QrCode className="w-4 h-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <a 
                                href={`${getPublicBaseUrl()}/verify?cert=${encodeURIComponent(cert.certificate_number)}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <Button variant="ghost" size="icon" title="View Public Certificate">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </a>
                              <Link to={`/admin/certificates/${cert.id}/edit`}>
                                <Button variant="ghost" size="icon" title="Edit">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteId(cert.id)}
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination>
                    <PaginationContent className="gap-1">
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={`h-9 ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-accent'}`}
                        />
                      </PaginationItem>
                      
                      {getPageNumbers().map((page, idx) => (
                        <PaginationItem key={idx}>
                          {page === '...' ? (
                            <PaginationEllipsis className="h-9 w-9" />
                          ) : (
                            <PaginationLink 
                              isActive={currentPage === page}
                              onClick={() => setCurrentPage(page as number)}
                              className="cursor-pointer h-9 w-9 hover:bg-accent"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          className={`h-9 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-accent'}`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <QRCodePreviewDialog
        open={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        certificate={previewCertificate}
        qrCodeDataURL={previewQRCode}
        onDownload={handleDownloadQRCode}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the certificate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
