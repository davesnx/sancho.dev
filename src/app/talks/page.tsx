import { TalkItem } from "@/components/talk-item";
import { H1, Page, Stack } from "@/components/ui";
import { buildMetadata } from "@/site";

const talks = [
  {
    title: "Universal React in OCaml",
    description:
      "server-reason-react implements react-dom/server and some of React's internals in OCaml. Its purpose is to natively render HTML markup from the server for a Reason React application. This pushes the idea for universal code (sharing code between the browser and native) and this talk is the story of all of this, and what are the solutions we applied at ahrefs",
    meta: "FUN OCaml 2024",
    link: "https://www.youtube.com/watch?v=Oy3lZl2kE-0",
  },
  {
    title: "Server-side rendering React natively with Reason",
    description:
      "Presenting server-reason-react, some context of the language and the library. What it means to render React in OCaml. How we use it at ahrefs.com. A benchmark against a Node equivalent, and the future of all of this.",
    meta: "React Alicante 2023",
    link: "https://www.youtube.com/watch?v=e3qY-Eg9zRY",
  },
  {
    title: "The needed introduction to make a ppx",
    description: "An introduction to make your first ppx, your first OCaml preprocessor extension",
    meta: "ReasonSTHLM November 2020",
    link: "https://youtu.be/dMoRMqQ6GLs?t=4206",
  },
  {
    title: "Presenting styled-ppx",
    description: "Talk about my experience building and using styled-ppx",
    meta: "ReasonSTHLM May 2020",
    link: "https://www.youtube.com/watch?v=ekHCBZiCviM",
  },
  {
    title: "CSS-in-Reason and OCaml",
    description: "Present the status quo of writting CSS inside ReasonReact apps and my approach to fix it",
    meta: "NearForm WFH Conf 2020",
    link: "https://www.youtube.com/watch?v=D8WhIeMIZQc",
  },
];

export const metadata = buildMetadata({
  title: "Talks",
  description: "Talks and recordings by David Sancho about OCaml, Reason, React, and developer tooling.",
  path: "/talks",
});

export default function TalksPage() {
  return (
    <Page title={<H1>Talks</H1>}>
      <Stack gap={3}>
        {talks.map((talk) => (
          <TalkItem key={talk.title} {...talk} />
        ))}
      </Stack>
    </Page>
  );
}
