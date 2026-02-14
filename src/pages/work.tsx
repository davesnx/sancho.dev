import styled from "@emotion/styled";
import type React from "react";
import type { GetStaticProps } from "next";
import Fs from "fs";
import Path from "path";

import { H1, H2 } from "../components/heading";
import { TextLink } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import { HideOnDesktop, HideOnMobile, Row, Stack } from "../components/taco";
import Text from "../components/text";
import constants from "../theme/constants";
import font from "../theme/fonts";
import { colors } from "../theme/theme";
import type { GitHubRepo } from "../lib/github";
import { getLanguageColor } from "../lib/github";

const OpenSourceSection = styled.div`
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media screen and (max-width: ${constants.mobile.width}px) {
    grid-template-columns: 1fr;
  }
`;

const CompanyLogo = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background-color: ${colors.inverted};

  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  overflow: hidden;
`;

const JobRoot = styled.section`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const DateRange = ({ date }: { date: { from: string; to: string } }) => (
  <Row gap={1}>
    <Text monospace weight={800} size={font.fontSize1}>
      {date.from}
    </Text>
    <Text monospace weight={800} size={font.fontSize1}>
      -
    </Text>
    <Text monospace weight={800} size={font.fontSize1}>
      {date.to}
    </Text>
  </Row>
);

const Job = ({
  company,
  date,
  role,
}: {
  company: {
    name: string;
    url: string | null;
    logo: React.ReactNode | null;
    logoIsDark?: boolean;
  };
  date: {
    from: string;
    to: string;
  };
  role: string;
}) => (
  <JobRoot>
    {company.logo && <CompanyLogo> {company.logo} </CompanyLogo>}
    <Stack gap={1} align="left" fullWidth>
      <Row distribute="between" fullWidth>
        <Stack align="left" gap={0}>
          <Text weight={700} size={font.fontSize2} color={colors.primary90}>
            {role}
          </Text>
          {company.url && (
            <TextLink
              target="_blank"
              color={colors.body50}
              hoverColor={colors.primary80}
              decorationColor={colors.body30}
              href={company.url}
            >
              {company.url}
            </TextLink>
          )}

          {!company.url && (
            <Text weight={500} color={colors.body50} size={font.fontSize1}>
              {company.name}
            </Text>
          )}
          <HideOnDesktop>
            <Spacer top={0.5} />
            <DateRange date={date} />
          </HideOnDesktop>
        </Stack>
        <HideOnMobile>
          <DateRange date={date} />
        </HideOnMobile>
      </Row>
    </Stack>
  </JobRoot>
);

const OrgAvatar = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  flex-shrink: 0;
  filter: grayscale(1);
  transition: filter 0.2s ease;
`;

const OpenSourceItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  cursor: pointer;

  text-decoration: none;

  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.contrastCodeBackground};
  background-color: ${colors.contrastCodeBackground30};

  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.contrastCodeBackground80};

    ${OrgAvatar} {
      filter: grayscale(0);
    }

    svg {
      filter: grayscale(0) !important;
    }
  }
`;

const RepoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const RepoFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  margin-top: auto;
`;

const StatItem = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: baseline;
  gap: 0.375rem;
  & > svg {
    position: relative;
    top: 1px;
  }
`;

const LanguageDot = ({ color }: { color: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    style={{ filter: "grayscale(1)", transition: "filter 0.2s ease" }}
  >
    <circle cx="6" cy="6" r="6" fill={color} />
  </svg>
);

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="#f1c40f"
    style={{ filter: "grayscale(1)", transition: "filter 0.2s ease" }}
  >
    <path d="M12 1.75C12.311 1.75 12.5898 1.94201 12.7007 2.23263L15.0587 8.41234L21.5366 8.72913C21.8418 8.74406 22.1074 8.94263 22.2081 9.23111C22.3088 9.5196 22.2244 9.84032 21.9947 10.0419L17.0648 14.3695L18.8767 21.3106C18.9558 21.6135 18.8383 21.9338 18.5821 22.1137C18.3258 22.2937 17.9848 22.2956 17.7266 22.1183L12 18.1875L6.27335 22.1183C6.01519 22.2956 5.67409 22.2937 5.41785 22.1137C5.1616 21.9338 5.04413 21.6135 5.12323 21.3106L6.93517 14.3695L2.0052 10.0419C1.77557 9.84032 1.69118 9.5196 1.79186 9.23111C1.89253 8.94263 2.15815 8.74406 2.46334 8.72913L8.94127 8.41234L11.2992 2.23263C11.4101 1.94201 11.6889 1.75 12 1.75Z" />
  </svg>
);

