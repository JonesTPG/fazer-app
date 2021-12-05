/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "../pages/[id]";

describe("[id]", () => {
  it("renders correctly", () => {
    render(<Page />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
  });
});
