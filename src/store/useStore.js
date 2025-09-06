import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      // App configuration
      url: {},
      genres: {},
      
      // UI state
      loading: false,
      error: null,
      
      // Actions
      setApiConfigurations: (url) => set({ url }, false, 'setApiConfigurations'),
      setGenres: (genres) => set({ genres }, false, 'setGenres'),
      setLoading: (loading) => set({ loading }, false, 'setLoading'),
      setError: (error) => set({ error }, false, 'setError'),
      
      // Reset functions
      resetError: () => set({ error: null }, false, 'resetError'),
    }),
    {
      name: 'movix-store',
    }
  )
);

export default useStore;