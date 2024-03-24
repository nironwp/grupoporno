import { cache } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { revalidateAdminPanel } from "./actions";
import { json } from "stream/consumers";

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
  const formData = new FormData();

  if (setting_image) {
    formData.append('config-image', setting_image);
  }

  if (confidential !== undefined) {
    formData.append('confidential', confidential ? '1' : '0');
  }

  formData.append('option', name);
  formData.append('valOption', newValue);

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}/settings/post`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': setting_image ? 'multipart/form-data' : 'application/json',
    },
    data: formData,
    maxBodyLength: Infinity,
  };

  try {
    const settingsRequest = await axios(config);
    revalidateAdminPanel(); // Assuming this function is defined elsewhere
    return settingsRequest;
  } catch (error) {
    // Handle error appropriately
    console.error('Error updating setting:', error);
    throw error;
  }
};
