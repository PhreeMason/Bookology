export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      book_list_books: {
        Row: {
          book_id: number
          book_list_id: number
          id: number
          user_id: string
        }
        Insert: {
          book_id: number
          book_list_id: number
          id?: never
          user_id: string
        }
        Update: {
          book_id?: number
          book_list_id?: number
          id?: never
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_list_books_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_list_books_book_list_id_fkey"
            columns: ["book_list_id"]
            isOneToOne: false
            referencedRelation: "book_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_list_books_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      book_list_comments: {
        Row: {
          book_list_id: number
          comment: string | null
          id: number
          spoilers: boolean | null
          user_id: string
        }
        Insert: {
          book_list_id: number
          comment?: string | null
          id?: never
          spoilers?: boolean | null
          user_id: string
        }
        Update: {
          book_list_id?: number
          comment?: string | null
          id?: never
          spoilers?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_list_comments_book_list_id_fkey"
            columns: ["book_list_id"]
            isOneToOne: false
            referencedRelation: "book_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_list_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      book_list_comments_likes: {
        Row: {
          book_list_comment_id: number
          id: number
          user_id: string
        }
        Insert: {
          book_list_comment_id: number
          id?: never
          user_id: string
        }
        Update: {
          book_list_comment_id?: number
          id?: never
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_list_comments_likes_book_list_comment_id_fkey"
            columns: ["book_list_comment_id"]
            isOneToOne: false
            referencedRelation: "book_list_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_list_comments_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      book_list_likes: {
        Row: {
          book_list_id: number
          id: number
          user_id: string
        }
        Insert: {
          book_list_id: number
          id?: never
          user_id: string
        }
        Update: {
          book_list_id?: number
          id?: never
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_list_likes_book_list_id_fkey"
            columns: ["book_list_id"]
            isOneToOne: false
            referencedRelation: "book_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_list_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      book_list_tags: {
        Row: {
          book_list_id: number
          id: number
          tag_id: number
        }
        Insert: {
          book_list_id: number
          id?: never
          tag_id: number
        }
        Update: {
          book_list_id?: number
          id?: never
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "book_list_tags_book_list_id_fkey"
            columns: ["book_list_id"]
            isOneToOne: false
            referencedRelation: "book_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_list_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      book_lists: {
        Row: {
          description: string | null
          id: number
          private: boolean | null
          title: string | null
          user_id: string
        }
        Insert: {
          description?: string | null
          id?: never
          private?: boolean | null
          title?: string | null
          user_id: string
        }
        Update: {
          description?: string | null
          id?: never
          private?: boolean | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_lists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      book_notes: {
        Row: {
          id: number
          note: string | null
          user_book_id: number | null
        }
        Insert: {
          id?: never
          note?: string | null
          user_book_id?: number | null
        }
        Update: {
          id?: never
          note?: string | null
          user_book_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "book_notes_user_book_id_fkey"
            columns: ["user_book_id"]
            isOneToOne: false
            referencedRelation: "user_books"
            referencedColumns: ["id"]
          }
        ]
      }
      book_reviews: {
        Row: {
          book_id: number
          draft: boolean | null
          id: number
          rating: number | null
          review: string | null
          spoilers: boolean | null
          user_book_id: number
          user_id: string
        }
        Insert: {
          book_id: number
          draft?: boolean | null
          id?: never
          rating?: number | null
          review?: string | null
          spoilers?: boolean | null
          user_book_id: number
          user_id: string
        }
        Update: {
          book_id?: number
          draft?: boolean | null
          id?: never
          rating?: number | null
          review?: string | null
          spoilers?: boolean | null
          user_book_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_reviews_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reviews_user_book_id_fkey"
            columns: ["user_book_id"]
            isOneToOne: false
            referencedRelation: "user_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      book_reviews_comments: {
        Row: {
          book_review_id: number
          comment: string | null
          id: number
          spoilers: boolean | null
          user_id: string
        }
        Insert: {
          book_review_id: number
          comment?: string | null
          id?: never
          spoilers?: boolean | null
          user_id: string
        }
        Update: {
          book_review_id?: number
          comment?: string | null
          id?: never
          spoilers?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_reviews_comments_book_review_id_fkey"
            columns: ["book_review_id"]
            isOneToOne: false
            referencedRelation: "book_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reviews_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      book_reviews_likes: {
        Row: {
          book_review_id: number
          id: number
          user_id: string
        }
        Insert: {
          book_review_id: number
          id?: never
          user_id: string
        }
        Update: {
          book_review_id?: number
          id?: never
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_reviews_likes_book_review_id_fkey"
            columns: ["book_review_id"]
            isOneToOne: false
            referencedRelation: "book_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reviews_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      book_tags: {
        Row: {
          book_id: number | null
          id: number
          tag_name: string | null
          user_id: string
        }
        Insert: {
          book_id?: number | null
          id?: never
          tag_name?: string | null
          user_id: string
        }
        Update: {
          book_id?: number | null
          id?: never
          tag_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_tags_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "user_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      books: {
        Row: {
          authors: string[]
          description: string
          id: number
          google_books_id: string
          page_count: number
          publisher: string
          title: string
        }
        Insert: {
          authors: string[]
          description: string
          id?: number
          isbn: string
          page_count: number
          publisher: string
          title: string
        }
        Update: {
          authors?: string[] | null
          description?: string | null
          id?: number
          isbn?: string | null
          page_count?: number | null
          publisher?: string | null
          title?: string | null
        }
        Relationships: []
      }
      followers: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: number
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: never
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          book_privacy: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          book_privacy?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          book_privacy?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: never
          name?: string | null
        }
        Update: {
          id?: never
          name?: string | null
        }
        Relationships: []
      }
      user_books: {
        Row: {
          book_id: number
          current_page: number | null
          due_date: string | null
          finished_date: string | null
          id: number
          page_count_override: number | null
          start_date: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          book_id: number
          current_page?: number | null
          due_date?: string | null
          finished_date?: string | null
          id?: number
          page_count_override?: number | null
          start_date?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          book_id?: number
          current_page?: number | null
          due_date?: string | null
          finished_date?: string | null
          id?: number
          page_count_override?: number | null
          start_date?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_books_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_books_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
