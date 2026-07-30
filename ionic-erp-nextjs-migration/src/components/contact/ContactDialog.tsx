"use client";

import { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import LeadForm from "./LeadForm";

const OPEN_CONTACT_DIALOG_EVENT = "open-contact-dialog";

export default function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const openDialog = () => {
      triggerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      dialogRef.current?.showModal();
    };

    window.addEventListener(OPEN_CONTACT_DIALOG_EVENT, openDialog);
    return () =>
      window.removeEventListener(OPEN_CONTACT_DIALOG_EVENT, openDialog);
  }, []);

  const closeDialog = () => {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-dialog-title"
      className="rounded-xl bg-transparent p-0 backdrop:bg-black/60"
      onClose={() => triggerRef.current?.focus()}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          closeDialog();
        }
      }}
    >
      <section className="relative w-[min(96vw,400px)] rounded-xl bg-[#808285] px-10 pt-5">
        <h2
          id="contact-dialog-title"
          className="mb-4 rounded-md bg-[#001B41] py-2 text-center text-[20px] font-bold leading-snug text-[#FFAA00] lg:text-[18px]"
        >
          আমাদের সাথে যোগাযোগ করুন
        </h2>
        <button
          type="button"
          aria-label="যোগাযোগ ফর্ম বন্ধ করুন"
          className="absolute right-2 top-2 text-white"
          onClick={closeDialog}
        >
          <RxCross2 className="text-2xl" aria-hidden="true" />
        </button>

        <LeadForm variant="modal" />

        <p className="pb-2 text-center text-white">
          যেকোন বিজনেস সলিউশন সফটওয়্যার, ইআরপি সফটওয়্যার, ক্লাউড স্টোরেজ,
          ওয়েবসাইট ডেভেলপমেন্ট, মোবাইল অ্যাপস, হোস্টিং, ডোমেন, এসএমএস এবং
          ইকমার্স সলিউশন।
        </p>
      </section>
    </dialog>
  );
}
