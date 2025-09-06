import { useQuery } from '@tanstack/react-query';
import { fetchDataFromApi } from '../utils/api';

// Configuration query
export const useApiConfiguration = () => {
  return useQuery({
    queryKey: ['apiConfiguration'],
    queryFn: () => fetchDataFromApi('/configuration'),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - rarely changes
  });
};

// Genres query
export const useGenres = (mediaTypes = ['tv', 'movie']) => {
  return useQuery({
    queryKey: ['genres', mediaTypes],
    queryFn: async () => {
      const promises = mediaTypes.map(type => 
        fetchDataFromApi(`/genre/${type}/list`)
      );
      const data = await Promise.all(promises);
      
      const allGenres = {};
      data.forEach(({ genres }) => {
        genres.forEach(item => {
          allGenres[item.id] = item;
        });
      });
      
      return allGenres;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Popular movies/tv shows
export const usePopular = (mediaType, page = 1) => {
  return useQuery({
    queryKey: ['popular', mediaType, page],
    queryFn: () => fetchDataFromApi(`/${mediaType}/popular`, { page }),
    enabled: !!mediaType,
  });
};

// Top rated movies/tv shows
export const useTopRated = (mediaType, page = 1) => {
  return useQuery({
    queryKey: ['topRated', mediaType, page],
    queryFn: () => fetchDataFromApi(`/${mediaType}/top_rated`, { page }),
    enabled: !!mediaType,
  });
};

// Trending movies/tv shows
export const useTrending = (timeWindow = 'day', page = 1) => {
  return useQuery({
    queryKey: ['trending', timeWindow, page],
    queryFn: () => fetchDataFromApi(`/trending/all/${timeWindow}`, { page }),
  });
};

// Movie/TV details
export const useDetails = (mediaType, id) => {
  return useQuery({
    queryKey: ['details', mediaType, id],
    queryFn: () => fetchDataFromApi(`/${mediaType}/${id}`),
    enabled: !!(mediaType && id),
  });
};

// Movie/TV credits
export const useCredits = (mediaType, id) => {
  return useQuery({
    queryKey: ['credits', mediaType, id],
    queryFn: () => fetchDataFromApi(`/${mediaType}/${id}/credits`),
    enabled: !!(mediaType && id),
  });
};

// Movie/TV videos
export const useVideos = (mediaType, id) => {
  return useQuery({
    queryKey: ['videos', mediaType, id],
    queryFn: () => fetchDataFromApi(`/${mediaType}/${id}/videos`),
    enabled: !!(mediaType && id),
  });
};

// Similar movies/tv shows
export const useSimilar = (mediaType, id) => {
  return useQuery({
    queryKey: ['similar', mediaType, id],
    queryFn: () => fetchDataFromApi(`/${mediaType}/${id}/similar`),
    enabled: !!(mediaType && id),
  });
};

// Recommendations
export const useRecommendations = (mediaType, id) => {
  return useQuery({
    queryKey: ['recommendations', mediaType, id],
    queryFn: () => fetchDataFromApi(`/${mediaType}/${id}/recommendations`),
    enabled: !!(mediaType && id),
  });
};

// Search
export const useSearch = (query, page = 1) => {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => fetchDataFromApi('/search/multi', { query, page }),
    enabled: !!query && query.trim().length > 0,
  });
};

// Discover movies/tv shows with filters
export const useDiscover = (mediaType, filters = {}, page = 1) => {
  return useQuery({
    queryKey: ['discover', mediaType, filters, page],
    queryFn: () => fetchDataFromApi(`/discover/${mediaType}`, { ...filters, page }),
    enabled: !!mediaType,
  });
};