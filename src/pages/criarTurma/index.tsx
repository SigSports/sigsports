/* eslint-disable import/no-extraneous-dependencies */
import { useState, ChangeEvent } from "react";
import { Resolver, useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { mask } from "remask";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Link from "next/link";
import { Quicksand } from "next/font/google";
import { api } from "@/services/api";
import Layout from "@/components/Layout";
import {
  TFormData,
  TModalidade,
  TProfessor,
  Tcategoria,
} from "@/utils/typeTurma";

const quicksand = Quicksand({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

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
      .of(yup.string())
      .min(1, "Selecione pelo menos uma opção")
      .required("Selecione uma opção"),
    horaInicial: yup.string().required("Digite um horário válido"),
    modalidade: yup.number(),
    categoria: yup.number(),
    professor: yup.number(),
    horaFinal: yup.string().required("Digite um horário válido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

//

export default function CriarTurma({
  categorias,
  modalidades,
  professores,
}: {
  categorias: Tcategoria[];
  modalidades: TModalidade[];
  professores: TProfessor[];
}) {
  const router = useRouter();
  const [errorTurno, setErrrorTurno] = useState(false);
  const [turno, setTurno] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [errorGenero, setErrorGenero] = useState(false);
  const [horaInicio, setHoraInicio] = useState<string>("");
  const [horaFim, setHoraFim] = useState<string>("");
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
  });
  const createSolicitation = useMutation(async (data: TFormData) => {
    const response = await fetch(`http://40.76.188.129:8008/api/aluno/turma`, {
      method: "POST",
      body: data as any,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });

    const json = await response.json();
    return json;
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
    if (turno === "") {
      setErrrorTurno(true);
    } else if (genero === "") {
      setErrorGenero(true);
    } else {
      setErrrorTurno(false);

      const diasString = data.dias.join(",");
      const data1: any = JSON.stringify({
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
      });

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
        setTimeout(() => {
          // Executar ação após 20 segundos
          // Por exemplo, redirecionar para uma página específica
          router.push("/dashboard");
        }, 3000); // 20 segundos
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
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className=" flex h-full w-full items-center md:mt-16">
          <Link href="/listarTurmas" className="mr-1 hover:cursor-pointer">
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
          <h1
            className={`${quicksand.className} mr-auto pl-3 text-3xl font-semibold  text-green-bg `}
          >
            Criar turma
          </h1>
        </div>
        <h2
          className={`${quicksand.className} mt-4 text-sm text-green-bg dark:text-green-300 lg:w-[full]`}
        >
          Insira as informações necessárias para a formação de uma turma:
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-3 flex w-full flex-col">
            <label
              htmlFor="nome_aluno"
              className={`${quicksand.className}  w-full text-base font-medium text-green-bg`}
            >
              <b>Nome da turma</b>{" "}
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
              } ${
                quicksand.className
              } text-white h-10 w-80 rounded-md pl-4 text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.nomeTurma?.message}
            </p>
          </div>
          <div className=" flex w-full flex-col ">
            <label
              htmlFor="modalidadde_id"
              className={` ${quicksand.className}  text-base font-medium text-green-bg`}
            >
              <b>Modalidade</b>{" "}
            </label>
            <select
              className={`${quicksand.className} h-10 w-80 rounded-md border-2
    border-green-200 bg-white-default pl-4 align-bottom font-medium text-textGray hover:ring-green-100 focus:ring-2`}
              {...register("modalidade")} // Atualize o nome do campo para "modalidade_id"
            >
              {modalidades.map((modalidade) => (
                <option
                  key={modalidade.id}
                  value={modalidade.id}
                  className="h-14 w-80 rounded-sm border-2
        border-green-200 pl-4 font-Quicksand text-base font-medium text-textGray
        focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  {modalidade.nomeModalidade}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 flex w-full flex-col ">
            <label
              htmlFor="categoria_id"
              className={`${quicksand.className} text-base font-medium text-green-bg`}
            >
              <b>Categoria</b>{" "}
            </label>
            <select
              className={`${quicksand.className} h-10 w-80 rounded-md border-2
              border-green-200 bg-white-default pl-4 align-bottom font-medium text-textGray hover:ring-green-100 focus:ring-2`}
              {...register("categoria")}
            >
              {categorias.map((categoria) => (
                <option
                  key={categoria.id}
                  value={categoria.id}
                  className="h-14 w-80 rounded-sm border-2
                      border-green-200 pl-4
                      font-Quicksand text-base font-medium text-textGray
                      focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  {categoria.categoria}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 flex w-full flex-col">
            <label
              htmlFor="professor_id"
              className={` ${quicksand.className} text-base font-medium text-green-bg`}
            >
              <b>Professor</b>{" "}
            </label>
            <select
              className={`${quicksand.className} h-10 w-80 rounded-md border-2
              border-green-200 bg-white-default pl-4 align-bottom font-medium text-textGray hover:ring-green-100 focus:ring-2`}
              {...register("professor")}
            >
              {professores.map((professor) => (
                <option
                  key={professor.id}
                  value={professor.id}
                  className="h-14 w-80 rounded-sm border-2
                      border-green-200 pl-4
                      font-Quicksand text-base font-medium text-textGray
                      focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  {professor.nome}
                </option>
              ))}
            </select>
          </div>
          <span
            className={`${quicksand.className} mt-4 h-full w-full font-Raleway text-base font-extrabold text-green-bg`}
          >
            <b> Informe o tipo da turma: </b>
          </span>
          <div className="w-full pl-1">
            <div className="mb-4 mt-3 flex items-center">
              <input
                type="radio"
                name="genero"
                value="Masculino"
                checked={genero === "Masculino"}
                onChange={handleGeneroChange}
                className={`${quicksand.className} h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300`}
              />
              <button
                type="button"
                className={`${quicksand.className} ml-2 text-base font-medium text-green-bg`}
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
                checked={genero === "Feminino"}
                onChange={handleGeneroChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <button
                type="button"
                className={`${quicksand.className} ml-2 text-base font-medium text-green-bg`}
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
                checked={genero === "Misto"}
                onChange={handleGeneroChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />

              <button
                type="button"
                className={`${quicksand.className} ml-2 text-base font-medium text-green-bg`}
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
          <div className="my-6 flex w-full flex-col">
            <label
              htmlFor="vagas"
              className={`${quicksand.className}  w-full text-base font-medium text-green-bg`}
            >
              <b> Vagas {}</b>
            </label>

            <input
              {...register("vagas")}
              type="number"
              name="vagas"
              placeholder="Ex: 20"
              className={`border-2 ${
                errors.vagas
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } ${
                quicksand.className
              }  text-white h-10 w-80 rounded-lg pl-4 text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            {errors?.vagas && (
              <p className="mt-2 pl-6 text-base font-medium text-red-500">
                {errors.vagas?.message}
              </p>
            )}
          </div>

          <span
            className={`${quicksand.className}  mt-4 h-full w-full text-base font-medium text-green-bg`}
          >
            <b>Informe um turno para a turma: </b>
          </span>
          <div className="w-full pl-1">
            <div className="mb-4 mt-3 flex items-center">
              <input
                type="radio"
                name="turno"
                value="Matutino"
                checked={turno === "Matutino"}
                onChange={handleTurnoChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <button
                type="button"
                className={`${quicksand.className} ml-2 text-base font-medium text-green-bg`}
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
                checked={turno === "Vespertino"}
                onChange={handleTurnoChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <button
                type="button"
                className={`${quicksand.className} ml-2 text-base font-medium text-green-bg`}
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
                checked={turno === "Noturno"}
                onChange={handleTurnoChange}
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />

              <button
                type="button"
                className={`${quicksand.className} ml-2 text-base font-medium text-green-bg`}
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
          <div className="my-6 flex w-full flex-col">
            <label
              htmlFor="horaInicial"
              className={`${quicksand.className} w-full  text-lg font-medium text-green-bg`}
            >
              <b> Que horário deseja iniciar?</b>{" "}
            </label>

            <input
              {...register("horaInicial")}
              type="text" // Alterado para "text"
              name="horaInicial"
              placeholder="06:30"
              value={horaInicio}
              onChange={horaInicial}
              className={`border-2 ${
                errors.horaInicial
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              }${
                quicksand.className
              } text-white h-10 w-80 rounded-md pl-4 text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            {errors.horaInicial &&
              (horaInicio.length === 0 || horaInicio.length < 5) && (
                <p className="mt-2 pl-6 text-base font-medium text-red-500">
                  {errors.horaInicial.message}
                </p>
              )}
          </div>
          <div className="my-6 flex w-full flex-col ">
            <label
              htmlFor="horaFinal"
              className={`${quicksand.className} w-full  text-lg font-medium text-green-bg`}
            >
              <b>Que horário deseja encerrar?</b>{" "}
            </label>

            <input
              type="text"
              {...register("horaFinal")}
              value={horaFim}
              onChange={(e) => horaFinal(e)}
              name="horaFinal"
              placeholder="17:30"
              className={`border-2 ${
                errors.horaFinal
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              }${
                quicksand.className
              } text-white h-10 w-80 rounded-md pl-4 text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            {errors.horaFinal &&
              (horaFim.length === 0 || horaFim.length < 5) && (
                <p className="mt-2 pl-6 text-base font-medium text-red-500">
                  {errors.horaFinal.message}
                </p>
              )}
          </div>

          <span
            className={`${quicksand.className} mt-8 h-full w-full font-Raleway text-base font-medium text-green-bg`}
          >
            <b>Informe os dias da semana:</b>
          </span>
          <div className="w-full pl-1">
            <div className="mb-4 mt-2 flex items-center">
              <input
                {...register("dias")}
                id="segunda-feira "
                type="checkbox"
                name="dias"
                value="segunda-feira "
                className={`${quicksand.className} h-5 w-5 rounded  border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300`}
              />
              <label
                htmlFor="default-checkbox"
                className={`${quicksand.className} ml-2 font-Raleway text-base font-medium text-green-bg`}
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
                name="dias"
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className={`${quicksand.className} ml-2 font-Raleway text-base font-medium text-green-bg`}
              >
                Terça{" "}
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                {...register("dias")}
                id="quarta-feira "
                type="checkbox"
                value="quarta-feira "
                name="dias"
                className="h-5 w-5 rounded  border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className={`${quicksand.className} ml-2 font-Raleway text-base font-medium text-green-bg`}
              >
                Quarta{" "}
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                {...register("dias")}
                id="quinta-feira "
                type="checkbox"
                name="dias"
                value="quinta-feira "
                className="h-5 w-5 rounded border-2 accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className={`${quicksand.className} ml-2 font-Raleway text-base font-medium text-green-bg`}
              >
                Quinta{" "}
              </label>
            </div>
            <div className="mb-4 flex items-center">
              <input
                {...register("dias")}
                id="sexta-feira"
                type="checkbox"
                name="dias"
                value="sexta-feira"
                className="h-5 w-5 rounded border-2  accent-green-300 outline-green-300 focus:accent-green-300 dark:accent-green-300"
              />
              <label
                htmlFor="default-checkbox"
                className={`${quicksand.className} ml-2 font-Raleway text-base font-medium text-green-bg`}
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
            className={`${quicksand.className} mb-4  mt-6 h-14 w-80 rounded-lg bg-gradient-to-br from-green-200 to-green-500 text-base font-bold text-white-default`}
          >
            <b> CRIAR TURMA </b>
          </button>
        </form>
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
  const response = await api.get("esporte/listaCategorias");
  const response1 = await api.get("esporte/listaModalidades");
  const response2 = await api.get("administracao/professores");
  const categorias = await response.data;
  const modalidades = await response1.data;
  const professores = await response2.data;
  return {
    props: {
      categorias,
      modalidades,
      professores,
    },
  };
};
