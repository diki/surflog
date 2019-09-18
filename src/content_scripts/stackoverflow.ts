import { putRecord } from 'utils';

export const handleStackOverflow = (port: MessagePort) => {
  try {
    const title = (<HTMLElement>document.querySelector('.question-hyperlink'))
      .textContent;
    const content = [...(<NodeList>document.querySelectorAll('.post-text'))]
      .map(e => (<string>e.textContent).trim())
      .join(' ');
    const id = (<string[]>document.location.href.match(/\d+/))[0];

    const record = {
      id,
      content,
      title,
      link: document.location.href,
      page: 'stackoverflow',
    };

    putRecord(port, record);
  } catch (e) {
    console.error(e);
  }
};
