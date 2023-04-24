import React from "react";
import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { TCategory, TModality, TFormData } from "./type";

import { toast } from "react-toastify";
import { GetServerSideProps } from "next";

const url = "https://sigsport.pythonanywhere.com/api/";
const schema = yup
  .object()
  .shape({
    nomeAluno: yup
      .string()
      .required("Digite o nome do aluno")
      .min(3, "Nome muito curto"),
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

export default function index({
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
    resolver: yupResolver(schema),
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
      tipoCategoria: parseInt(data.categoria),
    });

    const response = await createSolicitation.mutateAsync(data1);
    if (response.id) {
      toast.success("Solicitação criada com sucesso", {
        position: "top-right",
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
      <div className="flex pl-4 lg:pl-12 flex-col h-full items-center lg:items-start w-full">
        <h1 className="text-green-bg mt-4 md:mt-16 dark:text-white-default mr-auto pl-3  font-Raleway text-3xl font-semibold leading-10 mb">
          Solicitar Matrícula para aluno
        </h1>

        <h2 className="mt-4 text-2xl lg:w-[505px] dark:text-green-300 text-green-bg font-semibold font-Raleway leading-9 px-4">
          Insira os detalhes abaixo para solicitar a matrícula de um aluno:
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full pl-4 my-6 flex flex-col">
            <label className="w-full ml-2 font-medium font-Raleway text-textGray text-base dark:text-gray-300">
              Nome completo
            </label>

            <input
              type="text"
              {...register("nomeAluno")}
              placeholder="Insira o nome do aluno(a)"
              className={`border-2 ${
                errors.nomeAluno
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:ring-green-100 focus:border-transparent"
              } h-14 w-80 placeholder:text-textGray text-white rounded-lg pl-4 focus:outline-none focus:ring-2 focus:border-transparent font-medium text-base font-Montserrat`}
            />
            <p className="text-red-500 mt-2 text-base font-medium pl-6">
              {errors.nomeAluno?.message}
            </p>
          </div>
          <div className="w-full pl-4 my-6 flex flex-col">
            <label className="w-full ml-2 font-medium font-Raleway text-textGray text-base dark:text-gray-300">
              Matricula{" "}
            </label>

            <input
              type="string"
              {...register("matricula")}
              placeholder="Insira a matrícula do aluno(a)"
              className={`border-2 ${
                errors.matricula
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:ring-green-100 focus:border-transparent"
              } h-14 w-80 placeholder:text-textGray text-white rounded-lg pl-4 focus:outline-none focus:ring-2 focus:border-transparent font-medium text-base font-Montserrat`}
            />
            <p className="text-red-500 mt-2 text-base font-medium pl-6">
              {errors.matricula?.message}
            </p>
          </div>
          <div className="w-full pl-4 my-4 flex flex-col">
            <label className=" font-medium font-Raleway text-textGray text-base dark:text-gray-300">
              Modalidade desejada
            </label>
            <select
              className="w-80 h-14 bg-white-default border-2 rounded-lg
                border-green-300 align-bottom hover:border-gray-500 pl-4 text-textGray  focus:shadow-outline font-Quicksand font-medium	text-xl	"
              name="modalidade_id"
            >
              {modalidades?.map((modalidade) => {
                return (
                  <option
                    {...register("modalidade")}
                    value={modalidade?.id}
                    key={modalidade?.id}
                    className="border-2 border-green-200 h-14 w-80
                               text-textGray
                               rounded-sm pl-4 focus:outline-none focus:ring-2
                              focus:ring-green-100 focus:border-transparent font-medium text-base font-Montserrat"
                  >
                    {modalidade?.nomeModalidade}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-full pl-6">
            <div className="flex flex-col mb-2 ">
              <div className="flex flex-col">
                {categorias?.map((categoria) => {
                  return (
                    <div key={categoria.id} className="flex mb-4">
                      <input
                        {...register("categoria")}
                        type="radio"
                        name="categoria_id"
                        value={categoria.id}
                        onChange={handleCategoriaChange}
                        className="h-5 w-5 dark:accent-green-300 focus:accent-green-300 outline-green-300  accent-green-300 rounded border-2 hover:cursor-pointer"
                      />
                      <label className="ml-2 block text-base font-medium text-textGray font-Raleway ">
                        {categoria.categoria}
                      </label>
                    </div>
                  );
                })}
                {errors?.categoria && (
                  <p className="text-red-500 mt-2 text-base font-medium">
                    {errors.categoria?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full pl-6 my-4">
            <a href="">
              <input
                type="submit"
                value="Solicitar"
                className="h-14 w-36 rounded-sm bg-green-300 font-bold font-Montserrat text-base text-white-default hover:bg-green-200 hover:text-white-default hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent"
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
