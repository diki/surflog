import { putRecord } from 'utils';

export default (port: MessagePort) => {
  if (isRepoPage() || isIssuePage()) {
    logRepoPage(port);
  }
  chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'githubURLChange') {
      setTimeout(() => {
        if (isRepoPage() || isIssuePage()) {
          logRepoPage(port);
        }
      }, 3500);
    }
  });
};

const isRepoPage = () => {
  return document.querySelector('#readme .markdown-body') !== null;
};

const isIssuePage = () => {
  return document.location.href.match(/issues\/\d+$/) !== null;
};

const logRepoPage = (port: MessagePort) => {
  try {
    const titleEl = document.querySelector('.repohead-details-container h1');
    const title = (<string>(<HTMLElement>titleEl).textContent)
      .trim()
      .split('/')
      .join(' ');

    const idEl = document.querySelector('.repohead-details-container h1');
    let id = (<string>(<HTMLElement>idEl).textContent).trim();

    const link = location.href;
    const readMeEl = document.querySelector('#readme');

    let content = '';
    if (readMeEl !== null) {
      const contentEl = <HTMLElement>(
        document.querySelector('#readme .markdown-body')
      );
      content = (<string>contentEl.textContent).trim();
    } else if (isIssuePage()) {
      content = [
        ...document.querySelectorAll('.comment .markdown-body.js-comment-body'),
      ]
        .map(item => (<string>item.textContent).trim())
        .join(' ');
      id = `${id}-${document.location.href.match(/issues\/\d+$/)}`;
    } else {
      return;
    }

    const record = {
      id,
      title,
      content,
      link,
      page: 'github',
    };

    putRecord(port, record);
  } catch (e) {
    console.error(e);
  }
};
