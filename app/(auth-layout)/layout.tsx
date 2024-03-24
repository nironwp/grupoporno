import { ReactNode } from "react";
import { Metadata } from "next";
import { getSettings } from "@/functions/settings";
import { Navbar } from "@/components/globals/Navbar";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { getAllCategories } from "@/functions/categories";
import { Footer } from "@/components/globals/Footer";

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getSettings();

  return {
    title: {
      template: `%s | ${settings.meta_title}`,
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

  return (
    <div className="h-screen min-h-screen flex flex-col justify-between"> 
        <Navbar settings={settings} categories={categories} />
        <main>{children}</main>
        <Footer />
    </div>
  );
}
