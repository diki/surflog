import { isTwitterItemPage, putRecord } from 'utils';

let bindedTweets: { [key: string]: any } = {};

export const handleTwitterHomePage = (port: MessagePort) => {
  bindClickEvents(port);
  setInterval(() => {
    bindClickEvents(port);
  }, 3000);

  chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'twitterURLChange') {
      if (isTwitterItemPage(location.href)) {
        bindedTweets = {};
      } else {
        setTimeout(() => {
          bindClickEvents(port);
        }, 500);
      }
    }
  });
};

/**
 * bind click events to whole tweet container,
 * all navigtaion, like and/or retweet will be recorded
 */
const bindClickEvents = (port: MessagePort) => {
  const tweets = [...document.querySelectorAll('[data-testid="tweet"]')];
  tweets.forEach((item: Element) => {
    const idEl = <HTMLElement>item.querySelectorAll('a').item(2);
    const id = <string>idEl.getAttribute('href');

    if (bindedTweets[id]) {
      return;
    }

    bindedTweets[id] = true;

    item.addEventListener('click', e => {
      const record = parseTweetContainer(<Element>item.cloneNode(true));
      putRecord(port, record);
    });
  });
};

const parseTweetContainer = (item: Element) => {
  try {
    const timeEl = item.querySelector('time');
    if (timeEl !== null) {
      timeEl.textContent = '';
    }
    const profileLink = item.querySelectorAll('a').item(1);
    const idLink = item.querySelectorAll('a').item(2);
    const id = idLink.getAttribute('href');

    const title = <string>profileLink.textContent;
    let text = (<string>item.textContent).trim();
    text = text.replace(title, '').slice(1);

    const link = `https://twitter.com/${id}`;

    const msg = {
      id,
      content: text,
      title,
      link,
      page: 'twitter',
    };

    return msg;
  } catch (e) {
    return null;
  }
};
