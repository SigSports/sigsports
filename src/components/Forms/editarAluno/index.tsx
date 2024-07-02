/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer, Button, Form, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { TbPencil } from "react-icons/tb";
import { api } from "@/services/api";

type Aluno = {
  nomeAluno: string;
  matricula: string;
  curso: string;
  contato: string;
};

export default function FormUser({
  quicksand,
  id,
}: {
  quicksand: any;
  id: number;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [aluno, setAluno] = useState<Aluno>();
  async function getAluno() {
    setFetch(true);
    try {
      const response = await api.get(`v1/matriculas/${id}`);
      const alunoR = await response.data;
      setAluno(alunoR);
    } catch (e) {
      console.log(e);
    } finally {
      setFetch(false);
    }
  }

  useEffect(() => {
    getAluno();
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await api.put(`v1/matriculas/${id}`, values);
      toast.success("Aluno editado com sucesso");
      setOpen(false);
      setTimeout(() => {
        // Executar ação após 20 segundos
        // Por exemplo, redirecionar para uma página específica
        router.reload();
      }, 3000); // 20 segundos
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const [form] = Form.useForm();
  return (
    <>
      <TbPencil
        className="h-[22px] w-5 text-[#616161] hover:cursor-pointer"
        onClick={showDrawer}
      />

      <Drawer title=" Editar Aluno(a)" onClose={onClose} open={open}>
        <h2
          className={`${quicksand.className} px-4 text-sm font-semibold leading-9 text-green-bg dark:text-green-300 `}
        >
          Insira as informações necessárias para editar o(a) aluno(a):{" "}
        </h2>

        {fetch ? (
          <Spin />
        ) : (
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={aluno}
            form={form}
            name="control-hooks"
          >
            <Form.Item
              label="nome completo"
              name="nomeAluno"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o nome completo",
                },
              ]}
              className="font-Montserrat text-base font-medium italic"
            >
              <Input
                placeholder="Nome do aluno"
                className="text-white h-10 w-full rounded-lg border-2 border-green-200 pl-4 font-Montserrat text-base font-medium italic placeholder:text-textGray focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </Form.Item>
            <Form.Item
              label="curso"
              name="curso"
              rules={[{ required: true, message: "Por favor, insira o curso" }]}
              className="font-Montserrat text-base font-medium italic"
            >
              <Input
                placeholder="Curso do Aluno"
                className="text-white h-10 w-full rounded-lg border-2 border-green-200 pl-4 font-Montserrat text-base font-medium italic placeholder:text-textGray focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </Form.Item>
            <Form.Item
              label="matricula"
              name="matricula"
              className="font-Montserrat text-base font-medium italic"
              rules={[
                { required: true, message: "Por favor, insira a matricula" },
                { len: 14, message: "Digite uma matricula valida" },
              ]}
            >
              <Input
                placeholder="20241014646040"
                className="text-white h-10 w-full rounded-lg border-2 border-green-200 pl-4 font-Montserrat text-base font-medium italic placeholder:text-textGray focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </Form.Item>
            <Form.Item
              label="número para contato"
              name="contato"
              className="font-Montserrat text-base font-medium italic"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o número de contato",
                },
              ]}
            >
              <Input
                placeholder="(xx) xxxxx-xxxx"
                className="text-white h-10 w-full rounded-lg border-2 border-green-200 pl-4 font-Montserrat text-base font-medium italic placeholder:text-textGray focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </Form.Item>
            <Form.Item className="">
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="bg-green-200 hover:bg-green-100"
              >
                Editar Aluno
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </>
  );
}
