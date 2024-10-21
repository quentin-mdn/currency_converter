import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer, {CurrencySliceState} from './slices/currenciesSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist';
import SnackbarSlice, {SnackBarElement} from "@/redux/slices/snackbarSlice";

export interface RootState {
    currencies: CurrencySliceState,
    snackbars: SnackBarElement[]
}

const currenciesPersistConfig = {
    key: 'currencies',
    storage,
    whitelist: ['selectedCurrencies', 'exchangeRates', 'exchangeRatesDateLastRefresh', 'currencyToConvert'], // Persist specific properties
};

// Create persisted reducers
const persistedCurrenciesReducer = persistReducer(currenciesPersistConfig, currenciesReducer);

const store = configureStore({
    reducer: {
        currencies: persistedCurrenciesReducer,
        snackbars: SnackbarSlice
    },
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };