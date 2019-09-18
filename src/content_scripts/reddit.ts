import { isRedditPost, putRecord } from 'utils';
import { IRecord } from '@types';

let commentsParseInterval = 0;

export default (port: MessagePort) => {
  if (isRedditPost(location.href)) {
    let comments = getComments();
    commentsParseInterval = setInterval(() => {
      comments = getComments();
      createRecord(comments, port);
    }, 2500);
  }

  chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'redditURLChange') {
      if (!isRedditPost(location.href)) {
        clearInterval(commentsParseInterval);
        return;
      }
      let comments = getComments();
      if (comments.length === 0) {
        commentsParseInterval = setInterval(() => {
          comments = getComments();
          createRecord(comments, port);
        }, 2500);
      }
    }
  });
};

function getComments() {
  return [...document.querySelectorAll('[data-test-id=comment]')]
    .map(e => e.textContent)
    .join(' ');
}

function createRecord(content: string, port: MessagePort) {
  if (!isRedditPost(location.href)) {
    return;
  }
  try {
    const titleEl = <HTMLElement>(
      document.querySelector('[data-test-id=post-content] h1')
    );

    const title = <string>titleEl.textContent;
    const id = isRedditPost(location.href);
    const link = location.href;

    const record: Omit<IRecord, 'lastVisitedTime'> = {
      id,
      title,
      content,
      link,
      page: 'reddit',
    };

    putRecord(port, record);
  } catch (e) {
    console.log(e);
  }
}
