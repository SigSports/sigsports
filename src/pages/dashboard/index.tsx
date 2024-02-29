// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable import/first */
// /* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Quicksand } from "next/font/google";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import { api } from "@/services/api";

const quicksand = Quicksand({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});
// eslint-disable-next-line
const Pie = dynamic(() => import("@ant-design/plots").then(({ Pie }) => Pie), {
  ssr: false,
});
// eslint-disable-next-line
const Column = dynamic(
  // eslint-disable-next-line
  () => import("@ant-design/plots").then(({ Column }) => Column),
  {
    ssr: false,
  }
);

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);

type Turma = {
  id: number;
  nomeTurma: string;
  modalidade: string;
  categoria: string;
  vagas: number;
  professor: string;
  genero: string;
  dias: string;
  horarioInicial: string;
  horarioFinal: string;
  turno: string;
  espaco: string;
};

type AlunoTurma = {
  modalidade: string;
  quantidadeAlunos: number;
};

type AlunoType = {
  turma_id: number;
  nome_turma: string;
  vagas_restantes: number;
};
// eslint-disable-next-line
const IndexPage = ({
  turmas,
  alunosT,
}: {
  // eslint-disable-next-line
  turmas: Turma[];
  alunosT: AlunoType[];
}) => {
  // eslint-disable-next-line
  const fetchTurmaAlunos = async (turmas: Turma[]): Promise<AlunoTurma[]> => {
    try {
      const promises = turmas.map(async (turma) => {
        const response = await api.get(`aluno/vagasDeTurmas/${turma.id}`);
        const turmaData = response.data;
        const vagasRestantes = turma.vagas - turmaData.vagas_restantes;

        const alunoTurma: AlunoTurma = {
          modalidade: turma.modalidade,
          quantidadeAlunos: vagasRestantes,
        };

        return alunoTurma;
      });

      const alunos = await Promise.all(promises);

      // Sort the array in descending order based on the number of students
      const sortedAlunos = alunos.sort(
        (a, b) => b.quantidadeAlunos - a.quantidadeAlunos
      );

      return sortedAlunos;
    } catch (error) {
      return [];
    }
  };
  // eslint-disable-next-line
  const fetchTotalAlunos = async (turmas: Turma[]): Promise<number> => {
    try {
      const promises = turmas.map(async (turma) => {
        const response = await api.get(`aluno/vagasDeTurmas/${turma.id}`);
        const turmaData = response.data;

        const quantidadeAlunos = turma.vagas - turmaData.vagas_restantes;

        return quantidadeAlunos;
      });

      const alunos = await Promise.all(promises);

      // Calcular o total de alunos
      const totalAlunos = alunos.reduce(
        (total, quantidade) => total + quantidade,
        0
      );

      return totalAlunos;
    } catch (error) {
      return 0;
    }
  };
  const fetchVagasRestantes = async () => {
    try {
      const response = await api.get(`aluno/vagasDeTurmas`);
      const { data } = response;

      // Calcular o total de vagas restantes
      const totalVagasRestantes = data.reduce(
        (total: any, turma: { vagas_restantes: any }) =>
          total + turma.vagas_restantes,
        0
      );

      return totalVagasRestantes;
    } catch (error) {
      return 0;
    }
  };
  const [modalidades, setModalidades] = useState<string[]>([]);
  const [vagas, setVagas] = useState<number[]>([]);
  const [vagasTotais, setVagasTotais] = useState<number[]>([]);

  const graficBar = () => {
    const modalidadesArray: string[] = [];
    const vagasArray: number[] = [];
    const vagasTotaisArray: number[] = [];

    turmas.forEach((turma) => {
      const turmaEncontrada = alunosT.find(
        (aluno) => aluno.turma_id === turma.id
      );

      if (turmaEncontrada) {
        modalidadesArray.push(`${turma.modalidade} - ${turma.genero}`);
        vagasArray.push(turma.vagas - turmaEncontrada.vagas_restantes);
        vagasTotaisArray.push(turma.vagas);
      }
    });

    setModalidades(modalidadesArray);
    setVagas(vagasArray);
    setVagasTotais(vagasTotaisArray);
  };

  const [totalAlunos, setTotalAlunos] = useState<number>(0);
  const [totalVagasRestantes, setTotalVagasRestantes] = useState<number>(0);

  const [alunos, setAlunos] = useState<AlunoTurma[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const alunosData = await fetchTurmaAlunos(turmas);
      setAlunos(alunosData);
    };

    const fetchData1 = async () => {
      const alunosData = await fetchTotalAlunos(turmas);
      setTotalAlunos(alunosData);
    };
    const fetchVagasRestantesData = async () => {
      const totalVagasRestantesData = await fetchVagasRestantes();
      setTotalVagasRestantes(totalVagasRestantesData);
    };

    fetchData();
    fetchData1();
    fetchVagasRestantesData();
    graficBar();
  }, []);
  const data = [
    {
      type: alunos[0]?.modalidade,
      value: alunos[0]?.quantidadeAlunos || 0,
    },
    {
      type: alunos[1]?.modalidade,
      value: alunos[1]?.quantidadeAlunos || 0,
    },
    {
      type: alunos[2]?.modalidade,
      value: alunos[2]?.quantidadeAlunos || 0,
    },
  ];
  const customColors = ["#34DAFF", "#8BFFBA", "#058C42"];
  const config: any = {
    appendPadding: 16,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    innerRadius: 0.7,
    color: customColors,
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 20,
        },
        content: `${totalAlunos} \nAlunos`,
      },
    },
    legend: {
      itemName: {
        style: {
          fontSize: 16,
          marginRight: 40,
        },
      },
    },
  };
  const data1: any = [];
  modalidades.forEach((el, i) => {
    data1.push(
      {
        name: "Vagas Preenchidas",
        titulo: el,
        value: vagas[i],
      },
      {
        name: "Vagas Totais",
        titulo: el,
        value: vagasTotais[i],
      }
    );
  });

  const config1: any = {
    data: data1, // Seu conjunto de dados
    xField: "titulo", // Campo X (eixo horizontal)
    yField: "value", // Campo Y (eixo vertical)
    isGroup: true,
    seriesField: "name", // Campo de série (para agrupar)
    color: ["#058C42", "#AAAAAA"],
    label: {
      position: "large",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
    legend: {
      position: "top", // Posição da legenda
      itemName: {
        style: {
          fontSize: 18,
        },
      },
    },
  };
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center bg-white-default pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex w-full flex-col items-center justify-between gap-y-4 pr-8  md:mt-16 2xl:flex-row">
          <div className="flex h-[16.813rem] w-full flex-col items-center rounded-lg border border-l-8 border-r-8 border-green-200 p-8 shadow-md 2xl:w-[35.063rem] ">
            <h2 className={`${quicksand.className} text-lg font-bold`}>
              Esportes mais procurados
            </h2>
            <div className="flex h-full w-full items-center justify-around px-4">
              <div
                className={`${quicksand.className} flex h-56 w-full flex-row-reverse justify-center`}
              >
                <Pie {...config} className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex h-[16.813rem] w-full flex-col items-center justify-evenly rounded-lg border border-l-8 border-r-8 border-green-200  shadow-md 2xl:w-[18.188rem] ">
            <h1 className={`${quicksand.className}  text-[22px] font-bold`}>
              VAGAS DISPONIVEIS
            </h1>
            <h1 className={`${quicksand.className} text-[75px] font-medium`}>
              {totalVagasRestantes}
            </h1>
            <p
              className={`${quicksand.className} w-[116px] text-center  text-lg font-medium leading-normal`}
            >
              {/* Vagas totais */}
            </p>
          </div>

          <div
            className={`${quicksand.className} flex w-full flex-col justify-between gap-y-4 2xl:w-[19.875rem]`}
          >
            <Link
              href="/criarTurma"
              className="flex h-[69px] w-full items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-700  text-lg font-bold text-white-default shadow-md transition-colors duration-300 hover:scale-105 hover:cursor-pointer hover:bg-green-300"
            >
              CRIAR TURMA
            </Link>
            <Link
              href="/listarTurmas"
              className="flex h-[69px] w-full items-center justify-center rounded-lg border border-cyan-600  text-lg font-bold  shadow-md transition-colors duration-300 hover:scale-105 hover:cursor-pointer"
            >
              LISTAR TURMAS
            </Link>
            <button
              type="button"
              className="flex h-[69px] w-full items-center justify-center rounded-lg border border-cyan-600  text-lg font-bold shadow-md transition-colors duration-300 hover:scale-105 hover:cursor-pointer"
            >
              EMPRÉSTIMOS
            </button>
          </div>
        </div>
        <div className={`${quicksand.className} mt-9 w-[98%] shadow-xl`}>
          <h1 className="flex h-20 items-center justify-center rounded bg-gradient-to-br from-green-200 to-green-500 text-center text-2xl font-bold uppercase text-white-default">
            Quantidade de alunos por esporte
          </h1>
          <div className="mb-4 flex justify-center">
            {/* <div className="mr-24 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path
                  d="M17.9996 3.6001C14.1805 3.6001 10.5178 5.11724 7.81727 7.81776C5.11675 10.5183 3.59961 14.181 3.59961 18.0001C3.59961 21.8192 5.11675 25.4819 7.81727 28.1824C10.5178 30.883 14.1805 32.4001 17.9996 32.4001C21.8187 32.4001 25.4814 30.883 28.1819 28.1824C30.8825 25.4819 32.3996 21.8192 32.3996 18.0001C32.3996 14.181 30.8825 10.5183 28.1819 7.81776C25.4814 5.11724 21.8187 3.6001 17.9996 3.6001ZM12.7652 6.5341L17.1032 9.0649V12.1249L12.119 15.6385L9.31101 14.6179L8.18421 10.0963C9.41442 8.56983 10.9827 7.35032 12.7652 6.5341ZM5.46081 19.2457L8.74941 16.3297L11.5322 17.3395L13.4132 23.2615L12.1226 25.1929H7.65321C6.42471 23.4312 5.66975 21.3833 5.46081 19.2457ZM15.071 30.2581L13.604 26.2153L14.882 24.3019H21.1226L22.4024 26.2153L20.9354 30.2563C19.0077 30.7165 16.9987 30.7183 15.071 30.2581ZM28.346 25.1929H23.8856L22.5896 23.2579L24.4346 17.3413L27.2552 16.3261L30.5384 19.2457C30.3295 21.3833 29.5745 23.4312 28.346 25.1929ZM27.824 10.1089L26.6972 14.6143L23.846 15.6403L18.9014 12.1267V9.0667L23.2376 6.5341C25.0232 7.35265 26.5935 8.57599 27.824 10.1071V10.1089Z"
                  fill="#058C42"
                />
              </svg>
              <span className="text-lg">Vagas Preenchidas</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path
                  d="M17.9996 3.6001C14.1805 3.6001 10.5178 5.11724 7.81727 7.81776C5.11675 10.5183 3.59961 14.181 3.59961 18.0001C3.59961 21.8192 5.11675 25.4819 7.81727 28.1824C10.5178 30.883 14.1805 32.4001 17.9996 32.4001C21.8187 32.4001 25.4814 30.883 28.1819 28.1824C30.8825 25.4819 32.3996 21.8192 32.3996 18.0001C32.3996 14.181 30.8825 10.5183 28.1819 7.81776C25.4814 5.11724 21.8187 3.6001 17.9996 3.6001ZM12.7652 6.5341L17.1032 9.0649V12.1249L12.119 15.6385L9.31101 14.6179L8.18421 10.0963C9.41442 8.56983 10.9827 7.35032 12.7652 6.5341ZM5.46081 19.2457L8.74941 16.3297L11.5322 17.3395L13.4132 23.2615L12.1226 25.1929H7.65321C6.42471 23.4312 5.66975 21.3833 5.46081 19.2457ZM15.071 30.2581L13.604 26.2153L14.882 24.3019H21.1226L22.4024 26.2153L20.9354 30.2563C19.0077 30.7165 16.9987 30.7183 15.071 30.2581ZM28.346 25.1929H23.8856L22.5896 23.2579L24.4346 17.3413L27.2552 16.3261L30.5384 19.2457C30.3295 21.3833 29.5745 23.4312 28.346 25.1929ZM27.824 10.1089L26.6972 14.6143L23.846 15.6403L18.9014 12.1267V9.0667L23.2376 6.5341C25.0232 7.35265 26.5935 8.57599 27.824 10.1071V10.1089Z"
                  fill="#AAAAAA"
                />
              </svg>
              <span className="text-lg">Vagas Totais</span>
            </div> */}
          </div>
          <div className="flex h-[400px] w-full justify-center">
            <Column {...config1} className="w-full lg:w-[60%]" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

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
  const response = await api.get("aluno/listaTurmas");
  const resp1 = await api.get(`aluno/vagasDeTurmas`);
  const turmas = await response.data;
  const alunosT = await resp1.data;
  return {
    props: {
      turmas,
      alunosT,
    },
  };
};
