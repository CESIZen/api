module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: ['**/test/**/*Test.ts', '**/test/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '.*\\.module\\.(t|j)s$',
    '.*\\.entity\\.(t|j)s$',
    '.*\\.dto\\.(t|j)s$',
    '<rootDir>/src/prisma/',
    '<rootDir>/src/main\\.(t|j)s$',
    '<rootDir>/apitest/'
  ]
};