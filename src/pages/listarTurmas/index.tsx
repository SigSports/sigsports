import { GetServerSideProps } from "next";
import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import Card from "@/components/Card";

type AlunosVagasType = {
  turma_id: number;

  vagas_restantes: number;
};

export type TurmaType = {
  id: number;
  nomeTurma: "string";
  modalidade: number;
  categoria: number;
  vagas: number;
  professor: string;
  genero: "string";
  dias: "string";
  horarioInicial: "string";
  horarioFinal: "string";
  turno: "string";
};

export default function ListarTurmas({
  turmas,
  vagas,
}: {
  turmas: TurmaType[];
  vagas: AlunosVagasType[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTurmas, setFilteredTurmas] = useState(turmas);

  const handleSearch = () => {
    const filtered = turmas.filter((turma) =>
      turma.nomeTurma.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTurmas(filtered);
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  function getVagasRestantes(
    turmasVagas: AlunosVagasType[],
    id: number
  ): number | undefined {
    const turmaEncontrada = turmasVagas.find((turma) => turma.turma_id === id);
    return turmaEncontrada?.vagas_restantes;
  }

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center pl-4 md:w-4/5 md:pl-16">
        <div className="mt-4 flex h-full w-full items-center md:mt-16">
          <Link href="/dashboard" className="mr-6 hover:cursor-pointer">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="30" height="30" rx="5" fill="#16DB65" />
              <g clipPath="url(#clip0_1450_3668)">
                <path
                  d="M13.9023 15.0004L18.543 10.3598L17.2173 9.03418L11.2511 15.0004L17.2173 20.9667L18.543 19.6411L13.9023 15.0004Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1450_3668">
                  <rect
                    width="22.5"
                    height="22.5"
                    fill="white"
                    transform="matrix(-1 0 0 1 26.25 3.75)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <h1 className="mr-auto font-Raleway text-3xl font-semibold leading-[37.57px] text-green-bg dark:text-white-default">
            Listar turmas
          </h1>
        </div>
        <div className="mt-10 flex h-full w-full flex-wrap items-center">
          <div className="flex flex-col justify-center">
            <label
              htmlFor="search"
              className="font-Montserrat text-lg font-medium text-[#FFF]"
            >
              Buscar Turmas{}
            </label>
            <div className="flex">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Digite o nome da turma"
                  className="h-14 w-52 rounded-l border-y-2 border-l-2 border-green-200 bg-white-default pl-12 pr-6 font-Quicksand text-base font-medium text-textGray placeholder:text-textGray focus:border-green-200 xl:w-[500px] tablet:w-[800px] 3xl:w-[55rem]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />

                <div className="absolute inset-y-0 left-3 flex items-center">
                  <svg
                    className="h-6 w-6 text-green-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.4073 19.7527L16.9969 15.3422C18.0587 13.9286 18.6319 12.208 18.63 10.44C18.63 5.92406 14.9559 2.25 10.44 2.25C5.92406 2.25 2.25 5.92406 2.25 10.44C2.25 14.9559 5.92406 18.63 10.44 18.63C12.208 18.6319 13.9286 18.0587 15.3422 16.9969L19.7527 21.4073C19.9759 21.6069 20.2671 21.7135 20.5664 21.7051C20.8658 21.6967 21.1506 21.574 21.3623 21.3623C21.574 21.1506 21.6967 20.8658 21.7051 20.5664C21.7135 20.2671 21.6069 19.9759 21.4073 19.7527ZM4.59 10.44C4.59 9.28298 4.9331 8.15194 5.5759 7.18991C6.21871 6.22789 7.13235 5.47808 8.2013 5.03531C9.27025 4.59253 10.4465 4.47668 11.5813 4.70241C12.7161 4.92813 13.7584 5.48529 14.5766 6.30343C15.3947 7.12156 15.9519 8.16393 16.1776 9.29872C16.4033 10.4335 16.2875 11.6098 15.8447 12.6787C15.4019 13.7476 14.6521 14.6613 13.6901 15.3041C12.7281 15.9469 11.597 16.29 10.44 16.29C8.88906 16.2881 7.40217 15.6712 6.30548 14.5745C5.2088 13.4778 4.59186 11.9909 4.59 10.44Z"
                      fill="#19DB67"
                    />
                  </svg>
                </div>
              </div>

              <button
                type="button"
                className="flex h-14 w-20 items-center justify-center rounded-r-sm bg-green-200 font-Montserrat text-[17.28px] font-bold text-white-default md:w-36"
                onClick={handleSearch}
              >
                Buscar
              </button>
            </div>
          </div>
          <div className="mt-3 flex sm:mt-0 3xl:ml-auto">
            <div className="relative hover:cursor-pointer">
              <Link
                href="criarTurma"
                type="button"
                className=" ml-4 mt-4 flex h-14 w-12 items-center justify-center rounded-r-sm bg-green-200  font-Montserrat text-[17.28px] font-bold leading-normal text-transparent md:mt-7 3xl:w-[21.5rem] 3xl:text-white-default	"
              >
                CRIAR NOVA TURMA
              </Link>

              <div className="3lx:left-12 absolute inset-y-0 left-5 top-6 md:top-9">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.9993 9.16602V34.8327M9.16602 21.9993H34.8327"
                    stroke="white"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-auto mt-14 grid gap-x-20 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTurmas.map((turma) => (
            <Card
              key={turma.id}
              id={turma.id}
              turma={turma.nomeTurma}
              sexo={turma.genero}
              prof={turma.professor}
              dias={turma.dias}
              horaInicial={turma.horarioInicial}
              horaFinal={turma.horarioFinal}
              vagasRestantes={
                turma.vagas - (getVagasRestantes(vagas, turma.id) ?? 0)
              }
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies["sig-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const response = await fetch(
    "https://sigsport.pythonanywhere.com/api/v1/listarTurmas/"
  );
  const response2 = await fetch(
    `https://sigsport.pythonanywhere.com/api/v1/vagasDeTurmas`
  );

  const turmas = await response.json();
  const vagas = await response2.json();
  return {
    props: {
      turmas,
      vagas,
    },
  };
};
