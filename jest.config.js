module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/src/setupTests.ts'
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|react-native-reanimated)'
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native',
    '\\.png$': '<rootDir>/__mocks__/fileMock.js',
    '^@react-native/js-polyfills/error-guard$':
      '<rootDir>/__mocks__/errorGuardMock.js'
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx']
};
