import NextHead from "next/head";

// Define the props interface for the Head component
interface HeadProps {
  title: string;
  description: string;
}

// Head component for setting metadata and SEO-related tags
export const Head: React.FC<HeadProps> = ({ title, description }) => (
  <NextHead>
    {/* Set the page title */}
    <title>{title}</title>

    {/* Basic metadata */}
    <meta content={description} name="description" />

    {/* Open Graph metadata for social media sharing */}
    <meta content={title} property="og:title" />
    <meta content={description} property="og:description" />

    {/* Twitter Card metadata */}
    <meta content={title} name="twitter:title" />
    <meta content={description} name="twitter:description" />
  </NextHead>
);
