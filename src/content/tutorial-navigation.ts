export interface TutorialNavigationGroup {
  readonly title: string;
  readonly links: readonly string[];
}

export interface TutorialTopic {
  readonly title: string;
  readonly group: string;
  readonly slug: string;
}

export const tutorialNavigationGroups: readonly TutorialNavigationGroup[] = [
  { title: "Introduction", links: ["Frappe HR", "Videos"] },
  { title: "Frappe HR Mobile", links: ["Mobile App Installation", "Push Notification"] },
  { title: "Organization Management", links: ["Employee", "Employment Type", "Branch", "Department", "Designation", "Employee Grade", "Employee Group", "Employee Health Insurance", "Organizational Chart"] },
  { title: "Attendance", links: ["Attendance", "Employee Attendance Tool", "Attendance Request", "Upload Attendance", "Employee Checkin", "Auto Attendance", "Biometric Attendance Integration"] },
  { title: "Shift Management", links: ["Shift Type", "Shift Location", "Shift Request", "Shift Assignment", "Shift Schedule", "Roster"] },
  { title: "Leave Management", links: ["Leaves", "Holiday List", "Leave Type", "Leave Period", "Leave Policy", "Leave Application", "Leave Allocation", "Leave Ledger Report"] },
  { title: "Performance", links: ["Appraisal Template", "Appraisal Cycle", "Appraisal", "Employee Performance Feedback", "Goal"] },
  { title: "Travel and Expense Claim", links: ["Employee Advance", "Expense Claim", "Travel Request"] },
  { title: "Recruitment", links: ["Staffing Plan", "Job Requisition", "Job Opening", "Job Portal", "Job Applicant", "Interview Management", "Job Offer"] },
  { title: "Training", links: ["Training Program", "Training Event", "Training Result", "Training Feedback"] },
  { title: "Employee Lifecycle", links: ["Employee Onboarding", "Employee Promotion", "Employee Separation", "Employee Transfer", "Exit Interview", "Full and Final Statement"] },
  { title: "Fleet Management", links: ["Vehicle", "Vehicle Log"] },
  { title: "Salary Payouts", links: ["Payroll Setup", "Payroll Management", "Payroll Period", "Salary Component", "Salary Structure", "Salary Slip", "Payroll Entry"] },
  { title: "Employee Tax and Benefits", links: ["Income Tax Deduction", "Tax Exemption Declaration", "Employee Benefits"] },
  { title: "Gratuity", links: ["Gratuity", "Gratuity Rule"] },
  { title: "Loans", links: ["Loan Type", "Loan Application", "Loan"] },
  { title: "Overtime", links: ["Overtime"] },
  { title: "Flexible Benefits", links: ["Flexible Benefits"] },
  { title: "Payroll Correction", links: ["Payroll Correction"] },
  { title: "Arrears", links: ["Arrears"] },
  { title: "Setup", links: ["Human Resource Setup", "HR Settings", "Payroll Settings"] },
  { title: "Reports", links: ["Human Resources Reports", "Project Profitability Report", "Employee CTC Break-Up"] },
  { title: "HR Articles", links: ["Using Auto Attendance", "Configuring Earned Leave", "Leave Calculation in Salary Slip"] },
  { title: "Payroll Articles", links: ["How to process Payroll", "Income Tax Calculation", "Working Days Calculation"] },
  { title: "India Payroll", links: ["Introduction", "Professional Tax", "Employee State Insurance", "Provident Fund"] },
] as const;

export function tutorialSlug(group: string, title: string): string {
  return `${group}-${title}`
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const tutorialTopics: readonly TutorialTopic[] = tutorialNavigationGroups.flatMap((group) =>
  group.links.map((title) => ({
    title,
    group: group.title,
    slug: tutorialSlug(group.title, title),
  })),
);

export function findTutorialTopic(slug: string): TutorialTopic | undefined {
  return tutorialTopics.find((topic) => topic.slug === slug);
}
