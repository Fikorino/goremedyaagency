import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "@/lib/api";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    api
      .getSettings()
      .then((settings) => {
        if (settings.gaMeasurementId) {
          const script = document.createElement("script");
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.gaMeasurementId}`;
          document.head.appendChild(script);
          window.gtag = function gtag() {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(arguments);
          };
          window.gtag("js", new Date());
          window.gtag("config", settings.gaMeasurementId);
        }
      })
      .catch(() => null);
  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname
      });
    }
  }, [location]);

  return null;
}
