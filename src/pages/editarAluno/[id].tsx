/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import Link from "next/link";
import Layout from "@/components/Layout";

export type AlunoType = {
  id?: number;
  nomeAluno: string;
  matricula: string;
  contato: string;
  curso: string;
};

const schema = yup
  .object()
  .shape({
    nomeAluno: yup
      .string()
      .required("Digite o nome do aluno")
      .min(20, "Nome muito curto"),
    curso: yup.string().required("Digite o nome do curso"),
    matricula: yup
      .string()
      .typeError("Digite uma matricula válida")
      .min(10, "Matrícula inválida")
      .max(14, "Matrícula inválida"),
    contato: yup
      .string()
      .matches(
        /^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/,
        "Digite um número de contato válido"
      )
      .required("O contato é obrigatório"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const editarAluno: NextPage<{ aluno: AlunoType }> = ({ aluno }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const updateSolicitation = async (data: AlunoType) => {
    try {
      const response = await fetch(
        `http://18.211.33.55/api/v1/matriculas/${aluno.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        return await response.json();
      }
      throw new Error("Erro na requisição PATCH");
    } catch (error) {
      throw new Error(`Erro na requisição PUT`);
    }
  };

  const onSubmit = async (data: AlunoType | any) => {
    try {
      const data1: AlunoType = {
        nomeAluno: data.nomeAluno,
        matricula: data.matricula,
        contato: data.contato,
        curso: data.curso,
      };

      const response = await updateSolicitation(data1);
      if (response.id) {
        toast.success("Dados atualizados com sucesso", {
          // Configurações da notificação de sucesso
        });
      } else {
        throw new Error("Erro em atualizar os dados, corrija os campos");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <h1 className="mb mr-auto pl-3 font-Raleway text-3xl  font-semibold leading-10 text-green-bg dark:text-white-default">
            Editar Aluno (a){" "}
          </h1>
        </div>
        <h2 className="mt-4 px-4 font-Raleway text-2xl font-semibold leading-9 text-green-bg dark:text-green-300 lg:w-[505px]">
          Insira as informações necessárias para editar o(a) aluno(a) nesta
          turma:{" "}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="nomeAluno"
              className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Nome completo{}
            </label>

            <input
              type="text"
              id="nomeAluno"
              {...register("nomeAluno")}
              placeholder="Insira o nome do aluno(a)"
              defaultValue={aluno.nomeAluno}
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
            <label
              htmlFor="curso"
              className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Curso {}
            </label>

            <input
              type="text"
              id="curso"
              defaultValue={aluno.curso}
              {...register("curso")}
              placeholder="Insira o nome do aluno(a)"
              className={`border-2 ${
                errors.curso
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.curso?.message}
            </p>
          </div>
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="matricula"
              className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Matricula{}
            </label>

            <input
              type="string"
              defaultValue={aluno.matricula}
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
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="contato"
              className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300"
            >
              Número para contato{}
            </label>

            <InputMask
              mask="(99) 99999-9999"
              {...register("contato")}
              defaultValue={aluno.contato}
              placeholder="Insira o contato do aluno(a)"
              className={`border-2 ${
                errors.contato
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.contato?.message}
            </p>
          </div>
          <div className="my-4 w-full pl-6">
            <input
              type="submit"
              value="Matricular"
              className="h-14 w-36 rounded-sm bg-green-200 font-Montserrat text-base font-bold text-white-default transition-colors duration-300 hover:cursor-pointer hover:bg-green-300 hover:text-white-default focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default editarAluno;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["sig-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { id } = context.query;
  const response = await fetch(`http://18.211.33.55/api/v1/matriculas/${id}`);
  const aluno = await response.json();
  return {
    props: {
      aluno,
    },
  };
};
