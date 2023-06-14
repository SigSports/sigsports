import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export interface ITurmas {
  nomeTurma: string;
  modalidade: number;
  categoria: number;
  vagas: number;
  professor: number;
  turno: string;
  dias: string[];
  horarioInicial: string;
  horarioFinal: string;
}

const Calendar = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const url = "https://sigsport.pythonanywhere.com/api/v1/listarTurmasId/3/";
  const [turmas, setTurmas] = useState<ITurmas[]>([]);
    useEffect(() => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const turmasAtualizadas = data.map((turma: any) => ({
        ...turma,
        dias: turma.dias.split(","),
      }));
      setTurmas(turmasAtualizadas);
    });
  }, []);

  

  const [popupContent, setPopupContent] = useState<string | null>(null);

  const handleMouseEnter = (disciplinas: string) => {
    setPopupContent(disciplinas);
  };

  const handleMouseLeave = () => {
    setPopupContent(null);
  };

  const renderCalendarDays = () => {
    const calendarDays = [];

    for (let i = 0; i < firstDayOfWeek; i += 1) {
      calendarDays.push(<div key={`empty-${i}`} className="text-center" />);
    }

    for (let i = 1; i <= daysInMonth; i += 1) {
      const isToday = i === today.getDate();
      const dayClasses = `flex flex-col justify-center items-center ${
        isToday ? "text-green-500 font-bold" : "bg-white"
      }`;

      const currentDay = new Date(year, month, i).toLocaleDateString(
        "default",
        {
          weekday: "long",
        }
      );

      const matchingTurmas = turmas.filter((turma) =>
        turma.dias.includes(currentDay.toLowerCase())
      );

      const hasTurmas = matchingTurmas.length > 0;
      const disciplinas = hasTurmas
        ? matchingTurmas.map((turma) => turma.nomeTurma).join(", ")
        : "";

      const colorClass = hasTurmas ? "bg-yellow-500 hover:cursor-pointer" : "";

      calendarDays.push(
        <div
          key={i}
          className={`${dayClasses} ${colorClass}`}
          onMouseEnter={() => handleMouseEnter(disciplinas)}
          onMouseLeave={handleMouseLeave}
        >
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <Layout>
      <div className="h-full w-full">
        <div className="h-25vh w-full max-w-2xl p-4 dark:text-white-default">
          <div className="bg-white h-full rounded-lg shadow">
            <div className="rounded-t-lg bg-green-300 py-2 text-center text-white-default">
              {new Date(year, month).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="grid h-full grid-cols-7 gap-2 p-4 text-gray-600 dark:text-white-default">
              <div className="text-center font-semibold">Dom</div>
              <div className="text-center font-semibold">Seg</div>
              <div className="text-center font-semibold">Ter</div>
              <div className="text-center font-semibold">Qua</div>
              <div className="text-center font-semibold">Qui</div>
              <div className="text-center font-semibold">Sex</div>
              <div className="text-center font-semibold">Sáb</div>
              {renderCalendarDays()}
            </div>
          </div>
        </div>
        {popupContent && (
          <div className="absolute  ml-10 rounded-md border border-gray-300 bg-yellow-500 p-4 text-sm text-white-default">
            {popupContent}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Calendar;
