import Head from 'next/head'

const DefaultHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="Gretchen Schadegg" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="description" content="My desc here!" />
      <link rel="icon" href="/favicon.svg" />
      <meta
        name="keywords"
        content="morning tasks, default home page, default browser page, starting day"
      />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="webApp" />
      <meta property="og:image" content="imageURLhere" />
      <meta property="og:url" content="http://www.google.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:description" content="My desc here!" />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:image:alt" content="Alt text for image" />
    </Head>
  )
}

export default DefaultHead
