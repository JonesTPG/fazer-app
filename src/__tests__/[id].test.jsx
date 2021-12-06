/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import Page from "../../pages/[id]";

describe("[id]", () => {
  it("renders correctly", () => {
    render(<Page />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
  });
});
