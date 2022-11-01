import { Html, Head, Main, NextScript } from 'next/document';
import { Header, Navigator } from '../components';
import { MainLayout } from '../layouts';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Header />
        <Navigator />
        <MainLayout>
          <Main />
        </MainLayout>
        <NextScript />
      </body>
    </Html>
  );
}
