import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Astrologer = Tables<'astrologers'>;

export const useAstrologers = (filters?: {
  specialty?: string;
  isOnline?: boolean;
  sortBy?: 'rating' | 'price' | 'experience';
}) => {
  return useQuery({
    queryKey: ['astrologers', filters],
    queryFn: async () => {
      let query = supabase
        .from('astrologers')
        .select('*')
        .eq('is_verified', true);

      if (filters?.specialty && filters.specialty !== 'All') {
        query = query.contains('specialties', [filters.specialty]);
      }

      if (filters?.isOnline) {
        query = query.eq('is_online', true);
      }

      if (filters?.sortBy === 'rating') {
        query = query.order('rating', { ascending: false });
      } else if (filters?.sortBy === 'price') {
        query = query.order('price_per_minute', { ascending: true });
      } else if (filters?.sortBy === 'experience') {
        query = query.order('experience_years', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Astrologer[];
    },
  });
};

export const useAstrologer = (id: string) => {
  return useQuery({
    queryKey: ['astrologer', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('astrologers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Astrologer;
    },
    enabled: !!id,
  });
};