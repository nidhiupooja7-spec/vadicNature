import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

const ShareButton = ({ productTitle }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: productTitle || 'Vedic Nature Fragrance Oil',
      text: 'Explore this exquisite botanical oil from Vedic Nature.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 border border-vedic-gold/60 px-4 py-2 text-xs uppercase tracking-widest text-vedic-charcoal hover:bg-vedic-green hover:text-white transition cursor-pointer"
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      <span>{copied ? 'Link Copied!' : 'Share Product'}</span>
    </button>
  );
};

export default ShareButton;