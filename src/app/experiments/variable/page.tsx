import { buildMetadata } from "../../../lib/site";
import { VariableDemo } from "./variable-demo";

export const metadata = buildMetadata({
  title: "Variable Font Weight",
  description: "An interactive variable font weight experiment.",
  path: "/experiments/variable",
});

export default function VariableExperimentPage() {
  return <VariableDemo />;
}
