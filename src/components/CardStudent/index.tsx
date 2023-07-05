import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function Index() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="flex h-16 w-full items-center justify-between overflow-x-auto  text-white-default shadow-md hover:cursor-pointer hover:border-2 hover:border-green-200">
      <div className="ml-[18px] mr-8 flex gap-x-2">
        <Image src="/people.svg" alt="people" width={16} height={16} />
        <span className="font-Montserrat text-lg font-medium">
          Livia Maria Lima
        </span>
      </div>
      <div className="mr-[50px] flex w-[379px] gap-x-2">
        <Image src="/school.svg" alt="course" width={24} height={24} />
        <span className="font-Montserrat text-lg font-medium">
          Análise e Desenvolvimento de Sistemas
        </span>
      </div>
      <div className="mr-28 flex gap-x-2">
        <Image src="/card.svg" alt="card" width={24} height={24} />
        <span className="font-Montserrat text-lg font-medium">
          20201014040044
        </span>
      </div>
      <span className="relative mr-4 flex items-center hover:cursor-pointer">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white h-6 w-6 cursor-pointer"
          onClick={toggleDropdown}
        >
          <path
            d="M14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12Z"
            fill="white"
          />
          <path
            d="M14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5Z"
            fill="white"
          />
          <path
            d="M14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5Z"
            fill="white"
          />
        </svg>
        {isDropdownOpen && (
          <div className="absolute left-0 top-12 z-10 w-[10rem] rounded-md bg-green-200 px-4 py-2 shadow-md">
            <div className="flex items-center justify-center rounded  text-white-default hover:bg-green-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3043 2.75 17.863 2.75C18.4217 2.75 18.8923 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.571 21.275 6.113C21.2917 6.655 21.1083 7.11733 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                  fill="white"
                />
              </svg>

              <Link
                href="#"
                className="block px-4 py-2 font-Montserrat text-sm font-medium"
              >
                Editar
              </Link>
            </div>
            <div className="flex items-center justify-center  rounded text-white-default hover:bg-green-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                  fill="white"
                />
              </svg>

              <Link
                href="#"
                className="block px-4 py-2 font-Montserrat text-sm font-medium"
              >
                Excluir
              </Link>
            </div>
            <div className="flex w-full items-center  justify-center rounded text-white-default hover:bg-green-300">
              <span className="ml-8 h-6 w-6 ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.0625 10.5H13.5C12.9033 10.5 12.331 10.2629 11.909 9.84099C11.4871 9.41903 11.25 8.84674 11.25 8.25V1.6875C11.25 1.63777 11.2302 1.59008 11.1951 1.55492C11.1599 1.51975 11.1122 1.5 11.0625 1.5H6.75C5.95435 1.5 5.19129 1.81607 4.62868 2.37868C4.06607 2.94129 3.75 3.70435 3.75 4.5V19.5C3.75 20.2956 4.06607 21.0587 4.62868 21.6213C5.19129 22.1839 5.95435 22.5 6.75 22.5H17.25C18.0456 22.5 18.8087 22.1839 19.3713 21.6213C19.9339 21.0587 20.25 20.2956 20.25 19.5V10.6875C20.25 10.6378 20.2302 10.5901 20.1951 10.5549C20.1599 10.5198 20.1122 10.5 20.0625 10.5Z"
                    fill="white"
                  />
                  <path
                    d="M19.6509 8.84062L12.9098 2.09953C12.8967 2.0865 12.8801 2.07763 12.8619 2.07405C12.8438 2.07046 12.825 2.07232 12.8079 2.07938C12.7908 2.08644 12.7762 2.0984 12.7659 2.11374C12.7556 2.12909 12.7501 2.14714 12.75 2.16562V8.25047C12.75 8.44938 12.829 8.64014 12.9697 8.7808C13.1103 8.92145 13.3011 9.00047 13.5 9.00047H19.5848C19.6033 9.00039 19.6214 8.99485 19.6367 8.98454C19.6521 8.97423 19.664 8.95962 19.6711 8.94254C19.6781 8.92546 19.68 8.90667 19.6764 8.88853C19.6728 8.8704 19.664 8.85373 19.6509 8.84062Z"
                    fill="white"
                  />
                </svg>
              </span>

              <Link
                href="#"
                className="block w-full px-4 py-2 font-Montserrat text-sm font-medium "
              >
                Declaração
              </Link>
            </div>
          </div>
        )}
      </span>
    </div>
  );
}
