import { ReactNode } from "react";
import { Metadata } from "next";

import { getSettings } from "@/functions/settings";
import { getAllCategories } from "@/functions/categories";
import { getLocalUser } from "@/functions/user";

import { Navbar } from "@/components/globals/Navbar";
import { Footer } from "@/components/globals/Footer";
import { SubNav } from "@/components/panel/SubNav";
import { Toaster } from "@/components/ui/toaster";
import { SubNavAdmin } from "@/components/panel/SubNavAdmin";

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getSettings();

  return {
    title: {
      template: `%s | Painel ${settings.meta_title}`,
      default: settings.meta_title,
    },
  };
};

export default async function BaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSettings();
  const categories = await getAllCategories();
  const user = getLocalUser();

  return (
    <div>
      <Navbar settings={settings} categories={categories} />
      <SubNavAdmin />
      {children}
      <Footer />
    </div>
  );
}
