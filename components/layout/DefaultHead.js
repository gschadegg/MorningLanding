import Head from 'next/head'
import coverImg from './../../public/images/morningLanding-cover.webp'

const DefaultHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="Gretchen Schadegg" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="description" content="NEEEWW desc here!" />
      <link rel="icon" href="/favicon.svg" />
      <meta
        name="keywords"
        content="morning tasks, default home page, default browser page, starting day"
      />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="webApp" />
      <meta property="og:image" content={coverImg} />
      <meta property="og:url" content="https://morning-landing.vercel.app/" />
      <meta name="twitter:card" content={coverImg} />
      <meta property="og:description" content="NEEEWW desc here!" />
      <meta property="og:site_name" content={title} />
      <meta
        name="twitter:image:alt"
        content="Display of Morning Landings Home Page"
      />
    </Head>
  )
}

export default DefaultHead
