import localFont from 'next/font/local';

export const sansFont = localFont({
  variable: '--font-sans',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/DMSans-opsz-wght.woff2',
      style: 'normal',
      weight: '100 1000',
    },
  ],
});

export const monoFont = localFont({
  variable: '--font-mono',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/JetBrainsMono-wght.woff2',
      style: 'normal',
      weight: '400 700',
    },
  ],
});

export const displayFont = localFont({
  variable: '--font-display',
  display: 'swap',
  preload: false,
  src: [
    {
      path: '../../public/fonts/InterVariable.woff2',
      style: 'normal',
      weight: '400 700',
    },
  ],
});
