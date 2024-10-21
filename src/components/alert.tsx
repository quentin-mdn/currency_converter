import React from 'react';
import styles from './alert.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons"; // Import your styles (adjust path as necessary)

export enum Severity {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
}

interface ButtonProps {
    severity: Severity;
    children: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ severity, children, onClick }) => {
    let icon = null
    let className = styles.alert + ' '

    switch (severity)
    {
        case Severity.Error:
            className += styles.error
            icon = <FontAwesomeIcon icon={faCircleExclamation} />
            break;
    }

    return (
        <div className={className} onClick={onClick}>
            <div className={styles.icon}>
                {icon}
            </div>
            <div className={styles.txt}>
                {children}
            </div>
        </div>
    );
};

export default Button;