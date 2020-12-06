import React from "react";

import Link from "../components/link";
import Navigate from "../components/navigate";
import Text from "../components/text";
import Spacer from "../components/spacer";

const Description = () => {
  return (
    <>
      <Text align="left">
        I'm a Software Engineer from Barcelona in love with Reason and OCaml.
      </Text>
      <Spacer top={2} />
      <Text>
        Working with <Link to="https://draftbit.com">Draftbit</Link> to bring
        the creation of mobile apps accessbile to more people. Before that I
        worked as Frontend at{" "}
        <Link to="https://www.typeform.com">Typeform</Link>.
      </Text>
      <Spacer top={2} />
      <Text>
        Passionate about functional programming, UI design, scalability, people
        and business. Even with my limited english, trying to write about those
        in my <Navigate to="/blog">blog</Navigate>.
      </Text>
      <Spacer top={2} />
      <Text>
        Aside from the computer, I'm an amateur triathlete more focused on Half
        (70.3) and Olympic distance
      </Text>
    </>
  );
};

export default Description;
