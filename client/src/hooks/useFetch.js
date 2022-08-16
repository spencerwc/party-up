import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await fetch(url, { signal: controller.signal });

                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();

                setData(data);
                setError(null);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError('Could not fetch data');
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, error };
};
