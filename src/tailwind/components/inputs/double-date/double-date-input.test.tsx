import { render, screen } from "@testing-library/react";
import { QueryBuilder } from "../..";
import { dateCondition } from "../../../../../test/fixtures/conditions";

it("should render two date inputs", async () => {
  render(
    <QueryBuilder
      blueprint={[
        {
          depth: 1,
          type: "criterion",
          condition_id: "date",
          input: {
            clause: "btwn",
          },
        },
      ]}
      conditions={[dateCondition]}
    />
  );

  const inputContainer = await screen.findByTestId("refine-input");
  expect(
    inputContainer.querySelectorAll("input[type='datetime-local']")
  ).toHaveLength(2);
});
