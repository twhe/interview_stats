module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test_output/results',
      outputName: 'jest-junit.xml'
    }]
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**test_output/**'
  ],
  coverageDirectory: 'test_output/coverage'
}
