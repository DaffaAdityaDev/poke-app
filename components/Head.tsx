import NextHead from "next/head";

interface HeadProps {
  title: string;
  description: string;
}

export const Head: React.FC<HeadProps> = ({ title, description }) => (
  <NextHead>
    <title>{title}</title>
    <meta content={description} name="description" />
    <meta content={title} property="og:title" />
    <meta content={description} property="og:description" />
    <meta content={title} name="twitter:title" />
    <meta content={description} name="twitter:description" />
  </NextHead>
);
