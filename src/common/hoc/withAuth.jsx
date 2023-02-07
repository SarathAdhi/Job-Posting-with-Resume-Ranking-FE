import { useRouter } from "next/router";
import { useStore } from "../../utils/store";
import React from "react";

const withAuth =
  (checkIsRecruiter = false) =>
  (Component) =>
    function pageProp({ ...pageProps }) {
      const { user, isRecruiter } = useStore();
      const router = useRouter();

      const check = checkIsRecruiter ? isRecruiter : !!user;

      if (check) return <Component {...pageProps} />;
      else {
        router.replace(
          checkIsRecruiter && !isRecruiter
            ? "/auth/register?isRecruiter=true"
            : "/auth/login"
        );
        return <></>;
      }
    };

withAuth.displayName = "withAuth";
export default withAuth;
