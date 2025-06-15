import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#8B0000', // Deep red color from the website
            light: '#A52A2A',
            dark: '#660000',
        },
        secondary: {
            main: '#DAA520', // Golden color for accents
            light: '#FFD700',
            dark: '#B8860B',
        },
        background: {
            default: '#FFF8E7', // Light cream background
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Times New Roman", serif',
        h5: {
            fontWeight: 600,
            color: '#8B0000',
        },
        h6: {
            fontWeight: 600,
            color: '#8B0000',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#8B0000',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    backgroundColor: '#8B0000',
                    '&:hover': {
                        backgroundColor: '#660000',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                },
            },
        },
    },
}); 