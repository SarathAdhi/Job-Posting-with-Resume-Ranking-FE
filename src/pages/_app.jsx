import {
  Backdrop,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { useStore } from "../utils/store";

const theme = createTheme({
  components: {},
});

function MyApp({ Component, pageProps }) {
  const { getProfile } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  async function getMyProfile() {
    await getProfile();

    setIsLoading(false);
  }

  useEffect(() => {
    getMyProfile();
  }, []);

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: 999 }}
        open={isLoading}
        children={<CircularProgress color="inherit" />}
      />
    );

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default MyApp;
