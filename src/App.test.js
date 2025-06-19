import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders exact Score and Best Score", () => {
  render(<App />);
  
  const paragraphs = screen.getAllByText((content, element) =>
    element.tagName.toLowerCase() === 'p' &&
    content.includes("Score") &&
    content.includes("0")
  );

  expect(paragraphs).toHaveLength(2);
  expect(paragraphs[0]).toHaveTextContent("Score: 0");
  expect(paragraphs[1]).toHaveTextContent("Best Score: 0");
});