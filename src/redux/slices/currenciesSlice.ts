import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {currencies, Currency} from "@/app/data/currencies";

// Define interfaces for the state structure
interface CurrencyToConvert {
    code: string | null;
    value?: string | null;
}

export interface CurrencySliceState {
    availableCurrencies: Currency[]; // Adjust this type based on your currencies data structure
    selectedCurrencies: string[]; // List of selected currencies
    exchangeRates: Record<string, number>; // Exchange rates for selected currencies
    isExchangeRatesLoading: boolean;
    exchangeRatesDateLastRefresh: string | null;
    currencyToConvert: CurrencyToConvert;
}

// Define the initial state
const initialState: CurrencySliceState = {
    availableCurrencies: currencies, // Assuming currencies is a string array or similar
    selectedCurrencies: [],
    exchangeRates: {},
    isExchangeRatesLoading: false,
    exchangeRatesDateLastRefresh: null,
    currencyToConvert: {
        code: null,
        value: null,
    }
};

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        setSelectedCurrenciesSlice: (state, action: PayloadAction<string[]>) => {
            state.selectedCurrencies = action.payload;
        },
        addSelectedCurrencySlice: (state, action: PayloadAction<{ code: string }>) => {
            const { code } = action.payload;
            if (!state.selectedCurrencies.includes(code)) {
                state.selectedCurrencies.push(code);
            }
        },
        removeSelectedCurrencySlice: (state, action: PayloadAction<string>) => {
            const code = action.payload;
            state.selectedCurrencies = state.selectedCurrencies.filter(
                (currency) => currency !== code
            );
        },
        setExchangeRatesAfterFetch: (state, action: PayloadAction<{ exchangeRates: Record<string, number>, exchangeRatesDateLastRefresh: string | null }>) => {
            state.exchangeRates = { ...state.exchangeRates, ...action.payload.exchangeRates };
            state.exchangeRatesDateLastRefresh = action.payload.exchangeRatesDateLastRefresh;
            state.isExchangeRatesLoading = false;
        },
        setIsExchangeRatesLoading: (state, action: PayloadAction<boolean>) => {
            state.isExchangeRatesLoading = action.payload;
        },
        setCurrencyToConvertSlice: (state, action: PayloadAction<CurrencyToConvert>) => {
            const { code, value } = action.payload;
            state.currencyToConvert = { code, value };
        }
    },
});

// Export actions and reducer
export const {
    setSelectedCurrenciesSlice,
    addSelectedCurrencySlice,
    removeSelectedCurrencySlice,
    setExchangeRatesAfterFetch,
    setIsExchangeRatesLoading,
    setCurrencyToConvertSlice
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