const OpenSource = ({ repo }: { repo: GitHubRepo }) => (
  <OpenSourceItem href={repo.url} target="_blank">
    <RepoHeader>
      <OrgAvatar src={repo.ownerAvatar} alt={repo.owner} />
      <Text weight={600} size={font.fontSize1} color={colors.primary90}>
        {repo.name}
      </Text>
    </RepoHeader>
    <Text size={font.fontSizeN1} color={colors.body}>
      {repo.description}
    </Text>
    <Spacer top={1} />
    <RepoFooter>
      {repo.language && (
        <StatItem>
          <LanguageDot color={getLanguageColor(repo.language)} />{" "}
          <Text monospace weight={600} size={font.fontSize0} color={colors.body50}>
            {repo.language}
          </Text>
        </StatItem>
      )}
      <StatItem>
        <StarIcon />
        <Text monospace weight={600} size={font.fontSize0} color={colors.body50}>
          {repo.stars.toLocaleString()}
        </Text>
      </StatItem>
    </RepoFooter>
  </OpenSourceItem>
);

const AherfsLogo = () => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 1200 1200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M652.502 285.818H320.704V424.677H652.502V500.657L519.519 513.757C328.603 532.098 268.037 577.948 268.037 718.116V754.795C268.037 862.216 345.722 918.545 441.838 918.545C485.287 918.545 532.686 908.066 580.088 883.175L652.505 846.495V910.687H792.07V424.677L652.502 285.818ZM652.502 710.257L562.969 756.107C528.737 775.757 493.186 786.236 465.537 786.236C431.305 786.236 407.603 774.445 407.603 731.216V702.395C410.237 656.545 440.519 644.754 543.219 634.274L652.502 622.483V710.254V710.257Z"
      fill="#FAFAFA"
    />
    <path
      d="M792.066 285.818H652.501V424.677H792.066V285.818Z"
      fill="#FF8D00"
    />
    <path d="M931.636 424.667H792.07V910.686H931.636V424.667Z" fill="#FF8D00" />
  </svg>
);

const DraftbitLogo = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 28 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.108 0.550584L25.7509 5.96179C27.0965 6.71688 27.9286 8.1331 27.9286 9.66822V20.3318C27.9286 21.8669 27.0965 23.2831 25.7509 24.0382L16.108 29.4494C14.7998 30.1835 13.2002 30.1835 11.8919 29.4494L2.24909 24.0382C0.903508 23.2831 0.0714264 21.8669 0.0714264 20.3318V9.66822C0.0714264 8.1331 0.903508 6.71688 2.24909 5.96179L11.8919 0.550584C13.2002 -0.183528 14.7998 -0.183528 16.108 0.550584ZM1.67857 9.71139V20.3318C1.67857 21.2848 2.19606 22.1656 3.03559 22.6367L12.5415 27.971C12.6646 28.0187 12.7958 28.0434 12.9286 28.0434C13.5203 28.0434 14 27.5637 14 26.972V18.3878C14 16.9888 13.2213 15.7061 11.9801 15.0607L11.2725 14.6928C11.1056 14.6217 10.9408 14.5439 10.7786 14.4592L1.67857 9.71139ZM11.648 13.5093C13.356 14.4004 14.6486 14.4004 16.3566 13.5093L25.5884 8.32656C25.3611 7.80604 24.9668 7.3619 24.451 7.07243L15.3216 1.95213C14.5019 1.49215 13.4981 1.49215 12.6784 1.95213L3.56635 7.07243C3.0505 7.3619 2.65625 7.80604 2.42891 8.32656L11.648 13.5093ZM14 3.75C16.0089 3.75 17.6489 4.73732 17.7455 5.97794L17.75 8.10268C17.75 9.3971 16.0711 10.4464 14 10.4464C11.9289 10.4464 10.25 9.3971 10.25 8.10268V5.97794C10.3511 4.73732 11.9911 3.75 14 3.75ZM14.0004 7.5C15.7401 7.5 17.1504 6.79485 17.1504 5.925C17.1504 5.05515 15.7401 4.35 14.0004 4.35C12.2607 4.35 10.8504 5.05515 10.8504 5.925C10.8504 6.79485 12.2607 7.5 14.0004 7.5Z"
      fill="#FAFAFA"
    />
  </svg>
);

