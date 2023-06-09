// The jest configuartion
// https://jestjs.io/docs/en/configuration.html
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',
  testMatch: ['**/__tests__/**/*.test.tsx'],
  transform: {
    '\\.(tj)sx$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./src/__tests__/setup.ts'], 

  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^icons(.*)$': '<rootDir>/src/icons$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^types(.*)$': '<rootDir>/src/types$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^__tests__(.*)$': '<rootDir>/src/__tests__$1',
    "uuid": require.resolve('uuid')
  },

  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage'
};

export default config;