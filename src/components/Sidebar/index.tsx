/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from "next/link";
import { Spin as Hamburger } from "hamburger-react";
import Router, { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { Quicksand } from "next/font/google";
import { useEffect, useState } from "react";
import CriarTurma from "../Forms/CriarTurma";

const quicksand = Quicksand({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});

export default function Sidebar() {
  const router = useRouter();
  const [rota, setRota] = useState("");
  const [isOpen, setOpen] = useState(false);

  // useEffect(() => {
  //   const handleRota = () => {
  //     setRota(Router.asPath);
  //     console.log(rota);
  //   };

  //   handleRota();
  // }, [Router]);

  function handleLogout() {
    destroyCookie(null, "sig-token");
    destroyCookie(null, "sig-refreshToken");
    Router.push("/login");
  }

  function QuestionPage() {
    const { asPath } = router;

    setRota(asPath);
  }

  useEffect(() => {
    QuestionPage();
    // console.log("ROTA:", rota);
  }, []);

  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <header
        className="flex w-screen justify-between bg-green-bg text-gray-100 md:hidden"
        data-dev-hint="mobile menu bar"
      >
        <div className="flex w-full">
          <Link
            href="/dashboard"
            className="text-white flex items-center space-x-2 px-2"
          >
            <img src="/mascote.svg" alt="" />
            <span className="truncate whitespace-nowrap text-xl font-extrabold text-green-50">
              SIG SPORTS
            </span>
          </Link>
        </div>
        <div className="mr-2">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </header>

      <aside
        className={`${
          quicksand.className
        } min-w-56 bg-gray absolute inset-y-0 left-0 z-50 w-3/4 transform  space-y-6 bg-gradient-to-tl from-green-300 to-green-900 px-0  pt-6 text-gray-100 transition duration-200 ease-in-out md:relative md:flex md:w-64 md:translate-x-0 md:flex-col md:justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="flex flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <Link
            href="/dashboard"
            className="text-white flex items-center space-x-2 px-4"
          >
            <img src="/mascote.svg" alt="" />
            <span className="truncate whitespace-nowrap text-xl font-extrabold text-green-50">
              SIG SPORTS
            </span>
          </Link>

          <nav
            data-dev-hint="main navigation"
            className="flex flex-col justify-center"
          >
            <Link
              href="/dashboard"
              className={`${
                rota.includes("dashboard") ? ` bg-green-300 ` : ` `
              } hover:text-white flex items-center space-x-2 px-3 py-2 transition duration-200 hover:bg-green-300`}
            >
              <div className="ml-1">
                <img src="/dashboard.svg" />
              </div>

              <span className="">Inicio</span>
            </Link>
            <div className=" flex w-full items-center transition duration-200 hover:bg-green-300">
              <span className="ml-4">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.959878 1.0015C1.46779 0.493593 2.15666 0.208252 2.87496 0.208252H9.70829H9.70831C9.98639 0.208252 10.238 0.321757 10.4192 0.504966L15.5366 5.62237C15.7198 5.80362 15.8333 6.05518 15.8333 6.33325L15.8333 6.33965V16.5833C15.8333 17.3015 15.548 17.9904 15.04 18.4983C14.5321 19.0062 13.8433 19.2916 13.125 19.2916H2.87496C2.15666 19.2916 1.46779 19.0062 0.959878 18.4983C0.451967 17.9904 0.166626 17.3015 0.166626 16.5833V2.91659C0.166626 2.19829 0.451967 1.50942 0.959878 1.0015ZM2.87496 2.20825H8.70831V6.33325C8.70831 6.88554 9.15603 7.33325 9.70831 7.33325H13.8333V16.5833C13.8333 16.7711 13.7587 16.9513 13.6258 17.0841C13.493 17.217 13.3128 17.2916 13.125 17.2916H2.87496C2.6871 17.2916 2.50693 17.217 2.37409 17.0841C2.24125 16.9513 2.16663 16.7711 2.16663 16.5833V2.91659C2.16663 2.72872 2.24125 2.54856 2.37409 2.41572C2.50693 2.28288 2.6871 2.20825 2.87496 2.20825ZM10.7083 3.62249L12.4191 5.33325H10.7083V3.62249ZM4.58331 9.60425C4.03103 9.60425 3.58331 10.052 3.58331 10.6042C3.58331 11.1565 4.03103 11.6042 4.58331 11.6042H11.4166C11.9689 11.6042 12.4166 11.1565 12.4166 10.6042C12.4166 10.052 11.9689 9.60425 11.4166 9.60425H4.58331ZM3.58331 14.0208C3.58331 13.4685 4.03103 13.0208 4.58331 13.0208H11.4166C11.9689 13.0208 12.4166 13.4685 12.4166 14.0208C12.4166 14.573 11.9689 15.0208 11.4166 15.0208H4.58331C4.03103 15.0208 3.58331 14.573 3.58331 14.0208ZM4.58331 6.1875C4.03103 6.1875 3.58331 6.63522 3.58331 7.1875C3.58331 7.73978 4.03103 8.1875 4.58331 8.1875H6.29165C6.84393 8.1875 7.29165 7.73978 7.29165 7.1875C7.29165 6.63522 6.84393 6.1875 6.29165 6.1875H4.58331Z"
                    fill="white"
                  />
                </svg>
              </span>
              <div className="hover:text-white flex items-center space-x-2 px-3 py-2">
                <CriarTurma quicksand={quicksand} text="Criar Turma" />
              </div>
            </div>
            <Link
              href="/listarTurmas"
              className={`${
                rota.includes("listarTurmas") ? ` bg-green-300 ` : ` `
              } hover:text-white group flex items-center space-x-2 px-3 py-2 transition duration-200 hover:bg-green-300`}
            >
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1.70833L2.45831 5.97916L11 10.25L19.5416 5.97916L11 1.70833Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.45831 14.5208L11 18.7917L19.5416 14.5208"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.45831 10.25L11 14.5208L19.5416 10.25"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="">Listar Turmas</span>
            </Link>
            <Link
              href="/emprestimos"
              className="hover:text-white group flex items-center space-x-2 px-4 py-2 transition duration-200 hover:bg-green-300"
            >
              <div className="text-white-default">
                <img
                  src="/emprestimo.svg"
                  alt=""
                  className="fill-white-default"
                />
              </div>

              <span className="pl-1">Empréstimos</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                handleLogout();
              }}
              className="hover:text-white group flex w-full items-center space-x-2 px-3 py-2 font-Raleway transition duration-200 hover:bg-green-300"
            >
              <div className="text-white-default">
                <img src="/logout.svg" alt="" className="fill-white-default" />
              </div>

              <span className={`${quicksand.className}`}>Sair</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
