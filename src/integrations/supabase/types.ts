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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          conversation_summary: string | null
          created_at: string
          customer_email: string | null
          customer_name: string | null
          id: string
          lead_id: string | null
          messages: Json
          quote_id: string | null
          sentiment_score: number | null
          session_id: string
          updated_at: string
        }
        Insert: {
          conversation_summary?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          lead_id?: string | null
          messages?: Json
          quote_id?: string | null
          sentiment_score?: number | null
          session_id: string
          updated_at?: string
        }
        Update: {
          conversation_summary?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          lead_id?: string | null
          messages?: Json
          quote_id?: string | null
          sentiment_score?: number | null
          session_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_sessions: {
        Row: {
          created_at: string | null
          detected_city: string | null
          first_visit: string
          id: string
          ip_address: unknown
          last_activity: string
          page_count: number
          referrer: string | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          detected_city?: string | null
          first_visit?: string
          id?: string
          ip_address?: unknown
          last_activity?: string
          page_count?: number
          referrer?: string | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          detected_city?: string | null
          first_visit?: string
          id?: string
          ip_address?: unknown
          last_activity?: string
          page_count?: number
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      archived_chats: {
        Row: {
          archive_date: string
          created_at: string
          id: string
          images: Json
          messages: Json
          updated_at: string
        }
        Insert: {
          archive_date: string
          created_at?: string
          id?: string
          images?: Json
          messages?: Json
          updated_at?: string
        }
        Update: {
          archive_date?: string
          created_at?: string
          id?: string
          images?: Json
          messages?: Json
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          auto_reschedule: boolean | null
          booking_type: string
          created_at: string
          customer_email: string | null
          customer_id: string | null
          customer_phone: string | null
          equipment_needed: Json | null
          estimated_duration: number
          id: string
          priority: string
          quote_id: string | null
          route_position: number | null
          scheduled_date: string
          scheduled_time: string
          service_address: string
          special_instructions: string | null
          status: string
          technician_assigned: string | null
          travel_time_minutes: number | null
          updated_at: string
          weather_dependent: boolean | null
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          auto_reschedule?: boolean | null
          booking_type?: string
          created_at?: string
          customer_email?: string | null
          customer_id?: string | null
          customer_phone?: string | null
          equipment_needed?: Json | null
          estimated_duration?: number
          id?: string
          priority?: string
          quote_id?: string | null
          route_position?: number | null
          scheduled_date: string
          scheduled_time: string
          service_address: string
          special_instructions?: string | null
          status?: string
          technician_assigned?: string | null
          travel_time_minutes?: number | null
          updated_at?: string
          weather_dependent?: boolean | null
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          auto_reschedule?: boolean | null
          booking_type?: string
          created_at?: string
          customer_email?: string | null
          customer_id?: string | null
          customer_phone?: string | null
          equipment_needed?: Json | null
          estimated_duration?: number
          id?: string
          priority?: string
          quote_id?: string | null
          route_position?: number | null
          scheduled_date?: string
          scheduled_time?: string
          service_address?: string
          special_instructions?: string | null
          status?: string
          technician_assigned?: string | null
          travel_time_minutes?: number | null
          updated_at?: string
          weather_dependent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      call_logs: {
        Row: {
          agent_summary: string | null
          attempted_at: string | null
          call_sid: string | null
          call_transcript: string | null
          completed_at: string | null
          created_at: string | null
          duration: number | null
          id: string
          outcome: string | null
          page_path: string | null
          phone_number: string
          quote_sent: boolean | null
          session_id: string | null
          status: string | null
          transcript: string | null
          updated_at: string | null
          user_id: string | null
          voicemail_left: boolean | null
        }
        Insert: {
          agent_summary?: string | null
          attempted_at?: string | null
          call_sid?: string | null
          call_transcript?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          outcome?: string | null
          page_path?: string | null
          phone_number: string
          quote_sent?: boolean | null
          session_id?: string | null
          status?: string | null
          transcript?: string | null
          updated_at?: string | null
          user_id?: string | null
          voicemail_left?: boolean | null
        }
        Update: {
          agent_summary?: string | null
          attempted_at?: string | null
          call_sid?: string | null
          call_transcript?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          outcome?: string | null
          page_path?: string | null
          phone_number?: string
          quote_sent?: boolean | null
          session_id?: string | null
          status?: string | null
          transcript?: string | null
          updated_at?: string | null
          user_id?: string | null
          voicemail_left?: boolean | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          game_state: Json | null
          id: string
          image_url: string | null
          message: string
          message_type: string | null
          reactions: Json | null
          read_by_jackie: boolean | null
          read_by_jayden: boolean | null
          replied_to_id: string | null
          sender: string
        }
        Insert: {
          created_at?: string
          game_state?: Json | null
          id?: string
          image_url?: string | null
          message: string
          message_type?: string | null
          reactions?: Json | null
          read_by_jackie?: boolean | null
          read_by_jayden?: boolean | null
          replied_to_id?: string | null
          sender: string
        }
        Update: {
          created_at?: string
          game_state?: Json | null
          id?: string
          image_url?: string | null
          message?: string
          message_type?: string | null
          reactions?: Json | null
          read_by_jackie?: boolean | null
          read_by_jayden?: boolean | null
          replied_to_id?: string | null
          sender?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_replied_to_id_fkey"
            columns: ["replied_to_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_presence: {
        Row: {
          created_at: string
          id: string
          is_online: boolean
          last_seen: string
          updated_at: string
          user_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_online?: boolean
          last_seen?: string
          updated_at?: string
          user_type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_online?: boolean
          last_seen?: string
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_contact_method: string
          same_day_response: boolean
          service_address: string
          services_needed: string[]
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_contact_method?: string
          same_day_response?: boolean
          service_address: string
          services_needed?: string[]
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_contact_method?: string
          same_day_response?: boolean
          service_address?: string
          services_needed?: string[]
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      coordination_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          setting_key: string
          setting_value?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      couple_goals: {
        Row: {
          category: string | null
          completed: boolean | null
          created_at: string
          date_completed: string | null
          description: string | null
          id: string
          title: string
        }
        Insert: {
          category?: string | null
          completed?: boolean | null
          created_at?: string
          date_completed?: string | null
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: string | null
          completed?: boolean | null
          created_at?: string
          date_completed?: string | null
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      custom_events: {
        Row: {
          created_at: string
          event_name: string
          event_parameters: Json | null
          id: string
          page_path: string
          session_id: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          event_name: string
          event_parameters?: Json | null
          id?: string
          page_path: string
          session_id: string
          timestamp?: string
        }
        Update: {
          created_at?: string
          event_name?: string
          event_parameters?: Json | null
          id?: string
          page_path?: string
          session_id?: string
          timestamp?: string
        }
        Relationships: []
      }
      customer_accounts: {
        Row: {
          created_at: string
          customer_id: string | null
          email: string
          email_verified: boolean
          id: string
          is_active: boolean
          last_login: string | null
          password_hash: string
          reset_token: string | null
          reset_token_expires: string | null
          updated_at: string
          verification_token: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          email: string
          email_verified?: boolean
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash: string
          reset_token?: string | null
          reset_token_expires?: string | null
          updated_at?: string
          verification_token?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          email?: string
          email_verified?: boolean
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash?: string
          reset_token?: string | null
          reset_token_expires?: string | null
          updated_at?: string
          verification_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_sessions: {
        Row: {
          created_at: string
          customer_account_id: string | null
          expires_at: string
          id: string
          session_token: string
        }
        Insert: {
          created_at?: string
          customer_account_id?: string | null
          expires_at: string
          id?: string
          session_token: string
        }
        Update: {
          created_at?: string
          customer_account_id?: string | null
          expires_at?: string
          id?: string
          session_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_sessions_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          customer_id: string
          frequency: string
          id: string
          next_service_date: string | null
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id: string
          frequency: string
          id?: string
          next_service_date?: string | null
          plan_id: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string
          frequency?: string
          id?: string
          next_service_date?: string | null
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      daily_routes: {
        Row: {
          created_at: string
          end_location: string | null
          id: string
          last_optimized_at: string | null
          optimized_order: Json
          route_date: string
          route_efficiency_score: number | null
          start_location: string | null
          status: string
          technician_id: string
          total_distance_km: number | null
          total_duration_minutes: number | null
          updated_at: string
          weather_conditions: Json | null
        }
        Insert: {
          created_at?: string
          end_location?: string | null
          id?: string
          last_optimized_at?: string | null
          optimized_order?: Json
          route_date: string
          route_efficiency_score?: number | null
          start_location?: string | null
          status?: string
          technician_id: string
          total_distance_km?: number | null
          total_duration_minutes?: number | null
          updated_at?: string
          weather_conditions?: Json | null
        }
        Update: {
          created_at?: string
          end_location?: string | null
          id?: string
          last_optimized_at?: string | null
          optimized_order?: Json
          route_date?: string
          route_efficiency_score?: number | null
          start_location?: string | null
          status?: string
          technician_id?: string
          total_distance_km?: number | null
          total_duration_minutes?: number | null
          updated_at?: string
          weather_conditions?: Json | null
        }
        Relationships: []
      }
      discount_codes: {
        Row: {
          created_at: string
          customer_email: string
          discount_code: string
          expires_at: string
          id: string
          service_type: string
          used_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          discount_code: string
          expires_at: string
          id?: string
          service_type: string
          used_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          discount_code?: string
          expires_at?: string
          id?: string
          service_type?: string
          used_at?: string
        }
        Relationships: []
      }
      door_visits: {
        Row: {
          contact_email: string | null
          contact_made: boolean | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          employee_id: string
          employee_name: string
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          latitude: number | null
          longitude: number | null
          notes: string | null
          outcome: string | null
          quote_amount: number | null
          quote_provided: boolean | null
          updated_at: string
          visit_address: string
          visit_duration_minutes: number | null
          visit_end_time: string | null
          visit_start_time: string
          visit_status: string
        }
        Insert: {
          contact_email?: string | null
          contact_made?: boolean | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          employee_id: string
          employee_name: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          outcome?: string | null
          quote_amount?: number | null
          quote_provided?: boolean | null
          updated_at?: string
          visit_address: string
          visit_duration_minutes?: number | null
          visit_end_time?: string | null
          visit_start_time?: string
          visit_status?: string
        }
        Update: {
          contact_email?: string | null
          contact_made?: boolean | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          employee_id?: string
          employee_name?: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          outcome?: string | null
          quote_amount?: number | null
          quote_provided?: boolean | null
          updated_at?: string
          visit_address?: string
          visit_duration_minutes?: number | null
          visit_end_time?: string | null
          visit_start_time?: string
          visit_status?: string
        }
        Relationships: []
      }
      employee_locations: {
        Row: {
          accuracy: number | null
          address_estimate: string | null
          created_at: string
          employee_id: string
          employee_name: string
          heading: number | null
          id: string
          latitude: number
          longitude: number
          session_id: string | null
          speed: number | null
          timestamp: string
        }
        Insert: {
          accuracy?: number | null
          address_estimate?: string | null
          created_at?: string
          employee_id: string
          employee_name: string
          heading?: number | null
          id?: string
          latitude: number
          longitude: number
          session_id?: string | null
          speed?: number | null
          timestamp?: string
        }
        Update: {
          accuracy?: number | null
          address_estimate?: string | null
          created_at?: string
          employee_id?: string
          employee_name?: string
          heading?: number | null
          id?: string
          latitude?: number
          longitude?: number
          session_id?: string | null
          speed?: number | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_locations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "employee_work_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_work_sessions: {
        Row: {
          created_at: string
          employee_id: string
          employee_name: string
          end_latitude: number | null
          end_longitude: number | null
          id: string
          notes: string | null
          session_end: string | null
          session_start: string
          session_status: string
          start_latitude: number | null
          start_longitude: number | null
          successful_contacts: number | null
          total_distance_km: number | null
          total_duration_minutes: number | null
          total_visits: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          employee_name: string
          end_latitude?: number | null
          end_longitude?: number | null
          id?: string
          notes?: string | null
          session_end?: string | null
          session_start?: string
          session_status?: string
          start_latitude?: number | null
          start_longitude?: number | null
          successful_contacts?: number | null
          total_distance_km?: number | null
          total_duration_minutes?: number | null
          total_visits?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          employee_name?: string
          end_latitude?: number | null
          end_longitude?: number | null
          id?: string
          notes?: string | null
          session_end?: string | null
          session_start?: string
          session_status?: string
          start_latitude?: number | null
          start_longitude?: number | null
          successful_contacts?: number | null
          total_distance_km?: number | null
          total_duration_minutes?: number | null
          total_visits?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      gift_cards: {
        Row: {
          amount: number
          balance: number
          code: string
          created_at: string
          expires_at: string | null
          id: string
          message: string | null
          purchased_at: string
          purchaser_email: string
          recipient_email: string | null
          recipient_name: string | null
          status: string
          stripe_payment_intent_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          balance: number
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          message?: string | null
          purchased_at?: string
          purchaser_email: string
          recipient_email?: string | null
          recipient_name?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          balance?: number
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          message?: string | null
          purchased_at?: string
          purchaser_email?: string
          recipient_email?: string | null
          recipient_name?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      invoice_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_id: string | null
          payment_method: string | null
          processed_at: string | null
          status: string
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          invoice_id?: string | null
          payment_method?: string | null
          processed_at?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string | null
          payment_method?: string | null
          processed_at?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          customer_id: string
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          job_id: string | null
          last_reminder_sent: string | null
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          payment_reference: string | null
          quote_id: string | null
          sent_at: string | null
          status: string
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          due_date: string
          id?: string
          invoice_date?: string
          invoice_number: string
          job_id?: string | null
          last_reminder_sent?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          quote_id?: string | null
          sent_at?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          job_id?: string | null
          last_reminder_sent?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          quote_id?: string | null
          sent_at?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          assigned_team_member: string | null
          completion_photos: string[] | null
          created_at: string
          customer_id: string
          customer_satisfaction_rating: number | null
          description: string | null
          estimated_duration_hours: number | null
          id: string
          job_notes: string | null
          quote_id: string
          scheduled_date: string | null
          scheduled_time: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          assigned_team_member?: string | null
          completion_photos?: string[] | null
          created_at?: string
          customer_id: string
          customer_satisfaction_rating?: number | null
          description?: string | null
          estimated_duration_hours?: number | null
          id?: string
          job_notes?: string | null
          quote_id: string
          scheduled_date?: string | null
          scheduled_time?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          assigned_team_member?: string | null
          completion_photos?: string[] | null
          created_at?: string
          customer_id?: string
          customer_satisfaction_rating?: number | null
          description?: string | null
          estimated_duration_hours?: number | null
          id?: string
          job_notes?: string | null
          quote_id?: string
          scheduled_date?: string | null
          scheduled_time?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          conversion_customer_id: string | null
          conversion_quote_id: string | null
          created_at: string
          email: string | null
          follow_up_date: string | null
          id: string
          lead_source: string
          message: string | null
          name: string
          phone: string | null
          priority: string
          property_address: string | null
          service_requested: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          conversion_customer_id?: string | null
          conversion_quote_id?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          id?: string
          lead_source?: string
          message?: string | null
          name: string
          phone?: string | null
          priority?: string
          property_address?: string | null
          service_requested: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          conversion_customer_id?: string | null
          conversion_quote_id?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          id?: string
          lead_source?: string
          message?: string | null
          name?: string
          phone?: string | null
          priority?: string
          property_address?: string | null
          service_requested?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_conversion_customer_id_fkey"
            columns: ["conversion_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_conversion_quote_id_fkey"
            columns: ["conversion_quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      love_journey_maps: {
        Row: {
          created_at: string
          from_location: string
          id: string
          route_data: Json | null
          stops: Json | null
          to_location: string
        }
        Insert: {
          created_at?: string
          from_location: string
          id?: string
          route_data?: Json | null
          stops?: Json | null
          to_location: string
        }
        Update: {
          created_at?: string
          from_location?: string
          id?: string
          route_data?: Json | null
          stops?: Json | null
          to_location?: string
        }
        Relationships: []
      }
      outbound_calls: {
        Row: {
          attempted_at: string | null
          call_duration: number | null
          call_sid: string | null
          call_status: string | null
          campaign_name: string | null
          completed_at: string | null
          created_at: string | null
          follow_up_sms_sent: boolean | null
          id: string
          phone_number: string
          quote_sent: boolean | null
          scheduled_at: string | null
          storefront_id: string | null
          transcript: string | null
          updated_at: string | null
          voicemail_left: boolean | null
        }
        Insert: {
          attempted_at?: string | null
          call_duration?: number | null
          call_sid?: string | null
          call_status?: string | null
          campaign_name?: string | null
          completed_at?: string | null
          created_at?: string | null
          follow_up_sms_sent?: boolean | null
          id?: string
          phone_number: string
          quote_sent?: boolean | null
          scheduled_at?: string | null
          storefront_id?: string | null
          transcript?: string | null
          updated_at?: string | null
          voicemail_left?: boolean | null
        }
        Update: {
          attempted_at?: string | null
          call_duration?: number | null
          call_sid?: string | null
          call_status?: string | null
          campaign_name?: string | null
          completed_at?: string | null
          created_at?: string | null
          follow_up_sms_sent?: boolean | null
          id?: string
          phone_number?: string
          quote_sent?: boolean | null
          scheduled_at?: string | null
          storefront_id?: string | null
          transcript?: string | null
          updated_at?: string | null
          voicemail_left?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "outbound_calls_storefront_id_fkey"
            columns: ["storefront_id"]
            isOneToOne: false
            referencedRelation: "storefronts"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          created_at: string
          detected_city: string | null
          id: string
          ip_address: unknown
          latitude: number | null
          longitude: number | null
          page_path: string
          page_title: string
          referrer: string | null
          session_id: string | null
          timestamp: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          detected_city?: string | null
          id?: string
          ip_address?: unknown
          latitude?: number | null
          longitude?: number | null
          page_path: string
          page_title: string
          referrer?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          detected_city?: string | null
          id?: string
          ip_address?: unknown
          latitude?: number | null
          longitude?: number | null
          page_path?: string
          page_title?: string
          referrer?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      project_communications: {
        Row: {
          communication_type: string
          created_at: string
          id: string
          payload: Json
          processed_at: string | null
          response_data: Json | null
          source_project: string
          status: string
          target_project: string | null
        }
        Insert: {
          communication_type: string
          created_at?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          response_data?: Json | null
          source_project: string
          status?: string
          target_project?: string | null
        }
        Update: {
          communication_type?: string
          created_at?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          response_data?: Json | null
          source_project?: string
          status?: string
          target_project?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address_line1: string
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string
          customer_name: string | null
          data_source: string | null
          email: string | null
          follow_up_date: string | null
          frontage_glass_width: number | null
          id: string
          last_contact_date: string | null
          lat: number | null
          lead_score: string | null
          lead_source: string | null
          living_sqft: number | null
          lng: number | null
          lot_size: string | null
          lot_sqft: number | null
          notes: string | null
          opening_hours: string | null
          phone_number: string | null
          plaza_name: string | null
          postal: string | null
          postal_code: string | null
          property_type_detail: string | null
          province: string | null
          status: string | null
          stories: number | null
          street_view_url: string | null
          type: string | null
          unit_number: string | null
          updated_at: string
          year_built: number | null
        }
        Insert: {
          address_line1: string
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string
          customer_name?: string | null
          data_source?: string | null
          email?: string | null
          follow_up_date?: string | null
          frontage_glass_width?: number | null
          id?: string
          last_contact_date?: string | null
          lat?: number | null
          lead_score?: string | null
          lead_source?: string | null
          living_sqft?: number | null
          lng?: number | null
          lot_size?: string | null
          lot_sqft?: number | null
          notes?: string | null
          opening_hours?: string | null
          phone_number?: string | null
          plaza_name?: string | null
          postal?: string | null
          postal_code?: string | null
          property_type_detail?: string | null
          province?: string | null
          status?: string | null
          stories?: number | null
          street_view_url?: string | null
          type?: string | null
          unit_number?: string | null
          updated_at?: string
          year_built?: number | null
        }
        Update: {
          address_line1?: string
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string
          customer_name?: string | null
          data_source?: string | null
          email?: string | null
          follow_up_date?: string | null
          frontage_glass_width?: number | null
          id?: string
          last_contact_date?: string | null
          lat?: number | null
          lead_score?: string | null
          lead_source?: string | null
          living_sqft?: number | null
          lng?: number | null
          lot_size?: string | null
          lot_sqft?: number | null
          notes?: string | null
          opening_hours?: string | null
          phone_number?: string | null
          plaza_name?: string | null
          postal?: string | null
          postal_code?: string | null
          property_type_detail?: string | null
          province?: string | null
          status?: string | null
          stories?: number | null
          street_view_url?: string | null
          type?: string | null
          unit_number?: string | null
          updated_at?: string
          year_built?: number | null
        }
        Relationships: []
      }
      property_customers: {
        Row: {
          created_at: string
          email: string | null
          id: string
          magic_link_token: string | null
          marketing_opt_in: boolean | null
          name: string
          phone: string | null
          property_id: string
          token_expires_at: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          magic_link_token?: string | null
          marketing_opt_in?: boolean | null
          name: string
          phone?: string | null
          property_id: string
          token_expires_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          magic_link_token?: string | null
          marketing_opt_in?: boolean | null
          name?: string
          phone?: string | null
          property_id?: string
          token_expires_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_customers_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_data: {
        Row: {
          address: string
          created_at: string
          id: string
          last_scraped_at: string
          lot_size: string | null
          property_type: string | null
          raw_data: Json | null
          scrape_status: string
          total_finished_area: number | null
          updated_at: string
          year_built: number | null
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          last_scraped_at?: string
          lot_size?: string | null
          property_type?: string | null
          raw_data?: Json | null
          scrape_status?: string
          total_finished_area?: number | null
          updated_at?: string
          year_built?: number | null
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          last_scraped_at?: string
          lot_size?: string | null
          property_type?: string | null
          raw_data?: Json | null
          scrape_status?: string
          total_finished_area?: number | null
          updated_at?: string
          year_built?: number | null
        }
        Relationships: []
      }
      property_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          meta_json: Json | null
          property_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          meta_json?: Json | null
          property_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          meta_json?: Json | null
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_events_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_reminders: {
        Row: {
          channel: string
          created_at: string
          id: string
          property_id: string
          send_at: string
          status: string
          target: string
          template_key: string
        }
        Insert: {
          channel: string
          created_at?: string
          id?: string
          property_id: string
          send_at: string
          status?: string
          target: string
          template_key: string
        }
        Update: {
          channel?: string
          created_at?: string
          id?: string
          property_id?: string
          send_at?: string
          status?: string
          target?: string
          template_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_reminders_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_status: {
        Row: {
          driveway_condition: string | null
          gutters_condition: string | null
          id: string
          last_service_driveway: string | null
          last_service_gutters: string | null
          last_service_roof: string | null
          last_service_siding: string | null
          last_service_windows: string | null
          next_rec_driveway: string | null
          next_rec_gutters: string | null
          next_rec_roof: string | null
          next_rec_siding: string | null
          next_rec_windows: string | null
          property_id: string
          roof_condition: string | null
          siding_condition: string | null
          updated_at: string
          windows_condition: string | null
        }
        Insert: {
          driveway_condition?: string | null
          gutters_condition?: string | null
          id?: string
          last_service_driveway?: string | null
          last_service_gutters?: string | null
          last_service_roof?: string | null
          last_service_siding?: string | null
          last_service_windows?: string | null
          next_rec_driveway?: string | null
          next_rec_gutters?: string | null
          next_rec_roof?: string | null
          next_rec_siding?: string | null
          next_rec_windows?: string | null
          property_id: string
          roof_condition?: string | null
          siding_condition?: string | null
          updated_at?: string
          windows_condition?: string | null
        }
        Update: {
          driveway_condition?: string | null
          gutters_condition?: string | null
          id?: string
          last_service_driveway?: string | null
          last_service_gutters?: string | null
          last_service_roof?: string | null
          last_service_siding?: string | null
          last_service_windows?: string | null
          next_rec_driveway?: string | null
          next_rec_gutters?: string | null
          next_rec_roof?: string | null
          next_rec_siding?: string | null
          next_rec_windows?: string | null
          property_id?: string
          roof_condition?: string | null
          siding_condition?: string | null
          updated_at?: string
          windows_condition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_status_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          add_ons: Json
          approved_at: string | null
          created_at: string
          customer_email: string | null
          customer_feedback: string | null
          customer_id: string | null
          customer_name: string
          customer_phone: string | null
          customer_response: string | null
          follow_up_date: string | null
          gst_amount: number
          house_size: string | null
          id: string
          internal_notes: string | null
          notes: string | null
          opened: boolean | null
          products: Json
          products_subtotal: number
          property_address: string | null
          property_data_id: string | null
          property_square_footage: number | null
          pst_amount: number
          rejected_reason: string | null
          sent_at: string
          sent_to_customer_at: string | null
          services: Json
          services_subtotal: number
          square_footage_source: string | null
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          add_ons?: Json
          approved_at?: string | null
          created_at?: string
          customer_email?: string | null
          customer_feedback?: string | null
          customer_id?: string | null
          customer_name: string
          customer_phone?: string | null
          customer_response?: string | null
          follow_up_date?: string | null
          gst_amount?: number
          house_size?: string | null
          id?: string
          internal_notes?: string | null
          notes?: string | null
          opened?: boolean | null
          products?: Json
          products_subtotal?: number
          property_address?: string | null
          property_data_id?: string | null
          property_square_footage?: number | null
          pst_amount?: number
          rejected_reason?: string | null
          sent_at?: string
          sent_to_customer_at?: string | null
          services?: Json
          services_subtotal?: number
          square_footage_source?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Update: {
          add_ons?: Json
          approved_at?: string | null
          created_at?: string
          customer_email?: string | null
          customer_feedback?: string | null
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          customer_response?: string | null
          follow_up_date?: string | null
          gst_amount?: number
          house_size?: string | null
          id?: string
          internal_notes?: string | null
          notes?: string | null
          opened?: boolean | null
          products?: Json
          products_subtotal?: number
          property_address?: string | null
          property_data_id?: string | null
          property_square_footage?: number | null
          pst_amount?: number
          rejected_reason?: string | null
          sent_at?: string
          sent_to_customer_at?: string | null
          services?: Json
          services_subtotal?: number
          square_footage_source?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_property_data_id_fkey"
            columns: ["property_data_id"]
            isOneToOne: false
            referencedRelation: "property_data"
            referencedColumns: ["id"]
          },
        ]
      }
      receipts: {
        Row: {
          created_at: string
          customer_email: string | null
          customer_id: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          items: Json
          notes: string | null
          payment_method: string | null
          receipt_date: string
          receipt_number: string
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email?: string | null
          customer_id?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          items?: Json
          notes?: string | null
          payment_method?: string | null
          receipt_date?: string
          receipt_number: string
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          items?: Json
          notes?: string | null
          payment_method?: string | null
          receipt_date?: string
          receipt_number?: string
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "receipts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_schedules: {
        Row: {
          advance_booking_days: number | null
          auto_schedule: boolean | null
          created_at: string
          customer_id: string | null
          frequency: string
          id: string
          is_active: boolean | null
          last_service_date: string | null
          next_service_date: string | null
          preferred_day_of_week: number | null
          preferred_time: string | null
          seasonal_end_month: number | null
          seasonal_start_month: number | null
          service_duration_minutes: number | null
          service_type: string
          special_instructions: string | null
          updated_at: string
        }
        Insert: {
          advance_booking_days?: number | null
          auto_schedule?: boolean | null
          created_at?: string
          customer_id?: string | null
          frequency: string
          id?: string
          is_active?: boolean | null
          last_service_date?: string | null
          next_service_date?: string | null
          preferred_day_of_week?: number | null
          preferred_time?: string | null
          seasonal_end_month?: number | null
          seasonal_start_month?: number | null
          service_duration_minutes?: number | null
          service_type: string
          special_instructions?: string | null
          updated_at?: string
        }
        Update: {
          advance_booking_days?: number | null
          auto_schedule?: boolean | null
          created_at?: string
          customer_id?: string | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          last_service_date?: string | null
          next_service_date?: string | null
          preferred_day_of_week?: number | null
          preferred_time?: string | null
          seasonal_end_month?: number | null
          seasonal_start_month?: number | null
          service_duration_minutes?: number | null
          service_type?: string
          special_instructions?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_schedules_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_rewards: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          reward_amount: number
          reward_name: string
          reward_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          reward_amount: number
          reward_name: string
          reward_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          reward_amount?: number
          reward_name?: string
          reward_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          admin_notes: string | null
          clicks_count: number | null
          conversion_date: string | null
          converted_customer_id: string | null
          created_at: string
          friend_email: string | null
          friend_name: string
          friend_phone: string | null
          id: string
          last_clicked_at: string | null
          referral_code: string
          referral_link: string | null
          referrer_customer_id: string | null
          referrer_email: string | null
          referrer_name: string
          referrer_phone: string | null
          reward_amount: number | null
          reward_issued_date: string | null
          reward_type: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          clicks_count?: number | null
          conversion_date?: string | null
          converted_customer_id?: string | null
          created_at?: string
          friend_email?: string | null
          friend_name: string
          friend_phone?: string | null
          id?: string
          last_clicked_at?: string | null
          referral_code: string
          referral_link?: string | null
          referrer_customer_id?: string | null
          referrer_email?: string | null
          referrer_name: string
          referrer_phone?: string | null
          reward_amount?: number | null
          reward_issued_date?: string | null
          reward_type?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          clicks_count?: number | null
          conversion_date?: string | null
          converted_customer_id?: string | null
          created_at?: string
          friend_email?: string | null
          friend_name?: string
          friend_phone?: string | null
          id?: string
          last_clicked_at?: string | null
          referral_code?: string
          referral_link?: string | null
          referrer_customer_id?: string | null
          referrer_email?: string | null
          referrer_name?: string
          referrer_phone?: string | null
          reward_amount?: number | null
          reward_issued_date?: string | null
          reward_type?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_converted_customer_id_fkey"
            columns: ["converted_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_customer_id_fkey"
            columns: ["referrer_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_availability: {
        Row: {
          created_at: string
          current_bookings: number | null
          date: string
          end_time: string
          id: string
          is_available: boolean
          max_bookings: number | null
          start_time: string
          technician_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_bookings?: number | null
          date: string
          end_time: string
          id?: string
          is_available?: boolean
          max_bookings?: number | null
          start_time: string
          technician_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_bookings?: number | null
          date?: string
          end_time?: string
          id?: string
          is_available?: boolean
          max_bookings?: number | null
          start_time?: string
          technician_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_areas: {
        Row: {
          city: string
          created_at: string
          cta_url: string | null
          headline: string
          id: string
          image_url: string
          is_active: boolean | null
          sort_order: number | null
          subtext: string
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          cta_url?: string | null
          headline: string
          id?: string
          image_url: string
          is_active?: boolean | null
          sort_order?: number | null
          subtext: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          cta_url?: string | null
          headline?: string
          id?: string
          image_url?: string
          is_active?: boolean | null
          sort_order?: number | null
          subtext?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_photos: {
        Row: {
          created_at: string
          id: string
          label: string | null
          photo_type: string | null
          property_id: string | null
          service_record_id: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          photo_type?: string | null
          property_id?: string | null
          service_record_id?: string | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          photo_type?: string | null
          property_id?: string | null
          service_record_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_photos_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_photos_service_record_id_fkey"
            columns: ["service_record_id"]
            isOneToOne: false
            referencedRelation: "service_records"
            referencedColumns: ["id"]
          },
        ]
      }
      service_records: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          property_id: string
          service_date: string
          services_json: Json
          technician_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          property_id: string
          service_date: string
          services_json?: Json
          technician_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          property_id?: string
          service_date?: string
          services_json?: Json
          technician_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_records_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_playlists: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          mood: string | null
          name: string
          songs: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          mood?: string | null
          name: string
          songs?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          mood?: string | null
          name?: string
          songs?: Json | null
        }
        Relationships: []
      }
      storefronts: {
        Row: {
          address: string | null
          business_name: string
          business_type: string | null
          call_count: number | null
          contact_person: string | null
          created_at: string
          email: string | null
          follow_up_date: string | null
          id: string
          interest_level: string | null
          last_called_at: string | null
          last_quote_sent_at: string | null
          notes: string | null
          phone_number: string
          quote_sent: boolean | null
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type?: string | null
          call_count?: number | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          id?: string
          interest_level?: string | null
          last_called_at?: string | null
          last_quote_sent_at?: string | null
          notes?: string | null
          phone_number: string
          quote_sent?: boolean | null
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string | null
          call_count?: number | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          id?: string
          interest_level?: string | null
          last_called_at?: string | null
          last_quote_sent_at?: string | null
          notes?: string | null
          phone_number?: string
          quote_sent?: boolean | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          discount_percentage: number | null
          features: Json
          id: string
          is_active: boolean
          name: string
          price_annually: number | null
          price_monthly: number
          price_quarterly: number | null
          services: Json
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          features?: Json
          id?: string
          is_active?: boolean
          name: string
          price_annually?: number | null
          price_monthly: number
          price_quarterly?: number | null
          services?: Json
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          features?: Json
          id?: string
          is_active?: boolean
          name?: string
          price_annually?: number | null
          price_monthly?: number
          price_quarterly?: number | null
          services?: Json
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      subscription_services: {
        Row: {
          completion_photos: string[] | null
          created_at: string
          id: string
          notes: string | null
          service_date: string
          service_type: string
          status: string
          subscription_id: string
          updated_at: string
        }
        Insert: {
          completion_photos?: string[] | null
          created_at?: string
          id?: string
          notes?: string | null
          service_date: string
          service_type: string
          status?: string
          subscription_id: string
          updated_at?: string
        }
        Update: {
          completion_photos?: string[] | null
          created_at?: string
          id?: string
          notes?: string | null
          service_date?: string
          service_type?: string
          status?: string
          subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_services_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "customer_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      task_automations: {
        Row: {
          action_data: Json
          created_at: string
          executed_at: string | null
          id: string
          project_source: string | null
          schedule_date: string | null
          status: string
          task_type: string
          trigger_data: Json
          trigger_type: string
          updated_at: string
        }
        Insert: {
          action_data?: Json
          created_at?: string
          executed_at?: string | null
          id?: string
          project_source?: string | null
          schedule_date?: string | null
          status?: string
          task_type: string
          trigger_data?: Json
          trigger_type: string
          updated_at?: string
        }
        Update: {
          action_data?: Json
          created_at?: string
          executed_at?: string | null
          id?: string
          project_source?: string | null
          schedule_date?: string | null
          status?: string
          task_type?: string
          trigger_data?: Json
          trigger_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      typing_indicators: {
        Row: {
          created_at: string
          id: string
          is_typing: boolean
          updated_at: string
          user_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_typing?: boolean
          updated_at?: string
          user_type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_typing?: boolean
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          background_image_url: string | null
          created_at: string
          display_name: string | null
          id: string
          profile_picture_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          profile_picture_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          background_image_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          profile_picture_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      weather_delays: {
        Row: {
          auto_rescheduled: boolean | null
          booking_id: string | null
          created_at: string
          customer_notified: boolean | null
          delayed_until: string | null
          id: string
          notification_sent_at: string | null
          original_date: string
          resolved_at: string | null
          weather_data: Json | null
          weather_reason: string
        }
        Insert: {
          auto_rescheduled?: boolean | null
          booking_id?: string | null
          created_at?: string
          customer_notified?: boolean | null
          delayed_until?: string | null
          id?: string
          notification_sent_at?: string | null
          original_date: string
          resolved_at?: string | null
          weather_data?: Json | null
          weather_reason: string
        }
        Update: {
          auto_rescheduled?: boolean | null
          booking_id?: string | null
          created_at?: string
          customer_notified?: boolean | null
          delayed_until?: string | null
          id?: string
          notification_sent_at?: string | null
          original_date?: string
          resolved_at?: string | null
          weather_data?: Json | null
          weather_reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "weather_delays_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      archive_daily_chats: { Args: never; Returns: undefined }
      cleanup_old_typing_indicators: { Args: never; Returns: undefined }
      convert_lead_to_quote: { Args: { p_lead_id: string }; Returns: string }
      convert_quote_to_job: {
        Args: {
          p_assigned_team_member?: string
          p_description?: string
          p_quote_id: string
          p_scheduled_date?: string
          p_scheduled_time?: string
          p_title: string
        }
        Returns: string
      }
      convert_referral_to_customer: {
        Args: {
          p_customer_id: string
          p_referral_id: string
          p_reward_amount?: number
          p_reward_type?: string
        }
        Returns: undefined
      }
      create_customer_account: {
        Args: {
          p_customer_id: string
          p_email: string
          p_password_hash: string
        }
        Returns: string
      }
      create_invoice_from_job: {
        Args: { p_due_days?: number; p_job_id: string }
        Returns: string
      }
      create_invoice_from_quote: {
        Args: { p_due_days?: number; p_quote_id: string }
        Returns: string
      }
      generate_gift_card_code: { Args: never; Returns: string }
      generate_invoice_number: { Args: never; Returns: string }
      generate_receipt_number: { Args: never; Returns: string }
      is_admin: { Args: { user_id?: string }; Returns: boolean }
      issue_referral_reward: {
        Args: { p_admin_notes?: string; p_referral_id: string }
        Returns: undefined
      }
      mark_invoice_paid: {
        Args: {
          p_invoice_id: string
          p_payment_method: string
          p_payment_reference?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "admin" | "customer"
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
      user_role: ["admin", "customer"],
    },
  },
} as const
