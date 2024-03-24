import { getAllCategories } from "@/functions/categories";
import { getAllApprovedGroups } from "@/functions/groups";
import Link from "next/link";

export const metadata = {
  title: "Todas categorias",
};

export default async function GroupsPage() {
  const groups = await getAllApprovedGroups();
  const categories = await getAllCategories();

  return (
    <div
      className="grid container mx-auto gap-10 my-20"
      style={{ gridTemplateColumns: "3fr 1fr" }}
    >
      <main className="screen">
        <div>
          <h1 className="font-bold text-4xl">Todos os grupos disponíveis</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
            {groups && groups.map((group) => {
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
                  <span className="text-xs text-white mt-2">
                    Categoria:{" "}
                    <b>
                      {
                        categories.find(
                          (category) => category.id == group.categoryId
                        )?.title
                      }
                    </b>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <aside className="border border-slate-600 w-full my-10 rounded-lg h-fit bg-theme-800 shadow">
        <div className="p-5 border-b border-b-black">
          <h1 className="text-lg font-bold">Todas as categorias</h1>
        </div>
        <ul className="p-5 flex flex-col font-bold">
          {categories.map((category) => {
            return (
              <Link key={category.id} href={`/grupos/${category.slug}`}>
                - {category.title}
              </Link>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
