"use client";

import { useQueryState } from "nuqs";
import { FaDiscord, FaTelegram, FaTrash, FaWhatsapp } from "react-icons/fa";

export const ListPlatforms = () => {
  const [platform, setPlatform] = useQueryState("platform");

  return (
    <div className="flex gap-5 my-10 flex-wrap justify-between">
      <button
        onClick={() => setPlatform("discord")}
        className={`w-full flex items-center justify-center gap-2 max-w-full md:max-w-sm p-5 border-1 rounded shadow text-xl ${
          platform === "discord"
            ? "bg-theme-600 text-white font-bold"
            : "bg-theme-800 text-black"
        }`}
      >
        <FaDiscord />
        <span>Discord</span>
      </button>
      <button
        onClick={() => setPlatform("whatsapp")}
        className={`w-full flex items-center justify-center gap-2 max-w-full md:max-w-sm p-5 border-1 rounded shadow text-xl ${
          platform === "whatsapp"
            ? "bg-theme-600 text-white font-bold"
            : "bg-theme-800 text-black"
        }`}
      >
        <FaWhatsapp />
        <span>Whatsapp</span>
      </button>
      <button
        onClick={() => setPlatform("telegram")}
        className={`w-full flex items-center justify-center gap-2 max-w-full md:max-w-sm p-5 border-1 rounded shadow text-xl ${
          platform === "telegram"
            ? "bg-theme-600 text-white font-bold"
            : "bg-theme-800 text-black"
        }`}
      >
        <FaTelegram />
        <span>Telegram</span>
      </button>
      <button
        className="bg-red-500 h-[68px] aspect-square rounded shadow flex items-center justify-center text-white text-xl"
        onClick={() => setPlatform("")}
      >
        <FaTrash />
      </button>
    </div>
  );
};
