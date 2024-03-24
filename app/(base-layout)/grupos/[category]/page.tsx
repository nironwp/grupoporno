import { ListPlatforms } from "@/components/pages/category/ListPlatforms";
import { ShowGroups } from "@/components/pages/category/ShowGroups";
import { getAllCategories, getOneCategory } from "@/functions/categories";
import { getOneCategoryGroups } from "@/functions/groups";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    category: category.slug,
  }));
};

export const generateMetadata = async ({ params }: any) => {
  const category = await getOneCategory(params.category);

  if (!category) return {};

  return {
    title: category.title,
  };
};

export default async function CategoryPage({ params }: any) {
  const category = await getOneCategory(params.category);

  if (!category) return redirect("/grupos");

  const groups = await getOneCategoryGroups(category.id);

  return (
    <div className="container mx-auto gap-10 my-20">
      <main className="min-h-screen">
        <h1>/ grupos / {params.category}</h1>
        <div>
          <h1 className="font-bold text-4xl">
            Todos os grupos da categoria {category.title}
          </h1>
          <Suspense fallback={<>Carregando...</>}>
            <ListPlatforms />
          </Suspense>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
            <Suspense fallback={<>Carregando...</>}>
              <ShowGroups groups={groups} category={category} />
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
  );
}
