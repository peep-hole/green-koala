import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('simple test', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.type).toBe("RNCSafeAreaProvider");
  });
});