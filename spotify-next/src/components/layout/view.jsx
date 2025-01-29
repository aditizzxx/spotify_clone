import Sidebar from "src/components/Sidebar";
import AppLayout from "src/components/app/app";
import Player from "../Player";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function MainLayout({
  children,
  UserData,
  fetchArtistRoleWatcher,
}) {
  useEffect(() => {
    if (UserData?.data[0]?.becomeArtist?.forcedLogout == 2) {
      fetchArtistRoleWatcher({ forceLogout: true });
      signOut();
    }
  }, [UserData]);

  return (
    <>
      <main className="main">
        <Sidebar />
        <AppLayout>{children}</AppLayout>
        <Player />
      </main>
    </>
  );
}
