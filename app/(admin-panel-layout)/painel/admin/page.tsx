import { ApproveGroupDialog } from "@/components/panel/ApproveGroupDialog";
import { DeleteGroupDialog } from "@/components/panel/DeleteGroupDialog";
import { ShowDescription } from "@/components/panel/ShowDescription";
import { getAllCategories } from "@/functions/categories";
import { getAllApprovedGroups, getAllReprovedGroups } from "@/functions/groups";
import { getCookie } from "@/lib/cookies";
import { Check, X } from "lucide-react";
import Link from "next/link";


export const metadata = {
  title: "Admin",
};

export default async function AdminPanelPage() {
  const approvedGroups = await getAllApprovedGroups();
  const reprovedGroups = await getAllReprovedGroups();
  const categories = await getAllCategories();
  const token = await getCookie("auth:token");

  return (
    <div className="container">
      <div className="grid py-10 gap-10 grid-cols-1 lg:grid-cols-2">
        <div className="bg-theme-800 p-10 rounded-lg h-fit">
          <h1 className="text-theme-500 font-bold text-3xl">
            Grupos pendentes
          </h1>
          <ul className="mt-5 flex flex-col gap-3">
            {reprovedGroups && reprovedGroups.map((group) => {
              return (
                <li
                  key={group.id}
                  className="flex justify-between items-center border border-theme-500 p-5 rounded transition-all hover:text-white hover:bg-theme-500 group"
                >
                  <Link href={group.link} target="_blank">
                    <div>
                      <div>
                        <h1 className="text-xl font-bold text-theme-600 group-hover:text-white transition-all">
                          {group.title}
                        </h1>
                        <span>
                          <b>Categoria:</b>{" "}
                          {
                            categories.find(
                              (category) => category.id === group.categoryId
                            )?.title
                          }
                        </span>
                        <p>
                          <b>Descrição:</b>
                        </p>
                        <ShowDescription
                          className="mt-1 p-4"
                          value={group.description}
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="flex gap-2">
                    <ApproveGroupDialog group={group} token={token?.value}>
                      <button className="w-10 h-10 bg-[#55e661] rounded-lg flex items-center justify-center">
                        <Check color="#fff" size={24} />
                      </button>
                    </ApproveGroupDialog>
                    <DeleteGroupDialog group={group} token={token?.value}>
                      <button className="w-10 h-10 bg-[#e65555] rounded-lg flex items-center justify-center">
                        <X color="#fff" size={24} />
                      </button>
                    </DeleteGroupDialog>
                  </div>
                </li>
              );
            })}
            {reprovedGroups && reprovedGroups.length === 0 && (
              <h1 className="text-slate-500">
                Nenhum grupo pendente encontrado!
              </h1>
            )}
          </ul>
        </div>
        <div className="bg-theme-800 p-10 rounded-lg h-fit">
          <h1 className="text-theme-500 font-bold text-3xl">Estastísticas</h1>
          <div className="flex flex-col text-2xl mt-5 p-10 rounded-lg border border-theme-text">
            Você tem{" "}
            <span className="text-5xl font-bold text-theme-500">
              {approvedGroups && approvedGroups.length} grupos
            </span>{" "}
            <b className="text-sm text-slate-500 mt-1">Aprovados</b>
          </div>
          <div className="flex flex-col text-2xl mt-5 p-10 rounded-lg border border-theme-text">
            Você tem{" "}
            <span className="text-5xl font-bold text-theme-500">
              {reprovedGroups && reprovedGroups.length} grupos
            </span>{" "}
            <b className="text-sm text-slate-500 mt-1">Aguardando aprovação</b>
          </div>
        </div>
      </div>
    </div>
  );
}
