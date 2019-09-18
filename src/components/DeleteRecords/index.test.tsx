import {
  expectWrappersTreeToMatchSnapshot,
  createShallowWrapper,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('DeleteRecords component', () => {
  const mockOnCancel = jest.fn();
  const mockOnClear = jest.fn();

  const wrapper = createWrapper({
    onCancel: mockOnCancel,
    onClear: mockOnClear,
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('should render pages and range dropdowns', () => {
    expect(wrapper.find('Dropdown')).toHaveLength(2);
  });

  it('should call onCancel prop on click', () => {
    wrapper.find('.__t1').simulate('click');
    expect(mockOnCancel).toBeCalled();
  });

  it('should call onClear prop on click', () => {
    wrapper.find('.__t2').simulate('click');
    expect(mockOnClear).toBeCalled();
  });
});
