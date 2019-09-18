<p align="center">
  <img alt="surflog" src="https://github.com/diki/surflog/blob/master/assets/banner_small.png">
</p>

<p align="center">
  Extension for a better browser history
</p>

# How does it work?

The extension records your browsing history together with the content of the page you visited. All records are kept in your browser's storage (using IndexedDB) with full text indexing, so that using the extension you can search your history (of course including the content) pretty effectively.

# Is it safe?

All data is kept in your browser's storage, nothing is sent or shared. There are no trackers. No ads ever. And it will always be.

# Limitations

Suflog works for some <ins>particular websites.</ins> That is because each web page requries different content extraction logic. Currently supported websites are: Hackernews, Twitter, Reddit, Stackoverflow, Youtube and Github. Number of supported websites will be and can be increased relatively easily, PRs for new pages are always welcome.

# What content is saved?

Content extraction is hand-picked and it is different for every web site.

### HackerNews

- On home page every outgoing link you clicked is recorded with it's title and the link
- When you visit a post page; title, link and all comments are recorded

### Twitter

- Every tweet you like or retweet will be recorded with author, tweet content and link
- When you navigate to a single tweet url author, tweet, link and all the comments of that tweet will be recorded (comments will be recorded as separate tweets)

### Github

- When you visit a repository page; author, title, link and README will be recorded

### Stackoverflow

- When you visit to a question page; author, title, link and all commments will be recorded

### Reddit

- When you visit to a post page; author, title, link and all comments will be recorded

### Youtube

- When visit a video URL; author, title and link will be recorded

# About

Surflog is a single man effort developed on my free times. The motivation behind it is just personal need and I hope it becomes useful for someone else there. PRs and issues are always welcome.

Made with ❤ in Berlin
