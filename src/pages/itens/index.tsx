import React, { useState } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { toast } from "react-toastify";
const url = "http://3.128.249.166:8000/api/itens";

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function index({ itens }: { itens: ItemType[] }) {
  const router = useRouter();
  function handleRedirect(id: number) {
    Router.push(`editarItem/${id}`);
  }

  const deleteItem = (itemId: number) => {
    fetch(`${url}/${itemId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Item excluido com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          const timeout = setTimeout(() => {
            // Executar ação após 20 segundos
            // Por exemplo, redirecionar para uma página específica
            router.reload();
          }, 3000); // 20 segundos

          // Faça algo após a exclusão do item, se necessário
        } else {
          console.error("Erro ao excluir o item:", response.status);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItens, setFilteredItens] = useState<ItemType[]>(itens);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredItens = itens.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItens(filteredItens);
  };

  const handleOrderToggle = () => {
    setAscendingOrder(!ascendingOrder);
    const orderedItens = [...filteredItens].reverse(); // Inverte a ordem da lista filtrada
    setFilteredItens(orderedItens);
  };

  return (
    <Layout>
      <div className="mr-7 flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex h-full w-full flex-wrap items-center justify-around md:mt-16">
          <h1 className="leading-[ 37.57px] mr-auto  pl-3 font-Montserrat text-[1.375rem] font-bold text-black  ">
            LISTA DE ITENS
          </h1>
          <div className="flex flex-col items-center	gap-y-4 md:flex-row md:gap-y-0">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleSearch}
                className="h-9  w-[13.25rem]	rounded-lg border	border-[#E5E5E5] pl-3	font-Montserrat text-[#C4C4C4] placeholder:font-Montserrat placeholder:text-sm placeholder:font-normal placeholder:text-[#C4C4C4]"
              />
              <div className="absolute right-3 top-3">
                <Image
                  src="/search.svg"
                  alt="busca"
                  width={14}
                  height={14}
                  className="cursor-pointer text-gray-400"
                />
              </div>
            </div>
            <Image
              src="/filter.svg"
              alt="filtro"
              width={14}
              height={22}
              onClick={handleOrderToggle}
              className="mx-7 cursor-pointer text-gray-400"
            />
            <Link
              href="criarItem"
              className="flex h-11 w-[12.438rem] items-center justify-center	rounded bg-[#FEAF00]	font-Montserrat text-sm	font-medium text-white-default 	"
            >
              Adicionar Item
            </Link>
          </div>
        </div>
        <span className="mb-5 w-full border-b border-[#E5E5E5] text-transparent">
          s
        </span>
        <div className="mb-5 w-full pl-4 font-Montserrat text-xs font-semibold	text-[#ACACAC] md:ml-[6.813rem]	md:w-0 md:pl-0">
          <span className="mr-9 md:mr-[7.563rem]">Nome</span>
          <span>Descrição</span>
        </div>
        <div className="flex w-full flex-col gap-y-2.5">
          {filteredItens.map((item) => {
            return (
              <div
                className=" h-[5.313rem] w-full overflow-x-scroll	rounded-lg border bg-white-default 	md:overflow-auto"
                key={item.id}
              >
                <div className="flex h-full items-center font-Montserrat text-sm font-normal md:ml-[6.813rem]">
                  <div className="flex w-60 justify-between pl-2 md:w-[280px] md:pl-0">
                    <span className="text-center ">{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                  <Image
                    src="/lapis.svg"
                    alt="edit"
                    width={19}
                    height={19}
                    onClick={() => handleRedirect(item.id)}
                    className="ml-auto cursor-pointer text-gray-400"
                  />
                  <Image
                    src="/lixeira.svg"
                    alt="deletar"
                    width={16}
                    height={18}
                    onClick={() => deleteItem(item.id)}
                    className="mx-8 cursor-pointer text-gray-400"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(url);
  const itens = await response.json();
  return {
    props: {
      itens,
    },
  };
};
