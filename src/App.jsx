import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layout/MainLayout';
import Reconciliation from './pages/Reconciliation';
import Outstandings from './pages/Outstandings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './pages/Login';
import PrivateRoute from './components/custom/PrivateRoute';
import RootLayout from './layout/RootLayout';

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
                        <Route element={<RootLayout />}>
                            <Route index element={<Login />} />
                            <Route path="login" element={<Login />} />

                            <Route element={<PrivateRoute />}>
                                <Route element={<MainLayout />}>
                                    <Route path="reconciliation" element={<Reconciliation />} />
                                    <Route path="outstandings" element={<Outstandings />} />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}

export default App;