const TypeformLogo = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 256 407"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid"
  >
    <g>
      <path
        d="M215.946858,1.30253648 L255.678174,1.30253648 L255.678174,406.328715 L215.946858,406.328715 L215.946858,1.30253648 Z"
        fill="#89C6BE"
      ></path>
      <path
        d="M0.408018831,93.5502721 L50.1971144,93.5502721 L50.1971144,0.858266453 L116.183555,0.858266453 L116.183555,93.5502721 L175.808295,93.5502721 L175.808295,144.382168 L116.183555,144.382168 L116.183555,309.440826 C116.183555,316.61085 116.473564,322.799779 117.053584,327.976758 C117.627432,333.166079 118.978754,337.547075 121.101377,341.138258 C123.224001,344.723271 126.401766,347.413572 130.659353,349.209164 C134.89843,351.004755 140.686281,351.899466 148.022907,351.899466 C152.65072,351.899466 157.284703,351.806909 161.912516,351.597115 C166.546499,351.405832 171.174312,350.702405 175.808295,349.511514 L175.808295,402.139002 C168.471669,402.928815 161.332497,403.724799 154.390778,404.533123 C147.442888,405.316766 140.297545,405.724014 132.97326,405.724014 C115.603536,405.724014 101.6152,404.020979 91.0020827,400.645761 C80.3827948,397.258202 72.0959247,392.266334 66.1167905,385.68867 C60.1253155,379.111005 56.0775219,370.836476 53.9548984,360.865082 C51.8261045,350.912199 50.5735098,339.546291 50.1971144,326.785868 L50.1971144,144.382168 L0.408018831,144.382168 L0.408018831,93.5502721"
        fill="#FAFAFA"
      ></path>
    </g>
  </svg>
);

const OfertiaLogo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 124 124"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.2305 36.7852C34.4788 26.4464 52.3525 23.054 65.9844 28.7695C74.0284 33.6802 80.9026 40.6502 83.5381 49.8838C85.7726 60.1115 84.8863 72.7517 80 82C74.7155 89.9632 67.9331 94.0223 59 97C47.7915 98.2351 37.3132 97.9885 28 91C21.1076 85.1214 16.7897 78.1214 15.7812 69.0273C14.8997 57.0592 16.4512 46.3763 24.2305 36.7852ZM55 42C49.9726 41.2691 45.6363 41.1645 41.0625 43.5C37.4592 47.8676 35.2581 51.4193 34.6836 57.1641C34.5549 64.6271 34.5121 72.316 40 78C44.8833 82.0883 47.8791 82.5017 54 82C58.6248 80.4584 60.4438 78.8034 63.25 74.75C66.4183 68.0903 66.2637 57.9504 64 51C61.8582 46.491 59.5091 44.174 55 42Z"
      fill="#FCFCFE"
    />
    <path
      d="M88.0001 27C89.8952 26.9184 91.7913 26.8605 93.6876 26.8125C94.7433 26.7777 95.799 26.7429 96.8868 26.707C100.441 27.0415 102.197 27.8156 105 30C107.763 33.5671 107.261 37.8151 107.188 42.125C107.181 42.906 107.175 43.687 107.168 44.4917C107.059 53.008 106.562 61.5034 106 70C95.2251 70.5649 95.2251 70.5649 91.0001 67C88.6281 63.442 88.5552 60.6904 88.3751 56.5625C88.3371 55.8291 88.2992 55.0957 88.2601 54.3401C87.8396 45.2316 87.9152 36.1153 88.0001 27Z"
      fill="#F9FAFD"
    />
    <path
      d="M102 74.9998C105 77.4373 105 77.4373 107 79.9998C107.33 80.3298 107.66 80.6598 108 80.9998C108.663 85.4986 108.763 89.6854 106.062 93.4998C102.611 96.3176 100.589 97.0269 96.2187 97.2381C92.6448 96.8543 90.6235 95.3674 87.9999 92.9998C85.4089 89.5843 85.4971 86.1666 85.9999 81.9998C89.955 75.413 94.6265 73.8155 102 74.9998Z"
      fill="#FAFAFD"
    />
    <path
      d="M54.125 62.9374C55.2207 62.9464 56.3165 62.9554 57.4454 62.9647C58.2884 62.9763 59.1315 62.9879 60 62.9999C60.3507 67.4705 60.5375 70.925 58.5 74.9999C55.1109 77.7112 52.2987 78.2728 48 77.9999C45.0625 76.9999 45.0625 76.9999 43 74.9999C41.9375 71.5624 41.9375 71.5624 42 67.9999C45.6059 63.275 48.4023 62.8765 54.125 62.9374Z"
      fill="#F4F4FB"
    />
  </svg>
);

