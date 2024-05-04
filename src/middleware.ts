import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { USER_ROLE } from "./constants/role";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password", "/doctors"];
const roleBasedPrivateRoutes = {
    PATIENT: [/^\/dashboard\/patient/],
    DOCTOR: [/^\/dashboard\/doctor/],
    ADMIN: [/^\/dashboard\/admin/],
    SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } 
        else {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (accessToken && commonPrivateRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    let role = null;

    if (accessToken) role = (jwtDecode(accessToken) as any).role;

    if (!role) return NextResponse.redirect(new URL("/", req.url));

    if (role && roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/dashboard/:page*", "/doctors/:page*"],
};
