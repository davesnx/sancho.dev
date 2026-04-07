import type { AnchorHTMLAttributes, CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

import { css } from "@linaria/core";
import Link from "next/link";

import breakpoints from "@/theme/constants";
import fonts from "@/theme/fonts";
import { colors } from "@/theme/theme";

export const cx = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");

export const space = (value: number) => `${value * 8}px`;
export const rem = (value: number) => `${value}rem`;

const containerClass = css`
  width: 100%;
  max-width: ${breakpoints.desktop.width}px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;

  @media (min-width: 600px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

const rowBaseClass = css`
  display: flex;
  flex-direction: row;
  min-width: 0;
`;

const rowColumnMobileClass = css`
  @media (max-width: 599px) {
    flex-direction: column;
    align-items: flex-start !important;
  }
`;

const rowColumnReverseMobileClass = css`
  @media (max-width: 599px) {
    flex-direction: column-reverse;
    align-items: flex-start !important;
  }
`;

const stackBaseClass = css`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const textBaseClass = css`
  margin: 0;
  line-height: 1.7;
  letter-spacing: 0.02em;
  color: ${colors.textPrimary};
  font-family: ${fonts.sans};
  display: inline-block;
`;

const headingBaseClass = css`
  margin: 0;
  padding: 0;
  font-family: ${fonts.sans};
  font-weight: 700;
  line-height: 1.3;
  color: ${colors.textAccent};
`;

const h1Class = css`
  font-size: ${fonts.fontSize5};
  letter-spacing: 1.6px;
`;

const h2Class = css`
  font-size: ${fonts.fontSize4};
  letter-spacing: 1px;
`;

const h3Class = css`
  font-size: ${fonts.fontSize3};
  letter-spacing: 0.8px;
`;

const h4Class = css`
  font-size: ${fonts.fontSize2};
  letter-spacing: 0.6px;
`;

const h5Class = css`
  font-size: ${fonts.fontSize1};
  letter-spacing: 0.4px;
`;

const h6Class = css`
  font-size: ${fonts.fontSize0};
  letter-spacing: 0.2px;
`;

const textLinkClass = css`
  color: var(--link-color);
  font-family: var(--link-font-family, inherit);
  font-weight: var(--link-font-weight, 500);
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  overflow-wrap: break-word;
  word-wrap: break-word;
  display: inherit;
  transition: color 150ms ease, text-decoration-color 150ms ease;
  text-decoration-line: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 2px;
  text-decoration-color: var(--link-decoration-color, ${colors.textTertiary});

  &:hover {
    color: var(--link-hover-color);
    text-decoration-color: var(--link-hover-color);
  }
`;

const buttonLinkClass = css`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`;

const hideOnMobileClass = css`
  @media (max-width: ${breakpoints.mobile.width}px) {
    display: none;
  }
`;

const hideOnDesktopClass = css`
  @media (min-width: ${breakpoints.mobile.width + 1}px) {
    display: none;
  }
`;

const responsiveSpacerClass = css`
  margin-top: var(--desktop-top, 0rem);
  margin-bottom: var(--desktop-bottom, 0rem);
  margin-left: var(--desktop-left, 0rem);
  margin-right: var(--desktop-right, 0rem);

  @media (max-width: ${breakpoints.mobile.width}px) {
    margin-top: var(--mobile-top, var(--desktop-top, 0rem));
    margin-bottom: var(--mobile-bottom, var(--desktop-bottom, 0rem));
    margin-left: var(--mobile-left, var(--desktop-left, 0rem));
    margin-right: var(--mobile-right, var(--desktop-right, 0rem));
  }
`;

type BoxProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

type TextProps = BoxProps & {
  size?: string;
  weight?: number;
  color?: string;
  monospace?: boolean;
  align?: CSSProperties["textAlign"];
  kerning?: string;
};

type RowProps = HTMLAttributes<HTMLDivElement> & {
  gap?: number;
  align?: CSSProperties["alignItems"] | "top" | "center" | "bottom" | "baseline";
  justify?: CSSProperties["justifyContent"] | "around" | "between" | "evenly" | "left" | "center" | "right";
  wrap?: boolean;
  fullWidth?: boolean;
  columnOnMobile?: boolean;
  columnReverseOnMobile?: boolean;
};

type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: number;
  align?: CSSProperties["alignItems"] | "left" | "center" | "right";
  justify?: CSSProperties["justifyContent"] | "around" | "between" | "evenly" | "left" | "center" | "right";
  fullWidth?: boolean;
};

type LinkStyleProps = {
  color?: string;
  hoverColor?: string;
  decorationColor?: string;
  weight?: number;
  monospace?: boolean;
};

const isExternalLink = (href: string) => href.startsWith("http://") || href.startsWith("https://");

const stackAlignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
} as const;

const distributeMap = {
  around: "space-around",
  between: "space-between",
  evenly: "space-evenly",
  left: "flex-start",
  center: "center",
  right: "flex-end",
} as const;

const rowAlignMap = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
  baseline: "baseline",
} as const;

const resolveStackAlign = (align: StackProps["align"]) => {
  if (!align) return stackAlignMap.center;
  return stackAlignMap[align as keyof typeof stackAlignMap] ?? align;
};

const resolveDistribute = (justify: StackProps["justify"] | RowProps["justify"]) => {
  if (!justify) return distributeMap.center;
  return distributeMap[justify as keyof typeof distributeMap] ?? justify;
};

const resolveRowAlign = (align: RowProps["align"]) => {
  if (!align) return rowAlignMap.center;
  return rowAlignMap[align as keyof typeof rowAlignMap] ?? align;
};

