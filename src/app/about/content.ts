type Link = {
  text: string;
  href: string;
  inlineIcon?: string;
};

type Segment = string | Link;

type content = Segment[][];

export const aboutParagraphs: content = [
  [
    "Hi, I'm David. Nice to meet you! I'm a Remote Software Engineer based in Ordino, Andorra. My work bridges functional programming, web and maintainability. Right now by focusing on creating better developer tools and experiences with ",
    { text: 'OCaml', href: 'https://ocaml.org/', inlineIcon: '/logos/ocaml-icon.svg' },
    ' and ',
    {
      text: 'Reason',
      href: 'https://reasonml.github.io/',
      inlineIcon: 'https://avatars.githubusercontent.com/u/20414525?s=80&v=4',
    },
    '.',
  ],
  [
    'I believe that creating maintainable and powerful software comes from designing with clarity, building on sound architecture, and embracing the iterative nature of development. Currently working at ',
    { text: 'ahrefs', href: 'https://ahrefs.com/', inlineIcon: '/logos/ahrefs-icon.svg' },
    ', building the UI infrastructure, with ',
    {
      text: 'Melange',
      href: 'https://melange.re/',
      inlineIcon: '/logos/github-icon.svg',
    },
    ', ',
    {
      text: 'server-reason-react',
      href: 'https://github.com/ml-in-barcelona/server-reason-react',
      inlineIcon: 'https://avatars.githubusercontent.com/u/71291184?s=80&v=4',
    },
    ', ',
    {
      text: 'styled-ppx',
      href: 'https://github.com/davesnx/styled-ppx',
      inlineIcon: 'https://avatars.githubusercontent.com/u/3763599?s=80&v=4',
    },
    ' and company. Always at the intersection between backend, frontend and compilers. I also maintain several of these projects as Open Source, alongside ',
    {
      text: 'reason-react',
      href: 'https://github.com/reasonml/reason-react',
      inlineIcon: 'https://avatars.githubusercontent.com/u/20414525?s=80&v=4',
    },
    '.',
  ],
  [
    'I also contribute to the broader Reason, OCaml and Melange ecosystems and co-host ',
    { text: 'emelle.tv', href: 'https://www.twitch.tv/emelletv', inlineIcon: '/logos/twitch-icon.svg' },
    ', where we explore ML-family languages and their ecosystem with their authors and maintainers.',
  ],
  [
    'Previously, I helped build visual app development platforms at ',
    { text: 'Draftbit', href: 'https://draftbit.com', inlineIcon: '/logos/draftbit-icon.svg' },
    ' for a year and, before that, worked at ',
    { text: 'Typeform', href: 'https://www.typeform.com', inlineIcon: '/logos/typeform-icon.svg' },
    ' for 5 years, where I led the form rendering engine.',
  ],
  [
    'Want to chat? DM me on ',
    { text: '(Twitter)', href: 'https://x.com/davesnx', inlineIcon: '/logos/x-icon.svg' },
    ' or ',
    {
      text: 'Bluesky',
      href: 'https://bsky.app/profile/david.sancho.dev',
      inlineIcon: '/logos/bluesky-icon.svg',
    },
    '.',
  ],
];

const toMarkdown = (segment: Segment): string | null => {
  if (typeof segment === 'string') {
    return segment;
  }

  if (typeof segment === 'object' && typeof segment.text === 'string' && typeof segment.href === 'string') {
    return `[${segment.text}](${segment.href})`;
  }

  return null;
};

export const aboutMarkdown = aboutParagraphs
  .map((paragraph) => paragraph.map(toMarkdown).filter(Boolean).join(''))
  .join('\n\n');
