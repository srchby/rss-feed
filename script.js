function loadRSSXml(file, Id) {
  fetch(file)
    .then((res) => res.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      const items = data.querySelectorAll("item");
      let html = "";
      items.forEach((item) => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        html += `<div class="item"><a href="${link}" target="_blank">${title}</a></div>`;
      });
      document.getElementById(Id).innerHTML = html;
    });
}

function loadRssUrl(Url, Id) {
  fetch("https://api.rss2json.com/v1/api.json?rss_url=" + Url).then((res) =>
    res.json().then((data) => {
      let html = "";
      data.items.forEach((item) => {
        html +=
          '<div class="item"><a href="' +
          item.link +
          '" target="_blank">' +
          item.title +
          "</a>" +
          '<p class="pub-date">' +
          item.pubDate.substring(0, 10) +
          "</p>" +
          "</div>";
      });
      document.getElementById(Id).innerHTML = html;
    })
  );
}

loadRSSXml("feed.xml", "feed");
loadRssUrl("https://torrentfreak.com/feed/", "feed2");
