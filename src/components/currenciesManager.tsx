"use client";

import useCurrencies from "@/hooks/useCurrencies";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Currency, currencyBitcoin, currencyFiat} from "@/app/data/currencies";
import styles from "@/components/currenciesManager.module.css";
import React from "react";

interface CurrencyManagerLineProps {
    currency: SelectedCurrency;
    onSelect: (currency: SelectedCurrency) => void;
}

interface CurrenciesManagerSectionProps {
    title: string;
    onSelectCurrency: (currency: SelectedCurrency) => void;
    currencies: SelectedCurrency[];
}

interface SelectedCurrency extends Currency{
    selected: boolean;
}

const CurrencyManagerLine: React.FC<CurrencyManagerLineProps> = ({currency, onSelect}) => {
    const classNameLine = currency.selected ? styles.line + ' ' + styles.lineSelected : styles.line;

    return <div key={currency.code} onClick={() => onSelect(currency)} className={classNameLine}>
        <div className={styles.containerCode}>{currency.code}</div>
        <div className="containerFlag">
            <img
                src={currency.image} // Relative path from the public folder
                alt={currency.code}
            />
        </div>
        <div className={styles.containerName}>{currency.name}</div>
        <div className={styles.containerSelected}>{currency.selected ? <FontAwesomeIcon icon={faCheck}/> : null}</div>
    </div>
}

const CurrenciesManagerSection: React.FC<CurrenciesManagerSectionProps> = ({title, currencies, onSelectCurrency}) => {
    return (
        <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.lines}>
                {
                    currencies.map((currency) => {
                        return <CurrencyManagerLine
                            key={currency.code}
                            currency={currency}
                            onSelect={onSelectCurrency}
                        />
                    })
                }
            </div>
        </div>
    )
}

const CurrenciesManager = () => {
    const {getAvailableCurrencies, removeSelectedCurrency, addSelectedCurrency} = useCurrencies()

    const handleSelectCurrency = (currency: SelectedCurrency) => {
        if (currency.selected)
            removeSelectedCurrency(currency.code)
        else
            addSelectedCurrency(currency.code)
    }

    const sections = [
        {
            title: 'Bitcoin',
            currencyType: currencyBitcoin
        },
        {
            title: 'Fiat',
            currencyType: currencyFiat
        }
    ]

    return (
        <div className={styles.container}>
            {
                sections.map((section, index) => {
                    return (
                        <CurrenciesManagerSection
                            key={index}
                            title={section.title}
                            currencies={getAvailableCurrencies()
                                .filter((currency: SelectedCurrency) => {
                                    return currency.type === section.currencyType
                                })}
                            onSelectCurrency={handleSelectCurrency}
                        />
                    )
                })
            }
        </div>
    )
}

export default CurrenciesManager