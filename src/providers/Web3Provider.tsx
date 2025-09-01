"use client";

import { useEffect, useState } from "react";
import {
    RainbowKitProvider,
    Theme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiConfig } from "@/lib/wagmi";

const queryClient = new QueryClient();

const theme: Theme = {
    blurs: {
        modalOverlay: "large",
    },
    colors: {
        accentColor: "oklch(83.29% 0.2331 132.51)",
        accentColorForeground: "oklch(0% 0 0)",
        actionButtonBorder: "oklch(0% 0 0)",
        actionButtonBorderMobile: "oklch(0% 0 0)",
        actionButtonSecondaryBackground: "oklch(95.37% 0.0549 125.19)",
        closeButton: "oklch(0% 0 0)",
        closeButtonBackground: "transparent",
        connectButtonBackground: "oklch(83.29% 0.2331 132.51)",
        connectButtonBackgroundError: "#FF4D50",
        connectButtonInnerBackground: "oklch(100% 0 0)",
        connectButtonText: "oklch(0% 0 0)",
        connectButtonTextError: "oklch(100% 0 0)",
        connectionIndicator: "#8AE500",
        downloadBottomCardBackground: "oklch(100% 0 0)",
        downloadTopCardBackground: "oklch(95.37% 0.0549 125.19)",
        error: "#FF4D50",
        generalBorder: "oklch(0% 0 0)",
        generalBorderDim: "oklch(0% 0 0)",
        menuItemBackground: "oklch(83.29% 0.2331 132.51)",
        modalBackdrop: "oklch(0% 0 0 / 0.8)",
        modalBackground: "oklch(100% 0 0)",
        modalBorder: "oklch(0% 0 0)",
        modalText: "oklch(0% 0 0)",
        modalTextDim: "oklch(0% 0 0 / 0.5)",
        modalTextSecondary: "oklch(0% 0 0 / 0.6)",
        profileAction: "oklch(100% 0 0)",
        profileActionHover: "oklch(95.37% 0.0549 125.19)",
        profileForeground: "oklch(100% 0 0)",
        selectedOptionBorder: "oklch(0% 0 0)",
        standby: "#FACC00",
    },
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    radii: {
        actionButton: "0px",
        connectButton: "0px",
        menuButton: "0px",
        modal: "0px",
        modalMobile: "0px",
    },
    shadows: {
        connectButton: "4px 4px 0px 0px oklch(0% 0 0)",
        dialog: "4px 4px 0px 0px oklch(0% 0 0)",
        profileDetailsAction: "none",
        selectedOption: "4px 4px 0px 0px oklch(0% 0 0)",
        selectedWallet: "4px 4px 0px 0px oklch(0% 0 0)",
        walletLogo: "2px 2px 0px 0px oklch(0% 0 0)",
    },
};

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <WagmiProvider config={WagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={theme}>{mounted && children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default Web3Provider;
