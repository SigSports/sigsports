/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";

function index() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsCalendarOpen(!isCalendarOpen);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <h1 className="leading-[ 37.57px] mr-auto mt-4  pl-3 font-Montserrat text-4xl font-bold text-black  md:mt-16">
          ALUGAR TEMA
        </h1>
        <form className="mt-24 flex flex-col gap-x-6 md:flex-row ">
          <div className="flex flex-col md:w-1/2">
            <div className="flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Data
              </span>
              <div className="relative">
                <DatePicker
                  className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/AA"
                  open={!isCalendarOpen}
                  onClickOutside={() => setIsCalendarOpen(false)}
                />
                <div
                  className="absolute right-3 top-2"
                  onClick={toggleCalendar}
                >
                  <Image
                    src="/Calendar.svg"
                    alt="calendario"
                    width={21}
                    height={21}
                    className="cursor-pointer text-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Hora Início
              </span>
              <input
                type="text"
                name="hora-inicio"
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Hora Final
              </span>
              <input
                type="text"
                name="hora-inicio"
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Tema
              </span>
              <select
                name="tema"
                className="w-64 rounded-md border border-gray-300 py-2 pl-3 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="carro">Carros</option>
                <option value="motos">Moto</option>
                <option value="onibus">Onibus</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>

            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Cliente
              </span>
              <select
                name="cliente"
                className="w-64 rounded-md border border-gray-300 py-2 pl-3 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="maria">Maria</option>
                <option value="joão">João</option>
                <option value="joão maria">João Maria</option>
                <option value="maria joão">Maria João</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>
            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Endereço
              </span>
              <input
                type="text"
                name="hora-inicio"
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Número
              </span>
              <input
                type="text"
                name="hora-inicio"
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-5 hidden flex-col md:flex">
              <button
                type="button"
                className="mb-8 h-9 w-16 rounded-md border border-green-500 bg-yellow-400 font-Montserrat text-sm text-white-default hover:cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Complemento
              </span>
              <input
                type="text"
                name="hora-inicio"
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Bairro
              </span>
              <input
                type="text"
                name="hora-inicio"
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Cidade
              </span>
              <input
                type="text"
                name="hora-inicio"
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-5 flex flex-col">
              <span className="font-Montserrat text-base font-bold text-black">
                Hora Início
              </span>
              <input
                type="text"
                name="hora-inicio"
                className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 font-bold placeholder:font-Montserrat placeholder:text-base placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 mt-5 flex flex-col md:hidden">
              <button
                type="button"
                className="mb-8 h-9 w-16 rounded-md border border-green-500 bg-yellow-400 font-Montserrat text-sm text-white-default hover:cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default index;
