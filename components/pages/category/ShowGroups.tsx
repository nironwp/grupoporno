/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ICategoryOptions } from "@/functions/categories";
import { IGroupOptions } from "@/functions/groups";
import Link from "next/link";

import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export const ShowGroups = ({
  groups,
  category,
}: {
  groups: IGroupOptions[];
  category: ICategoryOptions;
}) => {
  const [platform, setPlatform] = useQueryState("platform");

  const [groupsFiltered, setGroupsFiltered] = useState<IGroupOptions[] | null>(
    groups
  );

  useEffect(() => {
    if (platform === "discord") {
      setGroupsFiltered(
        groups.filter(
          (group) =>
            group.link.includes("discord.gg") ||
            group.link.includes("discord invite")
        )
      );
    }

    if (platform === "telegram") {
      setGroupsFiltered(groups.filter((group) => group.link.includes("t.me")));
    }

    if (platform === "whatsapp") {
      setGroupsFiltered(
        groups.filter(
          (group) =>
            group.link.includes("wa.me") || group.link.includes("whatsapp.com")
        )
      );
    }

    if (platform === "") {
      setGroupsFiltered(groups);
    }
  }, [platform]);

  return (
    <>
      {!!groupsFiltered &&
        groupsFiltered.map((group) => {
          return (
            <Link
              key={group.id}
              href={`/grupos/${category.slug}/${group.slug}`}
              style={{
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${process.env.NEXT_PUBLIC_FILES_URL+"/"+group.bannerImage})`,
                backgroundPosition: "center center",
              }}
              className="text-center flex flex-col justify-end aspect-square items-center w-full rounded p-5 transition-all hover:scale-105 "
            >
              <span className="text-sm font-bold uppercase text-white">
                {group.type === "group" ? "Grupo" : "Canal"}
              </span>
              <h1 className="text-theme-500 text-2xl font-bold uppercase">
                {group.title}
              </h1>
            </Link>
          );
        })}
    </>
  );
};
