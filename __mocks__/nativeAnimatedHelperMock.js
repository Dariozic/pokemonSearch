module.exports = {
  default: {
    createAnimatedComponent: (component) => component,
    Value: jest.fn(),
    timing: jest.fn(() => ({
      start: jest.fn()
    }))
  }
};
