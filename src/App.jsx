import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './assets/layout/MainLayout';
import Reconciliation from './assets/components/Reconciliation';
import Outstandings from './assets/components/Outstandings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PaginationProvider } from './assets/context/Pagination';

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
            <PaginationProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Reconciliation />} />
                            <Route path="outstandings" element={<Outstandings />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PaginationProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}

export default App;
