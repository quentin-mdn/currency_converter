export const fetchExchangeRates = async () => {
    const ret: Record<string, number> = {}

    // Fetch exchange rates for fiat currencies
    const fiatResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const fiatData = await fiatResponse.json();

    for(let code in fiatData.rates)
    {
        const rate = fiatData.rates[code];

        // Special treatment for ARS
        if(code === 'ARS')
            code = 'ARSoff'

        ret[code] = rate;
    }

    // Fetch the Bitcoin price in USD
    const btcResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const btcData = await btcResponse.json();

    const usdBtc = 1 / btcData.bitcoin.usd

    // Add the BTC price to the rates
    ret['btc'] = usdBtc;
    ret['sat'] = usdBtc * 100000000;

    // Fetch the ARS blue rate
    const arsBlueResponse = await fetch('https://api.bluelytics.com.ar/v2/latest');
    const arsBlueData = await arsBlueResponse.json();

    // Add the BTC price to the rates
    ret['ARS'] = arsBlueData.blue.value_avg;

    return ret;
};