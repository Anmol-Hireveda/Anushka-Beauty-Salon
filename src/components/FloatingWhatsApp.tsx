import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function FloatingWhatsApp() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          href="https://wa.me/919694834669"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
          
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        </motion.a>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-card border-border">
        <p>Chat with us</p>
      </TooltipContent>
    </Tooltip>
  );
}
