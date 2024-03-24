/* eslint-disable react/no-unescaped-entities */
import { getSearchGroups } from "@/functions/groups";
import  Link  from "next/link";
import { Suspense } from "react";

export default async function SearchPage({params}: any) {
    const groups = await getSearchGroups(params.term)
    return (
      <div className="container mx-auto gap-10 my-20">
      <main className="min-h-screen">
        <h1>/ {params.term}</h1>
        <div>
          <h1 className="font-bold text-4xl">
            Tudo encontrado por "{params.term}"
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
            <Suspense fallback={<>Carregando...</>}>
              {
                groups.map((group) => {
                  return (
                    <Link
                      key={group.id}
                      href={group.link}
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
                })
              }
            </Suspense>
          </div>
          {groups.length === 0 && (
            <h1 className="w-full text-center mt-20 text-xl font-bold">
              Infelizmente essa categoria não possui grupos aprovados
            </h1>
          )}
        </div>
      </main>
    </div>
    )
}