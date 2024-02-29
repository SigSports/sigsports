/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from "next/link";
import Router, { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { Quicksand } from "next/font/google";
import { useEffect, useState } from "react";

const quicksand = Quicksand({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});

export default function Sidebar() {
  const router = useRouter();
  const [rota, setRota] = useState("");

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
            className={`${quicksand.className} t text-white block truncate whitespace-nowrap p-4 `}
          >
            Sig Sports
          </Link>
        </div>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="hover:text-white m-2 rounded-md p-2 hover:cursor-pointer focus:outline-none"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>

      <aside
        id="sidebar"
        className={`${quicksand.className} absolute inset-y-0 left-0 z-50 w-3/4 min-w-[13%] transform space-y-6 overflow-y-auto  bg-gradient-to-tl from-green-300 to-green-900  px-0 pt-6 text-gray-100 transition duration-200 ease-in-out md:relative md:flex md:w-64 md:translate-x-0 md:flex-col md:justify-between `}
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <Link
            href="/dashboard"
            className="text-white flex items-center space-x-2 px-4"
          >
            {/* <img src="{% static 'assets/mascote.svg'%}" alt="" /> */}
            <span className="truncate whitespace-nowrap text-2xl font-extrabold text-green-50">
              SIG SPORTS.
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
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.3125 7.68751L11 1.70834L18.6875 7.68751V17.0833C18.6875 17.5364 18.5075 17.9709 18.1871 18.2913C17.8668 18.6117 17.4322 18.7917 16.9792 18.7917H5.02083C4.56776 18.7917 4.13323 18.6117 3.81286 18.2913C3.49248 17.9709 3.3125 17.5364 3.3125 17.0833V7.68751Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.4375 18.7917V10.25H13.5625V18.7917"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="">Inicio</span>
            </Link>

            <Link
              href="/criarTurma"
              className={`${
                rota.includes("criarTurma") ? ` bg-green-300 ` : ` `
              } hover:text-white  flex items-center space-x-2 px-4 py-2 transition duration-200 hover:bg-green-300`}
            >
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

              <span className="">Criar Turma</span>
            </Link>
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
              <svg
                width="13"
                height="22"
                viewBox="0 0 13 22"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white-default"
              >
                <path
                  clipRule="evenodd"
                  d="M3.00707 0.368336C3.60457 0.125198 4.24567 0
                    4.89322 0C5.54076 0 6.18186 0.125198 6.77936 0.368336C7.37686 0.611474 7.91886 0.967715 8.37396
                    1.41641C8.82906 1.8651 9.18819 2.39733 9.43054 2.98222C9.67219 3.56542 9.79294 4.18942 9.78584
                    4.81826L9.77827 15.5256L9.77816 15.5325C9.7646 16.3682 9.41428 17.1651 8.80278 17.7514C8.19129
                    18.3377 7.36765 18.6663 6.50962 18.6663C5.65158 18.6663 4.82795 18.3377 4.21645 17.7514C3.60496
                    17.1651 3.25463 16.3682 3.24108 15.5325L3.24097 15.5253V7.35068C3.24097 6.84896 3.65853 6.44223
                    4.17362 6.44223C4.68871 6.44223 5.10627 6.84896 5.10627 7.35068V15.5101C5.11373 15.8666 5.26393
                    16.2063 5.52496 16.4566C5.78753 16.7083 6.14119 16.8494 6.50962 16.8494C6.87805 16.8494 7.23171
                    16.7083 7.49427 16.4566C7.75537 16.2062 7.90558 15.8664 7.91297 15.5098L7.92055 4.80689L7.92061
                    4.80169C7.92547 4.41144 7.85076 4.02413 7.7008 3.66221C7.55084 3.30029 7.32862 2.97096 7.04702 2.69332C6.76541 2.41568 6.43003 2.19525 6.06032 2.0448C5.6906 1.89435 5.2939 1.81689 4.89322
                    1.81689C4.49253 1.81689 4.09583 1.89435 3.72612 2.0448C3.3564 2.19525 3.02102 2.41568 2.73942
                    2.69332C2.45782 2.97097 2.23559 3.30029 2.08563 3.66221C1.93567 4.02413 1.86096 4.41144 1.86582
                    4.80169L1.86589 4.80721V15.5968L1.86579 15.6034C1.8569 16.2017 1.9702 16.7957 2.1991 17.3509C2.428
                    17.9062 2.76794 18.4116 3.19915 18.8377C3.63036 19.2638 4.14423 19.6022 4.7109 19.8332C5.27757
                    20.0642 5.88572 20.1831 6.5 20.1831C7.11428 20.1831 7.72243 20.0642 8.2891 19.8332C8.85577 19.6022
                    9.36964 19.2638 9.80085 18.8377C10.2321 18.4116 10.572 17.9062 10.8009 17.3509C11.0298 16.7957
                    11.1431 16.2017 11.1342 15.6034L11.1341 15.5968V5.51903C11.1341 5.01731 11.5517 4.61059 12.0668
                    4.61059C12.5819 4.61059 12.9994 5.01731 12.9994 5.51903V15.5839C13.0109 16.4207 12.852 17.2514
                    12.5319 18.028C12.2108 18.8067 11.7341 19.5155 11.1293 20.1131C10.5246 20.7107 9.80388 21.1853 9.00915
                    21.5093C8.21442 21.8332 7.36151 22 6.5 22C5.63849 22 4.78558 21.8332 3.99085 21.5093C3.19612 21.1853
                    2.47543 20.7107 1.87067 20.1131C1.26592 19.5155 0.789167 18.8067 0.46814 18.028C0.147983 17.2514 -0.0109229
                    16.4207 0.000582999 15.5839V4.81794C-0.00646314 4.18921 0.114285 3.56532 0.355893 2.98222C0.598243 2.39732
                    0.957375 1.8651 1.41247 1.41641C1.86757 0.967715 2.40958 0.611474 3.00707 0.368336Z"
                />
              </svg>

              <span className="pl-1">Empréstimos</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                handleLogout();
              }}
              className="hover:text-white group flex w-full items-center space-x-2 px-3 py-2 font-Raleway transition duration-200 hover:bg-green-300"
            >
              <svg
                fill="white"
                width="22"
                height="21"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
                xmlSpace="preserve"
              >
                <g id="XMLID_2_">
                  <path
                    id="XMLID_4_"
                    d="M51.213,180h173.785c8.284,0,15-6.716,15-15s-6.716-15-15-15H51.213l19.394-19.393
		c5.858-5.857,5.858-15.355,0-21.213c-5.856-5.858-15.354-5.858-21.213,0L4.397,154.391c-0.348,0.347-0.676,0.71-0.988,1.09
		c-0.076,0.093-0.141,0.193-0.215,0.288c-0.229,0.291-0.454,0.583-0.66,0.891c-0.06,0.09-0.109,0.185-0.168,0.276
		c-0.206,0.322-0.408,0.647-0.59,0.986c-0.035,0.067-0.064,0.138-0.099,0.205c-0.189,0.367-0.371,0.739-0.53,1.123
		c-0.02,0.047-0.034,0.097-0.053,0.145c-0.163,0.404-0.314,0.813-0.442,1.234c-0.017,0.053-0.026,0.108-0.041,0.162
		c-0.121,0.413-0.232,0.83-0.317,1.257c-0.025,0.127-0.036,0.258-0.059,0.386c-0.062,0.354-0.124,0.708-0.159,1.069
		C0.025,163.998,0,164.498,0,165s0.025,1.002,0.076,1.498c0.035,0.366,0.099,0.723,0.16,1.08c0.022,0.124,0.033,0.251,0.058,0.374
		c0.086,0.431,0.196,0.852,0.318,1.269c0.015,0.049,0.024,0.101,0.039,0.15c0.129,0.423,0.28,0.836,0.445,1.244
		c0.018,0.044,0.031,0.091,0.05,0.135c0.16,0.387,0.343,0.761,0.534,1.13c0.033,0.065,0.061,0.133,0.095,0.198
		c0.184,0.341,0.387,0.669,0.596,0.994c0.056,0.088,0.104,0.181,0.162,0.267c0.207,0.309,0.434,0.603,0.662,0.895
		c0.073,0.094,0.138,0.193,0.213,0.285c0.313,0.379,0.641,0.743,0.988,1.09l44.997,44.997C52.322,223.536,56.161,225,60,225
		s7.678-1.464,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L51.213,180z"
                  />
                  <path
                    id="XMLID_5_"
                    d="M207.299,42.299c-40.944,0-79.038,20.312-101.903,54.333c-4.62,6.875-2.792,16.195,4.083,20.816
		c6.876,4.62,16.195,2.794,20.817-4.083c17.281-25.715,46.067-41.067,77.003-41.067C258.414,72.299,300,113.884,300,165
		s-41.586,92.701-92.701,92.701c-30.845,0-59.584-15.283-76.878-40.881c-4.639-6.865-13.961-8.669-20.827-4.032
		c-6.864,4.638-8.67,13.962-4.032,20.826c22.881,33.868,60.913,54.087,101.737,54.087C274.956,287.701,330,232.658,330,165
		S274.956,42.299,207.299,42.299z"
                  />
                </g>
              </svg>

              <span className={`${quicksand.className}`}>Sair</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
