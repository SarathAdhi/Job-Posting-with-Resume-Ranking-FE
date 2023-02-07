import { useRouter } from "next/router";
import { useStore } from "../../utils/store";

import React from "react";

const withOutAuth = (Component) =>
  function pageProp({ ...pageProps }) {
    const { user } = useStore();
    const router = useRouter();

    if (user) {
      router.replace("/");
      return <></>;
    } else return <Component {...pageProps} />;
  };

withOutAuth.displayName = "withOutAuth";
export default withOutAuth;
