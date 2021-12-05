/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "../index";

describe("index", () => {
  it("renders correctly", () => {
    render(<Page />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.queryByTestId("button-disabled")).not.toBeInTheDocument();
  });
});
