import { defineConfig } from "@playwright/test";

const viewports = [
  { name: "1280x720", viewport: { width: 1280, height: 720 } },
  { name: "1440x900", viewport: { width: 1440, height: 900 } },
  { name: "1024x768", viewport: { width: 1024, height: 768 } },
  { name: "768x1024", viewport: { width: 768, height: 1024 } },
  { name: "390x844", viewport: { width: 390, height: 844 } },
  { name: "360x800", viewport: { width: 360, height: 800 } },
];

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3917",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "Asia/Dhaka",
  },
  webServer: {
    command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3917",
    url: "http://127.0.0.1:3917",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      TUTORIAL_USE_MOCKS: "1",
      FRAPPE_BASE_URL: "https://next.ionicerp.xyz",
      TUTORIAL_SPACE: "ionic-tutorial",
      TUTORIAL_REVALIDATE_SECONDS: "300",
    },
  },
  projects: viewports.map((project) => ({ name: project.name, use: { viewport: project.viewport } })),
});
