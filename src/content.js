import {
  isHNHomePage,
  isHNItemPage,
  isTwitterHomePage,
  isStackOverflow,
  isRedditPost,
  isRedditHomePage,
  isGithub,
  isYoutube,
} from './utils';
import {
  handleHNHomePage,
  handleHNItemPage,
} from './content_scripts/hackernews';
import { handleTwitterHomePage } from './content_scripts/twitter';
import { handleStackOverflow } from './content_scripts/stackoverflow';
import handleReddit from './content_scripts/reddit';
import handleGithub from './content_scripts/github';
import handleYoutube from './content_scripts/youtube';

var port = chrome.runtime.connect({ name: 'surflog' });

if (isHNHomePage(location.href)) {
  handleHNHomePage(port);
}

if (isHNItemPage(location.href)) {
  handleHNItemPage(port);
}

if (isTwitterHomePage(location.href)) {
  handleTwitterHomePage(port);
}

if (isStackOverflow(location.href)) {
  handleStackOverflow(port);
}

if (isRedditPost(location.href) || isRedditHomePage(location.href)) {
  handleReddit(port);
}

if (isGithub(location.href)) {
  handleGithub(port);
}

if (isYoutube(location.href)) {
  handleYoutube(port);
}
