import React from 'react';
import NextDocument, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet } from 'styled-components';
import theme from '@resources/styles/theme';

export default class MyDocument extends NextDocument<any> {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new ServerStyleSheet();
    const materialUiSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    const isProduction = process.env.NODE_ENV === 'production';

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            ),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        isProduction,
        styles: [
          <React.Fragment key='styles'>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    return (
      <html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />

          <link rel='icon' href='/favicon.ico' />
          <meta name='robots' content='index, follow' />
          <meta httpEquiv='cache-control' content='max-age=0' />
          <meta httpEquiv='cache-control' content='no-cache' />
          <meta httpEquiv='expires' content='0' />
          <meta httpEquiv='expires' content='Tue, 01 Jan 1980 1:00:00 GMT' />
          <meta httpEquiv='pragma' content='no-cache' />
          <meta name='theme-color' content='#000000' />
          <link rel='apple-touch-icon' href='favicon.ico' />

          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
