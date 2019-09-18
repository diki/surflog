import {
  expectWrappersTreeToMatchSnapshot,
  createShallowWrapper,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('Dropdown component', () => {
  const mockOnChange = jest.fn();

  const wrapper = createWrapper({
    options: ['1', '2', '3'],
    value: '3',
    onChange: mockOnChange,
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('should render pages and range dropdown', () => {
    expect(wrapper.find('Dropdown')).toHaveLength(1);
  });

  it('should call onChange on Dropdown change', () => {
    wrapper
      .find('Dropdown')
      .props()
      .onChange(1);
    expect(mockOnChange).toBeCalled();
  });
});
