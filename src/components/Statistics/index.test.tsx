import {
  createShallowWrapper,
  expectWrappersTreeToMatchSnapshot,
  mocks,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('Statistics component', () => {
  const mockFn = jest.fn();
  const wrapper = createWrapper({
    storage: mocks.storage,
    onClickManage: mockFn,
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('renders count', () => {
    expect(wrapper.find('.total').text()).toEqual('10 records in total');
  });

  it('calls onClickManage on click', () => {
    wrapper.find('a').simulate('click');
    expect(mockFn).toBeCalled();
  });

  it('renders no record when count is 0', () => {
    const noItemWrapper = createWrapper({ storage: { count: 0 } });
    expect(noItemWrapper.find('.__t')).toHaveLength(1);
  });
});
