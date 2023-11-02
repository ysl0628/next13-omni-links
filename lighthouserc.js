module.exports = {
  ci: {
    assert: {
      collect: {
        url: process.env.CI
          ? 'https://link-orchard.vercel.app/'
          : 'http://localhost:3000',
        startServerCommand: process.env.CI ? undefined : 'npm run dev',
        settings: {
          emulatedFormFactor: 'desktop'
        }
      },
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': [
          'warn',
          { aggregationMethod: 'optimistic', minScore: 0.75 }
        ],
        'categories:accessibility': [
          'error',
          { aggregationMethod: 'optimistic', minScore: 0.6 }
        ]
      },
      upload: {
        target: 'temporary-public-storage'
      }
    }
  }
}
