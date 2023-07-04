import Layout from "@/components/Layout";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Router from "next/router";
import { useState } from "react";
const url = "http://3.128.249.166:8000/api/itens";

type ItemType = {
  id: number;
  name: string;
  description: string;
};

const editarItem: NextPage<{ item: ItemType }> = ({ item }) => {
  const router = useRouter();
  const id = router.query?.id;
  const [name, setName] = useState<string>(item.name);
  const [description, setDescription] = useState<string>(item.description);

  function handleSubmit() {
    fetch(`${url}/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, description }), // Envie os dados no corpo da requisição como uma string JSON
    })
      .then((response) => {
        if (response.status === 200) {
          Router.push("/itens");
        }
      })

      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex h-full w-full flex-wrap items-center justify-around md:mt-16">
          <h1 className="mr-auto pl-3 font-Montserrat text-[2.5rem] font-bold leading-[37.57px] text-black  ">
            INSERIR ITEM
          </h1>
        </div>
        <form className="mr-auto mt-28 flex h-full flex-col gap-y-4 pl-4 font-Montserrat text-base font-bold leading-5 text-black">
          <div className="flex flex-col">
            <label htmlFor="nome">Nome</label>{" "}
            <input
              type="text"
              name="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-8 w-80 rounded border border-[#CCC] bg-white-default pl-4 md:w-[25.25rem]"
            />
          </div>
          <div className="flex flex-col">
            {" "}
            <label htmlFor="descricao">Descrição</label>{" "}
            <textarea
              name="descricao"
              className="h-[8.25rem] w-80 rounded border border-[#CCC] bg-white-default px-4 pt-2 md:w-[25.125rem]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4 mt-5 flex flex-col">
            <button
              type="button"
              onClick={handleSubmit}
              className="mb-8 h-9 w-16 rounded-[4px] border border-green-500 bg-yellow-400 font-Montserrat text-sm text-white-default hover:cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default editarItem;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await fetch(`${url}/${id}`);
  const item = await response.json();
  return {
    props: {
      item,
    },
  };
};
