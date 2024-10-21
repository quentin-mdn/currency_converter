import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar, selectSnackbars } from '@/redux/slices/snackbarSlice';
import styles from './snackbar.module.css';
import Alert from "@/components/alert";

const Snackbar = () => {
    const dispatch = useDispatch();
    const snackbars = useSelector(selectSnackbars);

    console.log('snackbars', snackbars)

    const handleClose = (id) => {
        dispatch(hideSnackbar(id));
    };

    return (
        <div className={styles.container}>
            {snackbars.map((snackbar) => (
                <Alert
                    key={snackbar.id}
                    severity={snackbar.severity}
                    onClick={() => handleClose(snackbar.id)}
                >
                    {snackbar.message}
                </Alert>
            ))}
        </div>
    );
};

export default Snackbar;