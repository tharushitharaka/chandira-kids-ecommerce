import { Helmet } from 'react-helmet-async';

export default function SEO({ title = 'Chandira Kids', description = 'Girls clothing for ages 0 to 15.' }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
