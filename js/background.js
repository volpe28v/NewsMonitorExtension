var parsedItems = [];
var lastUpdatedAt = new Date();
var intervalTime = 60000;
var user = "";

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
}

function doMonitor(){
  var news_url = "https://github.com/";
  $.get(news_url, function(data) {
    var $data = $(data);
    var news = $data.find(".news").find(".alert");
    user = $data.find(".name").text().trim();

    // リポジトリ情報を抜き出す
    var items = $.map(news,function(one_news, i) {
      var title = $(one_news).find(".title").html().replace(/href="\//g, 'href="' + news_url);
      title = title.replace(/href=/g, 'target="_blank" href=');
      var time = $(one_news).find(".time").text();
      return {title: title, time: time};
    });

    parsedItems = items;
    lastUpdatedAt = new Date();
  });
}

// 定周期で取得を繰り返す
$(document).ready(function() {
  doMonitor();
  setInterval(doMonitor,intervalTime);
});
