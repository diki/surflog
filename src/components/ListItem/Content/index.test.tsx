import {
  expectWrappersTreeToMatchSnapshot,
  createShallowWrapper,
} from 'utils/testHelpers';
import Component from './index';

const createWrapper = createShallowWrapper(Component);

describe('Content component', () => {
  const wrapper = createWrapper({
    record: { content: 'Record content' },
    occurence: { position: [0, 5] },
  });

  it('renders the expected snapshot', () => {
    expectWrappersTreeToMatchSnapshot(wrapper);
  });

  it('renders just content if there is no match', () => {
    const wrapper = createWrapper({
      record: { content: 'Record content' },
    });
    expect(
      wrapper
        .find('div')
        .first()
        .text(),
    ).toEqual('Record content...');
  });

  it('renders match there is a match', () => {
    const wrapper = createWrapper({
      record: { content: 'Record content' },
      occurence: { position: [0, 5] },
    });
    expect(wrapper.find('span')).toHaveLength(1);
  });
});
