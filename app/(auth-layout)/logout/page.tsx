"use client";

import { deleteCookie, setCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";

export default function LogoutPage() {
  async function logoutCookie() {
    deleteCookie("auth:token");
  }

  logoutCookie();

  return redirect("/login");
}
