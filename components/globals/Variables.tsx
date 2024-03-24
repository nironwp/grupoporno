import { getSettings } from "@/functions/settings";

export const revalidate = 30;

export const Variables = async () => {
  const settings = await getSettings();

  return (
    <style>
      {`
          :root {
            --bg_first: ${settings.bg_first};
            --bg_secondary: ${settings.bg_secondary};
            --main_color: ${settings.main_color};
            --secondary_color: ${settings.secondary_color};
            --text_color: ${settings.text_color};
          }
        `}
    </style>
  );
};
