import { toast } from 'sonner';

export const showPhase2Message = (feature: string = 'This feature') => {
  toast.info(`${feature} will be available in Phase 2! 🚀`, {
    description: 'We are working hard to bring you more amazing features.',
    duration: 4000,
  });
};

export const showUnderDevelopmentMessage = (feature: string = 'This feature') => {
  toast.info(`${feature} is under development! 🔧`, {
    description: 'Coming soon with enhanced functionality.',
    duration: 3000,
  });
};

export const showContactRedirectMessage = () => {
  toast.success('Redirecting to contact page! 📞', {
    description: 'Connect with our astrologers directly.',
    duration: 2000,
  });
};