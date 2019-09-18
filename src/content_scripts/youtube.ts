import { isYoutubeVideo, putRecord } from 'utils';

export default async (port: MessagePort) => {
  if (isYoutubeVideo(location.href)) {
    const record = await waitUntilContentReady();
    putRecord(port, record);
  }
  chrome.runtime.onMessage.addListener(async request => {
    if (request.type === 'youtubeURLChange') {
      try {
        const record = await waitUntilContentReady();
        putRecord(port, record);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

async function waitUntilContentReady() {
  return await new Promise(resolve => {
    const int = setInterval(() => {
      try {
        const title = document.querySelector('.title');
        const content = (<HTMLElement>document.querySelector('#description'))
          .textContent;
        if (title !== null && content !== null) {
          const link = location.href;
          const titleEl = <HTMLElement>(
            document.querySelector(
              '.style-scope ytd-video-primary-info-renderer .title',
            )
          );
          const title = (<string>titleEl.textContent).trim();
          const content = (<HTMLElement>document.querySelector('#description'))
            .textContent;
          const id = new URL(location.href).searchParams.get('v');
          const record = {
            id,
            title,
            content,
            link,
            page: 'youtube',
          };
          resolve(record);
          clearInterval(int);
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  });
}
