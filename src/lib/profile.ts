export type ProfileSegment = string | { text: string; href: string };

export type CareerEntry = {
  company: string;
  companyUrl?: string;
  role: string;
  from: string;
  to: string;
  details: string[];
};

export type ProjectEntry = {
  name: string;
  url: string;
  description: string;
  language: string;
};

export const introduction: ProfileSegment[][] = [
  [
    "Hi, I'm David. I am a software engineer based in Barcelona, and I spend the colder part of the year in the Pyrenees.",
  ],
  [
    'I work where functional programming meets the web. At ',
    { text: 'Ahrefs', href: 'https://ahrefs.com/' },
    ', I build the OCaml UI infrastructure behind its frontend with ',
    { text: 'Melange', href: 'https://melange.re/' },
    ', ',
    { text: 'Reason', href: 'https://reasonml.github.io/' },
    ', ',
    { text: 'server-reason-react', href: 'https://github.com/ml-in-barcelona/server-reason-react' },
    ', and ',
    { text: 'styled-ppx', href: 'https://github.com/davesnx/styled-ppx' },
    '.',
  ],
  [
    'My career started in web development and frontend engineering. Over time I moved closer to compilers, servers, and developer tools, without losing the connection to CSS and interface work that got me interested in the web.',
  ],
];

export const outsideComputers: ProfileSegment[][] = [
  [
    'I left university before finishing my computer science degree, but I never stopped studying how programming languages and software systems work.',
  ],
  [
    'Outside computers, I spend time on sports, music, movies, Counter-Strike, and life with Cora. There are usually too many interests competing for the same week.',
  ],
];

export const contact: ProfileSegment[][] = [
  [
    'The easiest way to reach me is on ',
    { text: 'X', href: 'https://x.com/davesnx' },
    ' or ',
    { text: 'Bluesky', href: 'https://bsky.app/profile/david.sancho.dev' },
    '. You can also find my work on ',
    { text: 'GitHub', href: 'https://github.com/davesnx' },
    '.',
  ],
];

export const career: CareerEntry[] = [
  {
    company: 'Ahrefs',
    companyUrl: 'https://ahrefs.com',
    role: 'Software engineer',
    from: '2021',
    to: 'Now',
    details: [
      'Build and maintain the OCaml UI infrastructure behind the Ahrefs frontend.',
      'Maintain and contribute to Melange, reason-react, server-reason-react, and styled-ppx.',
    ],
  },
  {
    company: 'Draftbit',
    companyUrl: 'https://draftbit.com',
    role: 'Full-stack engineer',
    from: '2020',
    to: '2021',
    details: ['Worked across the product stack for a visual app development platform.'],
  },
  {
    company: 'Typeform',
    companyUrl: 'https://typeform.com',
    role: 'Frontend engineer',
    from: '2014',
    to: '2019',
    details: ['Worked on Typeform frontend systems and led the form rendering engine.'],
  },
  {
    company: 'Freelance',
    role: 'Web developer',
    from: '2012',
    to: '2014',
    details: ['Built web projects for clients as an independent developer.'],
  },
  {
    company: 'Ofertia',
    companyUrl: 'https://ofertia.com',
    role: 'Backend developer',
    from: '2011',
    to: '2012',
    details: ['Worked on backend development for the Ofertia product.'],
  },
];

export const projects: ProjectEntry[] = [
  {
    name: 'styled-ppx',
    url: 'https://github.com/davesnx/styled-ppx',
    description: 'Type-safe CSS for Melange and native OCaml with static extraction.',
    language: 'OCaml',
  },
  {
    name: 'server-reason-react',
    url: 'https://github.com/ml-in-barcelona/server-reason-react',
    description: "A native implementation of React's server rendering and server component architecture.",
    language: 'OCaml',
  },
  {
    name: 'parseff',
    url: 'https://github.com/davesnx/parseff',
    description: 'Direct-style parser combinators built with OCaml 5 effects.',
    language: 'OCaml',
  },
  {
    name: 'ochre',
    url: 'https://github.com/davesnx/ochre',
    description: 'Syntax highlighting with TextMate grammars and custom themes.',
    language: 'OCaml',
  },
];

export const skills = [
  'OCaml',
  'Reason',
  'Melange',
  'React',
  'TypeScript',
  'CSS',
  'Developer tooling',
  'Design systems',
];

const segmentToMarkdown = (segment: ProfileSegment) =>
  typeof segment === 'string' ? segment : `[${segment.text}](${segment.href})`;

const paragraphsToMarkdown = (paragraphs: ProfileSegment[][]) =>
  paragraphs.map((paragraph) => paragraph.map(segmentToMarkdown).join('')).join('\n\n');

export const aboutMarkdown = [
  paragraphsToMarkdown(introduction),
  '## Work',
  ...career.map((entry) => `- **${entry.company}** — ${entry.role}, ${entry.from}–${entry.to}`),
  '## Open source',
  ...projects.map((project) => `- [${project.name}](${project.url}) — ${project.description}`),
  '## Beyond computers',
  paragraphsToMarkdown(outsideComputers),
  '## Contact',
  paragraphsToMarkdown(contact),
].join('\n\n');
