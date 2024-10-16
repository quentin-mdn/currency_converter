"use client";

import styles from "@/components/currenciesConverter.module.css";
import useCurrenciesConverter from "@/hooks/useCurrenciesConverter";
import CurrenciesConverterLine from "@/components/currenciesConverterLine";
import React, {useState} from "react";
import {DndContext, DragEndEvent, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import {SortableContext} from "@dnd-kit/sortable";

interface CurrenciesConverterProps {
    isMovable: boolean;
}

const CurrenciesConverter: React.FC<CurrenciesConverterProps> = ({ isMovable }) => {
    const {setCurrencyToConvert, getCurrencies, setSelectedCurrencies, getSelectedCurrencies, removeSelectedCurrency} = useCurrenciesConverter()
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleChange = (newValue: string, currencyCode: string) => {
        setCurrencyToConvert(currencyCode, newValue)
    };

    const handleDelete = (currencyCode: string) => {
        removeSelectedCurrency(currencyCode)
    }

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (over) {
            const updatedItems = [...getSelectedCurrencies()];
            const oldIndex = updatedItems.findIndex((item) => item === active.id);
            const newIndex = updatedItems.findIndex((item) => item === over.id);

            // Only reorder if the indices are different
            if (oldIndex !== newIndex) {
                const [movedItem] = updatedItems.splice(oldIndex, 1);
                updatedItems.splice(newIndex, 0, movedItem);
                setSelectedCurrencies(updatedItems);
            }
        }
    };

    const currencies = getCurrencies()

    const activeCurrency = activeId ? currencies.find((item) => item.code === activeId) : null

    return (
        <div className={styles.container}>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={currencies.map((item) => item.code)}>
                    {
                        currencies.map((currency) => {
                            return <CurrenciesConverterLine
                                key={currency.code}
                                onChange={handleChange}
                                currency={currency}
                                isMovable={isMovable}
                                onDelete={handleDelete}
                            />
                        })
                    }
                </SortableContext>
                <DragOverlay>
                    {activeCurrency ? (
                        <CurrenciesConverterLine
                            currency={activeCurrency}
                            isMovable={true}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

export default CurrenciesConverter