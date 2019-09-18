import {
  expectWrappersTreeToMatchSnapshot,
  createShallowWrapper,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('AppHeader component', () => {
  const wrapper = createWrapper({});

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });
});
