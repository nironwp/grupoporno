import { cache } from "react";
import axios from "axios";
import { revalidateAdminPanel } from "./actions";

export type ISettingsRequestOptions = {
  status: number;
  message: string;
  data: ISettingsOptions;
};

export type ISettingsOptions = {
  bg_first: string;
  bg_secondary: string;
  url_image: string;
  main_color: string;
  secondary_color: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  text_color: string;
  home_title: string;
  admin_email: string
  admin_email_password: string
  placeholder_search_bar: string;
  home_description: string;
  home_bg_url: string;
  home_category_title: string;
  home_category_desc: string;
  home_groups_title: string;
  home_groups_desc: string;
  recaptcha_key: string
  secret_recaptcha_key: string
};

export const revalidate = 30;
const cacheExpirationTime = 60000; // Tempo de expiração do cache em milissegundos (60 segundos)
let cachedSettings: ISettingsOptions | null = null;
let lastCacheUpdateTime: number | null = null;

export const getSettings = async () => {
  if (cachedSettings && lastCacheUpdateTime && Date.now() - lastCacheUpdateTime < cacheExpirationTime) {
    return cachedSettings;
  }

  const settingsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/settings/list/all`
  );

  const settings: ISettingsRequestOptions = settingsRequest.data;
  cachedSettings = settings.data;
  lastCacheUpdateTime = Date.now();

  // Configurar um temporizador para limpar o cache após o tempo de expiração
  setTimeout(() => {
    cachedSettings = null;
    lastCacheUpdateTime = null;
  }, cacheExpirationTime);

  return cachedSettings;
};
export const updateSetting = async (
  name: string,
  newValue: string,
  token: string,
  confidential?: boolean,
  setting_image?: File
) => {
  const data = new FormData()
  if(setting_image) {
    data.append('config-image', setting_image)
  }
  if(confidential) {
    data.append('confidential', String(confidential ? 1 : 0))
  }
  data.append('option', name)
  data.append('valOption', newValue)
  const config = {
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_API_URL}/settings/patch`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: data,
    maxBodyLength: Infinity,
  }
  const settingsRequest = await axios(config)


  revalidateAdminPanel();

  return settingsRequest;
};
