import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="crowd funding dapp" />
          <link rel="icon" href="/favicon.ico" />

          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />

          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />


          <meta property="og:site_name" content="crowd funding dapp" />
        </Head>
        <body>
          <Main />
          <script src="https://kit.fontawesome.com/e6ef8c1f6f.js" crossorigin="anonymous"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;