export function Container({ as: Tag = "div", className, ...props }: BoxProps) {
  return <Tag className={cx(containerClass, className)} {...props} />;
}

export function Page({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <Container>
      {title}
      {title ? <Spacer top={5}>{children}</Spacer> : children}
    </Container>
  );
}

export function Spacer({
  top,
  bottom,
  left,
  right,
  inline,
  children,
}: {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  inline?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        marginTop: top ? space(top) : undefined,
        marginBottom: bottom ? space(bottom) : undefined,
        marginLeft: left ? space(left) : undefined,
        marginRight: right ? space(right) : undefined,
        display: inline ? "inline-block" : undefined,
      }}
    >
      {children}
    </div>
  );
}

export function Row({
  gap = 0,
  align = "center",
  justify = "center",
  wrap = false,
  fullWidth = false,
  columnOnMobile = false,
  columnReverseOnMobile = false,
  className,
  style,
  ...props
}: RowProps) {
  return (
    <div
      className={cx(
        rowBaseClass,
        columnOnMobile && rowColumnMobileClass,
        columnReverseOnMobile && rowColumnReverseMobileClass,
        className,
      )}
      style={{
        gap: space(gap),
        alignItems: resolveRowAlign(align),
        justifyContent: resolveDistribute(justify),
        flexWrap: wrap ? "wrap" : "nowrap",
        width: fullWidth ? "100%" : undefined,
        ...style,
      }}
      {...props}
    />
  );
}

export function Stack({
  gap = 0,
  align = "stretch",
  justify = "flex-start",
  fullWidth = false,
  className,
  style,
  ...props
}: StackProps) {
  return (
    <div
      className={cx(stackBaseClass, className)}
      style={{
        gap: space(gap),
        alignItems: resolveStackAlign(align),
        justifyContent: resolveDistribute(justify),
        width: fullWidth ? "100%" : undefined,
        ...style,
      }}
      {...props}
    />
  );
}

export function Text({
  as: Tag = "p",
  size = fonts.fontSize1,
  weight = 400,
  color = colors.textPrimary,
  monospace = false,
  align,
  kerning = "0.02em",
  className,
  style,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cx(textBaseClass, className)}
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
        fontFamily: monospace ? fonts.mono : fonts.sans,
        letterSpacing: kerning,
        textAlign: align,
        ...style,
      }}
      {...props}
    />
  );
}

export function H1({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cx(headingBaseClass, h1Class, className)} {...props} />;
}

export function H2({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cx(headingBaseClass, h2Class, className)} {...props} />;
}

export function H3({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx(headingBaseClass, h3Class, className)} {...props} />;
}

export function H4({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cx(headingBaseClass, h4Class, className)} {...props} />;
}

export function H5({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cx(headingBaseClass, h5Class, className)} {...props} />;
}

export function H6({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h6 className={cx(headingBaseClass, h6Class, className)} {...props} />;
}

export function HideOnMobile({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(hideOnMobileClass, className)} {...props} />;
}

export function HideOnDesktop({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(hideOnDesktopClass, className)} {...props} />;
}

export function ResponsiveSpacer({
  desktopTop,
  desktopBottom,
  desktopLeft,
  desktopRight,
  mobileTop,
  mobileBottom,
  mobileLeft,
  mobileRight,
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  desktopTop?: number;
  desktopBottom?: number;
  desktopLeft?: number;
  desktopRight?: number;
  mobileTop?: number;
  mobileBottom?: number;
  mobileLeft?: number;
  mobileRight?: number;
}) {
  return (
    <div
      className={cx(responsiveSpacerClass, className)}
      style={{
        "--desktop-top": desktopTop !== undefined ? rem(desktopTop) : undefined,
        "--desktop-bottom": desktopBottom !== undefined ? rem(desktopBottom) : undefined,
        "--desktop-left": desktopLeft !== undefined ? rem(desktopLeft) : undefined,
        "--desktop-right": desktopRight !== undefined ? rem(desktopRight) : undefined,
        "--mobile-top": mobileTop !== undefined ? rem(mobileTop) : undefined,
        "--mobile-bottom": mobileBottom !== undefined ? rem(mobileBottom) : undefined,
        "--mobile-left": mobileLeft !== undefined ? rem(mobileLeft) : undefined,
        "--mobile-right": mobileRight !== undefined ? rem(mobileRight) : undefined,
        ...style,
      } as CSSProperties}
      {...props}
    />
  );
}

export function TextLink({
  href,
  children,
  color = colors.textPrimary,
  hoverColor = colors.textAccent,
  decorationColor = colors.textTertiary,
  weight = 500,
  monospace = false,
  className,
  style,
  ...props
}: LinkStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & {
    href: string;
    children: ReactNode;
  }) {
  const linkStyle = {
    "--link-color": color,
    "--link-hover-color": hoverColor,
    "--link-decoration-color": decorationColor,
    "--link-font-weight": String(weight),
    "--link-font-family": monospace ? fonts.mono : fonts.sans,
    ...style,
  } as CSSProperties;

  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(textLinkClass, className)}
        style={linkStyle}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cx(textLinkClass, className)} style={linkStyle} {...props}>
      {children}
    </Link>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  style,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & {
  href: string;
  children: ReactNode;
}) {
  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(buttonLinkClass, className)}
        style={style}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cx(buttonLinkClass, className)} style={style} {...props}>
      {children}
    </Link>
  );
}

export const NavigateButton = ButtonLink;
export const NavigateText = TextLink;
