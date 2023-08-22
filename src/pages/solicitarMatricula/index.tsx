/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import { TCategory, TFormData, TModality } from "../../utils/typeSolicitar";

const url = "https://sigsport.pythonanywhere.com/api/";
const schema = yup
  .object()
  .shape({
    nomeAluno: yup
      .string()
      .required("Digite o nome do aluno")
      .min(20, "Nome muito curto"),
    matricula: yup
      .string()
      .typeError("Digite uma matricula válida")
      .min(10, "Matrícula inválida")
      .max(14, "Matrícula inválida"),
    modalidade: yup.number(),
    categoria: yup.string().required("Selecione uma opção"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Index({
  categorias,
  modalidades,
}: {
  categorias: TCategory[];
  modalidades: TModality[];
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  const createSolicitation = useMutation(async (data: TFormData) => {
    const response = await fetch(`${url}v1/`, {
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
  // defina o tipo para o evento
  const handleCategoriaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("categoria", event.target.value);
  };
  const onSubmit = async (data: TFormData | any) => {
    // Convertendo a categoria para inteiro
    const data1: any = JSON.stringify({
      nomeAluno: data.nomeAluno,
      matricula: data.matricula,
      modalidade: data.modalidade,
      tipoCategoria: parseInt(data.categoria, 10),
    });

    const response = await createSolicitation.mutateAsync(data1);
    if (response.id) {
      toast.success("Solicitação criada com sucesso", {
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
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <h1 className="mb mr-auto mt-4 pl-3 font-Raleway text-3xl  font-semibold leading-10 text-green-bg dark:text-white-default md:mt-16">
          Solicitar Matrícula para aluno
        </h1>

        <h2 className="mt-4 px-4 font-Raleway text-2xl font-semibold leading-9 text-green-bg dark:text-green-300 lg:w-[505px]">
          Insira os detalhes abaixo para solicitar a matrícula de um aluno:
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="nomeAluno"
              className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Nome completo
            </label>

            <input
              type="text"
              id="nomeAluno"
              {...register("nomeAluno")}
              placeholder="Insira o nome do aluno(a)"
              className={`border-2 ${
                errors.nomeAluno
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.nomeAluno?.message}
            </p>
          </div>
          <div className="my-6 flex w-full flex-col pl-4">
            <label className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300">
              Matricula{" "}
            </label>

            <input
              type="string"
              {...register("matricula")}
              placeholder="Insira a matrícula do aluno(a)"
              className={`border-2 ${
                errors.matricula
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.matricula?.message}
            </p>
          </div>
          <div className="my-4 flex w-full flex-col pl-4">
            <label className=" font-Raleway text-base font-medium text-textGray dark:text-gray-300">
              Modalidade desejada
            </label>
            <select
              className="focus:shadow-outline h-14 w-80 rounded-lg border-2
                border-green-300 bg-white-default pl-4 align-bottom font-Quicksand  text-xl font-medium text-textGray	hover:border-gray-500	"
              name="modalidade_id"
            >
              {modalidades?.map((modalidade) => (
                <option
                  {...register("modalidade")}
                  value={modalidade?.id}
                  key={modalidade?.id}
                  className="h-14 w-80 rounded-sm border-2
                               border-green-200
                               pl-4 font-Montserrat text-base font-medium
                              text-textGray focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  {modalidade?.nomeModalidade}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full pl-6">
            <div className="mb-2 flex flex-col ">
              <div className="flex flex-col">
                {categorias?.map((categoria) => (
                  <div key={categoria.id} className="mb-4 flex">
                    <input
                      {...register("categoria")}
                      type="radio"
                      name="categoria_id"
                      value={categoria.id}
                      onChange={handleCategoriaChange}
                      className="h-5 w-5 rounded border-2 accent-green-300  outline-green-300 hover:cursor-pointer focus:accent-green-300 dark:accent-green-300"
                    />
                    <label className="ml-2 block font-Raleway text-base font-medium text-textGray ">
                      {categoria.categoria}
                    </label>
                  </div>
                ))}
                {errors?.categoria && (
                  <p className="mt-2 text-base font-medium text-red-500">
                    {errors.categoria?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="my-4 w-full pl-6">
            <a href="">
              <input
                type="submit"
                value="Solicitar"
                className="h-14 w-36 rounded-sm bg-green-300 font-Montserrat text-base font-bold text-white-default hover:cursor-pointer hover:bg-green-200 hover:text-white-default focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${url}/v1/C1`);
  const response1 = await fetch(`${url}/v1/modalidade`);
  const categorias = await response.json();
  const modalidades = await response1.json();
  return {
    props: {
      categorias,
      modalidades,
    },
  };
};
