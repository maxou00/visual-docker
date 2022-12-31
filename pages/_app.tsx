import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theming";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Toaster toastOptions={{
        style: {
          background: "var(--app-colors-background)",
          color: "var(--app-colors-onBackground)",
          fontFamily: "var(--app-fonts-heading)"
        }
      }}/>
    </ChakraProvider>
  );
}
