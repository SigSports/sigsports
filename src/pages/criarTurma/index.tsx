/* eslint-disable import/no-extraneous-dependencies */
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { mask } from "remask";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { useMutation } from "react-query";
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
    horaFinal: yup.string().required("Digite um horário válido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function CriarTurma({
  categorias,
  modalidades,
  professores,
}: {
  categorias: Tcategoria[];
  modalidades: TModalidade[];
  professores: TProfessor[];
}) {
  const [errorTurno, setErrrorTurno] = useState(false);
  const [turno, setTurno] = useState<string>("");
  const [horaInicio, setHoraInicio] = useState<string>("");
  const [horaFim, setHoraFim] = useState<string>("");
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const createSolicitation = useMutation(async (data: TFormData) => {
    const response = await fetch(`${url}/v1/listarturmas/`, {
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
    } else {
      setErrrorTurno(false);
      const dias = ["seg", "ter", "qua"];
      const diasString = dias.join(",");
      const data1: any = JSON.stringify({
        modalidade: data.modalidade,
        categoria: data.categoria,
        vagas: data.vagas,
        professor: data.professor,
        turno,
        dias: diasString,
        horarioInicial: data.horaInicial,
        horarioFinal: data.horaFinal,
      });

      const response = await createSolicitation.mutateAsync(data1);

      if (response.modalidade) {
        toast.success("Turma Criada com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Erro ao criar turma, corriga os campos", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
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

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <h1 className="leading-[ 37.57px] mr-auto mt-4  pl-3 font-Raleway text-3xl font-semibold text-green-bg dark:text-white-default md:mt-16">
          Criar turma
        </h1>
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
              className="focus:shadow-outline h-14 w-60 border-2
                border-green-300 bg-white-default pl-4 align-bottom font-Quicksand  text-xl font-medium text-textGray	hover:border-gray-500	"
              name="modalidade_id"
            >
              {modalidades.map((modalidade) => (
                <option
                  {...register("modalidade")}
                  key={modalidade.id}
                  value={modalidade.id}
                  className="h-14 w-80 rounded-sm border-2
                      border-green-200 pl-4
                      font-Quicksand text-base font-medium text-textGray
                      focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  {modalidade.nomeModalidade}
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
              className="focus:shadow-outline h-14 w-60 border-2
                border-green-300 bg-white-default pl-4 align-bottom font-Quicksand  text-xl font-medium text-textGray	hover:border-gray-500	"
              name="modalidade_id"
            >
              {categorias.map((categoria) => (
                <option
                  {...register("categoria")}
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
          <div className="my-4 flex w-full flex-col pl-4">
            <label
              htmlFor="professor_id"
              className=" font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Professor{" "}
            </label>
            <select
              className="focus:shadow-outline h-14 w-60 border-2
                border-green-300 bg-white-default pl-4 align-bottom font-Quicksand  text-xl font-medium text-textGray	hover:border-gray-500	"
              name="modalidade_id"
            >
              {professores.map((professor) => (
                <option
                  {...register("professor")}
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
                checked={turno === "Matutino"}
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
                checked={turno === "Vespertino"}
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
                checked={turno === "Noturno"}
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
                id="seg"
                type="checkbox"
                name="dias"
                value="seg "
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
                id="ter"
                type="checkbox"
                value="ter "
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
                id="qua"
                type="checkbox"
                value="qua "
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
                id="qui"
                type="checkbox"
                name="dias"
                value="qui "
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
                id="sex"
                type="checkbox"
                name="dias"
                value="sex"
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

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${url}/v1/listarCaterogias`);
  const response1 = await fetch(`${url}/v1/listarModalidades`);
  const response2 = await fetch(`${url}/v1/listarprofessores/`);
  const categorias = await response.json();
  const modalidades = await response1.json();
  const professores = await response2.json();
  return {
    props: {
      categorias,
      modalidades,
      professores,
    },
  };
};
