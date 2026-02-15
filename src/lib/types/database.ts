export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type CoachPersonality = 'gentle' | 'strict' | 'humor' | 'science';

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          target_bedtime: string;
          target_waketime: string;
          timezone: string;
          locale: string;
          coach_personality: CoachPersonality;
          is_premium: boolean;
          stripe_customer_id: string | null;
          current_streak: number;
          longest_streak: number;
          total_nights_logged: number;
          push_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          target_bedtime?: string;
          target_waketime?: string;
          timezone?: string;
          locale?: string;
          coach_personality?: CoachPersonality;
          is_premium?: boolean;
          stripe_customer_id?: string | null;
          current_streak?: number;
          longest_streak?: number;
          total_nights_logged?: number;
          push_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          target_bedtime?: string;
          target_waketime?: string;
          timezone?: string;
          locale?: string;
          coach_personality?: CoachPersonality;
          is_premium?: boolean;
          stripe_customer_id?: string | null;
          current_streak?: number;
          longest_streak?: number;
          total_nights_logged?: number;
          push_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      sleep_logs: {
        Row: {
          id: string;
          user_id: string;
          session_date: string;
          target_bedtime: string;
          actual_bedtime: string | null;
          actual_waketime: string | null;
          achieved: boolean;
          duration_minutes: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_date: string;
          target_bedtime: string;
          actual_bedtime?: string | null;
          actual_waketime?: string | null;
          achieved?: boolean;
          duration_minutes?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_date?: string;
          target_bedtime?: string;
          actual_bedtime?: string | null;
          actual_waketime?: string | null;
          achieved?: boolean;
          duration_minutes?: number | null;
          created_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          session_date: string;
          role: 'user' | 'assistant';
          content: string;
          personality: CoachPersonality;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_date: string;
          role: 'user' | 'assistant';
          content: string;
          personality: CoachPersonality;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_date?: string;
          role?: 'user' | 'assistant';
          content?: string;
          personality?: CoachPersonality;
          created_at?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_key: string;
          unlocked_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_key: string;
          unlocked_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_key?: string;
          unlocked_at?: string;
        };
      };
      push_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          endpoint: string;
          keys_p256dh: string;
          keys_auth: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          endpoint: string;
          keys_p256dh: string;
          keys_auth: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          endpoint?: string;
          keys_p256dh?: string;
          keys_auth?: string;
          created_at?: string;
        };
      };
    };
  };
}
