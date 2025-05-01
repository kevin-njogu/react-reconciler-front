import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './assets/components/layout/MainLayout';
import Reconciliation from './assets/components/reconciliation/Reconciliation';
import Outstandings from './assets/components/outstanding/Outstandings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import store from './assets/store/store';
import Login from './assets/components/auth/Login';
import PrivateRoute from './assets/components/auth/PrivateRoute';
import Register from './assets/components/auth/Register';

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
                        <Route path="/register" element={<Register />} />
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />

                        <Route element={<PrivateRoute />}>
                            <Route element={<MainLayout />}>
                                <Route path="reconciliation" element={<Reconciliation />} />
                                <Route path="outstandings" element={<Outstandings />} />
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
