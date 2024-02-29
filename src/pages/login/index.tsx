/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaFacebookSquare,
} from "react-icons/fa";

import { Quicksand, Bebas_Neue } from "next/font/google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "@/contexts/AuthContext";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Matricula obrigatória")
      .matches(/^\d+$/, "A matrícula deve conter apenas números")
      .min(14, "Matricula Invalida")
      .max(14, "A matrícula deve ter máximo 14 dígitos"),
    password: yup.string().required("Senha obrigatória"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const quicksand = Quicksand({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const bebas_neue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [color, setColor] = useState(false);
  const changeColor = (e: any) => {
    if (e.target.value.length >= 1) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    const response = await signIn(data);
    setIsLoading(true);
    if (response) {
      setErrorRequest(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={`${quicksand.className} flex h-screen w-screen `}>
      <div className="flex h-full w-full flex-col lg:justify-between ">
        <div className="fixed z-50 flex w-screen bg-bgGray shadow-2xl">
          <nav className="z-50 w-full">
            <div className=" w-full px-4">
              <div className="flex w-full">
                <div className="flex w-full justify-between">
                  <div>
                    <Link href="/" className="flex items-center px-2 py-4">
                      <Image
                        src="/mascote.svg"
                        alt="Logo"
                        className="mr-2 h-8 w-8"
                        width={32}
                        height={32}
                      />
                    </Link>
                  </div>
                  <div
                    className={`${bebas_neue.className} dropShadow-100 hidden items-center gap-x-14 space-x-1 text-xl text-white-default md:flex`}
                  >
                    <a
                      href=""
                      className="flex items-center  transition duration-300 hover:border-b-4 hover:border-green-500"
                    >
                      MODALIDADES
                      <span className="ml-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99816 11.3125L13.5588 5.75184L12.4982 4.69118L7.99816 9.19118L3.49816 4.69118L2.4375 5.75184L7.99816 11.3125Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </a>
                    <a
                      href=""
                      className="flex items-center transition duration-300 hover:border-b-4 hover:border-green-500"
                    >
                      HORARIOS
                      <span className="ml-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99816 11.3125L13.5588 5.75184L12.4982 4.69118L7.99816 9.19118L3.49816 4.69118L2.4375 5.75184L7.99816 11.3125Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </a>
                    <a
                      href=""
                      className="flex items-center transition duration-300 hover:border-b-4 hover:border-green-500"
                    >
                      EQUIPES
                      <span className="ml-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99816 11.3125L13.5588 5.75184L12.4982 4.69118L7.99816 9.19118L3.49816 4.69118L2.4375 5.75184L7.99816 11.3125Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </a>
                    <Link
                      href="/login"
                      className="flex items-center transition duration-300 hover:border-b-4 hover:border-green-500"
                    >
                      LOGIN
                    </Link>
                  </div>
                  <div className="mr-24 hidden items-center gap-x-4 text-white-default md:flex">
                    <FaInstagram size={24} />
                    <FaLinkedin size={24} />

                    <FaTwitter size={24} />
                    <FaYoutube size={24} />
                    <FaFacebookSquare size={24} />
                  </div>
                </div>

                <div
                  className={`${
                    showMenu ? "hidden" : "flex"
                  } flex items-center md:hidden`}
                >
                  <button
                    type="button"
                    className="mobile-menu-button outline-none"
                    onClick={toggleMenu}
                  >
                    <svg
                      className="h-6 w-6 text-green-100 hover:text-green-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {showMenu && (
              <div className="mobile-menu flex">
                <ul className="absolute left-0 top-0 h-screen w-[80vw] bg-green-200 text-xl text-white-default">
                  <div className="flex py-4">
                    <a
                      href="#"
                      className="text-white flex items-center space-x-2 px-4"
                      title="Your App is cool"
                    >
                      <Image
                        src="/mascote.svg"
                        alt="Logo"
                        className="mr-2 h-8 w-8"
                        width={32}
                        height={32}
                      />
                      <span className="truncate whitespace-nowrap text-2xl font-extrabold">
                        SIG SPORTS
                      </span>
                    </a>
                  </div>
                  <li className="active">
                    <a
                      href="index.html"
                      className="text-white block bg-green-500 px-2 py-4 text-sm font-semibold"
                    >
                      MODALIDADES
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500"
                    >
                      HORARIOS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500"
                    >
                      EQUIPES
                    </a>
                  </li>
                </ul>
                <button
                  type="button"
                  className="mobile-menu-button1 outline-none"
                  onClick={toggleMenu}
                >
                  <svg
                    className="absolute right-4 top-4 h-10 w-10 text-white-default hover:text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </nav>
        </div>
        <div className="mt-52 flex h-full w-screen justify-center tablet:w-full">
          <div className="flex h-full flex-col justify-around lg:p-0">
            <div className="my-auto mt-24  w-[321px] px-8">
              {errorRequest && (
                <span
                  className={`${quicksand.className} flex items-center p-2 text-lg leading-5 text-red-500`}
                >
                  matricula ou senha invalido
                </span>
              )}
              <Image src="/SIGSport.svg" alt="Logo" width={321} height={83} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-7 w-72 lg:w-96">
                  <div className="flex w-full flex-col">
                    <label
                      htmlFor="username"
                      className={`w-full  ${quicksand.className} text-lg font-medium leading-6 text-white-default`}
                    >
                      {" "}
                      Matricula
                    </label>
                    <input
                      {...register("username")}
                      placeholder="Insira sua matricula"
                      name="username"
                      type="text"
                      className={`plaheholder: plaheholder:leading-5 text-gray  placeholder:text-gray  plaheholder:font-medium plaheholder:text-base h-14
                  border-2 ${
                    errors.username
                      ? "outline:border-red-600 border-red-600 focus:border-red-600"
                      : "border-green-200"
                  } bg-white-default pl-4 text-base font-medium`}
                    />
                    {errors.username && (
                      <span className="flex items-center p-2 text-lg leading-5 text-red-500">
                        {errors?.username?.message}
                      </span>
                    )}
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="password"
                      className={`${quicksand.className} w-full  text-lg font-medium leading-6 text-white-default`}
                    >
                      {" "}
                      Senha
                    </label>
                    <div className="relative">
                      <input
                        {...register("password")}
                        name="password"
                        onChange={(e) => changeColor(e)}
                        placeholder="Insira sua senha"
                        type={showPassword ? "text" : "password"}
                        className={`plaheholder: plaheholder:leading-5 text-gray  placeholder:text-gray  plaheholder:font-medium plaheholder:text-base focus:bg-white
                    h-14 w-full border-2 ${
                      errors.password ? "border-red-600" : "border-green-200"
                    } bg-white-default pl-4 text-base
                font-medium
                focus:border-gray-600
                focus:placeholder-gray-500
                focus:outline-none`}
                      />

                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 hover:cursor-pointer">
                        <svg
                          fill="none"
                          onClick={toggleShowPassword}
                          className={`h-6 ${
                            color ? "fill-black" : "fill-grayIcon"
                          } ${showPassword ? "hidden" : "block"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
                        </svg>
                        <svg
                          fill="none"
                          onClick={toggleShowPassword}
                          className={`h-6 ${
                            color ? "fill-black" : "fill-grayIcon"
                          } ${!showPassword ? "hidden" : "block"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" />
                        </svg>
                      </div>
                    </div>

                    {errors.password && (
                      <span className="flex items-center p-2 text-lg leading-5 text-red-500">
                        {errors?.password?.message}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${quicksand.className} mt-2 flex w-full justify-end text-white-default`}
                  >
                    <button
                      type="submit"
                      className={`h-[57.6px] w-[144px] rounded-sm ${
                        quicksand.className
                      } text-base font-bold leading-5 ${
                        isLoading
                          ? "cursor-wait bg-green-400 text-2xl"
                          : "bg-green-200"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? "AGUARDE..." : "ENTRAR"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="invisible mt-10 flex w-0 flex-row-reverse flex-wrap justify-between overflow-hidden lg:w-2/4 tablet:visible">
        <img
          src="/background.svg"
          alt="Logo"
          className="absolute top-0 h-full overflow-hidden"
        />
        <img src="/text.svg" alt="Logo" className="absolute h-full" />
        <div className="invisible absolute mt-10 flex flex-wrap items-center justify-end tablet:visible">
          <img src="/women.svg" alt="Logo" className="h-full" />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies["sig-token"];
  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
