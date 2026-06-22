export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F283AF',    /* Tickle Me Pink - Main brand color */
          raspberry: '#C43670',   /* Raspberry Rose - Buttons, badges, headings */
          champagne: '#FBF4EB',   /* Champagne - Background */
          blush: '#FBD9E5',       /* Blush - Light pink accents */
          cherry: '#E8B8C9',      /* Cherry Blossom - Accent */
          sunset: '#F3CC97'      /* Sunset - Highlight */
        },
        text: {
          dark: '#4A3B44',
          light: '#FFFFFF'
        },
        ink: '#1A1A2E',
        muted: '#4B5563'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Poppins', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'Georgia', 'serif']
      },
      fontSize: {
        'body': ['1.0625rem', { lineHeight: '1.65', letterSpacing: '-0.01em' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }]
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(196, 54, 112, 0.08)',
        card: '0 8px 32px -8px rgba(26, 26, 46, 0.1)',
        glow: '0 0 40px -8px rgba(242, 131, 175, 0.35)'
      }
    }
  },
  plugins: []
};
