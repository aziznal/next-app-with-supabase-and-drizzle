"use client";

import { Button } from "@/components/ui/button";
import { getCustomClientComponentClient } from "@/server/supabase/client-utils";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export type HeaderProps = {
  initialSession: Session | null;
};

export default function Header({ initialSession }: HeaderProps) {
  const supabase = getCustomClientComponentClient();

  const [currentSession, setCurrentSession] = useState(initialSession);

  useEffect(() => {
    const setSession = async () => {
      const session = await supabase.auth.getSession();

      setCurrentSession(session.data.session);
    };

    setSession();
  }, [supabase, setCurrentSession]);

  return (
    <div className="w-full bg-white flex justify-between px-4 lg:px-52 items-center h-[80px] shadow-gray-400 shadow-md sticky top-0 shrink-0">
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="link" tabIndex={-1}>
            Home
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        {!currentSession && (
          <>
            <Link href="/login">
              <Button variant="outline" tabIndex={-1}>
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button tabIndex={-1}>Register</Button>
            </Link>
          </>
        )}

        {currentSession && (
          <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-400">logged in as:{' '}</span>
            <span>{currentSession.user?.email}</span>
          </div>

            <Button
              onClick={() => {
                supabase.auth.signOut().then(() => location.reload());
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
