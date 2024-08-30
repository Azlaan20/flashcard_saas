import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Apply Clerk middleware to all routes except Next.js internals, static files, and assets
    "/((?!_next|static|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run Clerk middleware for API routes and TRPC routes
    "/api/(.*)",
    "/trpc/(.*)",
  ],
};
