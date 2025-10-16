import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Plus, TrendingUp, Award, Sparkles, FileType } from "lucide-react";
import { CERTIFICATE_TEMPLATES } from "@/constants/templates";
import { CertificateTemplate } from "@/types/certificate";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCertificates: 0,
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

    // Get template statistics
    const { data: certificates } = await supabase
      .from("certificates")
      .select("template_type");

    const templateCounts: Record<string, number> = {};
    certificates?.forEach((cert) => {
      const template = cert.template_type || 'americo';
      templateCounts[template] = (templateCounts[template] || 0) + 1;
    });

    const templateStats = CERTIFICATE_TEMPLATES.map((template) => ({
      template: template.value,
      count: templateCounts[template.value] || 0,
    }));

    setStats({
      totalCertificates: count || 0,
      templateStats,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your admin dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Certificates
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCertificates}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active certificates in system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link to="/admin/certificates/new">
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  New Certificate
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground mt-1">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Templates</CardTitle>
              <CardDescription>Available templates and their usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {CERTIFICATE_TEMPLATES.map((template) => {
                  const templateStat = stats.templateStats.find(
                    (s) => s.template === template.value
                  );
                  const count = templateStat?.count || 0;
                  const isDisabled = template.value !== 'americo';

                  const getIcon = () => {
                    switch (template.value) {
                      case 'americo':
                        return Award;
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
                      className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                        isDisabled
                          ? 'bg-muted/50 opacity-60 cursor-not-allowed'
                          : 'hover:bg-muted/50 hover:shadow-md hover:border-primary/50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${template.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{template.name}</h4>
                            {isDisabled && (
                              <Badge variant="secondary" className="text-xs">
                                Coming Soon
                              </Badge>
                            )}
                            {!isDisabled && (
                              <Badge variant="outline" className="text-xs">
                                <Plus className="w-3 h-3 mr-1" />
                                Click to Create
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{count}</div>
                        <p className="text-xs text-muted-foreground">certificates</p>
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

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates to your certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link to="/admin/certificates">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View All Certificates
                  </Button>
                </Link>
                <Link to="/admin/certificates/new">
                  <Button variant="outline" className="w-full justify-start">
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
