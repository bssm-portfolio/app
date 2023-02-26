import { FieldError, FieldErrorsImpl } from "react-hook-form";
import { getErrorProperty } from "./input";

test("getErrorProperty test", () => {
  const inValidData = {};
  expect(getErrorProperty(inValidData)).toBe("");
});

test("getErrorProperty test", () => {
  const inValidData: Partial<FieldErrorsImpl<{ title: FieldError }>> = {
    title: { message: "제목" },
  };
  expect(getErrorProperty(inValidData)).toBe("제목");
});

test("getErrorProperty test", () => {
  const inValidData: Partial<
    FieldErrorsImpl<{ title: FieldError; description: FieldError }>
  > = {
    title: { message: "제목" },
    description: { message: "설명" },
  };
  expect(getErrorProperty(inValidData)).toBe("제목, 설명");
});
