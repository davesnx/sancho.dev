export type AboutSegment =
  | string
  | {
      text: string;
      href: string;
    };

export const aboutParagraphs: AboutSegment[][] = [
  [
    "Hi, I'm David. A software engineer based in Barcelona, who spends the cold winter in the Pyrenees. My work bridges functional programming, web technologies and maintainability; by focusing on creating better developer tools and experiences with ",
    { text: 'Reason', href: 'https://reasonml.github.io/' },
    ' and ',
    { text: 'OCaml', href: 'https://ocaml.org/' },
    '.',
  ],
  [
    'I believe that creating maintainable and powerful software comes from designing with clarity, building on sound architecture, and embracing the iterative nature of development. Currently working at ',
    { text: 'ahrefs', href: 'https://ahrefs.com/' },
    ', building the UI infrastructure that powers their frontend in OCaml, with ',
    { text: 'Melange', href: 'https://melange.re/' },
    ', ',
    {
      text: 'server-reason-react',
      href: 'https://github.com/ml-in-barcelona/server-reason-react',
    },
    ', ',
    { text: 'styled-ppx', href: 'https://github.com/davesnx/styled-ppx' },
    ' and company. My work sits at the intersection between backend and frontend, and I maintain several of these projects as Open Source in the Reason ecosystem, alongside ',
    {
      text: 'reason-react',
      href: 'https://github.com/reasonml/reason-react',
    },
    '.',
  ],
  [
    'I also contribute to the broader Reason and Melange ecosystems and co-host ',
    { text: 'emelle.tv', href: 'https://www.twitch.tv/emelletv' },
    ', where we explore ML-family languages with their authors and maintainers.',
  ],
  [
    'Previously, I helped build visual app development platforms at ',
    { text: 'Draftbit', href: 'https://draftbit.com' },
    ' for a year and, before that, worked at ',
    { text: 'Typeform', href: 'https://www.typeform.com' },
    ' for 5 years, where I led the form rendering engine.',
  ],
  [
    'Want to chat? DM me on ',
    { text: 'Twitter', href: 'https://x.com/davesnx' },
    ' or ',
    {
      text: 'Bluesky',
      href: 'https://bsky.app/profile/david.sancho.dev',
    },
    '.',
  ],
];

const toMarkdown = (segment: AboutSegment) => {
  if (typeof segment === 'string') {
    return segment;
  }

  return `[${segment.text}](${segment.href})`;
};

export const aboutMarkdown = aboutParagraphs.map((paragraph) => paragraph.map(toMarkdown).join('')).join('\n\n');
