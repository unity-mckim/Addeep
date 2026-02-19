export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  fullName: string;
}
