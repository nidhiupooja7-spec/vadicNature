import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const message = encodeURIComponent(
    'Hello Vedic Nature! I would like to know more about your botanical fragrance oils.'
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={22} fill="white" />
      <span className="hidden sm:inline text-xs font-medium tracking-wide">Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;