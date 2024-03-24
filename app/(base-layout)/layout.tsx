import { ReactNode } from "react";
import { Metadata } from "next";
import { getSettings } from "@/functions/settings";
import { Navbar } from "@/components/globals/Navbar";
import { getAllCategories } from "@/functions/categories";
import { Footer } from "@/components/globals/Footer";


export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getSettings();

  return {
    title: {
      template: `%s | ${settings.meta_title}`,
      default: settings.meta_title,
    },
    description: settings.meta_description,
    keywords: settings.meta_keywords,
    
  };
};

export default async function BaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSettings();
  const categories = await getAllCategories();

  return (
    <>
  
      <Navbar settings={settings} categories={categories} />
      {children}
      <Footer />
    </>
  );
}
