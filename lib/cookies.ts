"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, content: string) {
  cookies().set(name, content);
}

export async function getCookie(name: string) {
  return cookies().get(name);
}

export async function deleteCookie(name: string) {
  return cookies().delete(name);
}
