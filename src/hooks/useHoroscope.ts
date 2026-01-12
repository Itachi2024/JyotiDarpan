import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Horoscope = Tables<'horoscopes'>;

export const useHoroscope = (sign: string, date?: string) => {
  const targetDate = date || new Date().toISOString().split('T')[0];
  
  return useQuery({
    queryKey: ['horoscope', sign, targetDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('horoscopes')
        .select('*')
        .eq('sign', sign.toLowerCase())
        .eq('date', targetDate)
        .single();

      if (error) {
        // If no data found, return sample data
        if (error.code === 'PGRST116') {
          return {
            sign,
            date: targetDate,
            overview_hindi: "आज का दिन आपके लिए शुभ है। करियर में नई संभावनाएं खुलेंगी।",
            overview_english: "Today is auspicious for you. New opportunities will open in career.",
            love_score: 85,
            love_text: "प्रेम संबंधों में मधुरता रहेगी।",
            career_score: 90,
            career_text: "कार्यस्थल पर सम्मान मिलेगा।",
            health_score: 75,
            health_text: "स्वास्थ्य का ध्यान रखें।",
            finance_score: 80,
            finance_text: "आर्थिक लाभ होगा।",
            lucky_number: 7,
            lucky_color: "Saffron",
            lucky_time: "10:00 AM - 12:00 PM",
          } as Horoscope;
        }
        throw error;
      }
      
      return data as Horoscope;
    },
    enabled: !!sign,
  });
};