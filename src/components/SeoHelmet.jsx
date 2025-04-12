import { Helmet } from "react-helmet";

export default function SeoHelmet({ title, description, keywords, image, url }) {
  const fullTitle = title ? `${title} – Shanmukh Sri Surya Gopi` : "Shanmukh Sri Surya Gopi";
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || "Explore projects, skills, and certifications of Shanmukh Sri Surya Gopi."} />
      <meta name="keywords" content={keywords || "Resume, Skills, Python, SQL, Tableau, MBA, Analytics, Shanmukh"} />
      <meta name="author" content="Shanmukh Sri Surya Gopi" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image || "/cover-image.png"} />
      <meta property="og:url" content={url || "https://your-domain.com"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || "/cover-image.png"} />
    </Helmet>
  );
}
