"use client";

import { ReactNode, useState } from "react";

import { ICategoryOptions, createOneCategory } from "@/functions/categories";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "../ui/use-toast";
import { createOneGroup } from "@/functions/groups";
import { getCookie } from "@/lib/cookies";
import { DialogClose } from "@radix-ui/react-dialog";

export const NewCategoryDialog = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  const validateForm = (): boolean => {
    if (title.length === 0) {
      toast({
        title: "Preencha o título da categoria",
        variant: "destructive",
      });

      return false;
    }

    if (slug.length === 0) {
      toast({
        title: "Preencha o slug da categoria",
        variant: "destructive",
      });

      return false;
    }

    if (slug.length === 0) {
      toast({
        title: "Defina uma imagem para a categoria",
        variant: "destructive",
      });

      return false;
    }

    return true;
  };

  const handleCreateNewCategory = async () => {
    if (validateForm()) {
      createOneCategory(title, bannerImage, slug, token)
        .then((response) => {
          if (response.status === 200) {
            toast({
              title: "Categoria criada com sucesso",
              variant: "success",
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Erro ao criar categoria",
            description: error.response.data.message,
            variant: "destructive",
          });
        });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[330px] sm:max-w-[425px] rounded-lg shadow">
        <DialogHeader>
          <DialogTitle>Criar categoria</DialogTitle>
          <DialogDescription>
            Preencha as informações corretamente!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome da categoria
            </Label>
            <Input
              id="name"
              placeholder="Categoria legal"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Slug da categoria
            </Label>
            <Input
              id="username"
              placeholder="categoria"
              className="col-span-3"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Link da imagem
            </Label>
            <Input
              id="username"
              placeholder="https://imagem.google/imagem.png"
              className="col-span-3"
              onChange={(e) => setBannerImage(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={handleCreateNewCategory}>
              Criar categoria
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
