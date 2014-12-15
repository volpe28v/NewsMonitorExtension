var intervalTime = chrome.extension.getBackgroundPage().intervalTime;
var base_url = "https://github.com";

// 時間文字列生成
function dateToStr(date){
  function zero(number){
    return ('00' + number).slice(-2);
  }

  return zero(date.getHours()) + ":" + zero(date.getMinutes()) + ":" + zero(date.getSeconds());
}

// ニュースを更新
function updateNews(){
  var parsedItems = chrome.extension.getBackgroundPage().parsedItems;
  var lastUpdatedAt = chrome.extension.getBackgroundPage().lastUpdatedAt;
  var user = chrome.extension.getBackgroundPage().user;

  $('#user').html(user);
  $('#update').html(dateToStr(lastUpdatedAt));
  $("#list").empty();
  parsedItems.forEach(function(item){
    var timeClass = "time";
    // ユーザ名が含まれていればデザインを変える
    if (item.isOwn){
      timeClass = "own-time";
    }

    $("#list").append(
      $('<tr>').append(
        $('<td>').addClass(timeClass).attr("nowrap",'').append(
          $('<div/>').html(item.time)
        )
      ).append(
        $('<td>').addClass("title").attr("nowrap",'').append(
          $('<div/>').html(item.title)
        )
      )
    )
  });
}

// 定周期でPopupを更新する
$(document).ready(function() {
  updateNews();
  setInterval(updateNews,intervalTime);
});
