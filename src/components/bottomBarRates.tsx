import useExchangeRates from "@/hooks/useExchangeRates";
import styles from "./bottomBarRates.module.css"
import {timeAgo} from "@/utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

export default function BottomBarRates() {
    const {refreshExchangeRates, getExchangeRatesDateLastRefresh, isExchangeRatesLoading} = useExchangeRates();
    const [, setRefreshKey] = useState(0);

    // Rerender every minut for bottom bar timer
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshKey(prevKey => prevKey + 1); // This will trigger a re-render
        }, 60000); // 60000 ms = 1 minute

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    const handleClick = () => {
        refreshExchangeRates();
    }

    const exchangeRatesDateLastRefresh = getExchangeRatesDateLastRefresh();

    let txtRates = '';

    if(exchangeRatesDateLastRefresh)
        txtRates = 'Rates updated : ' + timeAgo(exchangeRatesDateLastRefresh);

    return (
        <div className={styles.bar}>
            <div>{txtRates}</div>
            <div className={styles.button} onClick={handleClick}>
                Refresh <FontAwesomeIcon icon={faRefresh} spin={isExchangeRatesLoading}/>
            </div>
        </div>
    );
}