import {defineConfig, devices} from '@playwright/test'
export default defineConfig({
  testDir : 'tests',
  reporter: 'html',
  use: {
    baseURL : 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']} // default
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']}
    },
    // can give multiple projects like this

  ],
 webServer: {
  command: 'cd Rating && npm run build && npm run start',
  url: 'http://localhost:3000',
  reuseExistingServer: true, 
 }
})