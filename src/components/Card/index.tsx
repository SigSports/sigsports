/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Card({
  turma,
  sexo,
  prof,
  horaInicial,
  horaFinal,
  dias,
  id,
  vagasRestantes,
}: {
  turma: string;
  sexo: string;
  prof: string;
  horaInicial: string;
  horaFinal: string;
  dias: string;
  id: number;
  vagasRestantes: number;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
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
  function handleRedirect(id: number) {
    router.push(`/visualizarTurma/${id}`);
  }

  return (
    <div className="shadow-bottom bg-custom w-[14.375rem] rounded border-2 border-green-200">
      <div className="flex w-full">
        <h1
          className="flex h-[51px] w-full items-center justify-center bg-green-200 font-Montserrat text-[17.28px] font-bold text-white-default hover:cursor-pointer"
          onClick={() => handleRedirect(id)}
        >
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
                  onClick={() => setShowModal(true)}
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
          {vagasRestantes > 1 ? (
            <span>{vagasRestantes} Alunos</span>
          ) : (
            <span>{vagasRestantes} Aluno</span>
          )}
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
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden  outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-[46.875rem] max-w-3xl bg-bgGray">
              {/* content */}
              <div className="bg-white relative flex w-full flex-col rounded-lg border-0 shadow-lg outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between rounded-t p-5">
                  <h3 className="flex w-full justify-center font-Montserrat text-3xl text-[27px] font-bold leading-normal">
                    DESEJA EXCLUIR O ALUNO?
                  </h3>

                  <span
                    className="text-white-default hover:cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                    >
                      <path
                        d="M23.7856 21.0005L31.5786 13.2075C31.9484 12.8383 32.1565 12.3373 32.1569 11.8147C32.1574 11.2921 31.9502 10.7908 31.581 10.4209C31.2118 10.0511 30.7108 9.84302 30.1882 9.84256C29.6657 9.8421 29.1643 10.0493 28.7944 10.4185L21.0015 18.2114L13.2085 10.4185C12.8386 10.0486 12.337 9.84082 11.814 9.84082C11.2909 9.84082 10.7893 10.0486 10.4194 10.4185C10.0496 10.7883 9.8418 11.2899 9.8418 11.813C9.8418 12.336 10.0496 12.8377 10.4194 13.2075L18.2124 21.0005L10.4194 28.7935C10.0496 29.1633 9.8418 29.6649 9.8418 30.188C9.8418 30.711 10.0496 31.2127 10.4194 31.5825C10.7893 31.9524 11.2909 32.1601 11.814 32.1601C12.337 32.1601 12.8386 31.9524 13.2085 31.5825L21.0015 23.7895L28.7944 31.5825C29.1643 31.9524 29.6659 32.1601 30.189 32.1601C30.712 32.1601 31.2136 31.9524 31.5835 31.5825C31.9533 31.2127 32.1611 30.711 32.1611 30.188C32.1611 29.6649 31.9533 29.1633 31.5835 28.7935L23.7856 21.0005Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
                {/* body */}
                <div className="relative w-full flex-auto p-6">
                  <p className="flex w-[37.813rem] justify-center text-center font-['Raleway'] text-2xl font-semibold leading-9">
                    Esta ação é permanente, não será possível recuperar o aluno
                    posteriormente!
                  </p>
                </div>
                {/* footer */}
                <div className="flex items-center justify-center rounded-b  p-6">
                  <button
                    className="mr-4 h-12 w-[138.543px] rounded-md border border-green-200 font-Montserrat text-[14.87px] text-sm font-bold not-italic	text-white-default"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    CANCELAR
                  </button>
                  <button
                    className="mr-4 h-12 w-[138.543px] rounded-md  bg-[#FF6636] font-Montserrat text-[14.87px] text-sm font-bold	not-italic text-white-default"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    EXCLUIR
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25" />
        </>
      ) : null}
    </div>
  );
}
