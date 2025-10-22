export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          accreditation_body: string
          address: string | null
          certificate_number: string
          certificate_standard: string
          certification_approval_date: string | null
          certification_body: string
          certification_criteria: string | null
          certification_expiration_date: string | null
          certified_location: string | null
          company_name: string
          country: string | null
          created_at: string
          created_by: string | null
          ea_code: string | null
          expiry_date: string
          first_issue_date: string | null
          id: string
          isic_code: string | null
          issue: string | null
          issue_date: string
          latest_issue_date: string | null
          main_site_address: string | null
          managing_partner: string | null
          managing_practice: string | null
          original_audit_date: string | null
          other_sites: string | null
          recertification_date: string | null
          scope: string | null
          status: string | null
          surveillance_date: string
          template_type: Database["public"]["Enums"]["certificate_template"]
          trading_name: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          accreditation_body?: string
          address?: string | null
          certificate_number: string
          certificate_standard: string
          certification_approval_date?: string | null
          certification_body?: string
          certification_criteria?: string | null
          certification_expiration_date?: string | null
          certified_location?: string | null
          company_name: string
          country?: string | null
          created_at?: string
          created_by?: string | null
          ea_code?: string | null
          expiry_date: string
          first_issue_date?: string | null
          id?: string
          isic_code?: string | null
          issue?: string | null
          issue_date: string
          latest_issue_date?: string | null
          main_site_address?: string | null
          managing_partner?: string | null
          managing_practice?: string | null
          original_audit_date?: string | null
          other_sites?: string | null
          recertification_date?: string | null
          scope?: string | null
          status?: string | null
          surveillance_date: string
          template_type?: Database["public"]["Enums"]["certificate_template"]
          trading_name?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          accreditation_body?: string
          address?: string | null
          certificate_number?: string
          certificate_standard?: string
          certification_approval_date?: string | null
          certification_body?: string
          certification_criteria?: string | null
          certification_expiration_date?: string | null
          certified_location?: string | null
          company_name?: string
          country?: string | null
          created_at?: string
          created_by?: string | null
          ea_code?: string | null
          expiry_date?: string
          first_issue_date?: string | null
          id?: string
          isic_code?: string | null
          issue?: string | null
          issue_date?: string
          latest_issue_date?: string | null
          main_site_address?: string | null
          managing_partner?: string | null
          managing_practice?: string | null
          original_audit_date?: string | null
          other_sites?: string | null
          recertification_date?: string | null
          scope?: string | null
          status?: string | null
          surveillance_date?: string
          template_type?: Database["public"]["Enums"]["certificate_template"]
          trading_name?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      certificate_template:
        | "americo"
        | "modern"
        | "classic"
        | "siscert"
        | "equal"
        | "gresolve"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      certificate_template: [
        "americo",
        "modern",
        "classic",
        "siscert",
        "equal",
        "gresolve",
      ],
    },
  },
} as const
