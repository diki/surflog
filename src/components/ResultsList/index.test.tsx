import {
  createShallowWrapper,
  expectWrappersTreeToMatchSnapshot,
  mocks,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('ResultsList component', () => {
  const wrapper = createWrapper({
    items: mocks.searchResults,
    isFirstSearchDone: true,
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('renders correct number of item', () => {
    expect(wrapper.find('ListItem')).toHaveLength(mocks.searchResults.length);
  });

  it('renders no record when items count is 0 and is first search done', () => {
    const noItemWrapper = createWrapper({ items: [], isFirstSearchDone: true });
    expect(noItemWrapper.find('div').text()).toEqual('No result found');
  });

  it('renders nothing when items count is 0 and is first search not done', () => {
    const noItemWrapper = createWrapper({
      items: [],
      isFirstSearchDone: false,
    });
    expect(noItemWrapper.find('div').text()).toEqual('');
  });
});
