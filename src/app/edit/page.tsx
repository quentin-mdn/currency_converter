"use client";

import CurrenciesManager from "@/components/currenciesManager";
import LayoutApp from "@/components/layoutApp";
import BottomBarRates from "@/components/bottomBarRates";

export default function Home() {
    return (
        <LayoutApp title={'Edit'} routeGoBack={'/'} afterWrap={<BottomBarRates />}>
            <CurrenciesManager />
        </LayoutApp>
    );
}