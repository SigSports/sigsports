import Image from "next/image";
import Link from "next/link";
import LayoutInicial from "@/components/LayoutInicial";

export default function Home() {
  return (
    <LayoutInicial>
      <div className="flex flex-col justify-around lg:p-0">
        <div className="flex flex-col p-8 font-Raleway text-[1.375rem] font-semibold leading-[50px] text-white-ligth ">
          <h1>Para iniciar faça seu login</h1>
          <h1>ou acesse nossos esportes disponíveis.</h1>
        </div>

        <div className="mx-auto w-[321px] px-8">
          <Image src="/SIGSport.svg" alt="Logo" width={321} height={83} />
          <div className="mt-12 flex w-full justify-around text-white-default">
            <Link
              href="/login"
              className="mr-8 flex  h-[57.6px] w-[144px] items-center justify-center rounded-sm border border-green-200 font-Montserrat text-base font-bold leading-5"
            >
              LOGIN
            </Link>
            <Link
              href="/esportes"
              className="flex h-[57.6px] w-[144px] items-center justify-center rounded-sm bg-green-200 font-Montserrat text-base font-bold leading-5"
            >
              ESPORTES
            </Link>
          </div>
        </div>
      </div>
    </LayoutInicial>
  );
}
