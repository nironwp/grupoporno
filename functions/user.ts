import { redirect } from "next/navigation";
import { headers } from "next/headers";

export type IUserOptions = {
  id: number;
  email: string;
  role: number;
};

export interface IGetAllUsers {
  status: number;
  message: string;
  data: IUserOptions[]
}

export const getLocalUser = (): IUserOptions => {
  const headersList = headers();
  const referer = headersList.get("user");

  if (!referer) return redirect("/login");

  return JSON.parse(referer);
};

