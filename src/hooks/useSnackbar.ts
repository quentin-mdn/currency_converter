import { useDispatch } from 'react-redux';
import { showSnackbar, hideSnackbar } from '@/redux/slices/snackbarSlice';
import {Severity} from "@/components/alert";

const useSnackbar = () => {
    const dispatch = useDispatch();

    return (message: string, severity: Severity, duration: number = 300000) => {
        const id = Date.now()
        dispatch(showSnackbar({ message, severity, id }));

        setTimeout(() => {
            dispatch(hideSnackbar(id)); // Hide snackbar after duration
        }, duration);
    };
};

export default useSnackbar;