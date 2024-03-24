import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "@/lib/cookies";

export async function middleware(request: NextRequest) {
  const token = await getCookie("auth:token");

  if (!token || !token?.value || token?.value.length === 0) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/token/${token.value}`,
    {
      method: "GET",
    }
  );
  const res = await user.json();

  console.log(res);

  if (res.status === 400) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "user",
    JSON.stringify({
      id: res.data.id,
      email: res.data.email,
      role: res.data.role,
    })
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

// @ts-ignore
export const config = {
  matcher: "/painel/:path*",
};
