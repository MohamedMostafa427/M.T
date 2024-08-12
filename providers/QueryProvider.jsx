"use client"
import { QueryClientProvider, QueryClient, useQuery } from "react-query"
export default function Provider({ children }) {
    const qureyclint = new QueryClient();
    return (
        <QueryClientProvider client={qureyclint}>
                {children}
        </QueryClientProvider>
    )
}

