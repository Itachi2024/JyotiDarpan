import React from 'react';
import { QrCode, Smartphone, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface GenericUPIQRProps {
  upiId: string;
  merchantName: string;
}

const GenericUPIQR: React.FC<GenericUPIQRProps> = ({ upiId, merchantName }) => {
  const [copied, setCopied] = useState(false);
  
  // Generic UPI string without amount - allows manual entry
  const genericUpiString = `upi://pay?pa=${upiId}&pn=${merchantName}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(genericUpiString)}`;

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy UPI ID:', err);
    }
  };

  const handleUPIAppClick = (app: string) => {
    let appUrl = '';
    
    switch (app) {
      case 'phonepe':
        appUrl = `phonepe://pay?pa=${upiId}&pn=${merchantName}&cu=INR`;
        break;
      case 'googlepay':
        appUrl = `tez://upi/pay?pa=${upiId}&pn=${merchantName}&cu=INR`;
        break;
      case 'paytm':
        appUrl = `paytmmp://pay?pa=${upiId}&pn=${merchantName}&cu=INR`;
        break;
      default:
        appUrl = genericUpiString;
    }
    
    // Try to open the app
    window.location.href = appUrl;
  };

  return (
    <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
      <h3 className="font-semibold mb-2 text-primary">Quick Pay via UPI</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Scan QR code or click app buttons to pay any amount
      </p>
      
      {/* QR Code */}
      <div className="w-48 h-48 mx-auto bg-white border-2 border-primary/20 rounded-lg flex items-center justify-center mb-4 shadow-sm">
        <img 
          src={qrCodeUrl}
          alt="Generic UPI QR Code"
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
          <QrCode className="w-24 h-24 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Generic QR Code</p>
        </div>
      </div>
      
      {/* UPI ID with Copy Button */}
      <div className="mb-4 p-3 bg-white/50 rounded-lg border border-primary/10">
        <p className="text-sm text-muted-foreground mb-1">UPI ID</p>
        <div className="flex items-center justify-center gap-2">
          <code className="font-mono text-sm font-medium">{upiId}</code>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyUPI}
            className="h-6 w-6 p-0"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
        {copied && (
          <p className="text-xs text-green-600 mt-1">UPI ID copied!</p>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mb-4 text-xs text-muted-foreground space-y-1">
        <p>• Scan QR code with any UPI app</p>
        <p>• Enter your desired amount manually</p>
        <p>• Or click app buttons below for quick access</p>
      </div>
      
      {/* UPI App Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleUPIAppClick('phonepe')}
          className="flex items-center gap-2 text-xs"
        >
          <Smartphone className="w-3 h-3" />
          PhonePe
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleUPIAppClick('googlepay')}
          className="flex items-center gap-2 text-xs"
        >
          <Smartphone className="w-3 h-3" />
          Google Pay
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleUPIAppClick('paytm')}
          className="flex items-center gap-2 text-xs"
        >
          <Smartphone className="w-3 h-3" />
          Paytm
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleUPIAppClick('generic')}
          className="flex items-center gap-2 text-xs"
        >
          <Smartphone className="w-3 h-3" />
          Other UPI
        </Button>
      </div>
    </div>
  );
};

export default GenericUPIQR;