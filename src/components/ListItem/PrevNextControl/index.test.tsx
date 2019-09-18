import {
  expectWrappersTreeToMatchSnapshot,
  createShallowWrapper,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('PrevNextControl component', () => {
  const mockOnBack = jest.fn();
  const mockOnNext = jest.fn();

  const wrapper = createWrapper({
    onClickBack: mockOnBack,
    onClickNext: mockOnNext,
    total: 6,
    current: 2,
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('should call onClickBack prop on click', () => {
    wrapper
      .find('a')
      .first()
      .simulate('click');
    expect(mockOnBack).toBeCalled();
  });

  it('should call onClickNext prop on click', () => {
    wrapper
      .find('a')
      .last()
      .simulate('click');
    expect(mockOnNext).toBeCalled();
  });

  it('do not display prev if current is zero', () => {
    const wrapper = createWrapper({
      total: 6,
      current: 0,
    });
    expect(
      wrapper
        .find('a')
        .last()
        .text(),
    ).toEqual('Next > ');
  });

  it('do not display next if current is total', () => {
    const wrapper = createWrapper({
      total: 6,
      current: 6,
    });
    expect(
      wrapper
        .find('a')
        .last()
        .text(),
    ).toEqual(' < Prev | ');
  });
});
