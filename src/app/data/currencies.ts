export interface Currency {
    code: string;
    name: string;
    image: string;
    type: string;
    nbDecimals: number;
}

export const currencyFiat = 'fiat';
export const currencyBitcoin = 'btc';

export const currencies: Currency[] = [
    { code: 'sat', name: '1 sat = 0.00000001 btc', image: '/images/currencies/btc.png', nbDecimals: 0, type: currencyBitcoin },
    { code: 'btc', name: '1 btc', image: '/images/currencies/btc.png', nbDecimals: 8, type: currencyBitcoin },
    { code: 'ARS', name: 'Argentinian peso (blue market)', image: '/images/flags/ar.png', nbDecimals: 2, type: currencyFiat },
    { code: 'ARSoff', name: 'Argentinian peso (official rate)', image: '/images/flags/ar.png', nbDecimals: 2, type: currencyFiat },
    { code: 'EUR', name: 'Euro', image: '/images/flags/eu.png', nbDecimals: 2, type: currencyFiat },
    { code: 'USD', name: 'United States Dollar', image: '/images/flags/us.png', nbDecimals: 2, type: currencyFiat },
    { code: 'GBP', name: 'British Pound', image: '/images/flags/gb.png', nbDecimals: 2, type: currencyFiat },
    { code: 'JPY', name: 'Japanese Yen', image: '/images/flags/jp.png', nbDecimals: 0, type: currencyFiat },
    { code: 'AUD', name: 'Australian Dollar', image: '/images/flags/au.png', nbDecimals: 2, type: currencyFiat },
    { code: 'CAD', name: 'Canadian Dollar', image: '/images/flags/ca.png', nbDecimals: 2, type: currencyFiat },
    { code: 'CHF', name: 'Swiss Franc', image: '/images/flags/ch.png', nbDecimals: 2, type: currencyFiat },
    { code: 'CNY', name: 'Chinese Yuan', image: '/images/flags/cn.png', nbDecimals: 2, type: currencyFiat },
    { code: 'INR', name: 'Indian Rupee', image: '/images/flags/in.png', nbDecimals: 2, type: currencyFiat },
    { code: 'BRL', name: 'Brazilian Real', image: '/images/flags/br.png', nbDecimals: 2, type: currencyFiat },
    { code: 'ZAR', name: 'South African Rand', image: '/images/flags/za.png', nbDecimals: 2, type: currencyFiat },
    { code: 'MXN', name: 'Mexican Peso', image: '/images/flags/mx.png', nbDecimals: 2, type: currencyFiat },
    { code: 'KRW', name: 'South Korean Won', image: '/images/flags/kr.png', nbDecimals: 0, type: currencyFiat },
    { code: 'RUB', name: 'Russian Ruble', image: '/images/flags/ru.png', nbDecimals: 2, type: currencyFiat },
    { code: 'SGD', name: 'Singapore Dollar', image: '/images/flags/sg.png', nbDecimals: 2, type: currencyFiat },
    { code: 'NZD', name: 'New Zealand Dollar', image: '/images/flags/nz.png', nbDecimals: 2, type: currencyFiat }
]