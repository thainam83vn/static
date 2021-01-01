import React from "react";
import GlobalStore from "../react-store/GlobalStore";
import ExampleChild from "./ExampleChild";
import load from "./load";

const Example = () => {
  return (
    <GlobalStore load={load}>
      <h3>Todo app</h3>
      <ExampleChild></ExampleChild>
    </GlobalStore>
  );
};

export default Example;
