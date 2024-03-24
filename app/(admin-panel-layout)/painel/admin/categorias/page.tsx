import { DeleteCategoryDialog } from "@/components/panel/DeleteCategoryDialog";
import { EditCategoryDialog } from "@/components/panel/EditCategoryDialog";
import { NewCategoryDialog } from "@/components/panel/NewCategoryDialog";
import { getAllCategories } from "@/functions/categories";
import { getCookie } from "@/lib/cookies";
import { Pencil, Trash } from "lucide-react";

export const metadata = {
  title: "Admin",
};

export default async function AdminPanelPage() {
  const categories = await getAllCategories();
  const token = await getCookie("auth:token");

  return (
    <div className="container">
      <NewCategoryDialog token={token?.value || ""}>
        <button className="mt-10 p-5 bg-theme-500 rounded w-full text-2xl text-white font-bold">
          Adicionar categoria
        </button>
      </NewCategoryDialog>
      <div className="grid py-10 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="bg-theme-800 p-10 rounded-lg h-fit flex items-center justify-between"
            >
              <div className="">
                <h1 className="text-2xl text-theme-500 font-bold">
                  {category.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <DeleteCategoryDialog category={category} token={token?.value}>
                  <button>
                    <Trash color="#e65555" />
                  </button>
                </DeleteCategoryDialog>
                <EditCategoryDialog category={category}  token={token?.value}>
                  <button>
                    <Pencil color="#13ff46" />
                  </button>
                </EditCategoryDialog>
              </div>
            </div>
          );
        })}
      </div>
      {categories.length === 0 && (
        <h1 className="text-2xl w-full text-center font-bold mb-20">
          Nenhuma categoria existente
        </h1>
      )}
    </div>
  );
}
