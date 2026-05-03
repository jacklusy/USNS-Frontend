import { useState, useEffect } from 'react';
import { RecipientFilters, announcementService } from '../services/announcementService';

export function useRecipientCount(filters: RecipientFilters) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const result = await announcementService.getRecipientCount(filters);
        if (isMounted) {
          setCount(result);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) setIsLoading(false);
      }
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [JSON.stringify(filters)]);

  return { count, isLoading };
}
