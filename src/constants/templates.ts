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
    value: 'equal',
    name: 'Template Equal',
    description: 'Professional design untuk Equal Assurance certification',
    color: 'bg-teal-500',
  },
  {
    value: 'gresolve',
    name: 'Template AXIS',
    description: 'Professional design dengan AXIS Global Sertifikasi branding',
    color: 'bg-red-600',
  },
];

export const getTemplateMetadata = (value: string): TemplateMetadata => {
  return CERTIFICATE_TEMPLATES.find(t => t.value === value) || CERTIFICATE_TEMPLATES[0];
};
