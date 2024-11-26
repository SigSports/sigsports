/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-constructed-context-values */
import { setCookie } from "nookies";
import { createContext, useState } from "react";
import Router from "next/router";
import { apiSuap, api2 } from "@/services/api";

type AuthContextType = {
  isAuthenticated: boolean;
  admin: boolean;
  id: number;
  signIn: (credentials: SignInCredentials) => Promise<any>;
};

type SignInCredentials = {
  username: string;
  password: string;
};

export interface UserType {
  id: number;
  nome: string;
  sobrenome: string;
  matricula: string;
  adm: number;
  tour: any;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!token;
  const [admin, setAdmin] = useState<boolean>(false);
  const [id, setId] = useState(0);

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await apiSuap.post("autenticacao/token/", {
        username,
        password,
      });
      // Atualizando o username após sucesso no login
      setCookie(undefined, "sig-token", response.data.access);
      setCookie(undefined, "sig-refreshToken", response.data.refresh);

      const response1 = await api2.get("/v1/usuarios/");
      const pessoas: UserType[] = await response1.data;
      const pessoaEncontrada = pessoas.find(
        (pessoa) => pessoa.matricula === username
      );
      if (pessoaEncontrada) {
        setAdmin(pessoaEncontrada.adm === 1);
        setCookie(undefined, "Tour", pessoaEncontrada.tour);
        setId(pessoaEncontrada.id);
      }

      if (response.data.access) {
        setToken(response.data.access);
      }

      // Redirecionando para o dashboard após sucesso no login
      Router.push("/dashboard");
    } catch (error: any) {
      return { mensage: error.response?.data?.detail };
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, admin, id }}>
      {children}
    </AuthContext.Provider>
  );
}
