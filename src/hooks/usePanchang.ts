import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Panchang = Tables<'panchangs'>;

export const usePanchang = (date?: string) => {
  const targetDate = date || new Date().toISOString().split('T')[0];
  
  return useQuery({
    queryKey: ['panchang', targetDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('panchangs')
        .select('*')
        .eq('date', targetDate)
        .single();

      if (error) {
        // If no data found, return sample data
        if (error.code === 'PGRST116') {
          return {
            date: targetDate,
            tithi_name_hindi: 'पूर्णिमा',
            tithi_name_english: 'Purnima',
            tithi_end_time: '18:45',
            nakshatra_name_hindi: 'पुष्य',
            nakshatra_name_english: 'Pushya',
            nakshatra_end_time: '14:30',
            yoga_name_hindi: 'शुभ',
            yoga_name_english: 'Shubha',
            yoga_end_time: '22:15',
            karana_name_hindi: 'बव',
            karana_name_english: 'Bava',
            karana_end_time: '12:00',
            paksha: 'शुक्ल पक्ष',
            vaar_hindi: 'रविवार',
            vaar_english: 'Sunday',
            sunrise: '06:45',
            sunset: '18:30',
            moonrise: '19:15',
            moonset: '06:30',
            rahu_kaal_start: '16:30',
            rahu_kaal_end: '18:00',
            yamagandam_start: '12:00',
            yamagandam_end: '13:30',
            gulik_kaal_start: '15:00',
            gulik_kaal_end: '16:30',
            abhijit_start: '11:45',
            abhijit_end: '12:30',
            choghadiya: [
              { time: '06:45 - 08:15', name: 'उद्वेग', english: 'Udveg', type: 'bad' },
              { time: '08:15 - 09:45', name: 'चर', english: 'Char', type: 'good' },
              { time: '09:45 - 11:15', name: 'लाभ', english: 'Labh', type: 'good' },
              { time: '11:15 - 12:45', name: 'अमृत', english: 'Amrit', type: 'best' },
              { time: '12:45 - 14:15', name: 'काल', english: 'Kaal', type: 'bad' },
              { time: '14:15 - 15:45', name: 'शुभ', english: 'Shubh', type: 'good' },
              { time: '15:45 - 17:15', name: 'रोग', english: 'Rog', type: 'bad' },
              { time: '17:15 - 18:45', name: 'उद्वेग', english: 'Udveg', type: 'bad' },
            ],
          } as Panchang;
        }
        throw error;
      }
      
      return data as Panchang;
    },
  });
};