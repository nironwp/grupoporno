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

import { IGroupOptions, deleteOneGroup } from "@/functions/groups";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "../ui/use-toast";

export const DeleteGroupDialog = ({
  children,
  group,
  token,
}: {
  children: ReactNode;
  group: IGroupOptions;
  token: string | undefined;
}) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[330px] sm:max-w-[425px] rounded-lg shadow">
        <DialogHeader>
          <DialogTitle>Deletar grupo</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja deletar o grupo {group.title}?
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
              onClick={() => handleDeleteGroup()}
            >
              Deletar grupo
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
