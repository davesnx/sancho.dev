import { buildMetadata } from "../../../lib/site";
import { ChromaticDemo } from "./chromatic-demo";

export const metadata = buildMetadata({
  title: "Chromatic Aberration",
  description: "An interactive chromatic aberration text experiment.",
  path: "/experiments/chromatic",
});

export default function ChromaticExperimentPage() {
  return <ChromaticDemo />;
}
