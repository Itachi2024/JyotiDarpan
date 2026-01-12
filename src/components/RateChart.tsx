import { useState, useEffect } from 'react';
import { Clock, IndianRupee, Info, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ServiceRate {
  id: string;
  service_name: string;
  price_inr: number;
  duration: string | null;
  description: string | null;
  is_active: boolean;
}

interface RateChartProps {
  title?: string;
  showAll?: boolean;
  filterServices?: string[];
}

export const RateChart = ({ title = "Service Rates", showAll = true, filterServices = [] }: RateChartProps) => {
  const [rates, setRates] = useState<ServiceRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ price_inr: 0, duration: '', description: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchRates();
    checkAdminStatus();
  }, [user]);

  const fetchRates = async () => {
    try {
      let query = supabase
        .from('service_rates')
        .select('*')
        .eq('is_active', true)
        .order('service_name');

      if (!showAll && filterServices.length > 0) {
        query = query.in('service_name', filterServices);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setRates(data || []);
    } catch (error) {
      console.error('Error fetching rates:', error);
      toast.error('Failed to load service rates');
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('astrologers')
        .select('is_admin')
        .eq('user_id', user.id)
        .single();
      
      if (data && !error) {
        setIsAdmin(data.is_admin);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const startEdit = (rate: ServiceRate) => {
    setEditingId(rate.id);
    setEditForm({
      price_inr: rate.price_inr,
      duration: rate.duration || '',
      description: rate.description || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ price_inr: 0, duration: '', description: '' });
  };

  const saveEdit = async (id: string) => {
    try {
      const { error } = await supabase.rpc('update_service_rate', {
        service_id: id,
        new_price: editForm.price_inr,
        new_duration: editForm.duration,
        new_description: editForm.description
      });

      if (error) throw error;

      toast.success('Service rate updated successfully');
      setEditingId(null);
      fetchRates();
    } catch (error) {
      console.error('Error updating rate:', error);
      toast.error('Failed to update service rate');
    }
  };

  if (loading) {
    return (
      <div className="card-spiritual p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-spiritual p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-primary" />
          {title}
        </h3>
        {isAdmin && (
          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
            Admin View
          </span>
        )}
      </div>

      <div className="space-y-3">
        {rates.map((rate) => (
          <div key={rate.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            {editingId === rate.id ? (
              // Edit Mode
              <div className="space-y-3">
                <div className="font-medium text-foreground">{rate.service_name}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Price (₹)</label>
                    <Input
                      type="number"
                      value={editForm.price_inr}
                      onChange={(e) => setEditForm({ ...editForm, price_inr: parseInt(e.target.value) || 0 })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Duration</label>
                    <Input
                      value={editForm.duration}
                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      placeholder="e.g., 30 mins"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-xs text-muted-foreground">Description</label>
                    <Textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="mt-1 h-20"
                      placeholder="Service description..."
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveEdit(rate.id)}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-foreground">{rate.service_name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <IndianRupee className="w-3 h-3" />
                        {rate.price_inr}
                      </span>
                      {rate.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rate.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  {rate.description && (
                    <p className="text-sm text-muted-foreground flex items-start gap-1">
                      <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {rate.description}
                    </p>
                  )}
                </div>
                {isAdmin && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEdit(rate)}
                    className="ml-2"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {rates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <IndianRupee className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No service rates available</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          💡 All prices are in Indian Rupees (₹). Contact our astrologers directly for personalized consultations.
        </p>
      </div>
    </div>
  );
};