/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ISettingsOptions } from "@/functions/settings";
import { ICategoryOptions } from "@/functions/categories";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "./SearchBar";
import { getCookie } from "@/lib/cookies";
import { NewGroupDialog } from "../panel/NewGroupDialog";

export const Navbar = ({
  settings,
  categories,
}: {
  settings: ISettingsOptions;
  categories: ICategoryOptions[];
}) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const [loged, setLoged] = useState(false)

  const router = useRouter();
  useEffect(() => {
    getCookie("auth:token").then((response) => {
      if (response !== undefined) {
        setLoged(true)
      }
    });
  }, [router]);
  return (
    <>
      <nav className="p-5 bg-theme-500 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <img src={settings.url_image} alt="Logo" className="max-w-xs" />
          </Link>
          <ul className="flex gap-7 items-center">
          <Search placeholder={settings.placeholder_search_bar} isMobile={false} onSearch={(term) => {
            router.push('/search/'+term)
          }} />
            <Link
              className="text-lg text-white flex items-center gap-2 font-semibold transition-all focus:outline-0 hover:text-slate-200"
              href={loged ?"/painel":'/'}
            >
              {loged ? 'Painel' : 'Inicio'}
            </Link>
            {categories.length > 0 && (
              <>
                {categories.slice(0, 2).map((category) => {
                  return (
                    <Link
                      key={category.slug}
                      className="text-lg text-white flex items-center gap-2 font-semibold transition-all focus:outline-0 hover:text-slate-200"
                      href={`/grupos/${category.slug}`}
                    >
                      {category.title}
                    </Link>
                  );
                })}
                {categories.length > 3 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-lg text-white flex items-center gap-2 font-semibold transition-all focus:outline-0 hover:text-slate-200">
                      Todas <FaChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-3">
                      <DropdownMenuLabel>Todas Categorias</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {categories
                        .slice(3, categories.length)
                        .map((category) => {
                          return (
                            <DropdownMenuItem key={category.id} asChild>
                              <Link href={`/grupos/${category.slug}`}>
                                {category.title}
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}

            {
              loged ?
                <NewGroupDialog categories={categories}>
                    <button
              className="text-lg text-white flex p-3 py-2 border-2 border-white rounded-lg items-center gap-2 font-semibold transition-all focus:outline-0 hover:bg-white hover:text-theme-500"
            >
              Enviar Grupo
            </button>
                </NewGroupDialog>
              :
            <button
              onClick={async () => {
                router.push("/login");
              }}
              className="text-lg text-white flex p-3 py-2 border-2 border-white rounded-lg items-center gap-2 font-semibold transition-all focus:outline-0 hover:bg-white hover:text-theme-500"
            >
              Enviar Grupo
            </button>
            }

          </ul>
        </div>
      </nav>
      <nav className="p-5 bg-theme-500 block lg:hidden">
        <div className="flex items-center justify-between">
          <img src={settings.url_image} alt="Logo" className="max-w-[200px]" />
          <button
            className="text-3xl text-white"
            onClick={() => {
              setIsNavbarOpen(!isNavbarOpen);
            }}
          >
            <FaBars />
          </button>
        </div>
      </nav>
      <div
        className={`fixed ${
          isNavbarOpen ? "left-0" : "left-[-100vw]"
        } h-screen w-screen transition-all top-0`}
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <div className="bg-theme-500 w-[80vw] h-screen p-10 bg-opacity-100 rounded-tr-lg rounded-br-lg flex flex-col justify-around">
          <div className="flex w-full justify-end items-center -mt-20">
            <button
              className="text-3xl text-white"
              onClick={() => {
                setIsNavbarOpen(!isNavbarOpen);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <ul>
            <Search isMobile={false} onSearch={(term) => { router.push('/search/'+term)}} placeholder={settings.placeholder_search_bar}/>
            <Link
              className="text-2xl mt-10 text-white flex items-center gap-2 font-semibold transition-all focus:outline-0 hover:text-slate-200"
              href="/"
            >
              Início
            </Link>
            {categories.length > 0 && (
              <>
                {categories.map((category) => {
                  return (
                    <Link
                      key={category.slug}
                      className="text-2xl text-white flex items-center gap-2 font-semibold transition-all focus:outline-0 hover:text-slate-200"
                      href={`/grupos/${category.slug}`}
                    >
                      {category.title}
                    </Link>
                  );
                })}
              </>
            )}
          </ul>

                {
                  loged ?
                  <NewGroupDialog categories={categories}>
                       <button
                  className="text-center text-theme-500 justify-center text-2xl flex p-3 py-2 bg-white w-full rounded-lg items-center gap-2 font-semibold transition-all focus:outline-0 hover:bg-white hover:text-theme-500"
                >
                  Enviar Grupo
                </button>
                    </NewGroupDialog>
                  :
                <button
                  onClick={async () => {
                    router.push("/login");
                  }}
                  className="text-center text-theme-500 justify-center text-2xl flex p-3 py-2 bg-white w-full rounded-lg items-center gap-2 font-semibold transition-all focus:outline-0 hover:bg-white hover:text-theme-500"
                >
                  Enviar Grupo
                </button>

                }

        </div>
      </div>
    </>
  );
};
