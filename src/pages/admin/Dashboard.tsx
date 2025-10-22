import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Plus, TrendingUp, Award, Sparkles, FileType, BadgeCheck, Building2, CheckCircle, XCircle } from "lucide-react";
import { CERTIFICATE_TEMPLATES } from "@/constants/templates";
import { CertificateTemplate } from "@/types/certificate";
import { getCertificateStatus } from "@/lib/certificateStatus";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCertificates: 0,
    activeCertificates: 0,
    expiredCertificates: 0,
    templateStats: [] as { template: CertificateTemplate; count: number }[],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Get total certificates
    const { count } = await supabase
      .from("certificates")
      .select("*", { count: "exact", head: true });

    // Get all certificates with expiry dates
    const { data: certificates } = await supabase
      .from("certificates")
      .select("template_type, expiry_date");

    const templateCounts: Record<string, number> = {};
    let activeCount = 0;
    let expiredCount = 0;

    certificates?.forEach((cert) => {
      const template = cert.template_type || 'americo';
      templateCounts[template] = (templateCounts[template] || 0) + 1;
      
      // Calculate status based on expiry_date
      const status = getCertificateStatus(cert.expiry_date);
      if (status === 'active') {
        activeCount++;
      } else {
        expiredCount++;
      }
    });

    const templateStats = CERTIFICATE_TEMPLATES.map((template) => ({
      template: template.value,
      count: templateCounts[template.value] || 0,
    }));

    setStats({
      totalCertificates: count || 0,
      activeCertificates: activeCount,
      expiredCertificates: expiredCount,
      templateStats,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome to your admin dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Certificates
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCertificates}</div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Active certificates in system
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quick Actions</CardTitle>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/admin/certificates/new">
                <Button className="w-full h-9 text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Certificate
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Certificates</CardTitle>
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.activeCertificates}</div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Currently valid certificates
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expired Certificates</CardTitle>
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.expiredCertificates}</div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Past expiry date
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Status</CardTitle>
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground mt-1.5">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Certificate Templates</CardTitle>
              <CardDescription className="text-sm">Available templates and their usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {CERTIFICATE_TEMPLATES.map((template) => {
                  const templateStat = stats.templateStats.find(
                    (s) => s.template === template.value
                  );
                  const count = templateStat?.count || 0;
                  const isDisabled = template.value !== 'americo' && template.value !== 'siscert' && template.value !== 'equal' && template.value !== 'gresolve';

                  const getIcon = () => {
                    switch (template.value) {
                      case 'americo':
                        return Award;
                      case 'siscert':
                        return BadgeCheck;
                      case 'equal':
                        return Building2;
                      case 'modern':
                        return Sparkles;
                      case 'classic':
                        return FileType;
                      default:
                        return FileText;
                    }
                  };

                  const Icon = getIcon();

                  const TemplateCard = (
                    <div
                      className={`flex items-center gap-3 p-3 border border-border/50 rounded-lg transition-all duration-200 ${
                        isDisabled
                          ? 'bg-muted/30 opacity-60 cursor-not-allowed'
                          : 'hover:bg-accent/50 hover:shadow-sm hover:border-primary/30 cursor-pointer'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full ${template.color} shadow-sm flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-semibold text-sm">{template.name}</h4>
                          {isDisabled && (
                            <Badge variant="secondary" className="text-xs py-0 h-5">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {template.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold">{count}</div>
                        <p className="text-xs text-muted-foreground">used</p>
                      </div>
                    </div>
                  );

                  return isDisabled ? (
                    <div key={template.value}>{TemplateCard}</div>
                  ) : (
                    <Link 
                      key={template.value} 
                      to={`/admin/certificates/new?template=${template.value}`}
                    >
                      {TemplateCard}
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription className="text-sm">Latest updates to your certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                <Link to="/admin/certificates">
                  <Button variant="outline" size="sm" className="w-full justify-start h-10 border-border/50 hover:bg-accent/50">
                    <FileText className="w-4 h-4 mr-2" />
                    View All Certificates
                  </Button>
                </Link>
                <Link to="/admin/certificates/new">
                  <Button variant="outline" size="sm" className="w-full justify-start h-10 border-border/50 hover:bg-accent/50">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Certificate
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
