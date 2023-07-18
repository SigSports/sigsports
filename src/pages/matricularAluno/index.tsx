/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import Layout from "@/components/Layout";

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
    telefone: yup
      .string()
      .matches(
        /^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/,
        "Digite um número de telefone válido"
      )
      .required("O telefone é obrigatório"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // const createSolicitation = useMutation(async (data: TFormData) => {
  //   const response = await fetch(`${url}v1/`, {
  //     method: "POST",
  //     body: data as any,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     mode: "cors",
  //   });

  //   const json = await response.json();
  //   return json;
  // });
  // defina o tipo para o evento

  // const onSubmit = async (data: TFormData | any) => {
  //   // Convertendo a categoria para inteiro
  //   const data1: any = JSON.stringify({
  //     nomeAluno: data.nomeAluno,
  //     matricula: data.matricula,
  //     modalidade: data.modalidade,
  //     tipoCategoria: parseInt(data.categoria, 10),
  //   });

  //   const response = await createSolicitation.mutateAsync(data1);
  //   if (response.id) {
  //     toast.success("Solicitação criada com sucesso", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   }
  // };
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <h1 className="mb mr-auto mt-4 pl-3 font-Raleway text-3xl  font-semibold leading-10 text-green-bg dark:text-white-default md:mt-16">
          Matricular aluno (a){" "}
        </h1>

        <h2 className="mt-4 px-4 font-Raleway text-2xl font-semibold leading-9 text-green-bg dark:text-green-300 lg:w-[505px]">
          Insira as informações necessárias para matricular o(a) aluno(a) nesta
          turma:{" "}
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
            <label
              htmlFor="curso"
              className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300"
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
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.curso?.message}
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
          <div className="my-6 flex w-full flex-col pl-4">
            <label className="ml-2 w-full font-Raleway text-base font-medium text-textGray dark:text-gray-300">
              Número para contato
            </label>

            <InputMask
              mask="(99) 99999-9999"
              {...register("telefone")}
              placeholder="Insira o telefone do aluno(a)"
              className={`border-2 ${
                errors.telefone
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-200 focus:border-transparent focus:ring-green-100"
              } text-white h-14 w-80 rounded-lg pl-4 font-Montserrat text-base font-medium placeholder:text-textGray focus:border-transparent focus:outline-none focus:ring-2`}
            />
            <p className="mt-2 pl-6 text-base font-medium text-red-500">
              {errors.telefone?.message}
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
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await fetch(`${url}/v1/C1`);
//   const response1 = await fetch(`${url}/v1/modalidade`);
//   const categorias = await response.json();
//   const modalidades = await response1.json();
//   return {
//     props: {
//       categorias,
//       modalidades,
//     },
//   };
