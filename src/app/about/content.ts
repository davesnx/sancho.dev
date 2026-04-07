export type AboutSegment =
  | string
  | {
      text: string;
      href: string;
    };

export const aboutParagraphs: AboutSegment[][] = [
  [
    "Hi, I'm David. A software engineer based in Barcelona, who spends the cold winter in the Pyrenees. My work bridges functional programming, web technologies and maintanability; by focusing on creating better developer tools and experiences with ",
    { text: "Reason", href: "http://reasonml.github.io/" },
    " and ",
    { text: "OCaml", href: "https://ocaml.org/" },
    ".",
  ],
  [
    "I believe that the recipe for creating maintainable and powerful software lies in designing with clarity, sound architecture, and embracing the iterative nature of development. Currently working at ",
    { text: "ahrefs", href: "https://ahrefs.com/" },
    ", primarily building developer tooling to help create nice UIs, also maintaining several Open Source projects in the Reason ecosystem, such as ",
    {
      text: "reason-react",
      href: "https://github.com/reasonml/reason-react",
    },
    ", ",
    {
      text: "server-reason-react",
      href: "https://github.com/ml-in-barcelona/server-reason-react",
    },
    " and ",
    { text: "styled-ppx", href: "https://github.com/davesnx/styled-ppx" },
    ".",
  ],
  [
    "I also contribute to the broader Reason and Melange ecosystems and co-host ",
    { text: "emelle.tv", href: "https://www.twitch.tv/emelletv" },
    ", where we explore ML-family languages and meet incredible authors from the ecosystem.",
  ],
  [
    "Previously, I helped build visual app development platforms at ",
    { text: "Draftbit", href: "https://draftbit.com" },
    " for a year and, even before, worked at ",
    { text: "Typeform", href: "https://www.typeform.com" },
    " for 5 years where I lead the form rendering engine.",
  ],
  [
    "Want to chat? DM me on ",
    { text: "Twitter", href: "https://x.com/davesnx" },
    " or ",
    {
      text: "Bluesky",
      href: "https://bsky.app/profile/david.sancho.dev",
    },
  ],
];

const toMarkdown = (segment: AboutSegment) => {
  if (typeof segment === "string") {
    return segment;
  }

  return `[${segment.text}](${segment.href})`;
};

export const aboutMarkdown = aboutParagraphs
  .map((paragraph) => paragraph.map(toMarkdown).join(""))
  .join("\n\n");
