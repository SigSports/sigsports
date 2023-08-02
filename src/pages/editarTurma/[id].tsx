/* eslint-disable import/no-extraneous-dependencies */
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { mask } from "remask";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Link from "next/link";
import Layout from "@/components/Layout";
import {
  TFormData,
  TModalidade,
  TProfessor,
  Tcategoria,
} from "@/utils/typeTurma";

const url = "https://sigsport.pythonanywhere.com/api";
const schema = yup
  .object()
  .shape({
    nomeTurma: yup
      .string()
      .required("Digite o nome da Turma")
      .min(3, "Nome muito curto"),
    vagas: yup.string().required("Digite a quantidade de vagas"),
    dias: yup
      .array()
      .min(1, "Selecione pelo menos uma opção")
      .required("Selecione uma opção"),
    horaInicial: yup.string().required("Digite um horário válido"),
    modalidade: yup.number(),
    categoria: yup.number(),
    professor: yup.number(),
    genero: yup.string(),
    turno: yup.string(),
    horaFinal: yup.string().required("Digite um horário válido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export type TurmaType = {
  id: number;
  nomeTurma: "string";
  modalidade: string;
  categoria: string;
  vagas: string;
  professor: string;
  genero: string;
  dias: "string";
  horarioInicial: "string";
  horarioFinal: "string";
  turno: "string";
};

export default function CriarTurma({
  categorias,
  modalidades,
  professores,
  turma,
}: {
  categorias: Tcategoria[];
  modalidades: TModalidade[];
  professores: TProfessor[];
  turma: TurmaType;
}) {
  const router = useRouter();
  const [errorTurno, setErrrorTurno] = useState(false);
  const [turno, setTurno] = useState<string>(turma.turno);
  const [genero, setGenero] = useState<string>(turma.genero);
  const [errorGenero, setErrorGenero] = useState(false);
  const [horaInicio, setHoraInicio] = useState<string>(turma.horarioInicial);
  const [horaFim, setHoraFim] = useState<string>(turma.horarioFinal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nomeTurma: turma.nomeTurma,
      horaInicial: turma.horarioInicial,
      horaFinal: turma.horarioFinal,
      vagas: turma.vagas,
      genero: turma.genero,
      turno: turma.turno,
    },
  });

  const createSolicitation = useMutation(async (data: TFormData) => {
    try {
      const response = await fetch(
        `https://sigsport.pythonanywhere.com/api/v1/gerenciarTurmaId/${turma.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error("Erro ao processar a resposta");
    }
  });

  function horaInicial(event: ChangeEvent<HTMLInputElement>) {
    const patterns = ["99:99"];
    const { value } = event.target;
    const valueMask = mask(value, patterns);
    setHoraInicio(valueMask);
  }
  function horaFinal(event: ChangeEvent<HTMLInputElement>) {
    const patterns = ["99:99"];
    const { value } = event.target;
    const valueMask = mask(value, patterns);
    setHoraFim(valueMask);
  }
  const onSubmit = async (data: TFormData | any) => {
    if (turno === "" && turma.turno.toString() === "") {
      setErrrorTurno(true);
    } else if (genero === "" && turma.genero.toString() === "") {
      setErrorGenero(true);
    } else {
      setErrrorTurno(false);
    }
    const diasString = data.dias.join(",");
    const data1: any = {
      nomeTurma: data.nomeTurma,
      modalidade: data.modalidade,
      categoria: data.categoria,
      vagas: data.vagas,
      professor: data.professor,
      genero,
      dias: diasString,
      horarioInicial: data.horaInicial,
      horarioFinal: data.horaFinal,
      turno,
    };
    try {
      const response = await createSolicitation.mutateAsync(data1);

      if (response.modalidade) {
        toast.success("Turma Criada com sucesso", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.back();
      } else {
        toast.error("Erro ao criar turma, corriga os campos", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      // Erro na requisição ou processamento dos dados
      // Ações após o erro...
    }
    // Resto do código de envio do formulário ou processamento dos dados
  };

  function handleButtonClicked(value: string) {
    setTurno(value);
  }
  function handleTurnoChange(event: ChangeEvent<HTMLInputElement>) {
    setTurno(event.target.value);
  }
  function handleGeneroChange(event: ChangeEvent<HTMLInputElement>) {
    setGenero(event.target.value);
  }

  const searchDay = (day: string) => {
    const dias = turma.dias.split(",");
    return dias.includes(day);
  };

  // Função para lidar com a marcação dos dias

  const modalidadeDaTurma = modalidades.find(
    (modalidade) => modalidade.nomeModalidade === turma.modalidade
  );

  // Crie um novo array de modalidades com a modalidade da turma no início
  const modalidadesWithTurmaFirst = [
    modalidadeDaTurma,
    ...modalidades.filter(
      (modalidade) => modalidade.nomeModalidade !== turma.modalidade
    ),
  ];

  const categoriaDaTurma = categorias.find(
    (categoria) => categoria.categoria === turma.categoria
  );

  // Crie um novo array de categorias com a categoria da turma no início
  const categoriasWithTurmaFirst = [
    categoriaDaTurma,
    ...categorias.filter(
      (categoria) => categoria.categoria !== turma.categoria
    ),
  ];

  // Encontre o professor da turma com base no ID do professor da turma
  const professorDaTurma = professores.find(
    (professor) => professor.nome === turma.professor
  );

  // Crie um novo array de professores com o professor da turma no início
  const professoresWithTurmaFirst = [
    professorDaTurma,
    ...professores.filter((professor) => professor.nome !== turma.professor),
  ];

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
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
          <h1 className="leading-[ 37.57px] mr-auto pl-3 font-Raleway text-3xl font-semibold text-green-bg dark:text-white-default">
            Criar turma
          </h1>
        </div>
        <h2 className="mt-4 px-4 font-Raleway text-2xl font-semibold leading-9 text-green-bg dark:text-green-300 lg:w-[505px]">
          Insira as informações necessárias para a formação de uma turma:
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="nome_aluno"
              className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Nome da turma{" "}
            </label>

            <input
              {...register("nomeTurma")}
              type="text"
              id="nome_aluno"
              placeholder="Insira o nome da turma"
              className={`border-2 ${
                errors.nomeTurma
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.nomeTurma?.message}
            </p>
          </div>
          <div className="my-4 flex w-full flex-col pl-4">
            <label
              htmlFor="modalidadde_id"
              className=" font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Modalidade{" "}
            </label>
            <select
              className="focus:shadow-outline h-14 w-60 border-2 border-green-300 bg-white-default pl-4 align-bottom font-Quicksand text-xl font-medium text-textGray hover:border-gray-500"
              {...register("modalidade")}
            >
              {modalidadesWithTurmaFirst.map((modalidade) => (
                <option
                  key={modalidade?.id}
                  value={modalidade?.id}
                  className="h-14 w-80 rounded-sm border-2 border-green-200 pl-4 font-Quicksand text-base font-medium text-textGray focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  {modalidade?.nomeModalidade}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 flex w-full flex-col pl-4">
            <label
              htmlFor="categoria_id"
              className=" font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Categoria{" "}
            </label>
            <select
              className="focus:shadow-outline h-14 w-60 border-2 border-green-300 bg-white-default pl-4 align-bottom font-Quicksand text-xl font-medium text-textGray hover:border-gray-500"
              {...register("categoria")}
            >
              {categoriasWithTurmaFirst.map((categoria) => (
                <option
                  key={categoria?.id}
                  value={categoria?.id}
                  className="h-14 w-80 rounded-sm border-2 border-green-200 pl-4 font-Quicksand text-base font-medium text-textGray focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  {categoria?.categoria}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 flex w-full flex-col pl-4">
            <label
              htmlFor="professor_id"
              className=" font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Professor{" "}
            </label>
            <select
              className="focus:shadow-outline h-14 w-60 border-2 border-green-300 bg-white-default pl-4 align-bottom font-Quicksand text-xl font-medium text-textGray hover:border-gray-500"
              {...register("professor")}
            >
              {professoresWithTurmaFirst.map((professor) => (
                <option
                  key={professor?.id}
                  value={professor?.id}
                  className="h-14 w-80 rounded-sm border-2 border-green-200 pl-4 font-Quicksand text-base font-medium text-textGray focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  {professor?.nome}
                </option>
              ))}
            </select>
          </div>
          <span className="ml-4 mt-4 h-full w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300">
            Informe o tipo da turma
          </span>
          <div className="w-full pl-4">
            <div className="mb-4 mt-8 flex items-center">
              <input
                type="radio"
                name="genero"
                value="Masculino"
                checked={
                  genero === "Masculino" ||
                  turma.genero.toString() === "Masculino"
                }
                onChange={handleGeneroChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <button
                type="button"
                className="ml-2 font-Raleway text-base font-medium text-textGray "
                onClick={() => handleButtonClicked("Masculino")}
              >
                Masculino
              </button>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="radio"
                name="genero"
                value="Feminino"
                checked={
                  genero === "Feminino" ||
                  turma.genero.toString() === "Feminino"
                }
                onChange={handleGeneroChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <button
                type="button"
                className="ml-2 font-Raleway text-base font-medium text-textGray "
                onClick={() => handleButtonClicked("Feminino")}
              >
                Feminino
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="genero"
                value="Misto"
                checked={
                  genero === "Misto" || turma.genero.toString() === "Misto"
                }
                onChange={handleGeneroChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />

              <button
                type="button"
                className="ml-2 font-Raleway text-base font-medium text-textGray "
                onClick={() => handleButtonClicked("Misto")}
              >
                Misto
              </button>
            </div>
            {errorGenero && (
              <p className="mt-2 pl-6 text-base font-medium text-red-500">
                Escolha uma das opções
              </p>
            )}
          </div>
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="vagas"
              className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Vagas{" "}
            </label>

            <input
              {...register("vagas")}
              type="text"
              name="vagas"
              value={turma.vagas}
              placeholder="Ex: 20"
              className={`border-2 ${
                errors.vagas
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-60 rounded-lg pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            {errors?.vagas && (
              <p className="mt-2 pl-6 text-base font-medium text-red-500">
                {errors.vagas?.message}
              </p>
            )}
          </div>

          <span className="ml-4 mt-4 h-full w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300">
            Informe um turno para a turma
          </span>
          <div className="w-full pl-4">
            <div className="mb-4 mt-8 flex items-center">
              <input
                type="radio"
                name="turno"
                value="Matutino"
                checked={
                  turno === "Matutino" || turma.turno.toString() === "Matutino"
                }
                onChange={handleTurnoChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <button
                type="button"
                className="ml-2 font-Raleway text-base font-medium text-textGray "
                onClick={() => handleButtonClicked("Matutino")}
              >
                Matutino
              </button>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="radio"
                name="turno"
                value="Vespertino"
                checked={
                  turno === "Vespertino" ||
                  turma.turno.toString() === "Vespertino"
                }
                onChange={handleTurnoChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <button
                type="button"
                className="ml-2 font-Raleway text-base font-medium text-textGray "
                onClick={() => handleButtonClicked("Vespertino")}
              >
                Vespertino
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="turno"
                value="Noturno"
                checked={
                  turno === "Noturno" || turma.turno.toString() === "Noturno"
                }
                onChange={handleTurnoChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />

              <button
                type="button"
                className="ml-2 font-Raleway text-base font-medium text-textGray "
                onClick={() => handleButtonClicked("Noturno")}
              >
                Noturno
              </button>
            </div>
            {errorTurno && (
              <p className="mt-2 pl-6 text-base font-medium text-red-500">
                Escolha uma das opções
              </p>
            )}
          </div>
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="horaInicial"
              className="w-full font-Raleway text-lg font-medium text-textGray dark:text-gray-300"
            >
              Que horário deseja iniciar?{" "}
            </label>

            <input
              {...register("horaInicial")}
              type="text" // Alterado para "text"
              name="horaInicial"
              placeholder="06:30"
              value={horaInicio}
              onChange={horaInicial}
              className="text-white ml-2 h-14 w-[5.5rem] rounded-lg border-2 border-green-200 pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
            />
            {errors.horaInicial &&
              (horaInicio.length === 0 || horaInicio.length < 5) && (
                <p className="mt-2 pl-6 text-base font-medium text-red-500">
                  {errors.horaInicial.message}
                </p>
              )}
          </div>
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="horaFinal"
              className="w-full font-Raleway text-lg font-medium text-textGray dark:text-gray-300"
            >
              Que horário deseja encerrar?{" "}
            </label>

            <input
              type="text"
              {...register("horaFinal")}
              value={horaFim}
              onChange={(e) => horaFinal(e)}
              name="horaFinal"
              placeholder="17:30"
              className="text-white ml-2 h-14 w-[5.5rem] rounded-lg border-2 border-green-200 pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
            />
            {errors.horaFinal &&
              (horaFim.length === 0 || horaFim.length < 5) && (
                <p className="mt-2 pl-6 text-base font-medium text-red-500">
                  {errors.horaFinal.message}
                </p>
              )}
          </div>

          <span className="ml-4 mt-8 h-full w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300">
            Informe os dias da semana
          </span>
          <div className="w-full pl-6">
            <div className="mb-4 mt-2 flex items-center">
              <input
                {...register("dias")}
                id="segunda-feira "
                type="checkbox"
                name="dias"
                checked={searchDay("segunda-feira ")}
                value="segunda-feira "
                className="h-5 w-5 rounded  border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 font-Raleway text-base font-medium text-textGray dark:text-gray-300"
              >
                Segunda{" "}
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                {...register("dias")}
                id="terça-feira "
                type="checkbox"
                value="terça-feira "
                checked={searchDay("terça-feira ")}
                name="dias"
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 font-Raleway text-base font-medium text-textGray dark:text-gray-300"
              >
                Terça{" "}
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                {...register("dias")}
                id="quarta-feira "
                checked={searchDay("quarta-feira ")}
                type="checkbox"
                value="quarta-feira "
                name="dias"
                className="h-5 w-5 rounded  border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 font-Raleway text-base font-medium text-textGray dark:text-gray-300"
              >
                Quarta{" "}
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                {...register("dias")}
                id="quinta-feira "
                type="checkbox"
                checked={searchDay("quinta-feira ")}
                name="dias"
                value="quinta-feira "
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 font-Raleway text-base font-medium text-textGray dark:text-gray-300"
              >
                Quinta{" "}
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                {...register("dias")}
                id="sexta-feira"
                checked={searchDay("sexta-feira")}
                type="checkbox"
                name="dias"
                value="sexta-feira"
                className="h-5 w-5 rounded border-2  accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 font-Raleway text-base font-medium text-textGray dark:text-gray-300"
              >
                Sexta{" "}
              </label>
            </div>
            {errors.dias && (
              <p className="mt-2 pl-6 text-base font-medium text-red-500">
                {errors.dias.type === "min"
                  ? "Selecione pelo menos uma opção"
                  : "Selecione uma opção"}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mb-4 ml-4 mt-12 h-14 w-[11.375rem] bg-green-200 font-Montserrat text-base font-bold text-white-default"
          >
            CRIAR TURMA
          </button>
        </form>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["sig-token"];
  const { id } = context.query;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const response = await fetch(`${url}/v1/listarCategorias/`);
  const response1 = await fetch(`${url}/v1/listarModalidades`);
  const response2 = await fetch(`${url}/v1/listarProfessores/`);
  const response3 = await fetch(`${url}/v1/gerenciarTurmaId/${id}/`);
  const turma = await response3.json();
  const categorias = await response.json();
  const modalidades = await response1.json();
  const professores = await response2.json();
  return {
    props: {
      categorias,
      modalidades,
      professores,
      turma,
    },
  };
};
