import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const res = await fetch(url, { signal: controller.signal });

                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();

                setData(data);
                setError(null);
                setIsLoading(false);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError('Could not fetch data');
                }
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, isLoading, error };
};