export const getStaticProps: GetStaticProps = async () => {
  const reposFilePath = Path.join(process.cwd(), "src/data/github-repos.json");

  let repos: GitHubRepo[] = [];

  try {
    if (Fs.existsSync(reposFilePath)) {
      const fileContents = Fs.readFileSync(reposFilePath, "utf-8");
      repos = JSON.parse(fileContents);
    } else {
      console.warn(
        "⚠️ github-repos.json not found. Run 'npm run fetch-repos' to generate it."
      );
    }
  } catch (error) {
    console.error("Error reading github-repos.json:", error);
  }

  return {
    props: {
      repos,
    },
  };
};

const Work = ({ repos }: { repos: GitHubRepo[] }) => (
  <>
    <MetaData title="Work" />
    <Page title={<H1>Work</H1>}>
      <Stack gap={3} align="left">
        <Job
          company={{
            name: "ahrefs",
            url: "https://ahrefs.com",
            logo: <AherfsLogo />,
          }}
          date={{
            from: "2021",
            to: "curr",
          }}
          role="Software engineer"
        />
        <Job
          company={{
            name: "Draftbit",
            url: "https://draftbit.com",
            logo: <DraftbitLogo />,
          }}
          date={{
            from: "2020",
            to: "2021",
          }}
          role="Fullstack engineer"
        />
        <Job
          company={{
            name: "Typeform",
            url: "https://typeform.com",
            logo: <TypeformLogo />,
          }}
          date={{
            from: "2014",
            to: "2019",
          }}
          role="Frontend engineer"
        />

        <Job
          company={{
            name: "Freelance",
            url: null,
            logo: (
              <p
                style={{
                  fontSize: font.fontSize3,
                  lineHeight: 1,
                  margin: 0,
                  padding: 0,
                }}
              >
                😭
              </p>
            ),
            logoIsDark: false,
          }}
          date={{
            from: "2012",
            to: "2014",
          }}
          role="Web developer"
        />

        <Job
          company={{
            name: "Ofertia",
            url: "https://ofertia.com",
            logo: <OfertiaLogo />,
          }}
          date={{
            from: "2011",
            to: "2012",
          }}
          role="Backend developer"
        ></Job>
      </Stack>
      <Spacer top={3} />
      <Spacer top={10} bottom={3}>
        <H2>Open Source</H2>
      </Spacer>
      <Text>{`Open source has been a significant part of my career, and I'm committed to giving back to the community that has given me so much. I actively author, maintain, and contribute to projects ranging from developer tools and languages to libraries that help others build better software. Here are some of the notable projects:`}</Text>
      <Spacer top={6} />
      <OpenSourceSection>
        <Gallery>
          {repos.map((repo) => (
            <OpenSource key={repo.fullName} repo={repo} />
          ))}
        </Gallery>
      </OpenSourceSection>
    </Page>
  </>
);

export default Work;
