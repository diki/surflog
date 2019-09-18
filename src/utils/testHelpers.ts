import React from 'react';
import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

export const createShallowWrapper = component => (props = {}) =>
  shallow(React.createElement(component, props));

// export const createWrapper = component => (props = {}) =>
//   createShallowWrapper(component, {
//     ...props,
//   });

export const expectWrappersTreeToMatchSnapshot = (wrapper: any) => {
  const tree = enzymeToJson(wrapper);
  expect(tree).toMatchSnapshot();
};

export const mocks = {
  storage: {
    count: 10,
  },
  searchResults: [
    {
      ref: '/BenLesh/status/1160394371784744962',
      matchData: { content: { position: [[61, 5]] } },
      record: {
        id: '/BenLesh/status/1160394371784744962',
        content:
          "·8mReplying to @BenLeshI'm mildly surprised I haven't had to build @ladyleet a fort yet. 1",
        title: 'Ben Lesh@BenLesh',
        link: 'https://twitter.com//BenLesh/status/1160394371784744962',
        page: 'twitter',
        lastVisitedTime: 1565495077688,
      },
    },
    {
      ref: '/BenLesh/status/1160392474503897091',
      matchData: { content: { position: [[17, 5]] } },
      record: {
        id: '/BenLesh/status/1160392474503897091',
        content:
          '·16mI decided to build a box fort for my 4 yr old out of some of our moving boxes... And maybe it got out of hand. 623',
        title: 'Ben Lesh@BenLesh',
        link: 'https://twitter.com//BenLesh/status/1160392474503897091',
        page: 'twitter',
        lastVisitedTime: 1565495072153,
      },
    },
  ],
  occurences: [
    { key: 'content', position: [6, 5] },
    { key: 'content', position: [6, 5] },
  ],
  record: {
    id: '/rohitfoss00/status/1160393803703832576',
    content:
      '·59mI enjoy writing tests using @kentcdodds method ((link: https://kentcdodds.com/blog/testing-implementation-details) kentcdodds.com/blog/testing-i…)\nI did this with React, and now applying it to backend with serverless.Testing Implementation DetailsTesting implementation details is a recipe for disaster. Why is that? And what does it even mean?kentcdodds.com127',
    title: 'Rohit@rohitfoss00',
    link: 'https://twitter.com//rohitfoss00/status/1160393803703832576',
    page: 'twitter',
    lastVisitedTime: 1565498007441,
  },
};
