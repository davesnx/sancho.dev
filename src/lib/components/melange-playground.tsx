import { css } from "@linaria/core";

import fonts from "@/theme/fonts";
import { colors } from "@/theme/theme";

const containerClass = css`
  position: relative;
  margin: 1rem 0 2rem;
`;

const codeBlockClass = css`
  display: block;
  overflow: auto;
  position: relative;
  padding: 2rem;
  padding-top: 3rem;
  border-radius: 6px;
  margin: 0;
  background: ${colors.backgroundSecondary};
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
  color: ${colors.textProse};
`;

const playgroundLinkClass = css`
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
  color: ${colors.textProse};
  background: ${colors.backgroundSecondary};
  transition: color 150ms ease;

  &:hover {
    color: ${colors.textPrimary};
  }

  & svg {
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
  return Buffer.from(trimmed).toString("base64");
}

export function MelangePlayground({ children, language = "OCaml" }: MelangePlaygroundProps) {
  const code = typeof children === "string" ? children : String(children);
  const encoded = encodeForPlayground(code);
  const playgroundUrl = `https://melange.re/v4.0.0/playground/?language=${language}&code=${encodeURIComponent(encoded)}&live=off`;

  return (
    <div className={containerClass}>
      <pre className={codeBlockClass}>
        <a
          className={playgroundLinkClass}
          href={playgroundUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in Melange Playground"
        >
          <PlayIcon />
          Try it
        </a>
        {code}
      </pre>
    </div>
  );
}

export default MelangePlayground;
