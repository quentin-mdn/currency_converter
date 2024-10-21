"use client";

import CurrenciesManager from "@/components/currenciesManager";
import LayoutApp from "@/components/layoutApp";
import BottomBarRates from "@/components/bottomBarRates";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Currency converter - Choose currencies</title>
            </Head>
            <LayoutApp title={'Choose currencies'} routeGoBack={'/'} afterWrap={<BottomBarRates />}>
                <CurrenciesManager />
            </LayoutApp>
        </>
    );
}
