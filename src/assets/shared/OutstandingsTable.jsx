import { useManualReconcile } from '../api/transactions';
import { usePaginationContext } from '../context/Pagination';

const TableHeaders = ['DATE', 'NARRATIVE', 'DEBIT', 'CREDIT', 'STATUS', 'ACTION'];

const OutstandingsTable = ({ data, gateway }) => {
    const { page, dispatch } = usePaginationContext();
    const { isPending, reconcile } = useManualReconcile();
    const content = data?.content;
    //const pageSize = data?.pageSize;
    const totalElements = data?.totalElements;
    const lastPage = data?.lastPage;
    const totalPages = data?.totalPages - 1;

    function handleManualReconcilition(id) {
        if (!id || !gateway) {
            return null;
        } else {
            const data = { trnId: id, gtw: gateway };
            reconcile(data);
        }
    }

    function handlePreviousPage() {
        if (page === 0) {
            return null;
        }
        if (page > 0) {
            dispatch({ type: 'prev' });
        }
    }

    function handleNextPage() {
        if (lastPage) {
            return null;
        }
        if (lastPage !== true) {
            dispatch({ type: 'next' });
        }
    }

    return (
        <div className="w-full">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label for="checkbox-all-search" class="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th> */}
                            {TableHeaders?.map((header) => {
                                return (
                                    <th scope="col" class="px-6 py-3" key={header}>
                                        {header}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {content?.map((item) => {
                            return (
                                <tr
                                    class="bg-white border-b border-gray-200 hover:bg-gray-50 text-[12px] "
                                    key={item?.id}
                                >
                                    {/* <td class="w-4 p-4">
                                        <div class="flex items-center">
                                            <input
                                                id="checkbox-table-search-1"
                                                type="checkbox"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label for="checkbox-table-search-1" class="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td> */}
                                    <td class="px-6 py-2">{item?.date}</td>
                                    <td class="px-6 py-2">{item?.narrative}</td>
                                    <td class="px-6 py-2">{item?.debit}</td>
                                    <td class="px-6 py-2">{item?.credit}</td>
                                    <td class="px-6 py-2">{item?.isReconciled}</td>
                                    <td class="px-6 py-2">
                                        <button
                                            class="manualReconcileButton"
                                            disabled={isPending}
                                            onClick={() => handleManualReconcilition(item?.id)}
                                        >
                                            Close
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <nav
                    class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                    aria-label="Table navigation"
                >
                    <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span class="font-semibold text-gray-900 ">{page}</span> of{' '}
                        <span class="font-semibold text-gray-900">{totalPages}</span>
                        <span class=""></span> pages <span class=""> with </span>
                        <span class="font-semibold text-gray-900 ">{totalElements}</span>
                        <span class=""> transactions</span>
                    </span>
                    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button
                                class="paginationButton rounded-s-lg"
                                onClick={handlePreviousPage}
                            >
                                Previous
                            </button>
                        </li>
                        <li>
                            <p class="paginationButton">{page}</p>
                        </li>
                        <li>
                            <button class="paginationButton" onClick={handleNextPage}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
export default OutstandingsTable;
