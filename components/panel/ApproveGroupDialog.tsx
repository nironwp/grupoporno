"use client";

import { ReactNode } from "react";

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

import { IGroupOptions, updateOneGroup } from "@/functions/groups";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "../ui/use-toast";
import { getLocalUser } from "@/functions/user";
import { getCookie } from "@/lib/cookies";

export const ApproveGroupDialog = ({
  children,
  group,
  token,
}: {
  children: ReactNode;
  group: IGroupOptions;
  token: string | undefined;
}) => {
  const handleApproveGroup = async () => {
    const updatedGroup = await updateOneGroup(
      group.id,
      { stApproved: true },
      token || ""
    );

    if (updatedGroup.data.status === 200) {
      toast({
        title: "Grupo aprovado com sucesso",
        variant: "success",
      });
    } else {
      toast({
        title: "Erro ao aprovar o grupo",
        variant: "destructive",
        description: updatedGroup.data.message,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[330px] sm:max-w-[425px] rounded-lg shadow">
        <DialogHeader>
          <DialogTitle>Aprovar grupo</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja aprovar o grupo {group.title}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="submit">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="default"
              type="submit"
              onClick={() => handleApproveGroup()}
            >
              Aprovar grupo
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
