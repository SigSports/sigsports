/* eslint-disable no-nested-ternary */
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Card({
  turma,
  sexo,
  prof,
  horaInicial,
  horaFinal,
  dias,
}: {
  turma: string;
  sexo: string;
  prof: string;
  horaInicial: string;
  horaFinal: string;
  dias: string;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  function formatarDiasSemana(diasSemana: string) {
    const diasArray = diasSemana.split(",");

    if (diasArray.length === 1) {
      return diasArray[0];
    }
    if (diasArray.length === 2) {
      return diasArray.map((dia) => dia.replace("-feira", "")).join(" e ");
    }
    const ultimoDia = diasArray.pop();
    const diasFormatados = diasArray
      .map((dia) => dia.replace("-feira", ""))
      .join(", ");
    return `${diasFormatados} e ${ultimoDia?.replace("-feira", "")}`;
  }
  return (
    <div className="shadow-bottom bg-custom w-[14.375rem] rounded border-2 border-green-200">
      <div className="flex w-full">
        <h1 className="flex h-[51px] w-full items-center justify-center bg-green-200 font-Montserrat text-[17.28px] font-bold text-white-default">
          {turma}
        </h1>
        <span className="relative flex items-center bg-green-200 hover:cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white h-6 w-6 cursor-pointer"
            onClick={toggleDropdown}
          >
            <path
              d="M14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12Z"
              fill="white"
            />
            <path
              d="M14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5Z"
              fill="white"
            />
            <path
              d="M14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5Z"
              fill="white"
            />
          </svg>
          {isDropdownOpen && (
            <div className="absolute left-2 top-12 z-10 w-[8.188rem] rounded-md bg-green-200 py-2 shadow-md">
              <div className="flex items-center justify-center border-2 border-green-300 text-white-default hover:bg-green-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3043 2.75 17.863 2.75C18.4217 2.75 18.8923 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.571 21.275 6.113C21.2917 6.655 21.1083 7.11733 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                    fill="white"
                  />
                </svg>

                <Link
                  href="#"
                  className="block px-4 py-2 font-Montserrat text-sm font-medium"
                >
                  Editar
                </Link>
              </div>
              <div className="flex items-center justify-center  text-white-default hover:bg-green-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                    fill="white"
                  />
                </svg>

                <Link
                  href="#"
                  className="block px-4 py-2 font-Montserrat text-sm font-medium"
                >
                  Excluir
                </Link>
              </div>
            </div>
          )}
        </span>
      </div>
      <div className="ml-5 mt-4 flex flex-col justify-center gap-y-4 font-Montserrat text-sm font-medium text-white-default ">
        <div className="flex items-center">
          <Image
            src="/user.svg"
            width={24}
            height={24}
            alt="user"
            className=""
          />
          <span>Profª {prof}</span>
        </div>
        <div className="flex items-center">
          <Image
            src="/clock.svg"
            width={17}
            height={17}
            alt="user"
            className="ml-1 mr-1"
          />
          <span>
            {horaInicial} ás {horaFinal}
          </span>
        </div>
        <div className="flex items-center">
          <Image
            src="/calendar.svg"
            width={24}
            height={24}
            alt="user"
            className="mr-1"
          />
          <span>{formatarDiasSemana(dias)}</span>
        </div>
        <div className="flex items-center">
          <Image
            src="/people.svg"
            width={24}
            height={24}
            alt="user"
            className="mr-1"
          />
          <span>30 Alunos</span>
        </div>

        <span
          className={`mb-6 flex h-8 w-[6.688rem] items-center justify-center font-Poppins text-base font-normal ${
            sexo === "Misto"
              ? "bg-yellow text-orange"
              : sexo === "Feminino"
              ? "text-100 bg-pink-200"
              : sexo === "Masculino"
              ? "bg-blue-200 text-blue-100"
              : ""
          }`}
        >
          {sexo}
        </span>
      </div>
    </div>
  );
}
