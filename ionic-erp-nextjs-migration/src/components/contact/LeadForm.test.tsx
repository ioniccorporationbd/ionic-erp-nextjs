import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import LeadForm from "./LeadForm";

describe("LeadForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows accessible required-field errors", async () => {
    const user = userEvent.setup();
    render(<LeadForm variant="page" />);

    await user.click(screen.getByRole("button", { name: "অনুরোধ করুন" }));

    expect(await screen.findByText("আপনার নাম লিখুন")).toBeInTheDocument();
    expect(screen.getByText("আপনার মোবাইল নাম্বার লিখুন")).toBeInTheDocument();
    expect(screen.getByText("আপনার ব্যবসার ধরণ লিখুন")).toBeInTheDocument();
  });

  it("preserves the source compatibility submission adapter", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    render(<LeadForm variant="page" />);

    await user.type(screen.getByLabelText("আপনার নাম"), "পরীক্ষা ব্যবহারকারী");
    await user.type(screen.getByLabelText("আপনার মোবাইল নাম্বার"), "01900000000");
    await user.type(
      screen.getByLabelText("আপনার ব্যবসার ধরণ কি"),
      "ম্যানুফ্যাকচারিং",
    );
    await user.click(screen.getByRole("button", { name: "অনুরোধ করুন" }));

    expect(consoleSpy).toHaveBeenCalledWith({
      name: "পরীক্ষা ব্যবহারকারী",
      mobile: "01900000000",
      software: "IONIC shop",
      businessType: "ম্যানুফ্যাকচারিং",
    });
  });
});
