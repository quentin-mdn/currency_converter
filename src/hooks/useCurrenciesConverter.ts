import {useDispatch, useSelector} from "react-redux";
import {setCurrencyToConvertSlice} from "@/redux/slices/currenciesSlice";
import useExchangeRates from "@/hooks/useExchangeRates";
import {unformatMoney} from "@/utils/utils";
import useCurrencies from "@/hooks/useCurrencies";
import {RootState} from "@/redux/store";

const useCurrenciesConverter = () => {
    const dispatch = useDispatch();
    const currencyToConvert = useSelector((state: RootState) => state.currencies.currencyToConvert);
    const {getExchangeRateByCode} = useExchangeRates();
    const {getSelectedCurrencies, getAvailableCurrencies, setSelectedCurrencies, removeSelectedCurrency} = useCurrencies();

    const setCurrencyToConvert = (code: string | null, value?: string | null) => {
        dispatch(setCurrencyToConvertSlice({code, value}));
    };

    const getCurrencies = () => {
        const currencies = [];
        const availableCurrenciesCopy = getAvailableCurrencies()
        const selectedCurrenciesCopy = getSelectedCurrencies()

        for(const selectedCode of selectedCurrenciesCopy)
        {
            for(const availableCurrency of availableCurrenciesCopy)
            {
                if(selectedCode === availableCurrency.code)
                {
                    const rate = getExchangeRateByCode(selectedCode)

                    let value = null;
                    if(currencyToConvert.value && currencyToConvert.code)
                    {
                        if(currencyToConvert.code === selectedCode)
                        {
                            value = currencyToConvert.value
                        }
                        else
                        {
                            const rateCurrencyToConvert = getExchangeRateByCode(currencyToConvert.code)
                            value = rate * unformatMoney(currencyToConvert.value) / rateCurrencyToConvert;
                        }
                    }

                    currencies.push({
                        ...availableCurrency,
                        rate: rate,
                        isCurrencyToConvert: selectedCode === currencyToConvert.code,
                        value: value
                    })
                    break;
                }
            }
        }

        return currencies
    }

    return {setCurrencyToConvert, getCurrencies, setSelectedCurrencies, getSelectedCurrencies, removeSelectedCurrency}
}

export default useCurrenciesConverter;