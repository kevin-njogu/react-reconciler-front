import { createContext, useContext, useReducer } from 'react';

const PaginationContext = createContext();

const initialState = {
    page: 0,
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'prev':
            return {
                ...state,
                page: Math.max(0, state.page - 1),
            };
        case 'next':
            return {
                ...state,
                page: state.page + 1,
            };
        case 'reset':
            return {
                ...state,
                page: 0,
            };
        default:
            return { ...state };
    }
};

function PaginationProvider({ children }) {
    const [{ page }, dispatch] = useReducer(reducer, initialState);

    return (
        <PaginationContext.Provider value={{ page, dispatch }}>
            {children}
        </PaginationContext.Provider>
    );
}

//3. Create custom hook for the context
function usePaginationContext() {
    const context = useContext(PaginationContext);
    if (context === undefined) {
        throw new Error('Pagination Context was used outside the auth provider');
    }
    return context;
}

//4. export the context hook and the context provider
export { usePaginationContext, PaginationProvider };
/**************************************************************************** */
