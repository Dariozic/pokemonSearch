jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    StyleSheet: {
      create: (styles) => styles
    },
    Platform: {
      ...RN.Platform,
      select: jest.fn((obj) => obj.ios)
    }
  };
});

global.window = {};
global.window.addEventListener = () => {};
global.window.removeEventListener = () => {};
