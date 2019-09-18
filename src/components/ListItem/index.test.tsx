import {
  expectWrappersTreeToMatchSnapshot,
  createShallowWrapper,
  mocks,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('ListItem component', () => {
  const mockOnClick = jest.fn();

  const wrapper = createWrapper({
    occurences: mocks.occurences,
    record: mocks.record,
    onClick: mockOnClick,
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('should render necessary parts', () => {
    expect(wrapper.find('PrevNextControl')).toHaveLength(1);
    expect(wrapper.find('Time')).toHaveLength(1);
    expect(wrapper.find('PageIcon')).toHaveLength(1);
    expect(wrapper.find('Title')).toHaveLength(1);
    expect(wrapper.find('Content')).toHaveLength(1);
  });

  it('should call onClick prop on click', () => {
    wrapper
      .find('a')
      .first()
      .simulate('click');
    expect(mockOnClick).toBeCalled();
  });
});
