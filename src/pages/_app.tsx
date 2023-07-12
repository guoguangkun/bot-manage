

import  RootLayout from "@/components/layout";
import type { AppContext, AppProps } from 'next/app'
import type { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect, createContext,useState} from 'react'

import context from "./context";

import "./globals.css"

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
export default function MyApp({ Component, pageProps } :  AppPropsWithLayout) {
    let [user,setUser] = useState({
        userName:"",
        token:""
    })

 
    return  <context.Provider value={{user,setUser}}>
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
    </context.Provider>
   
}