"use client";

import styles from './layoutApp.module.css'
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
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

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div>
                    {
                        routeGoBack && <div className={styles.prevArrow} onClick={handleGoBack}><FontAwesomeIcon icon={faAngleLeft} /></div>
                    }
                </div>
                <div className={styles.containerTitle}>
                    <span className="h2">{title}</span>
                </div>
                <div></div>
            </div>
            <div className={styles.wrap} style={styleWrap}>{children}</div>
            {afterWrap}
        </div>
    )
}

export default LayoutApp