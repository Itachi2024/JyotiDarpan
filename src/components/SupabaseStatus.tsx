import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export const SupabaseStatus = () => {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Try to make a simple query to test connection
        const { data, error } = await supabase
          .from('astrologers')
          .select('id')
          .limit(1);

        if (error) {
          setStatus('error');
          setError(error.message);
        } else {
          setStatus('connected');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    checkConnection();
  }, []);

  if (status === 'loading') {
    return (
      <div className="fixed top-4 right-4 bg-blue-100 border border-blue-300 rounded-lg p-3 flex items-center gap-2 z-50">
        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
        <span className="text-sm text-blue-800">Connecting to database...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-300 rounded-lg p-3 max-w-md z-50">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Database Connection Error</p>
            <p className="text-xs text-red-700 mt-1">{error}</p>
            <p className="text-xs text-red-600 mt-2">
              Check your .env file and Supabase keys. See SUPABASE_KEYS_SETUP.md
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-100 border border-green-300 rounded-lg p-3 flex items-center gap-2 z-50">
      <CheckCircle className="w-4 h-4 text-green-600" />
      <span className="text-sm text-green-800">Database connected</span>
    </div>
  );
};