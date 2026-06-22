import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMessageCircle, FiX } from 'react-icons/fi';

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567';
const defaultMessage = encodeURIComponent('Hello Chandira Kids! I need help with my order.');

export default function LiveChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-5 z-40 sm:bottom-6 sm:right-24">
      {open && (
        <div className="mb-3 w-72 overflow-hidden rounded-2xl border border-brand-blush bg-white shadow-card">
          <div className="flex items-center justify-between bg-gradient-to-r from-brand-rose to-brand-pink px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">Chandira Kids Support</p>
              <p className="text-xs text-white/80">We typically reply within minutes</p>
            </div>
            <button className="rounded-lg p-1 hover:bg-white/20" onClick={() => setOpen(false)} aria-label="Close chat">
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-3 p-4">
            <p className="text-body-sm text-muted">Chat with us on WhatsApp for orders, sizing, and wholesale enquiries.</p>
            <a
              className="btn-primary w-full"
              href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp /> Start WhatsApp chat
            </a>
            <p className="text-center text-xs text-muted">Mon–Sat, 9 AM – 6 PM</p>
          </div>
        </div>
      )}
      <button
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-rose text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-glow"
        onClick={() => setOpen((v) => !v)}
        aria-label="Live chat support"
      >
        {open ? <FiX className="h-6 w-6" /> : <FiMessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
