import { Drawer, Button, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { api } from "@/services/api";

export default function FormUser({
  quicksand,
  id,
  capacidade,
}: {
  quicksand: any;
  id: number;
  capacidade: string;
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

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const quantidadeAlunos = parseInt(capacidade.split("-")[1], 10);
      const quantidadeVagas = parseInt(capacidade.split("-")[0], 10);
      if (quantidadeAlunos === quantidadeVagas) {
        toast.error("A turma já está totalmente cheia");
      } else {
        await api.post(`v1/criarMatricula/${id}`, values);
        toast.success("Matrícula criada com sucesso");
        setTimeout(() => {
          // Executar ação após 20 segundos
          // Por exemplo, redirecionar para uma página específica
          router.reload();
        }, 3000); // 20 segundos
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const [form] = Form.useForm();
  return (
    <>
      <Button
        type="default"
        onClick={showDrawer}
        className={`  mt-4 flex items-center justify-center rounded-md bg-green-200 px-4 py-6 text-base font-bold leading-normal text-transparent  text-white-default`}
      >
        Matricular Aluno(a)
      </Button>

      <Drawer title=" Matricular Aluno(a)" onClose={onClose} open={open}>
        <h2
          className={`${quicksand.className} px-4 text-sm font-semibold leading-9 text-green-bg dark:text-green-300 `}
        >
          Insira as informações necessárias para matricular o(a) aluno(a):{" "}
        </h2>

        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          name="control-hooks"
          initialValues={{ layout: "vertical" }}
        >
          <Form.Item
            label="nome completo"
            name="nomeAluno"
            rules={[
              { required: true, message: "Por favor, insira o nome completo" },
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
              Matricular Aluno
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
