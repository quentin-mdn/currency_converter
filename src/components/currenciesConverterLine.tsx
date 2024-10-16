"use client";

import styles from "@/components/currenciesConverterLine.module.css";
import {formatMoney} from "@/utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCircleMinus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import React, {useRef} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {Currency} from "@/app/data/currencies";

interface CurrenciesConverterLineProps {
    onChange?: (newValue: string, currencyCode: string) => void;
    currency: CurrencyConverted;
    onDelete?: (currencyCode: string) => void;
    isMovable: boolean;
}

interface CurrencyConverted extends Currency {
    isCurrencyToConvert: boolean;
    value: string | number | null;
}

const CurrenciesConverterLine: React.FC<CurrenciesConverterLineProps> = ({onChange, currency, isMovable, onDelete}) => {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: currency.code
    });
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange)
            onChange(e.target.value, currency.code)
    }

    const emptyLine = () => {
        if(onChange)
            onChange('', currency.code)

        if (inputRef && inputRef.current) {
            if ("focus" in inputRef.current) {
                inputRef.current.focus();
            }
            if ("setSelectionRange" in inputRef.current) {
                inputRef.current.setSelectionRange(0, 0);
            }
        }
    }

    const handleDelete = () => {
        if(onDelete)
            onDelete(currency.code)
    }



    // Determine the value to display
    let valueMoney = null;
    if (currency.isCurrencyToConvert) {
        valueMoney = currency.value;
    } else if (currency.value && typeof currency.value === "number") {
        valueMoney = formatMoney(currency.value, currency.nbDecimals);
    }

    if (valueMoney === null) valueMoney = '';

    // Build the class name for the container
    let classNameContainer = styles.container;
    if (isMovable) {
        classNameContainer += ' ' + styles.containerOpen;
    }
    if(isDragging) {
        classNameContainer += ' dragging';
    }

    return (
        <div
            ref={setNodeRef}
            className={classNameContainer}
            style={{
                opacity: isDragging ? 0.5 : 1, // Opacity changes during drag
            }}
        >
            <div
                {...listeners}
                {...attributes}
                className={styles.containerMove}
            >
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={styles.containerInput}>
                <input
                    type="text"
                    inputMode="decimal"
                    name={currency.code}
                    value={valueMoney} // Bind input value to state
                    onChange={handleChange} // Update state on change
                    ref={inputRef}
                />
                {
                    valueMoney !== '' && <div className={styles.containerEmpty} onClick={emptyLine}>
                        <FontAwesomeIcon icon={faCircleXmark}/>
                    </div>
                }

            </div>
            <div className={styles.containerCode}>
                {currency.code}
            </div>
            <div className="containerFlag">
                <img
                    src={currency.image} // Relative path from the public folder
                    alt={currency.code}
                />
            </div>
            <div className={styles.containerDelete} onClick={handleDelete}>
                <FontAwesomeIcon icon={faCircleMinus} />
            </div>
        </div>
    );
}

export default CurrenciesConverterLine