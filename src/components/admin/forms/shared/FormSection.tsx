import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  borderColor?: string;
}

export function FormSection({ title, description, children, borderColor }: FormSectionProps) {
  return (
    <Card className={cn("border-border/50 shadow-sm", borderColor && `border-l-4 ${borderColor}`)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

import { cn } from "@/lib/utils";
