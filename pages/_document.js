import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.svg" />
          <link
            href="plugin/font-awesome-4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />

          <script src="plugin/jquery-3.5.0/jquery.min.js" />
          <script src="plugin/popper-2.2.3/popper.min.js" />
          <script src="plugin/bootstrap-4.3.1/js/bootstrap.min.js" />

          <script src="plugin/adminltev3/adminlte.min.js" />
        </Head>
        <body className="hold-transition sidebar-mini layout-fixed">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
