
import axios from "axios";
import { Trash } from "lucide-react";
import { cookies } from "next/headers";


export const metadata = {
  title: "Admin",
};

type IUserOptions = {
  id: number;
  email: string;
  role: number;
};

export interface IGetAllUsers {
  status: number;
  message: string;
  data: IUserOptions[]
}

const getAllUsers = async (token: string): Promise<IGetAllUsers> => {
  try {
    const usersRequest = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/list/all?page=1&pagesize=10`,
      null,
      {
        headers: {
          Authorization: 'Bearer '+ token
        }
      }
    );
    const groups: IGetAllUsers = await usersRequest.data as any;

    return groups;

  } catch (error) {
    console.log(error)
    return null
  }
}

export default async function AdminPanelPage() {
  const cookiesTore = cookies(); 

  let users: null | IGetAllUsers = await getAllUsers(cookiesTore.get('auth:token').value);

  return (
    <div className="container">
        <p>
          Por motivos de segurança deleções de úsuario não são permitidas pelo script, acesse seu cpanel/WHM e execute a deleção via o phpMyAdmin
        </p>
      <div className="grid py-10 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {users && users.data.map((user: any) => {
          return (
            <div
              key={user.id}
              className="bg-theme-800 p-10 rounded-lg h-fit flex items-center justify-between"
            >
              <div className="">
                <h1 className="text-sm text-theme-500 font-bold">
                  {user.email}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      {!users || users.data.length === 0 && (
        <h1 className="text-2xl w-full text-center font-bold mb-20">
          Nenhum Usuario Existente
        </h1>
      )}
    </div>
  );
}
