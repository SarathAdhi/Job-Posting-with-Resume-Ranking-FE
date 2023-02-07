import clsx from "clsx";
import Head from "next/head";
import React from "react";
import { Navbar } from "../components/Navbar";

export const PageLayout = ({ title = "", className = "", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="bg-slate-200 w-full min-h-screen flex flex-col items-center">
        <Navbar />

        <section
          className={clsx("max-w-full w-[1440px] p-3 sm:p-5", className)}
        >
          {children}
        </section>
      </main>
    </>
  );
};
