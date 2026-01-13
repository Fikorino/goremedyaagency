import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { api } from "@/lib/api";

export const Analytics = () => {
  const [gaId, setGaId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    api.getSettings()
      .then((settings) => setGaId(settings.googleAnalyticsId || null))
      .catch(() => null);
  }, []);

  useEffect(() => {
    if (!gaId) return;
    if ((window as any).gtag) {
      (window as any).gtag("config", gaId, { page_path: location.pathname });
    }
  }, [gaId, location.pathname]);

  if (!gaId) return null;

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);} 
        gtag('js', new Date());
        gtag('config', '${gaId}', { page_path: window.location.pathname });
      `}</script>
    </Helmet>
  );
};
