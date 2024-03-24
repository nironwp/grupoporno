"use client";

import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IGroupOptions, createImpulseCheckout, deleteOneGroup } from "@/functions/groups";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "../ui/use-toast";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { FaChevronDown } from "react-icons/fa";
import { IPlan } from "@/functions/plan";
export const ImpGroupDialog = ({
  children,
  group,
  plans,
  token,
}: {
  children: ReactNode;
  group: IGroupOptions;
  plans: IPlan[];
  token: string | undefined;
}) => {
    const [selectedPlan, setSelectedPlan] = useState<IPlan | null | undefined>(null);

  const handlePlanSelect = (planId: number) => {
    const selected = plans.find(plan => plan.id === planId);
    setSelectedPlan(selected);
  };
  const handleDeleteGroup = async () => {
    const updatedGroup = await deleteOneGroup(group.id, token || "");

    if (updatedGroup.data.status === 200) {
      toast({
        title: "Grupo deletado com sucesso",
        variant: "success",
      });
    } else {
      toast({
        title: "Erro ao deletar o grupo",
        variant: "destructive",
        description: updatedGroup.data.message,
      });
    }
  };
  console.log(plans)
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[330px] sm:max-w-[425px] rounded-lg shadow">
        <DialogHeader>
          <DialogTitle>Impulsionar {group.type}</DialogTitle>
          <DialogDescription>
            Qual plano deseja ativar ({group.title})?
          </DialogDescription>
        </DialogHeader>
        <ul>
        {plans.map(plan => (
          <li key={plan.id}>
            <label>
              <input
                type="radio"
                name="plan"
                className="mr-2"
                value={plan.id}
                onChange={() => handlePlanSelect(plan.id)}
              />
              {plan.name} - R${plan.value} ({plan.time} dias)
            </label>
          </li>
        ))}
      </ul>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="submit">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            {
                selectedPlan &&
                    <Button
                    variant="default"
                    type="submit"
                    onClick={async () => {
                        const checkout = await createImpulseCheckout(group.id, selectedPlan.id, token as string)
                        console.log(checkout)
                        window.open(checkout.data.url, '_blank')
                    }}
                    >
                        Impulsionar
                    </Button>
            }
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
