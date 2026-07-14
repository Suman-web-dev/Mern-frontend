import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function useToastErrorHandler(error: any, message: string = 'An error occurred') {
  const hasShownError = useRef(false);

  useEffect(() => {
    if (error && !hasShownError.current) {
      hasShownError.current = true;
      setTimeout(() => {
        toast.error(message);
      }, 0);
    }
  }, [error, message]);
}
