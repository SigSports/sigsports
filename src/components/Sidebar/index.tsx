/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <header
        className="flex w-full justify-between bg-bg text-gray-100 md:hidden"
        data-dev-hint="mobile menu bar"
      >
        <div className="flex w-full">
          <Link
            href="/"
            className="text-white block truncate whitespace-nowrap border-l-2 border-yellow-100 p-4 font-Montserrat text-xl font-bold text-black"
          >
            RentThemas
          </Link>
        </div>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="m-2 rounded-md p-2 text-black hover:cursor-pointer focus:outline-none bg-bg"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>

      <aside
        id="sidebar"
        className="absolute inset-y-0 left-0 z-50 w-3/4 transform space-y-6 overflow-y-auto bg-bg px-0 pt-6  transition duration-200 ease-in-out md:relative md:flex md:w-64 md:translate-x-0 md:flex-col md:justify-between"
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex w-full flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <Link
            href="/"
            className="text-white flex items-center space-x-2 px-4"
            title="Your App is cool"
          >
            {/* <img src="{% static 'assets/mascote.svg'%}" alt="" /> */}
            <span className="truncate whitespace-nowrap border-l-2 border-yellow-100 px-[6.25px] font-Montserrat text-xl font-bold">
              RentThemas
            </span>
          </Link>

          <nav
            data-dev-hint="main navigation"
            className="flex flex-col items-center "
          >
            <Link
              href="/dashboard"
              className={`hover:text-white group mb-6 ml-6 mt-36 flex items-center space-x-2 px-8 py-4 font-Montserrat text-sm font-medium transition duration-200 ${
                router.asPath === "/" && "bg-yellow-200"
              }`}
            >
              <svg
                className="mr-2"
                width="19"
                height="17"
                viewBox="0 0 19 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_170_194)">
                  <path
                    d="M18.9171 7.30103L10.2457 0.264954C10.035 0.0927576 9.77185 -0.00122833 9.50042 -0.00122833C9.229 -0.00122833 8.96583 0.0927576 8.7551 0.264954L0.0837115 7.30103C0.060804 7.31944 0.0417585 7.34225 0.0276807 7.36813C0.0136029 7.39401 0.00477327 7.42245 0.00170444 7.4518C-0.00136439 7.48115 0.00138873 7.51081 0.00980395 7.53908C0.0182192 7.56734 0.0321288 7.59365 0.0507254 7.61646L0.519128 8.19751C0.537742 8.22064 0.560703 8.23985 0.586698 8.25403C0.612693 8.26822 0.641212 8.27711 0.670623 8.2802C0.700034 8.28328 0.729761 8.2805 0.758103 8.27201C0.786444 8.26352 0.812845 8.24948 0.835795 8.23071L2.11137 7.19511V16.4681C2.11137 16.609 2.16697 16.7441 2.26595 16.8437C2.36493 16.9434 2.49917 16.9993 2.63915 16.9993H16.3614C16.5013 16.9993 16.6356 16.9434 16.7346 16.8437C16.8335 16.7441 16.8891 16.609 16.8891 16.4681V7.19843L18.169 8.23736C18.2154 8.27518 18.2748 8.29292 18.3342 8.2867C18.3935 8.28047 18.448 8.25078 18.4857 8.20415L18.9538 7.6231C18.9894 7.57477 19.0055 7.51459 18.9987 7.45478C18.9919 7.39497 18.9627 7.34 18.9171 7.30103ZM7.91692 15.9368V10.6243H11.0836V15.9368H7.91692ZM15.8336 15.9368H12.1391V10.0931C12.1391 9.95218 12.0835 9.81706 11.9846 9.71743C11.8856 9.6178 11.7513 9.56183 11.6114 9.56183H7.38915C7.24917 9.56183 7.11493 9.6178 7.01595 9.71743C6.91697 9.81706 6.86137 9.95218 6.86137 10.0931V15.9368H3.16692V6.33847L9.35875 1.31152C9.39783 1.27931 9.44678 1.26171 9.49729 1.26171C9.5478 1.26171 9.59675 1.27931 9.63583 1.31152L15.8336 6.34112V15.9368Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_170_194">
                    <rect width="19" height="17" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Dashboard
            </Link>

            <Link
              href="/alugueis"
              className={`hover:text-white group mb-6 ml-2 flex items-center space-x-2 px-8 py-4 font-Montserrat text-sm font-medium transition duration-200 ${
                router.asPath === "/alugueis" && "bg-yellow-200"
              }`}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5834 16.0833V24.75H3.25V5.25H14.0833"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.034 5.17463C19.8151 4.39358 21.0814 4.39358 21.8625 5.17463L22.8257 6.13787C23.6067 6.91892 23.6067 8.18525 22.8257 8.9663L12.5028 19.2892C12.1277 19.6643 11.619 19.875 11.0886 19.875L8.12533 19.875L8.12532 16.9118C8.12532 16.3813 8.33604 15.8726 8.71111 15.4975L19.034 5.17463Z"
                  stroke="black"
                />
                <path d="M17.6045 6.60417L21.3962 10.3958" stroke="black" />
              </svg>
              Aluguéis
            </Link>
            <Link
              href="/clientes"
              className={`hover:text-white group mb-3 ml-2 flex items-center space-x-2 px-8 py-4 font-Montserrat text-sm font-medium transition duration-200 ${
                router.asPath === "/clientes" && "bg-yellow-200"
              }`}
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1.0625C9.93125 1.0625 11.5 2.7293 11.5 4.78125C11.5 6.8332 9.93125 8.5 8 8.5C6.06875 8.5 4.5 6.8332 4.5 4.78125C4.5 2.7293 6.06875 1.0625 8 1.0625ZM12 11.6875C13.6531 11.6875 15 13.1186 15 14.875V15.9375H1V14.875C1 13.1186 2.34687 11.6875 4 11.6875C6.65625 11.6875 6.10313 12.2188 8 12.2188C9.90312 12.2188 9.34062 11.6875 12 11.6875ZM8 0C5.51562 0 3.5 2.1416 3.5 4.78125C3.5 7.4209 5.51562 9.5625 8 9.5625C10.4844 9.5625 12.5 7.4209 12.5 4.78125C12.5 2.1416 10.4844 0 8 0ZM12 10.625C9.1125 10.625 9.78125 11.1562 8 11.1562C6.225 11.1562 6.88438 10.625 4 10.625C1.79063 10.625 0 12.5275 0 14.875V15.9375C0 16.5252 0.446875 17 1 17H15C15.5531 17 16 16.5252 16 15.9375V14.875C16 12.5275 14.2094 10.625 12 10.625Z"
                  fill="black"
                />
              </svg>

              <span>Clientes</span>
            </Link>
            <Link
              href="/temas"
              className={`hover:text-white group mb-3 ml-2 flex items-center space-x-2 px-8 py-4 font-Montserrat text-sm font-medium transition duration-200 ${
                router.asPath === "/temas" && "bg-yellow-200"
              }`}
            >
              <svg
                className="mr-2"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4167 13.5416C10.992 13.5416 11.4583 13.0753 11.4583 12.5C11.4583 11.9247 10.992 11.4583 10.4167 11.4583C9.84137 11.4583 9.375 11.9247 9.375 12.5C9.375 13.0753 9.84137 13.5416 10.4167 13.5416Z"
                  stroke="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.74759 18.75C8.48237 18.75 8.22802 18.6446 8.04048 18.4571L2.08337 12.5L8.04048 6.54289C8.22802 6.35536 8.48237 6.25 8.74759 6.25H20.8334C21.984 6.25 22.9167 7.18274 22.9167 8.33333V16.6667C22.9167 17.8173 21.984 18.75 20.8334 18.75H8.74759Z"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
              Temas
            </Link>

            <Link
              href="/itens"
              className={`hover:text-white group ml-2 flex items-center space-x-2 px-8 py-4 font-Montserrat text-sm font-medium transition duration-200 ${
                router.asPath === "/itens" && "bg-yellow-200"
              }`}
            >
              <svg
                className="mr-2"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="5.20837"
                  y="7.29169"
                  width="14.5833"
                  height="12.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.33337 7.29167C8.33337 4.99048 10.1989 3.125 12.5 3.125C14.8012 3.125 16.6667 4.99048 16.6667 7.29167"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Itens
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
