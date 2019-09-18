import {
  expectWrappersTreeToMatchSnapshot,
  createShallowWrapper,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('Landing component', () => {
  const mockOnConfirmed = jest.fn();
  const mockClickInfo = jest.fn();

  const wrapper = createWrapper({
    onConfirmed: mockOnConfirmed,
    onClickInfo: mockClickInfo,
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('should call onClickInfo prop on click', () => {
    wrapper
      .find('a')
      .first()
      .simulate('click');
    expect(mockClickInfo).toBeCalled();
  });

  it('should call onConfirmed prop on click', () => {
    wrapper
      .find('a')
      .last()
      .simulate('click');
    expect(mockOnConfirmed).toBeCalled();
  });
});
