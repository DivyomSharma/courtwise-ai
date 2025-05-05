export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      case_categories: {
        Row: {
          count: number | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          count?: number | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          count?: number | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      case_notes: {
        Row: {
          case_id: string
          created_at: string | null
          id: string
          is_favorite: boolean | null
          note_content: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          case_id: string
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          note_content: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          case_id?: string
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          note_content?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_notes_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          category: string
          citation: string
          court: string
          created_at: string | null
          created_by: string | null
          date: string
          full_text: string | null
          id: string
          judges: string[]
          key_points: string[] | null
          petitioner: string | null
          related_cases: string[] | null
          respondent: string | null
          summary: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          citation: string
          court: string
          created_at?: string | null
          created_by?: string | null
          date: string
          full_text?: string | null
          id?: string
          judges?: string[]
          key_points?: string[] | null
          petitioner?: string | null
          related_cases?: string[] | null
          respondent?: string | null
          summary: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          citation?: string
          court?: string
          created_at?: string | null
          created_by?: string | null
          date?: string
          full_text?: string | null
          id?: string
          judges?: string[]
          key_points?: string[] | null
          petitioner?: string | null
          related_cases?: string[] | null
          respondent?: string | null
          summary?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      legal_news: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string | null
          id: string
          published_date: string
          source: string
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          published_date: string
          source: string
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          published_date?: string
          source?: string
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      regular_cases: {
        Row: {
          category: string
          citation: string
          court: string
          created_at: string | null
          date: string
          full_text: string | null
          id: string
          is_landmark: boolean | null
          judges: string[] | null
          key_points: string[] | null
          petitioner: string | null
          related_cases: string[] | null
          respondent: string | null
          source_url: string | null
          summary: string
          title: string
        }
        Insert: {
          category: string
          citation: string
          court: string
          created_at?: string | null
          date: string
          full_text?: string | null
          id?: string
          is_landmark?: boolean | null
          judges?: string[] | null
          key_points?: string[] | null
          petitioner?: string | null
          related_cases?: string[] | null
          respondent?: string | null
          source_url?: string | null
          summary: string
          title: string
        }
        Update: {
          category?: string
          citation?: string
          court?: string
          created_at?: string | null
          date?: string
          full_text?: string | null
          id?: string
          is_landmark?: boolean | null
          judges?: string[] | null
          key_points?: string[] | null
          petitioner?: string | null
          related_cases?: string[] | null
          respondent?: string | null
          source_url?: string | null
          summary?: string
          title?: string
        }
        Relationships: []
      }
      user_usage: {
        Row: {
          cases_viewed: number
          id: string
          usage_date: string
          user_id: string
        }
        Insert: {
          cases_viewed?: number
          id?: string
          usage_date?: string
          user_id: string
        }
        Update: {
          cases_viewed?: number
          id?: string
          usage_date?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_cases_by_category: {
        Args: { category_name: string }
        Returns: {
          id: string
          title: string
          citation: string
          court: string
          date: string
          category: string
          summary: string
          is_landmark: boolean
        }[]
      }
      get_categories_with_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          description: string
          count: number
        }[]
      }
      search_cases: {
        Args: { search_query: string }
        Returns: {
          id: string
          title: string
          citation: string
          court: string
          date: string
          category: string
          summary: string
          is_landmark: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
