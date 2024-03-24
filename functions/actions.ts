"use server";

import { revalidatePath } from "next/cache";

export const revalidatePanel = () => {
  revalidatePath("/painel");
};

export const revalidateAdminPanel = () => {
  revalidatePath("/painel/admin");
};
