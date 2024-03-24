"use client";

import { Cog, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NewGroupDialog } from "./NewGroupDialog";
import { ICategoryOptions } from "@/functions/categories";
import { IUserOptions } from "@/functions/user";

export const SubNav = ({
  user,
  categories,
}: {
  user: IUserOptions;
  categories: ICategoryOptions[];
}) => {
  const pathName = usePathname();

  return (
    <div className="bg-theme-600 p-5">
      <div className="container flex justify-between">
        <ul className="flex gap-4">
          <li>
            <Link
              className={`text-white ${
                pathName === "/painel" ? "font-bold" : ""
              }`}
              href="/painel"
            >
              Meus grupos
            </Link>
          </li>

          <NewGroupDialog categories={categories}>
            <li>
              <span
                className={`text-white cursor-pointer ${
                  pathName === "/painel/grupos" ? "font-bold" : ""
                }`}
              >
                Enviar grupo
              </span>
            </li>
          </NewGroupDialog>
        </ul>
        <div className="flex items-center gap-5">
          {user.role === 2 && (
            <Link href="/painel/admin">
              <Cog color="white" />
            </Link>
          )}
          <Link href="/logout" className="text-red-400">
            <LogOutIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
