import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 보호된 경로 목록
  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // 세션이 없고 보호된 경로에 접근하려는 경우
  if (!session && isProtectedPath) {
    const url = new URL("/", req.url);
    url.searchParams.set("auth_required", "true");
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
