import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlatformClientWrapper from "@/components/PlatformClientWrapper";
import { UserProvider } from "@/contexts/UserContext";
import { auth0 } from "@/lib/auth0";
import { getUser } from "@/lib/db/getUser";
import { UserData } from "@/lib/types";
import { ReactNode } from "react";

export default async function PlatformLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth0.getSession();

  const user = session?.user;

  let userData: UserData | null = null;

  if (user) {
    userData = await getUser({ userId: user.sub });
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950">
      <Header user={userData} />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <UserProvider userData={userData}>
          {userData && !userData.name ? (
            <PlatformClientWrapper userData={userData}>
              {children}
            </PlatformClientWrapper>
          ) : (
            <>{children}</>
          )}
        </UserProvider>
      </main>
      <Footer />
    </div>
  );
}
