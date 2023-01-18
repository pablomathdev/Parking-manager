
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/providers/**',
    '!<rootDir>/src/app/config/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/input/dtos/**',
    '!<rootDir>/src/input/protocols/**',
    '!<rootDir>/src/input/helpers/**'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  modulePathIgnorePatterns: ['/dist']
}
