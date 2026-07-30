import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ContactDialog from "./ContactDialog";

describe("ContactDialog", () => {
  it("opens from the shared event and closes accessibly", async () => {
    const user = userEvent.setup();
    render(<ContactDialog />);
    const dialog = screen.getByRole("dialog", { hidden: true });

    fireEvent(window, new Event("open-contact-dialog"));
    expect(dialog).toHaveAttribute("open");

    await user.click(
      screen.getByRole("button", { name: "যোগাযোগ ফর্ম বন্ধ করুন" }),
    );
    expect(dialog).not.toHaveAttribute("open");
  });

  it("renders exactly one dialog identifier target", () => {
    const { container } = render(<ContactDialog />);
    expect(container.querySelectorAll("#contact-dialog-title")).toHaveLength(1);
    expect(container.querySelectorAll("[id='my_modal_5']")).toHaveLength(0);
  });
});
