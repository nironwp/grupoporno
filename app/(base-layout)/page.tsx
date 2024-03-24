/* eslint-disable @next/next/no-img-element */
import { getSettings } from "@/functions/settings";
import Link from "next/link";
import { getAllCategories } from "@/functions/categories";
import { getAllImpulsedGroups, getHomeAllApprovedGroups } from "@/functions/groups";
import SimpleSlider from "@/components/globals/Slider";
export const revalidate = 30;

export default async function Home() {
  const settings = await getSettings();
  const categories = await getAllCategories();
  const groups = await getHomeAllApprovedGroups();
  const impulsedGroups = await getAllImpulsedGroups()


  return (
    <main>
      <div className="my-8 flex container mx-auto items-center justify-between flex-wrap">
        <div className="flex items-center gap-5">
          <img src="/telegram-icon.png" alt="Logo do telegram" />
          <div>
            <h1 className="font-bold text-3xl">Instalar o telegram</h1>
            <p>Instale agora mesmo o telegram!</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="https://apps.apple.com/app/telegram-messenger/id686449807"
            target="_blank"
            className="transition-all hover:scale-105"
          >
            <img src="/apple.jpeg" alt="Apple Store" />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=org.telegram.messenger"
            target="_blank"
            className="transition-all hover:scale-105"
          >
            <img src="/google.jpeg" alt="Google Play" />
          </Link>
        </div>
      </div>
      <div className="container max-h-[40vh] mx-auto"> 
        {
        categories && impulsedGroups &&
        <SimpleSlider categories={categories} groups={impulsedGroups} />
        }
      </div>
      <div className="container mx-auto md:my-10">
        <div className="flex items-center justify-center">
          <div className="max-w-2xl text-center">
            <h1 className="text-3xl font-bold">
              {settings.home_category_title}
            </h1>
            <p>{settings.home_category_desc}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5">
          { categories && categories.map((category) => {
            return (
              <Link
                key={category.slug}
                href={`/grupos/${category.slug}?platform=telegram`}
                style={{
                  background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${category.banner_image})`,
                  backgroundPosition: "center center",
                }}
                className="text-center flex flex-col justify-end h-64 items-center w-full rounded p-5 transition-all hover:scale-105 "
              >
                <span className="text-sm font-bold uppercase text-white">
                  Telegram
                </span>
                <h1 className="text-theme-500 text-2xl font-bold uppercase">
                  {category.title}
                </h1>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="container mx-auto my-20">
        <div className="flex items-center justify-center">
          <div className="max-w-2xl text-center">
            <h1 className="text-3xl font-bold">{settings.home_groups_title}</h1>
            <p>{settings.home_groups_desc}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5">
          {groups && groups.map((group) => {
            return (
              <Link
                key={group.id}
                href={`/grupos/${categories.find(
                  (category) => category.id === group.categoryId
                )?.slug}/${group.slug}`}
                style={{
                  background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${process.env.NEXT_PUBLIC_FILES_URL+"/"+group.bannerImage})`,
                  backgroundPosition: "center center",
                }}
                className="text-center flex flex-col justify-end aspect-square items-center w-full rounded p-5 transition-all hover:scale-105 "
              >
                <span className="text-sm font-bold uppercase text-white">
                  {group.type === "group" ? "Grupo" : "Canal"}
                </span>
                <h1 className="text-theme-500 text-2xl font-bold uppercase">
                  {group.title}
                </h1>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center justify-center mt-5">
          <Link
            href="/grupos"
            className="px-5 py-3 text-2xl font-bold bg-theme-500 text-white rounded"
          >
            Ver todos
          </Link>
        </div>
      </div>
    </main>
  );
}
