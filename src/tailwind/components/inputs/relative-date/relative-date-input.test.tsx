import { render, screen } from "@testing-library/react";
import { QueryBuilder } from "../..";
import { dateCondition } from "../../../../../test/fixtures/conditions";

it("should render a number input and two select elements", async () => {
  render(
    <QueryBuilder
      blueprint={[
        {
          depth: 1,
          type: "criterion",
          condition_id: "date",
          input: {
            clause: "gt",
          },
        },
      ]}
      conditions={[dateCondition]}
    />
  );

  const inputContainer = await screen.findByTestId("refine-input");
  expect(inputContainer.querySelectorAll("input[type='number']")).toHaveLength(
    1
  );
  expect(inputContainer.querySelectorAll("select")).toHaveLength(2);
});
