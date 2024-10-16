"use client";

import styles from './layoutApp.module.css'
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React from 'react';

interface LayoutAppProps {
    children: React.ReactNode;
    title?: string;
    routeGoBack?: string;
    styleWrap?: React.CSSProperties;
    afterWrap?: React.ReactNode;
}

const LayoutApp: React.FC<LayoutAppProps> = ({
    children,
    title,
    routeGoBack,
    styleWrap,
    afterWrap,
}) => {
    const router = useRouter();

    const handleGoBack = () => {
        if(routeGoBack)
            router.push(routeGoBack);
    };

    const renderContainerTitle = () => {
        return <div className={styles.containerTitle}>
            <span className="h2">{title}</span>
        </div>
    }

    return (
        <div className={styles.container}>
            {
                routeGoBack ? (
                    <div className={styles.topBar}>
                        <div className={styles.prevArrow} onClick={handleGoBack}><FontAwesomeIcon icon={faArrowLeft}/></div>
                        {renderContainerTitle()}
                    </div>
                ) : (
                    <div className={styles.topBarCenter}>
                        {renderContainerTitle()}
                    </div>
                )
            }
            <div className={styles.containerWrap}>
                <div className={styles.wrap} style={styleWrap}>{children}</div>
            </div>
            {afterWrap}
        </div>
    )
}

export default LayoutApp