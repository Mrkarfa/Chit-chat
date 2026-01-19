export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          email: string;
          bio: string | null;
          profile_picture_url: string | null;
          is_active: boolean;
          email_confirmed: boolean;
          created_at: string;
          updated_at: string;
          last_seen_at: string | null;
          online_status: "online" | "offline" | "away";
          banned: boolean;
          banned_until: string | null;
          ban_reason: string | null;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          email: string;
          bio?: string | null;
          profile_picture_url?: string | null;
          is_active?: boolean;
          email_confirmed?: boolean;
          created_at?: string;
          updated_at?: string;
          last_seen_at?: string | null;
          online_status?: "online" | "offline" | "away";
          banned?: boolean;
          banned_until?: string | null;
          ban_reason?: string | null;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          email?: string;
          bio?: string | null;
          profile_picture_url?: string | null;
          is_active?: boolean;
          email_confirmed?: boolean;
          created_at?: string;
          updated_at?: string;
          last_seen_at?: string | null;
          online_status?: "online" | "offline" | "away";
          banned?: boolean;
          banned_until?: string | null;
          ban_reason?: string | null;
        };
      };
      conversations: {
        Row: {
          id: string;
          conversation_type: "persistent" | "random";
          created_at: string;
          updated_at: string;
          last_message_at: string | null;
          status: "active" | "ended" | "archived";
        };
        Insert: {
          id?: string;
          conversation_type: "persistent" | "random";
          created_at?: string;
          updated_at?: string;
          last_message_at?: string | null;
          status?: "active" | "ended" | "archived";
        };
        Update: {
          id?: string;
          conversation_type?: "persistent" | "random";
          created_at?: string;
          updated_at?: string;
          last_message_at?: string | null;
          status?: "active" | "ended" | "archived";
        };
      };
      conversation_participants: {
        Row: {
          id: string;
          conversation_id: string;
          user_id: string;
          joined_at: string;
          left_at: string | null;
          muted: boolean;
          muted_until: string | null;
          unread_count: number;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          user_id: string;
          joined_at?: string;
          left_at?: string | null;
          muted?: boolean;
          muted_until?: string | null;
          unread_count?: number;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          user_id?: string;
          joined_at?: string;
          left_at?: string | null;
          muted?: boolean;
          muted_until?: string | null;
          unread_count?: number;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string | null;
          recipient_id: string | null;
          message_text: string | null;
          message_type: "text" | "image" | "file" | "system";
          media_url: string | null;
          media_caption: string | null;
          file_name: string | null;
          file_size: number | null;
          file_type: string | null;
          created_at: string;
          updated_at: string | null;
          status: "sent" | "delivered" | "read";
          delivered_at: string | null;
          read_at: string | null;
          deleted_for: string[] | null;
          is_edited: boolean;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id?: string | null;
          recipient_id?: string | null;
          message_text?: string | null;
          message_type?: "text" | "image" | "file" | "system";
          media_url?: string | null;
          media_caption?: string | null;
          file_name?: string | null;
          file_size?: number | null;
          file_type?: string | null;
          created_at?: string;
          updated_at?: string | null;
          status?: "sent" | "delivered" | "read";
          delivered_at?: string | null;
          read_at?: string | null;
          deleted_for?: string[] | null;
          is_edited?: boolean;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string | null;
          recipient_id?: string | null;
          message_text?: string | null;
          message_type?: "text" | "image" | "file" | "system";
          media_url?: string | null;
          media_caption?: string | null;
          file_name?: string | null;
          file_size?: number | null;
          file_type?: string | null;
          created_at?: string;
          updated_at?: string | null;
          status?: "sent" | "delivered" | "read";
          delivered_at?: string | null;
          read_at?: string | null;
          deleted_for?: string[] | null;
          is_edited?: boolean;
        };
      };
      random_chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          session_id: string;
          temporary_username: string;
          conversation_id: string | null;
          status: "matching" | "matched" | "ended";
          created_at: string;
          ended_at: string | null;
          end_reason: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_id?: string;
          temporary_username: string;
          conversation_id?: string | null;
          status?: "matching" | "matched" | "ended";
          created_at?: string;
          ended_at?: string | null;
          end_reason?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_id?: string;
          temporary_username?: string;
          conversation_id?: string | null;
          status?: "matching" | "matched" | "ended";
          created_at?: string;
          ended_at?: string | null;
          end_reason?: string | null;
        };
      };
      random_chat_messages: {
        Row: {
          id: string;
          conversation_id: string;
          session_id: string;
          message_text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          session_id: string;
          message_text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          session_id?: string;
          message_text?: string;
          created_at?: string;
        };
      };
      match_history: {
        Row: {
          id: string;
          user_1_id: string;
          user_2_id: string;
          matched_at: string;
        };
        Insert: {
          id?: string;
          user_1_id: string;
          user_2_id: string;
          matched_at?: string;
        };
        Update: {
          id?: string;
          user_1_id?: string;
          user_2_id?: string;
          matched_at?: string;
        };
      };
      blocks: {
        Row: {
          id: string;
          blocker_id: string;
          blocked_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          blocker_id: string;
          blocked_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          blocker_id?: string;
          blocked_id?: string;
          created_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          reporter_id: string | null;
          reported_user_id: string | null;
          reported_message_id: string | null;
          conversation_id: string | null;
          reason: string;
          description: string | null;
          context_messages: Json | null;
          status: "pending" | "reviewed" | "resolved" | "dismissed";
          created_at: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
        };
        Insert: {
          id?: string;
          reporter_id?: string | null;
          reported_user_id?: string | null;
          reported_message_id?: string | null;
          conversation_id?: string | null;
          reason: string;
          description?: string | null;
          context_messages?: Json | null;
          status?: "pending" | "reviewed" | "resolved" | "dismissed";
          created_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Update: {
          id?: string;
          reporter_id?: string | null;
          reported_user_id?: string | null;
          reported_message_id?: string | null;
          conversation_id?: string | null;
          reason?: string;
          description?: string | null;
          context_messages?: Json | null;
          status?: "pending" | "reviewed" | "resolved" | "dismissed";
          created_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_temp_username: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type ConversationParticipant =
  Database["public"]["Tables"]["conversation_participants"]["Row"];
export type RandomChatSession =
  Database["public"]["Tables"]["random_chat_sessions"]["Row"];
export type RandomChatMessage =
  Database["public"]["Tables"]["random_chat_messages"]["Row"];
export type Block = Database["public"]["Tables"]["blocks"]["Row"];
export type Report = Database["public"]["Tables"]["reports"]["Row"];

// Extended types with relations
export type ConversationWithParticipants = Conversation & {
  participants: (ConversationParticipant & { user: User })[];
  lastMessage?: Message;
};
