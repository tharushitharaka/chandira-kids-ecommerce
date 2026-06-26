export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#F283AF',  /* Tickle Me Pink  - Main brand color        */
          raspberry: '#C43670',  /* Raspberry Rose  - Buttons, badges          */
          champagne: '#FBF4EB',  /* Champagne       - Background               */
          blush:     '#FBD9E5',  /* Blush           - Light pink accents       */
          cherry:    '#E8B8C9',  /* Cherry Blossom  - Accent                   */
          sunset:    '#F3CC97',  /* Sunset          - Highlight / gold accents  */
          navy:      '#2F4156',  /* Navy            - Dark contrast text        */
          palePink:  '#FFE1E6',  /* Pale Pink       - Ultra-soft bg            */
          azalea:    '#F7C9D4',  /* Azalea          - Mid-pink accent           */
          skyBlue:   '#C8D9E6',  /* Sky Blue        - Calm accent              */
          beige:     '#F5EFEB',  /* Beige           - Warm neutral bg          */
          /* ── Aliases used across components (critical - do NOT remove) ── */
          rose:      '#C43670',  /* alias → raspberry  used in 80+ components  */
          pink:      '#F283AF',  /* alias → primary    used in 40+ components  */
          deep:      '#9B2455',  /* darker raspberry   used in hover states     */
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
