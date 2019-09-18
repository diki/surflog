import { RECORDS_ADD } from 'store/contants';
import { ISupportedWebsite } from '@types';

export const isHN = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const url = new URL(urlString);
  return url.origin === 'https://news.ycombinator.com';
};

export const isHNHomePage = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const url = new URL(urlString);
  return url.origin === 'https://news.ycombinator.com';
};

export const isHNItemPage = (urlString: string) => {
  if (!isHNHomePage(urlString)) {
    return false;
  }
  const url = new URL(urlString);
  const searchParams = url.searchParams;
  if (searchParams === undefined) {
    return false;
  }
  const id = searchParams.get('id');
  return !!id;
};

export const isTwitter = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const url = new URL(urlString);
  return url.origin === 'https://twitter.com';
};

export const isTwitterHomePage = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const url = new URL(urlString);
  return url.origin === 'https://twitter.com';
};

export const isTwitterItemPage = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const match = urlString.match(
    /https:\/\/(www\.)*twitter\.com\/(.*)\/status\/(\d+)/,
  );
  if (match === null) {
    return false;
  }
  if (match[3] === undefined) {
    return false;
  }
  return match[3];
};

export const isHNComment = (searchParams: URLSearchParams) => {
  if (searchParams === undefined) {
    return false;
  }
  const id = searchParams.get('id');
  if (id === null) {
    return false;
  }
  return id;
};

export const isStackOverflow = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const url = new URL(urlString);
  return url.origin === 'https://stackoverflow.com';
};

export const isRedditPost = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const match = urlString.match(
    /https:\/\/www\.reddit\.com\/\w+\/\w+\/comments\/([0-9a-zA-Z]*)\//,
  );
  if (match === null) {
    return false;
  }
  if (match[1] === undefined) {
    return false;
  }
  return match[1];
};

export const isRedditHomePage = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const url = new URL(urlString);
  return url.origin === 'https://www.reddit.com';
};

export const isGithub = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const url = new URL(urlString);
  return (
    url.origin === 'https://github.com' ||
    url.origin === 'https://www.github.com'
  );
};

export const isYoutube = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  const url = new URL(urlString);
  return (
    url.origin === 'https://youtube.com' ||
    url.origin === 'https://www.youtube.com'
  );
};

export const isYoutubeVideo = (urlString: string) => {
  if (!urlString) {
    return false;
  }
  if (!isYoutube(urlString)) {
    return false;
  }
  const url = new URL(urlString);
  return url.searchParams.get('v') !== null;
};

export const sources: { [key: string]: ISupportedWebsite } = {
  hackernews: {
    code: 'hackernews',
    humanReadable: 'Hackernews',
    logo: './logos/y18.gif',
    font: 'fab fa-hacker-news',
    color: 'rgb(238, 111, 45)',
  },
  twitter: {
    code: 'twitter',
    humanReadable: 'Twitter',
    logo: './logos/twitter.ico',
    font: 'fab fa-twitter',
    color: 'rgb(74, 159, 234)',
  },
  stackoverflow: {
    code: 'stackoverflow',
    humanReadable: 'Stackoverflow',
    logo: './logos/stackoverflow.ico',
    font: 'fab fa-stack-overflow',
    color: 'rgb(229, 133, 61)',
  },
  reddit: {
    code: 'reddit',
    humanReadable: 'Reddit',
    logo: './logos/reddit.png',
    font: 'fab fa-reddit',
    color: 'rgb(236, 84, 40)',
  },
  github: {
    code: 'github',
    humanReadable: 'Github',
    logo: './logos/github.png',
    font: 'fab fa-github',
    color: 'rgb(37, 41, 45)',
  },
  youtube: {
    code: 'youtube',
    humanReadable: 'Youtube',
    logo: './logos/youtube.png',
    font: 'fab fa-youtube',
    color: 'rgb(235, 50 , 35)',
  },
};

export const rangeToTime = range => {
  const now = Date.now();
  switch (range) {
    case 'lastHour':
      return now - 60 * 60 * 1000;
    case 'last24Hours':
      return now - 24 * 60 * 60 * 1000;
    case 'last7Days':
      return now - 7 * 24 * 60 * 60 * 1000;
    case 'last4weeks':
      return now - 4 * 7 * 24 * 60 * 60 * 1000;
    case 'all':
      return 0;
    default:
      return 0;
  }
};

export const putRecord = (port, record) => {
  port.postMessage({
    type: RECORDS_ADD,
    value: {
      ...record,
    },
  });
};

export const rangeOptions = [
  {
    value: 'lastHour',
    label: 'Last hour',
  },
  {
    value: 'last24Hours',
    label: 'Last 24 hours',
  },
  {
    value: 'last7Days',
    label: 'Last 7 days',
  },
  {
    value: 'last4weeks',
    label: 'Last 4 weeks',
  },
  {
    value: 'all',
    label: 'All time',
  },
];
