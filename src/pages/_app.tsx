import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "next-themes";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import SiteLayout from "~/components/SiteLayout";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <ThemeProvider
        disableTransitionOnChange
        enableSystem
        attribute="class"
        value={{ light: lightTheme.className, dark: darkTheme.className }}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
          {...pageProps}
        >
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ClerkProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
