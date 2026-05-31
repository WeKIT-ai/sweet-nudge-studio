import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = "https://wekit.ai";

const SEO = ({ title, description, path, image, type = "website", jsonLd }: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const ogImage =
    image ||
    "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/0a61b118-e019-43c4-809d-45b5489cf9ee?Expires=1773034433&GoogleAccessId=go-api-on-aws%40gpt-engineer-390607.iam.gserviceaccount.com&Signature=MGWOwX6G5bL4pApgtH%2BQGa3sKLU%2BGCR%2BBRLhIYrIDc3sIoDgUDd2mtpR9sneYrtA1prMfOKW0U9Mha5KgMlHv65TdFuX7TrVrNR9jIDZC8K9XqzN3uNC6LSXNPAI4EKY3R%2Bsm5feJ9WU2BzlXGO0PM2cqEMeB6yj%2F66ZP%2BSHVmDnjnZ8I6NBOWvMl6mOn%2FTCXCnVonzpanXkhROGid1MaKruP8%2FNtyoy5WrJhhqjOkzLzxg0ke72TTVnl2qkEaPgNrvSLaZoAJjGV5v5toPthzquWxPlh95zr18ihOqPnj%2BTBHeiuY8Aze%2BZRVdqK9v07sb41F0fXLBRVVjlG01G9g%3D%3D";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
