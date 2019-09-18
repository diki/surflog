import {
  createShallowWrapper,
  expectWrappersTreeToMatchSnapshot,
  mocks,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('SearchBar component', () => {
  const mockFn = jest.fn();
  const wrapper = createWrapper({
    actions: {
      search: mockFn,
    },
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('renders Dropdown', () => {
    expect(wrapper.find('Dropdown')).toHaveLength(1);
  });

  it('calls onSearch on Dropdown change', () => {
    wrapper
      .find('Dropdown')
      .props()
      .onChange({ value: 'foo' });
    expect(mockFn).toBeCalled();
  });

  it('calls onSearch on Dropdown change', () => {
    wrapper.find('input').simulate('change', { target: { value: 'foo' } });
    expect(mockFn).toBeCalled();
  });
});
