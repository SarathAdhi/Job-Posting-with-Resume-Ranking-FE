import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useStore } from "../../../utils/store";

export const Navbar = () => {
  const router = useRouter();

  const { isRecruiter } = useStore();

  return (
    <header className="w-full">
      <div className="flex justify-between">
        {isRecruiter && <Link href="/dashboard">Dashboard</Link>}

        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
        <Link href="/job/suggestion">Job Suggestion</Link>
        <Link href="/job/create">Create Job Post</Link>
        <Link href="/job">Job Post</Link>

        <Button
          color="error"
          onClick={() => {
            localStorage.removeItem("token");
            router.reload();
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
