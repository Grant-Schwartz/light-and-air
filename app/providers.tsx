// app/providers.tsx
"use client";

import theme from "@/utils/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { SaasProvider } from "@saas-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <SaasProvider resetCSS theme={theme}>
        {children}
      </SaasProvider>
    </CacheProvider>
  );
}
