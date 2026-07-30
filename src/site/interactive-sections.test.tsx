import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Agriculture from "./agriculture/Agriculture";
import Loan from "./loan/Loan";
import Benifits from "./healthCare/Benifits";
import ManufactureTab from "./manufacturing/tabs/ManufactureTab";

describe("interactive industry sections", () => {
  it("toggles the agriculture accordion with accessible state", async () => {
    const user = userEvent.setup();
    render(<Agriculture />);
    const trigger = screen.getByRole("button", { name: /ফসল ব্যবস্থাপনা/ });

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles the loan accordion with accessible state", async () => {
    const user = userEvent.setup();
    render(<Loan />);
    const trigger = screen.getByRole("button", {
      name: /ঋণদাতা এবং ঋণগ্রহীতা/,
    });

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("switches manufacturing module tabs", async () => {
    const user = userEvent.setup();
    render(<ManufactureTab heading="মডিউল" subHeading="বিবরণ" />);

    await user.click(screen.getByRole("tab", { name: "সিআরএম" }));
    expect(screen.getByRole("heading", { name: "সিআরএম" })).toBeInTheDocument();
  });

  it("switches healthcare benefit tabs", async () => {
    const user = userEvent.setup();
    render(<Benifits />);

    await user.click(screen.getByRole("tab", { name: /ক্লিনিকাল সুবিধা/ }));
    expect(screen.getByText("কাগজবিহীন কর্মপ্রবাহ")).toBeInTheDocument();
  });
});
