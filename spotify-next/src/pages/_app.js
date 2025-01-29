// import "../styles/sb-admin-2.min.css";
import "../styles/globals.css";
import "../../public/assets/fontawesome-free/css/all.min.css";
import 'react-loading-skeleton/dist/skeleton.css';
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { store } from "src/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "src/components/layout";
import NextTopLoader from "nextjs-toploader";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <>
      <NextTopLoader color="#1aa74c"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={250}
          // shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
          <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale-1" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          {router.pathname === "/login" ||
          router.pathname === "/signup" ||
          router.pathname === "/forgotPassword" ||
          router.pathname === "/reset-password" ||
          router.pathname === "/premium" ||
          router.pathname === "/premium/student" ||
          router.pathname === "/premium/family" ||
          router.pathname === "/premium/individual" ? (
            <Component {...pageProps} />
          ) : (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          )}
        </Provider>
      </SessionProvider>
      <ToastContainer
        theme="dark"
        closeOnClick
        style={{
          opacity: 0.8,
        }}
      />
    </>
  );
}
