-- AstroRishabh Seed Data
-- Sample data for testing and initial setup

-- Sample horoscope data for today
INSERT INTO public.horoscopes (date, sign, overview_hindi, overview_english, love_score, career_score, health_score, finance_score, lucky_number, lucky_color, lucky_time) VALUES
(CURRENT_DATE, 'aries', 'आज आपका दिन शुभ रहेगा। नए अवसर मिल सकते हैं।', 'Today will be a good day for you. New opportunities may come your way.', 85, 75, 90, 70, 7, 'Red', '10:30 AM'),
(CURRENT_DATE, 'taurus', 'धन संबंधी मामलों में सावधानी बरतें। स्वास्थ्य अच्छा रहेगा।', 'Be careful in money matters. Health will be good.', 70, 80, 85, 65, 3, 'Green', '2:15 PM'),
(CURRENT_DATE, 'gemini', 'संवाद कौशल का उपयोग करें। करियर में प्रगति संभव है।', 'Use your communication skills. Career progress is possible.', 75, 90, 70, 80, 5, 'Yellow', '11:45 AM'),
(CURRENT_DATE, 'cancer', 'पारिवारिक मामलों में खुशी मिलेगी। भावनात्मक संतुलन बनाए रखें।', 'You will find happiness in family matters. Maintain emotional balance.', 90, 65, 80, 75, 2, 'Silver', '4:20 PM'),
(CURRENT_DATE, 'leo', 'आत्मविश्वास से काम लें। नेतृत्व के अवसर मिल सकते हैं।', 'Work with confidence. Leadership opportunities may arise.', 80, 85, 75, 85, 1, 'Gold', '9:30 AM'),
(CURRENT_DATE, 'virgo', 'विस्तार पर ध्यान दें। कार्यक्षेत्र में सफलता मिलेगी।', 'Pay attention to details. You will succeed in your work area.', 65, 95, 85, 70, 6, 'Navy Blue', '1:10 PM'),
(CURRENT_DATE, 'libra', 'संतुलन बनाए रखें। रिश्तों में सुधार होगा।', 'Maintain balance. Relationships will improve.', 85, 70, 80, 75, 4, 'Pink', '3:45 PM'),
(CURRENT_DATE, 'scorpio', 'गहराई से सोचें। छुपे हुए अवसर मिल सकते हैं।', 'Think deeply. Hidden opportunities may be found.', 75, 80, 70, 90, 8, 'Maroon', '6:30 PM'),
(CURRENT_DATE, 'sagittarius', 'यात्रा या शिक्षा संबंधी योजनाएं शुभ हैं। भाग्य साथ देगा।', 'Travel or education related plans are auspicious. Luck will support you.', 80, 75, 85, 80, 9, 'Purple', '8:15 AM'),
(CURRENT_DATE, 'capricorn', 'मेहनत का फल मिलेगा। धैर्य रखें और आगे बढ़ें।', 'You will get the fruits of hard work. Be patient and move forward.', 70, 90, 75, 85, 10, 'Brown', '12:30 PM'),
(CURRENT_DATE, 'aquarius', 'नवाचार और तकनीक का उपयोग करें। मित्रों का साथ मिलेगा।', 'Use innovation and technology. You will get support from friends.', 85, 85, 80, 75, 11, 'Blue', '5:00 PM'),
(CURRENT_DATE, 'pisces', 'कल्पना और सहजता का उपयोग करें। आध्यात्मिक लाभ होगा।', 'Use imagination and intuition. There will be spiritual benefits.', 90, 70, 85, 70, 12, 'Sea Green', '7:45 PM');

-- Sample panchang data for today
INSERT INTO public.panchangs (
    date, 
    tithi_name_hindi, 
    tithi_name_english, 
    tithi_end_time,
    nakshatra_name_hindi, 
    nakshatra_name_english, 
    nakshatra_end_time,
    yoga_name_hindi, 
    yoga_name_english, 
    yoga_end_time,
    karana_name_hindi, 
    karana_name_english, 
    karana_end_time,
    paksha, 
    vaar_hindi, 
    vaar_english,
    sunrise, 
    sunset, 
    moonrise, 
    moonset,
    rahu_kaal_start, 
    rahu_kaal_end,
    yamagandam_start, 
    yamagandam_end,
    gulik_kaal_start, 
    gulik_kaal_end,
    abhijit_start, 
    abhijit_end
) VALUES (
    CURRENT_DATE,
    'द्वितीया', 'Dwitiya', '14:30:00',
    'रोहिणी', 'Rohini', '16:45:00',
    'सिद्धि', 'Siddhi', '13:20:00',
    'बव', 'Bava', '14:30:00',
    'शुक्ल पक्ष', 'Monday', 'Monday',
    '06:30:00', '18:45:00', '20:15:00', '08:30:00',
    '07:30:00', '09:00:00',
    '12:00:00', '13:30:00',
    '15:00:00', '16:30:00',
    '12:00:00', '12:48:00'
);

-- Sample muhurat data
INSERT INTO public.muhurats (date, muhurta_type, start_time, end_time, quality, description) VALUES
(CURRENT_DATE, 'Marriage', '10:30:00', '12:00:00', 'best', 'Excellent time for marriage ceremonies'),
(CURRENT_DATE, 'Business', '14:00:00', '15:30:00', 'good', 'Good time for starting new business ventures'),
(CURRENT_DATE, 'Travel', '09:00:00', '10:30:00', 'good', 'Auspicious time for beginning journeys'),
(CURRENT_DATE, 'Education', '16:00:00', '17:30:00', 'best', 'Perfect time for educational activities'),
(CURRENT_DATE + INTERVAL '1 day', 'Housewarming', '11:00:00', '12:30:00', 'best', 'Ideal time for griha pravesh ceremony');

-- You can add more sample data as needed for testing