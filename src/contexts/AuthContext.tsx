/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-constructed-context-values */
import { setCookie } from "nookies";
import { createContext, useState } from "react";
import Router from "next/router";
import { apiSuap } from "@/services/api";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<any>;
};

type SignInCredentials = {
  username: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!token;
  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await apiSuap.post("autenticacao/token/", {
        username,
        password,
      });
      setCookie(undefined, "sig-token", response.data.access);

      setCookie(undefined, "sig-refreshToken", response.data.refresh);
      if (response.data.access) {
        setToken(response.data.access);
      }
      Router.push("/dashboard");
    } catch (error: any) {
      return { mensage: error.response?.data?.detail };
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
