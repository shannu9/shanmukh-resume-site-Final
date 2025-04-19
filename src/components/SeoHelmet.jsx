import { Helmet } from "react-helmet";

export default function SeoHelmet({ title, description, keywords, image, url }) {
  const fullTitle = title ? `${title} – Shanmukh Sri Surya Gopi` : "Shanmukh Sri Surya Gopi";
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content="Hire Shanmukh Sri Surya Gopi – skilled Business Analyst, Salesforce Developer, Salesforce Administrator, Product Manager, and Scrum Master with expertise in Python, Tableau, Agile, and more." />
      <meta name="keywords" content="Business Analyst, Salesforce Developer, Salesforce Admin, Salesforce Administrator, Product Manager, Scrum Master, Product Owner, Agile, MBA Analytics, Tableau, Jira, Azure DevOps, Python, SQL, Resume, Shanmukh Sri Surya Gopi" />
      <meta name="author" content="Shanmukh Sri Surya Gopi" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image || "/cover-image.png"} />
      <meta property="og:url" content={url || "https://shanmukh-resume.web.app/"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || "/cover-image.png"} />
    </Helmet>
  );
}
