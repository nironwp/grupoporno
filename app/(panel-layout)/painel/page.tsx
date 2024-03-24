import { DeleteGroupDialog } from "@/components/panel/DeleteGroupDialog";
import { ImpGroupDialog } from "@/components/panel/ImpGroupDialog";
import { getAllApprovedGroups, getAllReprovedGroups } from "@/functions/groups";
import { IPlan, getAllPlans } from "@/functions/plan";
import { getLocalUser } from "@/functions/user";
import { getCookie } from "@/lib/cookies";
import { Trash } from "lucide-react";
import Link from "next/link";

export default async function PanelPage() {
  const approvedGroups = await getAllApprovedGroups();
  const reprovedGroups = await getAllReprovedGroups();
  const user = getLocalUser();
  const plans = await getAllPlans() as IPlan[]
  const token = await getCookie("auth:token");

  return (
    <div className="container">
      <div className="grid py-10 gap-10 grid-cols-1 lg:grid-cols-2">
        <div className="bg-theme-800 p-10 rounded-lg h-fit">
          <h1 className="text-theme-500 font-bold text-3xl">Seus grupos</h1>
          <ul className="mt-5 flex flex-col gap-3">
            {approvedGroups && approvedGroups
              .filter((group) => group.userIdCreated === user.id)
              .map((group) => {
                return (
                  <li
                    key={group.id}
                    className="flex justify-between items-center border border-theme-500 p-5 rounded transition-all hover:text-white hover:bg-theme-500 group"
                  >
                    <Link href={group.link} target="_blank">
                      <h1 className="text-xl font-bold text-theme-600 group-hover:text-white transition-all">
                        {group.title}
                      </h1>
                    </Link>
                    {
                      !group.impulse &&
                      <ImpGroupDialog plans={plans} group={group} token={token?.value}>
                        <button className="font-bold text-yellow-500">
                          Impulsionar
                        </button>
                      </ImpGroupDialog>
                    }
                     {
                      group.impulse &&
                        <button className="font-bold text-green-500">
                          Impulsionado ({new Date(group.impulse_end_date).getUTCMonth()}/{new Date(group.impulse_end_date).getUTCDate()})
                        </button>
                    }
                    <DeleteGroupDialog group={group} token={token?.value}>
                      <button>
                        <Trash color="#e65555" />
                      </button>
                    </DeleteGroupDialog>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="bg-theme-800 p-10 rounded-lg h-fit">
          <h1 className="text-theme-500 font-bold text-3xl">Estastísticas</h1>
          <div className="flex flex-col text-2xl mt-5 p-10 rounded-lg border border-theme-text">
            Você tem{" "}
            <span className="text-5xl font-bold text-theme-500">
              {
                approvedGroups &&
                approvedGroups.filter(
                  (group) => group.userIdCreated === user.id
                ).length
              }{" "}
              grupos
            </span>{" "}
            <b className="text-sm text-slate-500 mt-1">Aprovados</b>
          </div>
          <div className="flex flex-col text-2xl mt-5 p-10 rounded-lg border border-theme-text">
            Você tem{" "}
            <span className="text-5xl font-bold text-theme-500">
              {
                reprovedGroups && 
                reprovedGroups.filter(
                  (group) => group.userIdCreated === user.id
                ).length
              }{" "}
              grupos
            </span>{" "}
            <b className="text-sm text-slate-500 mt-1">
              Pendentes de aprovação
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}
