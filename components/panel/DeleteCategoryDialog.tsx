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
import { ICategoryOptions, deleteOneCategory } from "@/functions/categories";

export const DeleteCategoryDialog = ({
  children,
  category,
  token,
}: {
  children: ReactNode;
  category: ICategoryOptions;
  token: string | undefined;
}) => {
  const handleDeleteCategory = async () => {
    const deletedCategory = await deleteOneCategory(category.id, token || "");

    if (deletedCategory.data.status === 200) {
      toast({
        title: "Grupo deletado com sucesso",
        variant: "success",
      });
    } else {
      toast({
        title: "Erro ao deletar o grupo",
        variant: "destructive",
        description: deletedCategory.data.message,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[330px] sm:max-w-[425px] rounded-lg shadow">
        <DialogHeader>
          <DialogTitle>Deletar categoria</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja deletar a categoria {category.title}?
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
              onClick={() => handleDeleteCategory()}
            >
              Deletar categoria
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
