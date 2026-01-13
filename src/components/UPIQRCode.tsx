import React from 'react';
import { QrCode, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UPIQRCodeProps {
  amount: number;
  upiId: string;
  merchantName: string;
  onCancel: () => void;
}

const UPIQRCode: React.FC<UPIQRCodeProps> = ({ 
  amount, 
  upiId, 
  merchantName, 
  onCancel 
}) => {
  const upiString = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=Payment for Astrology Services`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;

  const handleUPIAppClick = (app: string) => {
    let appUrl = '';
    
    switch (app) {
      case 'phonepe':
        appUrl = `phonepe://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=Payment for Astrology Services`;
        break;
      case 'googlepay':
        appUrl = `tez://upi/pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=Payment for Astrology Services`;
        break;
      case 'paytm':
        appUrl = `paytmmp://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=Payment for Astrology Services`;
        break;
      default:
        appUrl = upiString;
    }
    
    // Try to open the app, fallback to generic UPI
    window.location.href = appUrl;
    
    // Fallback after a short delay
    setTimeout(() => {
      window.location.href = upiString;
    }, 1000);
  };

  return (
    <div className="text-center p-6 bg-muted/50 rounded-lg">
      <h3 className="font-semibold mb-4">Pay ₹{amount} via UPI</h3>
      
      {/* QR Code */}
      <div className="w-48 h-48 mx-auto bg-white border-2 border-border rounded-lg flex items-center justify-center mb-4">
        <img 
          src={qrCodeUrl}
          alt="UPI QR Code"
          className="w-44 h-44 rounded"
          onError={(e) => {
            // Fallback if QR service fails
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <div className="text-center hidden">
          <QrCode className="w-24 h-24 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">QR Code</p>
        </div>
      </div>
      
      {/* UPI Details */}
      <div className="space-y-2 text-sm mb-4">
        <p><strong>UPI ID:</strong> {upiId}</p>
        <p><strong>Merchant:</strong> {merchantName}</p>
        <p><strong>Amount:</strong> ₹{amount}</p>
        <p className="text-muted-foreground">
          Scan with any UPI app or click below
        </p>
      </div>
      
      {/* UPI App Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleUPIAppClick('phonepe')}
          className="flex items-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          PhonePe
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleUPIAppClick('googlepay')}
          className="flex items-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          Google Pay
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleUPIAppClick('paytm')}
          className="flex items-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          Paytm
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleUPIAppClick('generic')}
          className="flex items-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          Other UPI
        </Button>
      </div>
      
      {/* Cancel Button */}
      <Button 
        variant="ghost" 
        className="w-full"
        onClick={onCancel}
      >
        Cancel Payment
      </Button>
    </div>
  );
};

export default UPIQRCode;