import {useDispatch, useSelector} from "react-redux";
import {fetchExchangeRates} from "@/services/exchangeRatesAPI";
import {
    setExchangeRatesAfterFetch,
    setIsExchangeRatesLoading
} from "@/redux/slices/currenciesSlice";
import {useEffect} from "react";
import {RootState} from "@/redux/store";

const useExchangeRates = () => {
    const dispatch = useDispatch();
    const isExchangeRatesLoading = useSelector((state: RootState) => state.currencies.isExchangeRatesLoading);
    const exchangeRates = useSelector((state: RootState) => state.currencies.exchangeRates);
    const exchangeRatesDateLastRefresh = useSelector((state: RootState) => state.currencies.exchangeRatesDateLastRefresh);

    // On load refresh rates
    useEffect(() => {
        const now = new Date();
        const dateLastRefresh = getExchangeRatesDateLastRefresh()

        if (dateLastRefresh === null || now.getTime() - dateLastRefresh.getTime() > 10 * 60000)
        {
            refreshExchangeRates()
        }
    // eslint-disable-next-line
    }, []);

    const refreshExchangeRates = async () => {
        dispatch(setIsExchangeRatesLoading(true))
        const fetchedRates = await fetchExchangeRates();
        dispatch(setExchangeRatesAfterFetch({
            exchangeRates: fetchedRates,
            exchangeRatesDateLastRefresh: (new Date()).toISOString()
        }));
    }

    const getExchangeRateByCode = (code: string) => {
        return exchangeRates[code];
    }

    const getExchangeRatesDateLastRefresh = () => {
        return exchangeRatesDateLastRefresh ? new Date(exchangeRatesDateLastRefresh) : null;
    }

    return {refreshExchangeRates, getExchangeRateByCode, getExchangeRatesDateLastRefresh, isExchangeRatesLoading}
}

export default useExchangeRates;