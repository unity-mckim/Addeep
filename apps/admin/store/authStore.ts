import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type {
  AuthUser,
  LoginCredentials,
  SignUpCredentials,
} from "../types/auth";

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  signIn: async (credentials) => {
    set({ isLoading: true });
    try {
      const { data, error } =
        await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      set({ user: data.user as AuthUser });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (credentials) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.fullName,
          },
        },
      });
      if (error) throw error;

      // 이메일 확인 필요 메시지는 UI에서 처리
      if (data.user && !data.user.confirmed_at) {
        // 이메일 확인 대기 중
        console.log("이메일 확인 필요");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  checkAuth: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ user: user as AuthUser });
  },

  resetPasswordRequest: async (email) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Reset password request error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updatePassword: async (newPassword) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Update password error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
