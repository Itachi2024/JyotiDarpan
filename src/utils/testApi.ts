// Simple API test utility
export const testHoroscopeAPI = async () => {
  try {
    console.log('🧪 Testing Horoscope API...');
    
    const response = await fetch('https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=aries&day=today');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Horoscope API working!', data);
      return { success: true, data };
    } else {
      console.log('❌ Horoscope API failed:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.log('❌ Horoscope API error:', error);
    return { success: false, error: error.message };
  }
};

// Test function to be called from browser console
(window as any).testHoroscopeAPI = testHoroscopeAPI;