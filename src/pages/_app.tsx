import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <ThemeProvider disableTransitionOnChange attribute="class">
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
          {...pageProps}
        >
          <Component {...pageProps} />
        </ClerkProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
