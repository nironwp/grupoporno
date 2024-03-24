/* eslint-disable @next/next/no-img-element */
import { getAllCategories } from "@/functions/categories";
import { getSettings } from "@/functions/settings";
import Link from "next/link";

export const Footer = async () => {
  const settings = await getSettings();
  const categories = await getAllCategories();

  return (
    <footer className="bg-theme-500 py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between flex-wrap">
          <img
            className="max-w-xs"
            src={settings.url_image}
            alt={settings.meta_title}
          />
          <ul className="flex gap-5 flex-wrap items-center text-white text-lg font-bold">
            {categories.map((category) => {
              return (
                <Link
                  className="transition-all hover:text-black"
                  key={category.id}
                  href={`/grupos/${category.slug}`}
                >
                  {category.title}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};
