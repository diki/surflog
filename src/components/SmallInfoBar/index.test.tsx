import {
  createShallowWrapper,
  expectWrappersTreeToMatchSnapshot,
  mocks,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('SmallInfoBar component', () => {
  const mockFn = jest.fn();
  const wrapper = createWrapper({
    totalResultsFound: 5,
    onClickManage: mockFn,
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('renders total results', () => {
    expect(wrapper.find('.__t').text()).toEqual('Found: 5');
  });

  it('calls onSearch on Dropdown change', () => {
    wrapper.find('a').simulate('click');
    expect(mockFn).toBeCalled();
  });
});
