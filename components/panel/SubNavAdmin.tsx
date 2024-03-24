"use client";

import { LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SubNavAdmin = () => {
  const pathName = usePathname();

  return (
    <div className="bg-theme-600 p-5">
      <div className="container flex justify-between">
        <ul className="flex gap-4">
          <li>
            <Link
              className={`text-white ${
                pathName === "/painel/admin" ? "font-bold" : ""
              }`}
              href="/painel/admin"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              className={`text-white ${
                pathName === "/painel/admin/grupos" ? "font-bold" : ""
              }`}
              href="/painel/admin/grupos"
            >
              Grupos
            </Link>
          </li>
          <li>
            <Link
              className={`text-white ${
                pathName === "/painel/admin/categorias" ? "font-bold" : ""
              }`}
              href="/painel/admin/categorias"
            >
              Categorias
            </Link>
          </li>
          <li>
            <Link
              className={`text-white ${
                pathName === "/painel/admin/users" ? "font-bold" : ""
              }`}
              href="/painel/admin/users"
            >
              Usuários
            </Link>
          </li>
          <li>
            <Link
              className={`text-white ${
                pathName === "/painel/admin/config" ? "font-bold" : ""
              }`}
              href="/painel/admin/config"
            >
              Configurações
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <Link href="/painel">
            <User color="white" />
          </Link>
          <Link href="/logout" className="text-red-400">
            <LogOutIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
