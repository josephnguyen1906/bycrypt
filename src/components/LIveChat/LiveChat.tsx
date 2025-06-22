"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __lc?: {
      license?: number;
      integration_name?: string;
      product_name?: string;
    };
  }
}

export default function LiveChatWidget() {
  useEffect(() => {
    window.__lc = window.__lc || {};
    window.__lc.license = 19194779;
    window.__lc.integration_name = "manual_onboarding";
    window.__lc.product_name = "livechat";

    const script = document.createElement("script");
    script.src = "https://cdn.livechatinc.com/tracking.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <noscript>
      <a href="https://www.livechat.com/chat-with/19194779/" rel="nofollow">
        Chat with us
      </a>
      , powered by{" "}
      <a
        href="https://www.livechat.com/?welcome"
        rel="noopener nofollow"
        target="_blank"
      >
        LiveChat
      </a>
    </noscript>
  );
}
