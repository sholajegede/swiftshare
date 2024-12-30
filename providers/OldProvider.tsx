"use client";

import { ReactNode, useCallback, useMemo } from "react";
import { KindeProvider, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ConvexProviderWithAuth } from "convex/react";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function useAuthFromKinde() {
  const { isLoading, isAuthenticated, getToken } = useKindeBrowserClient();

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (forceRefreshToken) {
        try {
          const response = await getToken();
          return response as string; // Ensure a string is returned
        } catch (error) {
          console.error("Failed to fetch token:", error);
          return null;
        }
      }
      return null;
    },
    [getToken]
  );

  return useMemo(
    () => ({
      isLoading: !!isLoading, // Ensure it is a boolean
      isAuthenticated: !!isAuthenticated, // Ensure it is a boolean
      fetchAccessToken,
    }),
    [isLoading, isAuthenticated, fetchAccessToken]
  );
}

const ConvexKindeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <KindeProvider
      clientId={process.env.KINDE_CLIENT_ID!}
      domain={process.env.KINDE_ISSUER_URL!}
      redirectUri={process.env.KINDE_POST_LOGIN_REDIRECT_URL!}
      logoutRedirectUri={process.env.KINDE_POST_LOGOUT_REDIRECT_URL!}
      audience="convex"
      isDangerouslyUseLocalStorage={true}
    >
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromKinde}>
        {children}
      </ConvexProviderWithAuth>
    </KindeProvider>
  );
};

export default ConvexKindeProvider;