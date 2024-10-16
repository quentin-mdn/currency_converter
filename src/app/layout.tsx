"use client";

import localFont from "next/font/local";
import "./globals.css";
import {Provider} from "react-redux";
import {store, persistor} from "@/redux/store";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {PersistGate} from "redux-persist/integration/react";
import Head from "next/head";
config.autoAddCss = false; // Prevent FontAwesome from adding its CSS automatically

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
        <title>Currency converter</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#000000"/>
        {/* Link to the favicon */}
        <link rel="icon" href="/favicon.ico"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        {/* Optional: Link to additional icons for PWA */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-512x512.png"/>
        {/* You can add more meta tags or links here */}
    </Head>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
    </body>
    </html>
)
  ;
}
