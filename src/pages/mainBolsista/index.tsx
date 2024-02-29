/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { destroyCookie, setCookie } from "nookies";
import Chapeu from "@/components/svg/Chapeu";
import Layout from "../../components/Layout";
import Grampo from "@/components/svg/Grampo";
import Localizacao from "@/components/svg/Localizacao";
import { api } from "@/services/api";

export default function MainBolsista({
  countTurma,
  user,
}: {
  countTurma: number;
  user: any;
}) {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Verifica o tema atual do navegador
    const currentTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    setTheme(currentTheme);
  }, []);
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <h1 className="mr-auto mt-4  pl-3 font-Raleway text-3xl  font-semibold leading-10 text-green-bg dark:text-white-default md:mt-16">
          Boas vindas, {user.nome_usual}!
        </h1>

        <div className="mt-20 flex  flex-col flex-wrap items-start gap-y-4 lg:mt-36 lg:flex-row">
          <div className="  flex h-[260px] w-56 flex-col items-center justify-center border-2 border-green-200 lg:ml-10 lg:mt-0">
            <div className="mb-3  flex items-center">
              {theme === "dark" ? (
                <Chapeu theme="white" />
              ) : (
                <Chapeu theme="black" />
              )}

              <span className="ml-2 font-Montserrat text-base font-bold leading-5 text-textGray dark:text-white-default">
                TURMAS
              </span>
            </div>
            <p className="text-center font-Montserrat text-5xl font-medium leading-[60.95px] text-green-200 dark:text-white-default">
              {countTurma}
            </p>

            <button className="mb-6 mt-2 	h-10 w-28 border-2 border-green-200 font-Montserrat text-xs font-bold leading-3 text-textGray dark:text-white-default">
              VER TURMAS
            </button>

            <Link href="/criarTurma">
              <button className="h-10	w-28 bg-green-200 font-Montserrat text-xs font-bold leading-3 text-white-default">
                CRIAR TURMA
              </button>
            </Link>
          </div>

          <div className="  flex h-[260px] w-56 flex-col items-center justify-center border-2 border-green-200 lg:ml-10 lg:mt-0">
            <div className="mb-3  flex items-center">
              {theme === "dark" ? (
                <Grampo theme="white" />
              ) : (
                <Grampo theme="black" />
              )}
              <span className="ml-2 font-Montserrat text-base font-bold leading-5 text-textGray dark:text-white-default">
                EMPRESTIMOS
              </span>
            </div>
            <p className="mb-6 w-[177px]	 text-center  font-Montserrat text-sm font-medium leading-[17.07px] text-green-200 dark:text-white-default">
              Cadastrar emprestimo de material
            </p>

            <button className="mb-6 mt-2 	h-10 w-28 border-2 border-green-200 font-Montserrat text-xs font-bold leading-3 text-textGray dark:text-white-default">
              DETALHAR
            </button>

            <button className="h-10	w-28 bg-green-200 font-Montserrat text-xs font-bold leading-3 text-white-default">
              EMPRESTAR
            </button>
          </div>
          <div className="  flex h-[260px] w-56 flex-col items-center justify-center border-2 border-green-200 lg:ml-10 lg:mt-0">
            <div className="mb-3  flex items-center">
              {theme === "dark" ? (
                <Localizacao theme="white" />
              ) : (
                <Localizacao theme="black" />
              )}
              <span className="ml-2 font-Montserrat text-base font-bold leading-5 text-textGray dark:text-white-default">
                ESPACO
              </span>
            </div>
            <p className="mb-6 w-[126px] text-center  font-Montserrat text-sm font-medium leading-[17.07px] text-green-200 dark:text-white-default">
              Registrar aluguel de espaço
            </p>

            <button className="mb-6 mt-2 	h-10 w-28 border-2 border-green-200 font-Montserrat text-xs font-bold leading-3 text-textGray dark:text-white-default">
              DETALHAR
            </button>

            <button className="h-10	w-28 bg-green-200 font-Montserrat text-xs font-bold leading-3 text-white-default">
              EMPRESTAR
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = await fetch(
    "http://40.76.188.129:8008/api/v1/listarTurmas/"
  );
  const turma = await response.json();
  const countTurma = turma.length;
  let user;
  let token = req.cookies["sig-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response1 = await api.get("minhas-informacoes/meus-dados/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    user = response1.data;
  } catch (error) {
    try {
      const tokenRefresh = req.cookies["sig-refreshToken"];
      const response2 = await api.post("autenticacao/token/refresh/", {
        refresh: tokenRefresh,
      });
      token = response2.data.access;
      const response3 = await api.get("minhas-informacoes/meus-dados/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      user = response3.data;
      setCookie(undefined, "sig-token", response2.data.access);
    } catch (e) {
      destroyCookie(null, "sig-token");
      destroyCookie(null, "sig-refreshToken");
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      countTurma,
      user,
    },
  };
};
