import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (description) {
      if (metaDesc) metaDesc.setAttribute('content', description);
      else {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        m.setAttribute('content', description);
        document.head.appendChild(m);
      }
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (description && ogDesc) ogDesc.setAttribute('content', description);

    const linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const url = canonical || window.location.href;
    if (linkCanonical) linkCanonical.href = url;
    else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
  }, [title, description, canonical]);

  return null;
}
