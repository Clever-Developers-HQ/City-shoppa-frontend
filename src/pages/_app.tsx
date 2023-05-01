import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LoadingScreen from '@/components/loader/loadingScreen';
import React, {useState, useEffect} from 'react';
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { wrapper } from '../redux/store';
import Fallback from "../components/Fallback/Fallback";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-react'
import NoNetworkScreen from '@/components/empty/no_network';



export default function App({ Component, pageProps, ...rest }: AppProps) {
  function handleNewEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event)
  }
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const condition = navigator.onLine ? 'online' : 'offline';
    
      if (condition === 'online') {
          fetch('https://www.google.com/', {
              mode: 'no-cors',
              })
          .then(() => {             
          }).catch(() => {
             setIsOnline(false)
          }  )
    
      } else {
        setIsOnline(false)
      }
    }
  }, [])



  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, [])

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>


{
  isOnline ? (
    <Provider store={store}>
    {/* <ErrorBoundary FallbackComponent={Fallback} onError={ErrorHandler}> */}
      <Component {...props.pageProps} />
    {/* </ErrorBoundary> */}
    <ToastContainer />
    <LiveChatWidget
      license="15274641"
      visibility="minimized"
      onNewEvent={handleNewEvent}
      />
  </Provider>
  ) : (<NoNetworkScreen/>)
}





    {/* {
      loading ? <LoadingScreen /> : <Component {...pageProps} />
    } */}
     
    </>
  )
}
