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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      {...pageProps}
    >
      <NextUIProvider>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute="class"
          value={{ light: lightTheme.className, dark: darkTheme.className }}
        >
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ThemeProvider>
      </NextUIProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
