/**
 * Part Search Hook
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { SearchFilters } from '../types';

export function useSearchParts(query: string, filters: SearchFilters) {
  return useInfiniteQuery({
    queryKey: ['parts', 'search', query, filters],
    queryFn: ({ pageParam = 1 }) => api.searchParts(query, filters, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.pagination.page < lastPage.pagination.pages) {
        return pages.length + 1;
      }
      return undefined;
    },
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
