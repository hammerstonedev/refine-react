import { render, screen } from "@testing-library/react";
import { QueryBuilder } from "../..";
import { dateCondition } from "../../../../../test/fixtures/conditions";

it("should render a date input", async () => {
  render(
    <QueryBuilder
      blueprint={[
        {
          depth: 1,
          type: "criterion",
          condition_id: "date",
          input: {
            clause: "eq",
          },
        },
      ]}
      conditions={[dateCondition]}
    />
  );

  const inputContainer = await screen.findByTestId("refine-input");
  expect(
    inputContainer.querySelectorAll("input[type='datetime-local']")
  ).toHaveLength(1);
});
