// The jest configuartion
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',

};