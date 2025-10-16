import { Certificate } from "@/types/certificate";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Building2, FileText, Calendar, Shield, Award } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface AmericoTemplateProps {
  certificate: Certificate;
}

export function AmericoTemplate({ certificate }: AmericoTemplateProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy");
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Success Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 flex items-center gap-4">
            <div className="flex-shrink-0">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-1">
                Certificate Verified Successfully
              </h2>
              <p className="text-green-700 dark:text-green-300">
                This certificate has been verified in our system
              </p>
            </div>
          </div>
        </div>

        {/* Certificate Card */}
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b">
              <h1 className="text-3xl font-bold mb-2">
                <span style={{ color: '#667eea', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                  Americo
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">Certificate Verification</p>
            </div>

            {/* Certificate Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Certificate Number */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Certificate Number</span>
                </div>
                <p className="text-lg font-semibold pl-6">{certificate.certificate_number}</p>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Company Name</span>
                </div>
                <p className="text-lg font-semibold pl-6">{certificate.company_name}</p>
              </div>

              {/* Certificate Standard */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">Certificate Standard</span>
                </div>
                <p className="text-lg font-semibold pl-6">{certificate.certificate_standard}</p>
              </div>

              {/* Issue Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Issue Date</span>
                </div>
                <p className="text-lg font-semibold pl-6">{formatDate(certificate.issue_date)}</p>
              </div>

              {/* Surveillance Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Surveillance Date</span>
                </div>
                <p className="text-lg font-semibold pl-6">{formatDate(certificate.surveillance_date)}</p>
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Expiry Date</span>
                </div>
                <p className="text-lg font-semibold pl-6">{formatDate(certificate.expiry_date)}</p>
              </div>

              {/* Certification Body */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Certification Body</span>
                </div>
                <p className="text-lg font-semibold pl-6">{certificate.certification_body}</p>
              </div>

              {/* Accreditation Body */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Accreditation Body</span>
                </div>
                <p className="text-lg font-semibold pl-6">{certificate.accreditation_body}</p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                This certificate has been verified as authentic in our certification database.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
