/* eslint-disable no-unsafe-optional-chaining */
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import CardStudent from "@/components/CardStudent";

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

type AlunosVagasType = {
  turma_id: number;

  vagas_restantes: number;
};

export type AlunosType = {
  id: number;
  nomeAluno: string;
  matricula: string;
  contato: string;
  curso: string;
};
const VisualizarTurma: NextPage<{
  turma: TurmaType;
  alunos: AlunosType[];
  vagas: AlunosVagasType;
}> = ({ turma, alunos, vagas }) => {
  const router = useRouter();
  const id = router.query?.id;

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

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTurmas, setFilteredTurmas] = useState(alunos);

  const handleSearch = () => {
    const filtered = alunos.filter((aluno) =>
      aluno.nomeAluno.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTurmas(filtered);
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const vagasAlunos = turma.vagas - vagas.vagas_restantes;
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center pl-4 md:w-4/5 md:pl-16 ">
        <div className="mt-4 flex h-full w-full items-center md:mt-16">
          <Link href="/listarTurmas" className="mr-6 hover:cursor-pointer">
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
          <h1 className="leading-[ 37.57px] font-Raleway text-3xl font-semibold text-green-bg dark:text-white-default">
            {turma.nomeTurma} {turma.genero}
          </h1>
        </div>

        <div className="mt-10 flex w-full  items-center rounded border-[3px] border-green-200 py-4 pl-14 pr-10">
          <div className="flex w-full flex-col items-center font-Montserrat  tablet:flex-row">
            <div className="flex h-full w-full flex-col items-center justify-center py-2 font-medium text-white-default md:w-1/4 md:py-0  ">
              <h1 className="text-6xl md:text-[4.695rem]">{turma.vagas}</h1>
              <p className="flex text-center tablet:w-[50px]">
                Capacidade Total
              </p>
            </div>
            <div className="h-full md:w-1/4">
              <div className="flex w-full items-center">
                <Image
                  src="/people.svg"
                  alt="people"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                <span className="ml-4 font-Montserrat font-medium text-white-default">
                  Profª {turma.professor}
                </span>
              </div>
              <div className="mt-4 flex w-full items-center">
                <Image src="/peoples.svg" alt="people" width={24} height={24} />
                {vagasAlunos > 1 ? (
                  <span className="ml-2 font-Montserrat font-medium text-white-default">
                    {vagasAlunos} Alunos matriculados
                  </span>
                ) : (
                  <span className="ml-2 font-Montserrat font-medium text-white-default">
                    {vagasAlunos} Aluno matriculado
                  </span>
                )}
              </div>
              <div className="mt-[17px] flex w-full items-center">
                <Image
                  src="/person-available.svg"
                  alt="people"
                  width={24}
                  height={24}
                />
                {vagas?.vagas_restantes ? (
                  <span className="ml-2 font-Montserrat font-medium text-white-default">
                    {vagas?.vagas_restantes} Vagas disponíveis
                  </span>
                ) : (
                  <span className="ml-2 font-Montserrat font-medium text-white-default">
                    {turma.vagas} Vagas disponíveis
                  </span>
                )}
              </div>
              <div />
              <div />
            </div>
            <div className="h-full py-2 md:w-1/4">
              <div className="flex w-full items-center">
                <Image
                  src="/location.svg"
                  alt="location"
                  width={24}
                  height={24}
                />
                <span className="ml-2 font-Montserrat font-medium text-white-default">
                  Ginásio principal
                </span>
              </div>
              <div className="mt-4 flex w-full items-center">
                <Image
                  src="/clock.svg"
                  alt="clock"
                  width={17}
                  height={17}
                  className="ml-1"
                />
                <span className="ml-3 font-Montserrat font-medium text-white-default">
                  {turma.horarioInicial} às {turma.horarioFinal}
                </span>
              </div>
              <div className="mt-[17px] flex w-full items-center">
                <Image
                  src="/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />
                <span className="ml-2 font-Montserrat font-medium text-white-default">
                  {formatarDiasSemana(turma.dias)}
                </span>
              </div>
              <div />
              <div />
            </div>
            <button
              type="button"
              className="flex h-[50px] w-[10.563rem] items-center justify-center space-x-2 rounded bg-green-200 text-white-default"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00065 26.6668C7.26732 26.6668 6.63932 26.4055 6.11665 25.8828C5.59399 25.3602 5.3331 24.7326 5.33399 24.0002V20.0002H8.00065V24.0002H24.0007V20.0002H26.6673V24.0002C26.6673 24.7335 26.406 25.3615 25.8833 25.8842C25.3607 26.4068 24.7331 26.6677 24.0007 26.6668H8.00065ZM16.0007 21.3335L9.33399 14.6668L11.2007 12.7335L14.6673 16.2002V5.3335H17.334V16.2002L20.8007 12.7335L22.6673 14.6668L16.0007 21.3335Z"
                  fill="white"
                />
              </svg>

              <span>EXPORTAR</span>
            </button>
          </div>
        </div>

        <div className="mt-10 flex w-full items-center">
          <div className="flex flex-col justify-center">
            <label
              htmlFor="search"
              className="font-Montserrat text-lg font-medium text-[#FFF]"
            >
              Buscar aluno (a) {}
            </label>
            <div className="flex w-full items-center">
              <div className="relative ">
                <input
                  type="text"
                  name="search"
                  placeholder="Digite"
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
                onClick={handleSearch}
                className="flex h-14 w-20 items-center justify-center rounded-r-sm  bg-green-200 font-Montserrat text-[17.28px] font-bold text-white-default md:w-36"
              >
                Buscar
              </button>
            </div>
          </div>
          <div className="mt-3 flex sm:mt-0 3xl:ml-auto">
            <div className="relative hover:cursor-pointer">
              <Link
                href={`/matricularAluno/${id}`}
                className="ml-4 mt-4 flex h-14 w-12 items-center justify-center rounded-r-sm bg-green-200 font-Montserrat text-[17.28px] font-bold leading-normal text-transparent md:mt-7 3xl:w-[21.5rem] 3xl:text-white-default"
              >
                MATRICULAR ALUNO (A)
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

        <div className=" mt-12 flex w-full flex-col ">
          {filteredTurmas.map((aluno) => (
            <CardStudent
              key={aluno.id}
              id={aluno.id}
              nomeAluno={aluno.nomeAluno}
              curso={aluno.curso}
              matricula={aluno.matricula}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default VisualizarTurma;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await fetch(
    `https://sigsport.pythonanywhere.com/api/v1/gerenciarTurmaId/${id}`
  );
  const response1 = await fetch(
    `https://sigsport.pythonanywhere.com/api/v1/listarMatriculas/${id}`
  );
  const response2 = await fetch(
    `https://sigsport.pythonanywhere.com/api/v1/vagasDeTurmas/${id}`
  );
  const turma = await response.json();
  const alunos = await response1.json();
  const vagas = await response2.json();
  return {
    props: {
      turma,
      alunos,
      vagas,
    },
  };
};
