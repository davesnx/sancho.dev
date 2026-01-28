import styled from "@emotion/styled";
import fonts from "../theme/fonts";
import { colors } from "../theme/theme";

const PlaygroundContainer = styled.div`
  position: relative;
  margin: 1rem 0 2rem 0;
`;

const CodeBlock = styled.pre`
  display: block;
  overflow: auto;
  position: relative;
  padding: 2rem;
  padding-top: 3rem;
  border-radius: 6px;
  margin: 0;
  background: ${colors.codeBackground};

  font-family: ${fonts.mono};
  font-weight: 400;
  font-size: 0.9rem;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 2;
  hyphens: none;
  line-height: 1.6;
  color: ${colors.body90};
`;

const PlaygroundLink = styled.a`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.65rem;
  border-radius: 4px;
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  color: ${colors.body80};
  background: ${colors.overlay};
  transition: all 0.15s ease;

  &:hover {
    color: ${colors.body};
    background: ${colors.contrastCodeBackground30};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
  </svg>
);

type MelangePlaygroundProps = {
  children: string;
  language?: "OCaml" | "Reason";
};

function encodeForPlayground(code: string): string {
  const trimmed = code.trim();
  if (typeof window !== "undefined") {
    return btoa(trimmed);
  }
  return Buffer.from(trimmed).toString("base64");
}

export function MelangePlayground({ children, language = "OCaml" }: MelangePlaygroundProps) {
  const code = typeof children === "string" ? children : String(children);
  const encoded = encodeForPlayground(code);
  const playgroundUrl = `https://melange.re/v4.0.0/playground/?language=${language}&code=${encodeURIComponent(encoded)}&live=off`;

  return (
    <PlaygroundContainer>
      <CodeBlock>
        <PlaygroundLink
          href={playgroundUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in Melange Playground"
        >
          <PlayIcon />
          Try it
        </PlaygroundLink>
        {code}
      </CodeBlock>
    </PlaygroundContainer>
  );
}

export default MelangePlayground;
