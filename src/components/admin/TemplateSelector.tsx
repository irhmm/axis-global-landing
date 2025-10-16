import { Award, Sparkles, FileText } from "lucide-react";
import { CertificateTemplate } from "@/types/certificate";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  value: CertificateTemplate;
  onChange: (value: CertificateTemplate) => void;
}

const templateOptions = [
  {
    value: 'americo' as CertificateTemplate,
    name: 'Template Americo',
    description: 'Modern design dengan Americo branding',
    icon: Award,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  {
    value: 'modern' as CertificateTemplate,
    name: 'Template Modern',
    description: 'Clean dan minimalist design',
    icon: Sparkles,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    disabled: true,
  },
  {
    value: 'classic' as CertificateTemplate,
    name: 'Template Classic',
    description: 'Traditional formal certificate',
    icon: FileText,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50 dark:bg-gray-950/20',
    borderColor: 'border-gray-200 dark:border-gray-800',
    disabled: true,
  },
];

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Choose Certificate Template</h3>
        <p className="text-sm text-muted-foreground">
          Select the visual template for displaying this certificate
        </p>
      </div>
      
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templateOptions.map((template) => {
            const Icon = template.icon;
            const isSelected = value === template.value;
            
            return (
              <div key={template.value} className="relative">
                <RadioGroupItem
                  value={template.value}
                  id={template.value}
                  className="sr-only"
                  disabled={template.disabled}
                />
                <Label
                  htmlFor={template.value}
                  className={cn(
                    "cursor-pointer",
                    template.disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  <Card
                    className={cn(
                      "p-4 transition-all hover:shadow-md",
                      template.bgColor,
                      isSelected && `ring-2 ring-offset-2 ${template.borderColor.replace('border-', 'ring-')}`,
                      template.disabled && "pointer-events-none"
                    )}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center",
                        template.bgColor
                      )}>
                        <Icon className={cn("w-8 h-8", template.color)} />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-semibold flex items-center justify-center gap-2">
                          {template.name}
                          {isSelected && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                              Selected
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                        {template.disabled && (
                          <span className="text-xs text-muted-foreground italic">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
