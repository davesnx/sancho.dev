import React from "react";

import Link from "../components/link";
import Navigate from "../components/navigate";
import Text from "../components/text";
import Spacer from "../components/spacer";

const Description = () => {
  return (
    <>
      <Text align="left">
        I'm a Software Engineer from Barcelona in love with{" "}
        <Link to="http://reasonml.github.io/">Reason</Link> and{" "}
        <Link to="https://ocaml.org/">OCaml</Link>.
      </Text>
      <Spacer top={2} />
      <Text>
        Working with <Link to="https://draftbit.com">Draftbit</Link> to bring
        the creation of mobile apps accessbile to more people. Before I worked
        as Frontend at <Link to="https://www.typeform.com">Typeform</Link>.
      </Text>
      <Spacer top={2} />
      <Text>
        Always passionate about <strong>functional programming</strong>,{" "}
        <strong>UI design</strong>, <strong>scalability</strong>,{" "}
        <strong>people</strong> and <strong>business</strong>. Even with my
        limited english, I'm trying to write about those in my{" "}
        <Navigate to="/blog">blog</Navigate>
      </Text>
      <Spacer top={2} />
      <Text>
        Aside from the computer, I'm an amateur triathlete focused on Half
        (70.3) and Olympic distances.
      </Text>
    </>
  );
};

export default Description;
