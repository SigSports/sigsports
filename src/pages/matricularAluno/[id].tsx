/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { GetServerSideProps } from "next";
import React from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import Link from "next/link";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { Quicksand } from "next/font/google";
import Layout from "@/components/Layout";

const quicksand = Quicksand({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

export type TFormData = {
  nomeAluno: string;
  matricula: string;
  modalidade: string;
  tipoCategoria: number;
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

export default function Index() {
  const router = useRouter();
  const id = router.query?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  const createSolicitation = useMutation(async (data: TFormData) => {
    const response = await fetch(
      `http://40.76.188.129:8008/api/aluno/matricula/${id}`,
      {
        method: "POST",
        body: data as any,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
      }
    );

    const json = await response.json();
    return json;
  });

  const onSubmit = async (data: TFormData | any) => {
    // Convertendo a categoria para inteiro
    const data1: any = JSON.stringify({
      nomeAluno: data.nomeAluno,
      matricula: data.matricula,
      contato: data.contato,
      curso: data.curso,
    });

    const response = await createSolicitation.mutateAsync(data1);
    if (response.id) {
      toast.success("Matrícula criada com sucesso", {
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
        router.push(`/visualizarTurma/${id}`);
      }, 3000); // 20 segundos
    } else {
      toast.error("Erro na matricula, corriga os campos", {
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
        <div className="mt-4 flex h-full w-full items-center md:mt-16">
          <Link
            href={`/visualizarTurma/${id}`}
            className="mr-6 hover:cursor-pointer"
          >
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
            className={`${quicksand.className} mr-auto pl-1 font-Raleway text-3xl  font-semibold leading-10 text-green-bg`}
          >
            Matricular aluno(a){" "}
          </h1>
        </div>

        <h2
          className={`${quicksand.className} mt-4 px-4 text-sm font-semibold leading-9 text-green-bg dark:text-green-300 lg:w-[505px]`}
        >
          Insira as informações necessárias para matricular o(a) aluno(a):{" "}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="nomeAluno"
              className={`${quicksand.className} ml-2 w-full font-Raleway text-base font-medium text-green-bg`}
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
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium italic placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.nomeAluno?.message}
            </p>
          </div>
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              htmlFor="curso"
              className={`${quicksand.className}  ml-2 w-full font-Raleway text-base font-medium text-green-bg`}
            >
              Curso
            </label>

            <input
              type="text"
              id="curso"
              {...register("curso")}
              placeholder="Insira o nome do aluno(a)"
              className={`border-2 ${
                errors.curso
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium italic placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.curso?.message}
            </p>
          </div>
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              className={`${quicksand.className} ml-2 w-full font-Raleway text-base font-medium text-green-bg`}
            >
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
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium italic placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.matricula?.message}
            </p>
          </div>
          <div className="my-6 flex w-full flex-col pl-4">
            <label
              className={`${quicksand.className} ml-2 w-full font-Raleway text-base font-medium text-green-bg`}
            >
              Número para contato
            </label>

            <InputMask
              mask="(99) 99999-9999"
              {...register("contato")}
              placeholder="Insira o contato do aluno(a)"
              className={`border-2 ${
                errors.contato
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium italic placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.contato?.message}
            </p>
          </div>
          <div className="my-4 w-full pl-6">
            <input
              type="submit"
              value="Matricular"
              className={`${quicksand.className} h-14 w-36 rounded-md bg-green-200 font-Montserrat text-base font-bold text-white-default transition-colors duration-300 hover:cursor-pointer hover:bg-green-300 hover:text-white-default focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-100`}
            />
          </div>
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
  return {
    props: {}, // Return an empty object
  };
};
