import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Severity} from "@/components/alert";
import {RootState} from "@/redux/store";

export interface SnackbarElement {
    message: string;
    severity: Severity;
    id: number;
}

const initialState: SnackbarElement[] = []

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<{ message: string, severity: Severity, id: number }>) => {
            const { message, severity, id } = action.payload;
            state.push({ message, severity, id});
        },
        hideSnackbar: (state, action: PayloadAction<number>) => {
            return state.filter(snackbar => snackbar.id !== action.payload); // Remove snackbar by ID
        },
    },
});

// Export actions
export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

// Selectors
export const selectSnackbars = (state: RootState) => state.snackbars;

// Export the reducer
export default snackbarSlice.reducer;