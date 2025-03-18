import '@testing-library/jest-native/extend-expect';

expect.extend({
  toBeInTheDocument(received) {
    if (received) {
      return {
        message: () => 'expected element not to be in the document',
        pass: true
      };
    } else {
      return {
        message: () => 'expected element to be in the document',
        pass: false
      };
    }
  }
});
