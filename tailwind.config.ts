import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Cormorant Garamond', 'serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#1a472a',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f0f7f4',
          foreground: '#1a472a',
        },
        muted: {
          DEFAULT: '#f0f7f4',
          foreground: '#5a7a65',
        },
        accent: {
          DEFAULT: '#2d9a5f',
          foreground: '#ffffff',
        },
        highlight: '#2d9a5f',
        surface: '#ffffff',
        text: '#0f2419',
        border: '#c8e0d2',
        destructive: {
          DEFAULT: '#c0392b',
          foreground: '#ffffff',
        },
        success: '#1e8449',
        ring: '#1a472a',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: '#1a472a',
          foreground: '#ffffff',
          primary: '#2d9a5f',
          'primary-foreground': '#ffffff',
          accent: '#f0f7f4',
          'accent-foreground': '#1a472a',
          border: '#c8e0d2',
          ring: '#2d9a5f',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
