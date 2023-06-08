import Image from "next/image";

import { useState } from "react";
import LayoutInicial from "@/components/LayoutInicial";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <LayoutInicial>
      <div className="flex h-full flex-col justify-around lg:p-0">
        <div className="my-auto mt-24  w-[321px] px-8">
          <Image src="/SIGSport.svg" alt="Logo" width={321} height={83} />
          <form className="">
            <div className="mt-7 w-72 lg:w-96">
              <div className="flex w-full flex-col">
                <label
                  htmlFor="email"
                  className="w-full font-Montserrat text-lg font-medium leading-6 text-white-default"
                >
                  {" "}
                  Email
                </label>
                <input
                  placeholder="Insira seu email"
                  name="email"
                  type="text"
                  className="plaheholder:font-Montserrat plaheholder:leading-5 text-gray  placeholder:text-gray  plaheholder:font-medium plaheholder:text-base h-14
                  border-2 border-green-200 bg-white-default pl-4 text-base font-medium "
                />
              </div>
              <div className="py-2">
                <label
                  htmlFor="password"
                  className="w-full font-Montserrat text-lg font-medium leading-6 text-white-default"
                >
                  {" "}
                  Senha
                </label>
                <div className="relative">
                  <input
                    name="password"
                    placeholder="Insira sua senha"
                    type={showPassword ? "text" : "password"}
                    className="plaheholder:font-Montserrat plaheholder:leading-5 text-gray  placeholder:text-gray  plaheholder:font-medium plaheholder:text-base focus:bg-white
                    h-14 w-full border-2 border-green-200 bg-white-default pl-4 text-base
                font-medium
                focus:border-gray-600
                focus:placeholder-gray-500
                focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 hover:cursor-pointer">
                    <svg
                      fill="none"
                      onClick={toggleShowPassword}
                      className={`h-6 fill-grayIcon ${
                        showPassword ? "hidden" : "block"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
                    </svg>
                    <svg
                      fill="none"
                      onClick={toggleShowPassword}
                      className={`h-6 fill-grayIcon ${
                        !showPassword ? "hidden" : "block"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <a
                  href="#"
                  className="font-Montserrat text-base font-medium leading-5 text-green-200 underline"
                >
                  Recuperar senha
                </a>
              </div>
              <div className="mt-2 flex w-full justify-end text-white-default">
                <button
                  type="submit"
                  className="h-[57.6px] w-[144px] rounded-sm bg-green-200 font-Montserrat text-base font-bold leading-5"
                >
                  ENTRAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutInicial>
  );
}
