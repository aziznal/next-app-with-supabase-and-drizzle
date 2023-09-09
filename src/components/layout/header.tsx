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

  console.log(currentSession);

  return (
    <div className="w-full bg-white flex justify-between px-4 lg:px-52 items-center h-[80px] shadow-gray-400 shadow-md sticky top-0 shrink-0">
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="link">Home</Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>

        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}