import React from 'react';
import styles from './button.module.css'; // Import your styles (adjust path as necessary)

interface ButtonProps {
    icon: React.ReactNode;      // The icon to display in the button
    onClick: () => void;        // Click event handler
}

const Button: React.FC<ButtonProps> = ({ icon, onClick }) => {
    return (
        <div className={styles.button} onClick={onClick}>
            {icon}
        </div>
    );
};

export default Button;