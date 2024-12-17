import {useEffect, useState} from 'react';

const useNotionPage = (pageId) => {
    const [recordMap, setRecordMap] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pageId) return;

        const fetchPage = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`/api/notionPage?id=${pageId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Notion page data');
                }

                const data = await response.json();
                setRecordMap(data);
            } catch (err) {
                console.error('Error fetching Notion page data:', err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPage();
    }, [pageId]);

    return {recordMap, isLoading, error};
};

export default useNotionPage;
