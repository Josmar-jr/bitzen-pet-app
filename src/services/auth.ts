import { api } from "./api";

interface SignUpParam {
  name: string;
  email: string;
  document: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

export async function signUp(body: SignUpParam) {
  const response = await api.post("/register", body);
  const data = await response.data;

  return data;
}

interface SignInParam {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  document: string;
  phone_number: string;
  email_verified_at: string;
  profile_photo_url: string;
  type: {
    id: number;
    description: string;
  };
}

export interface SignInReturn {
  token: string;
  user: User;
}

export async function signIn(body: SignInParam) {
  const response = await api.post("/login", body);
  const data = await response.data;

  return data;
}

export async function refreshToken() {
  const response = await api.post("/refresh-token");
  const data = await response.data;

  return data;
}

export async function logout() {
  const response = await api.post("/logout");
  const data = await response.data;

  return data;
}

export async function sendCode(email: string) {
  const response = await api.post("/forgot-password", {
    email,
  });
  const data = await response.data;

  return data;
}

interface ValidateTokenParam {
  token: string;
  email: string;
}

export async function validateToken(body: ValidateTokenParam) {
  const response = await api.post("/reset-password/token/validate", body);
  const data = await response.data;

  return data;
}

interface ResetPassword extends ValidateTokenParam {
  password: string;
  password_confirmation: string;
}

export async function resetPassword(body: ResetPassword) {
  const response = await api.post("/reset-password", body);
  const data = await response.data;

  return data;
}
