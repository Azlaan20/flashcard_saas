import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const clerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

const clerk = clerkConfigured ? clerkMiddleware() : null;

export default function proxy(request, event) {
  if (!clerk) {
    return NextResponse.next();
  }

  return clerk(request, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
