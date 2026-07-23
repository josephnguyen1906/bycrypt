"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  adjustSaleSmartlyLauncherBottom,
  closeSaleSmartlyChat,
  isChatPath,
  pathsWithMobileNav,
} from "@/utils/saleSmartly";

const NAV_CLEARANCE_PX = 80;

/** Keeps SaleSmartly launcher off the mobile footer nav and hidden outside /chat. */
export default function SaleSmartlyRouteSync() {
  const pathname = usePathname();

  useEffect(() => {
    const onChat = isChatPath(pathname);
    const showNav = pathsWithMobileNav(pathname);

    document.body.dataset.bycryptSsHidden = onChat ? "false" : "true";
    document.body.dataset.bycryptNav = showNav ? "true" : "false";

    if (!onChat) {
      closeSaleSmartlyChat();
    }

    const applyLift = () => {
      if (showNav && !onChat) {
        adjustSaleSmartlyLauncherBottom(NAV_CLEARANCE_PX);
      }
    };

    applyLift();
    const observer = new MutationObserver(applyLift);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
