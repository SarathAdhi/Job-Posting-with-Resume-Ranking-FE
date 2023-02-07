import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Navbar = () => {
  const router = useRouter();

  return (
    <header className="w-full">
      <div className="flex justify-between">
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
