import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LoadingScreen from '@/components/loader/loadingScreen';
import React, {useState, useEffect} from 'react';
import {ErrorHandler} from '../components/Fallback/ErrorHandler'
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { wrapper } from '../redux/store';
import Fallback from "../components/Fallback/Fallback";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps, ...rest }: AppProps) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>

    <Provider store={store}>

      {/* <ErrorBoundary FallbackComponent={Fallback} onError={ErrorHandler}> */}
        <Component {...props.pageProps} />
      {/* </ErrorBoundary> */}
      <ToastContainer />
    </Provider>
    {/* {
      loading ? <LoadingScreen /> : <Component {...pageProps} />
    } */}
     
    </>
  )
}
