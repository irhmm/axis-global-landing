import { TemplateMetadata } from "@/types/certificate";

export const CERTIFICATE_TEMPLATES: TemplateMetadata[] = [
  {
    value: 'americo',
    name: 'Template Americo',
    description: 'Modern design dengan Americo branding, warna purple gradient',
    color: 'bg-purple-500',
  },
  {
    value: 'siscert',
    name: 'Template SIS Cert',
    description: 'Clean design dengan badge system untuk SIS Certifications',
    color: 'bg-red-600',
  },
  {
    value: 'modern',
    name: 'Template Modern',
    description: 'Clean dan minimalist design (Coming Soon)',
    color: 'bg-blue-500',
  },
  {
    value: 'classic',
    name: 'Template Classic',
    description: 'Traditional formal certificate design (Coming Soon)',
    color: 'bg-gray-500',
  },
];

export const getTemplateMetadata = (value: string): TemplateMetadata => {
  return CERTIFICATE_TEMPLATES.find(t => t.value === value) || CERTIFICATE_TEMPLATES[0];
};
