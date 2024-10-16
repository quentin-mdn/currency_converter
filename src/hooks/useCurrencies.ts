import { useDispatch, useSelector } from 'react-redux';
import {
    setSelectedCurrenciesSlice,
    addSelectedCurrencySlice,
    removeSelectedCurrencySlice
} from '@/redux/slices/currenciesSlice';
import {RootState} from "@/redux/store";

const useCurrencies = () => {
    const dispatch = useDispatch();
    const selectedCurrencies = useSelector((state: RootState) => state.currencies.selectedCurrencies);
    const availableCurrencies = useSelector((state: RootState) => state.currencies.availableCurrencies);

    const setSelectedCurrencies = (currencies: string[]) => {
        dispatch(setSelectedCurrenciesSlice(currencies));
    };

    const addSelectedCurrency = (currency: string) => {
        dispatch(addSelectedCurrencySlice({ code: currency }));
    };

    const removeSelectedCurrency = (currency: string) => {
        dispatch(removeSelectedCurrencySlice(currency));
    };

    const getAvailableCurrencies = () => {
        return availableCurrencies.map((currency) => {
            return {
                ...currency,
                selected: selectedCurrencies.includes(currency.code),
            }
        })
    }

    const getSelectedCurrencies = () => {
        return selectedCurrencies
    }

    return { getSelectedCurrencies, getAvailableCurrencies, setSelectedCurrencies, addSelectedCurrency, removeSelectedCurrency };
};

export default useCurrencies;