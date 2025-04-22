import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './assets/layout/MainLayout';
import Reconciliation from './assets/components/Reconciliation';
import Outstandings from './assets/components/Outstandings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import store from './assets/store/store';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Reconciliation />} />
                            <Route path="outstandings" element={<Outstandings />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}

export default App;
