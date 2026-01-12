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
      astrologers: {
        Row: {
          id: string
          user_id: string | null
          name: string
          english_name: string | null
          avatar_url: string | null
          specialties: string[] | null
          experience_years: number | null
          rating: number | null
          total_reviews: number | null
          price_per_minute: number
          languages: string[] | null
          is_verified: boolean | null
          is_online: boolean | null
          total_consultations: number | null
          description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          english_name?: string | null
          avatar_url?: string | null
          specialties?: string[] | null
          experience_years?: number | null
          rating?: number | null
          total_reviews?: number | null
          price_per_minute: number
          languages?: string[] | null
          is_verified?: boolean | null
          is_online?: boolean | null
          total_consultations?: number | null
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          english_name?: string | null
          avatar_url?: string | null
          specialties?: string[] | null
          experience_years?: number | null
          rating?: number | null
          total_reviews?: number | null
          price_per_minute?: number
          languages?: string[] | null
          is_verified?: boolean | null
          is_online?: boolean | null
          total_consultations?: number | null
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      chat_messages: {
        Row: {
          id: string
          consultation_id: string
          sender_id: string
          message: string
          message_type: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          consultation_id: string
          sender_id: string
          message: string
          message_type?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          consultation_id?: string
          sender_id?: string
          message?: string
          message_type?: string | null
          created_at?: string | null
        }
      }
      consultations: {
        Row: {
          id: string
          user_id: string
          astrologer_id: string
          type: string
          status: string | null
          duration_minutes: number | null
          total_amount: number | null
          started_at: string | null
          ended_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          astrologer_id: string
          type: string
          status?: string | null
          duration_minutes?: number | null
          total_amount?: number | null
          started_at?: string | null
          ended_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          astrologer_id?: string
          type?: string
          status?: string | null
          duration_minutes?: number | null
          total_amount?: number | null
          started_at?: string | null
          ended_at?: string | null
          created_at?: string | null
        }
      }
      horoscopes: {
        Row: {
          id: string
          date: string
          sign: string
          overview_hindi: string | null
          overview_english: string | null
          love_score: number | null
          love_text: string | null
          career_score: number | null
          career_text: string | null
          health_score: number | null
          health_text: string | null
          finance_score: number | null
          finance_text: string | null
          lucky_number: number | null
          lucky_color: string | null
          lucky_time: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          date: string
          sign: string
          overview_hindi?: string | null
          overview_english?: string | null
          love_score?: number | null
          love_text?: string | null
          career_score?: number | null
          career_text?: string | null
          health_score?: number | null
          health_text?: string | null
          finance_score?: number | null
          finance_text?: string | null
          lucky_number?: number | null
          lucky_color?: string | null
          lucky_time?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          date?: string
          sign?: string
          overview_hindi?: string | null
          overview_english?: string | null
          love_score?: number | null
          love_text?: string | null
          career_score?: number | null
          career_text?: string | null
          health_score?: number | null
          health_text?: string | null
          finance_score?: number | null
          finance_text?: string | null
          lucky_number?: number | null
          lucky_color?: string | null
          lucky_time?: string | null
          created_at?: string | null
        }
      }
      kundlis: {
        Row: {
          id: string
          user_id: string | null
          name: string
          date_of_birth: string
          time_of_birth: string
          place_of_birth: string
          latitude: number | null
          longitude: number | null
          timezone: string | null
          chart_data: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          date_of_birth: string
          time_of_birth: string
          place_of_birth: string
          latitude?: number | null
          longitude?: number | null
          timezone?: string | null
          chart_data?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          date_of_birth?: string
          time_of_birth?: string
          place_of_birth?: string
          latitude?: number | null
          longitude?: number | null
          timezone?: string | null
          chart_data?: Json | null
          created_at?: string | null
        }
      }
      match_results: {
        Row: {
          id: string
          user_id: string | null
          boy_kundli_id: string
          girl_kundli_id: string
          total_score: number | null
          guna_scores: number[] | null
          is_boy_manglik: boolean | null
          is_girl_manglik: boolean | null
          recommendation: string | null
          detailed_analysis: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          boy_kundli_id: string
          girl_kundli_id: string
          total_score?: number | null
          guna_scores?: number[] | null
          is_boy_manglik?: boolean | null
          is_girl_manglik?: boolean | null
          recommendation?: string | null
          detailed_analysis?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          boy_kundli_id?: string
          girl_kundli_id?: string
          total_score?: number | null
          guna_scores?: number[] | null
          is_boy_manglik?: boolean | null
          is_girl_manglik?: boolean | null
          recommendation?: string | null
          detailed_analysis?: Json | null
          created_at?: string | null
        }
      }
      muhurats: {
        Row: {
          id: string
          date: string
          muhurta_type: string
          start_time: string
          end_time: string
          quality: string | null
          tithi: string | null
          nakshatra: string | null
          description: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          date: string
          muhurta_type: string
          start_time: string
          end_time: string
          quality?: string | null
          tithi?: string | null
          nakshatra?: string | null
          description?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          date?: string
          muhurta_type?: string
          start_time?: string
          end_time?: string
          quality?: string | null
          tithi?: string | null
          nakshatra?: string | null
          description?: string | null
          created_at?: string | null
        }
      }
      panchangs: {
        Row: {
          id: string
          date: string
          tithi_name_hindi: string | null
          tithi_name_english: string | null
          tithi_end_time: string | null
          nakshatra_name_hindi: string | null
          nakshatra_name_english: string | null
          nakshatra_end_time: string | null
          yoga_name_hindi: string | null
          yoga_name_english: string | null
          yoga_end_time: string | null
          karana_name_hindi: string | null
          karana_name_english: string | null
          karana_end_time: string | null
          paksha: string | null
          vaar_hindi: string | null
          vaar_english: string | null
          sunrise: string | null
          sunset: string | null
          moonrise: string | null
          moonset: string | null
          rahu_kaal_start: string | null
          rahu_kaal_end: string | null
          yamagandam_start: string | null
          yamagandam_end: string | null
          gulik_kaal_start: string | null
          gulik_kaal_end: string | null
          abhijit_start: string | null
          abhijit_end: string | null
          choghadiya: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          date: string
          tithi_name_hindi?: string | null
          tithi_name_english?: string | null
          tithi_end_time?: string | null
          nakshatra_name_hindi?: string | null
          nakshatra_name_english?: string | null
          nakshatra_end_time?: string | null
          yoga_name_hindi?: string | null
          yoga_name_english?: string | null
          yoga_end_time?: string | null
          karana_name_hindi?: string | null
          karana_name_english?: string | null
          karana_end_time?: string | null
          paksha?: string | null
          vaar_hindi?: string | null
          vaar_english?: string | null
          sunrise?: string | null
          sunset?: string | null
          moonrise?: string | null
          moonset?: string | null
          rahu_kaal_start?: string | null
          rahu_kaal_end?: string | null
          yamagandam_start?: string | null
          yamagandam_end?: string | null
          gulik_kaal_start?: string | null
          gulik_kaal_end?: string | null
          abhijit_start?: string | null
          abhijit_end?: string | null
          choghadiya?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          date?: string
          tithi_name_hindi?: string | null
          tithi_name_english?: string | null
          tithi_end_time?: string | null
          nakshatra_name_hindi?: string | null
          nakshatra_name_english?: string | null
          nakshatra_end_time?: string | null
          yoga_name_hindi?: string | null
          yoga_name_english?: string | null
          yoga_end_time?: string | null
          karana_name_hindi?: string | null
          karana_name_english?: string | null
          karana_end_time?: string | null
          paksha?: string | null
          vaar_hindi?: string | null
          vaar_english?: string | null
          sunrise?: string | null
          sunset?: string | null
          moonrise?: string | null
          moonset?: string | null
          rahu_kaal_start?: string | null
          rahu_kaal_end?: string | null
          yamagandam_start?: string | null
          yamagandam_end?: string | null
          gulik_kaal_start?: string | null
          gulik_kaal_end?: string | null
          abhijit_start?: string | null
          abhijit_end?: string | null
          choghadiya?: Json | null
          created_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          consultation_id: string | null
          amount: number
          currency: string | null
          payment_method: string | null
          payment_status: string | null
          transaction_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          consultation_id?: string | null
          amount: number
          currency?: string | null
          payment_method?: string | null
          payment_status?: string | null
          transaction_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          consultation_id?: string | null
          amount?: number
          currency?: string | null
          payment_method?: string | null
          payment_status?: string | null
          transaction_id?: string | null
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          date_of_birth: string | null
          time_of_birth: string | null
          place_of_birth: string | null
          gender: string | null
          preferred_language: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          time_of_birth?: string | null
          place_of_birth?: string | null
          gender?: string | null
          preferred_language?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          time_of_birth?: string | null
          place_of_birth?: string | null
          gender?: string | null
          preferred_language?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          astrologer_id: string
          consultation_id: string | null
          rating: number
          comment: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          astrologer_id: string
          consultation_id?: string | null
          rating: number
          comment?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          astrologer_id?: string
          consultation_id?: string | null
          rating?: number
          comment?: string | null
          created_at?: string | null
        }
      }
      wallet_transactions: {
        Row: {
          id: string
          wallet_id: string
          type: string
          amount: number
          description: string | null
          reference_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          wallet_id: string
          type: string
          amount: number
          description?: string | null
          reference_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          wallet_id?: string
          type?: string
          amount?: number
          description?: string | null
          reference_id?: string | null
          created_at?: string | null
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          balance: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
