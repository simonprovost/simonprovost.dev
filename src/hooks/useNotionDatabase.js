import { useState, useEffect } from 'react';
import blogConfig from '../configs/blogConfig';

const useNotionDatabase = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://notion-api.splitbee.io/v1/table/${blogConfig.notionDatabaseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Notion database data');
        }
        const data = await response.json();

        const postsData = data.map((row) => ({
          id: row.id,
          title: row.Title || 'Untitled',
          details: row.Details || '',
          media: row['Files & media']?.[0]
            ? { type: 'image', src: row['Files & media'][0].url, aspect: 'landscape' }
            : null,
          url: `/blog/${row.id}`,
        }));

        setPosts(postsData);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, isLoading, error };
};

export default useNotionDatabase;
