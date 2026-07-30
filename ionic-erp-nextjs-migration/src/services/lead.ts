import type { LeadFormValues } from "@/types/forms";

/**
 * Compatibility adapter: the source project only logged form submissions.
 * Replace this function when a real, approved lead API is available.
 */
export async function submitLead(values: LeadFormValues): Promise<void> {
  console.log(values);
}
