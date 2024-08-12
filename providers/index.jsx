import QueryProvider from "./QueryProvider";
import { Provider } from 'jotai';

export default function Providers({ children }) {
    return (
        <>
            <QueryProvider>
                <Provider>
                    {children}
                </Provider>
            </QueryProvider>
        </>
    )
}