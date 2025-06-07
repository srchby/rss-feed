from flask import Flask, render_template, request
import feedparser

app = Flask(__name__)

RSS_FEEDS = {
    'TorrentFreak': 'https://torrentfreak.com/feed/',
    'TechCrunch': 'https://techcrunch.com/startups/feed/',
}

@app.route('/')
def index():
    feeds_data = {}
    for name, url in RSS_FEEDS.items():
        feed = feedparser.parse(url)
        feeds_data[name] = feed.entries
    return render_template('index.html', feeds=feeds_data)


if __name__ == '__main__':
    app.run(debug=True)