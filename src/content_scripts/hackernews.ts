import { putRecord } from 'utils';

export const handleHNHomePage = (port: MessagePort) => {
  document.querySelectorAll('.storylink').forEach(link => {
    link.addEventListener('click', async e => {
      try {
        const id = (<HTMLElement>link.closest('.athing')).getAttribute('id');
        const record = {
          id,
          content: '',
          title: (<HTMLElement>e.currentTarget).innerText,
          link: `https://news.ycombinator.com/item?id=${id}`,
          page: 'hackernews',
        };
        putRecord(port, record);
      } catch (e) {
        console.error(e);
      }
    });
  });
};

export const handleHNItemPage = (port: MessagePort) => {
  try {
    const allComments = document.querySelectorAll('.comment');
    const allCommentsArr = Array.prototype.slice.call(allComments, 0);
    const stripped = allCommentsArr.map(comment => {
      return comment.textContent.replace(/\s+reply\s+/gi, '').trim();
    });
    const title = (<HTMLElement>document.querySelector('.title > a'))
      .textContent;
    const idMatch = location.href.match(/=(\d+)/gi);
    let id = '';
    if (idMatch !== null) {
      id = idMatch[0].slice(1);
    }
    const record = {
      content: stripped.join(' '),
      id,
      link: `https://news.ycombinator.com/item?id=${id}`,
      title,
      page: 'hackernews',
    };

    putRecord(port, record);
  } catch (e) {
    console.error(e);
  }
};
