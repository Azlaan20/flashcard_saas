import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flashcard SaaS",
  description: "AI-powered flashcard generation and study app",
};

export default function RootLayout({ children }) {
  const clerkConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );

  if (!clerkConfigured) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <main style={{ maxWidth: 720, margin: "80px auto", padding: 24 }}>
            <h1>Flashcard SaaS is temporarily unavailable</h1>
            <p>
              Authentication is not configured for this deployment. The site owner needs
              to add the Clerk production environment variables and redeploy.
            </p>
          </main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
