/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { getAllCategories, getOneCategory } from "@/functions/categories";
import {
  getAllApprovedGroups,
  getOneCategoryGroups,
  getOneGroup,
} from "@/functions/groups";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicComponentWithNoSSR = dynamic(
  () =>
    import("../../../../../components/panel/ShowDescription").then(
      (mod) => mod.ShowDescription
    ),
  { ssr: false, loading: () => <p>Carregando...</p> }
);

export const generateStaticParams = async () => {
  const groups = await getAllApprovedGroups();
  const categories = await getAllCategories();

  return groups.map((group) => ({
    group: group.slug,
    category: categories.find((category) => category.id === group.categoryId)
      ?.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: {
    category: string;
    group: string;
  };
}) => {
  const category = await getOneCategory(params.category);
  const group = await getOneGroup(params.group);

  if (!category || !group) return {};

  return {
    title: `${group.title} - ${category.title}`,
  };
};

export default async function CategoryPage({
  params,
}: {
  params: {
    category: string;
    group: string;
  };
}) {
  const group = await getOneGroup(params.group);
  const categoryGroups = await getOneCategoryGroups(group.categoryId);
  const category = await getOneCategory(params.category);

  return (
    <div className="container mx-auto my-20">
      <main className="min-h-screen">
        <h1>
          / grupos / {params.category} / {params.group}
        </h1>
        <div className="bg-theme-800 p-10 rounded mt-10 flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img
                className="rounded-full w-[150px] aspect-square"
                src={group.bannerImage}
                alt={group.title}
              />
              <h1 className="mt-2 text-2xl font-bold">{group.title}</h1>
            </div>
            <Link target="_blank" href={group.link}>
              <Button size="lg" title="Entrar no grupo">
                Entrar no grupo
              </Button>
            </Link>
          </div>
          <div className="w-full mt-5">
            <DynamicComponentWithNoSSR value={group.description} />
          </div>
        </div>
        <h1 className="text-theme-500 text-2xl font-bold my-10">
          Recomendados
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {categoryGroups
            .filter((groupFilter) => group.slug !== groupFilter.slug)
            .slice(0, 3)
            .map((group) => {
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
            })}
          {categoryGroups.filter(
            (groupFilter) => group.slug !== groupFilter.slug
          ).length === 0 && (
            <p>Infelizmente não tem mais nenhum grupo nessa categoria</p>
          )}
        </div>
        {categoryGroups.filter((groupFilter) => group.slug !== groupFilter.slug)
          .length > 4 && (
          <div className="w-full flex items-center justify-center my-5">
            <Link target="_blank" href={`/grupos/${category.slug}`}>
              <Button size="lg" title="Ver mais grupos dessa categoria">
                Ver mais grupos dessa categoria
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
