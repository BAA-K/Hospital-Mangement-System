import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppContextProvider from './context/AppContext.tsx';
import { QueryClient, QueryClientProvider } from "react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
