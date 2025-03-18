module.exports = {
  ErrorUtils: {
    setGlobalHandler: jest.fn(),
    getGlobalHandler: jest.fn(),
    reportError: jest.fn()
  },
  handleError: jest.fn(),
  installErrorReporter: jest.fn(),
  reportError: jest.fn(),
  reportFatalError: jest.fn()
};
