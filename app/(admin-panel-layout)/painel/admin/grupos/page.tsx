import { DeleteGroupDialog } from "@/components/panel/DeleteGroupDialog";
import { getAllCategories } from "@/functions/categories";
import { getAllApprovedGroups } from "@/functions/groups";
import { getSettings } from "@/functions/settings";
import { getCookie } from "@/lib/cookies";
import { Send, Trash } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin",
};

export default async function AdminPanelPage() {
  const approvedGroups = await getAllApprovedGroups();
  const categories = await getAllCategories();
  const settings = await getSettings();

  const token = await getCookie("auth:token");

  return (
    <div className="container">
      <div className="grid py-10 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {approvedGroups&& approvedGroups.map((group) => {
          return (
            <div
              key={group.id}
              className="bg-theme-800 p-10 rounded-lg h-fit flex items-center justify-between"
            >
              <div className="">
                <h1 className="text-2xl text-theme-500 font-bold">
                  {group.title}
                </h1>
                <p className="text-sm">
                  <b>Categoria</b>:{" "}
                  {
                    categories.find(
                      (category) => category.id === group.categoryId
                    )?.title
                  }
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/grupos/${categories.find(
                    (category) => category.id === group.categoryId
                  )?.slug}/${group.slug}`}
                  target="_blank"
                >
                  <Send color={settings.main_color} />
                </Link>
                <DeleteGroupDialog group={group} token={token?.value}>
                  <button>
                    <Trash color="#e65555" />
                  </button>
                </DeleteGroupDialog>
              </div>
            </div>
          );
        })}
      </div>
      {approvedGroups&& approvedGroups.length === 0 && (
        <h1 className="text-2xl w-full text-center font-bold mb-20">
          Nenhum grupo aprovado existente
        </h1>
      )}
    </div>
  );
}
