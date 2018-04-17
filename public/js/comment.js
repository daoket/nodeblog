var pregage = 2
var page = 1
var pages = 1
var comments = []

/**
 * @desc ajax 请求
 */
function blogAjax(url, data, fn) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "JSON",
    error: function(data) {
      alert('加载异常，请稍后重试')
    },
    success: function(res) {
     typeof fn === 'function' && fn(res)
    }
  });
}

/**
 * @desc 渲染评论
 */
function renderComment(data) {
  $('.comment-times').html(data.length)
  $('.comment-tips').html('')
  
  pages = Math.ceil(data.length / pregage)
  var start = Math.max(0, (page-1)*pregage)
  var end = Math.min(start + pregage, data.length)
  
  var $lis = $('.comment-page li')
  $lis.eq(1).html(page + '/' + pages)
  if (page <= 1) {
  	page = 1
  	$lis.eq(0).html('<span>没有上一页了</span>')
  } else {
    $lis.eq(0).html(' <a href="javascript:;">上一页 </a>')
  }
  if (page >= pages) {
    $lis.eq(2).html('<span>没有下一页了</span>')
  } else {
    $lis.eq(2).html(' <a href="javascript:;">下一页 </a>')
  }
  
  var html = ''
  for (var i =start; i < end; i++) {
    html += `<div class="comment-item">
      <p class="commit-title"><span>${data[i].username}</span> <span>${formatDate(data[i].postTime)}</span></p>
      <p class="comment-conent">${data[i].content}</p>
    </div>`
  }
  $('.comment-list').html(html)
}

/**
 * @desc 格式化怒时间
 */
function formatDate(time) {
  var d = new Date(time)
  return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
    + d.getHours() + '时' + d.getMinutes() + '分' + d.getSeconds() + '秒'
}

blogAjax('/api/comment', {contentid: $(".contentId").val()}, function (res) {
  if (res.code == '666') {
    comments = res.data.comments.reverse()
    renderComment(comments)
  }
})

$('.comment-page').on('click', 'a', function () {
  if ($(this).parent().hasClass('previous')) {
    console.log(page)
  	page--
  } else {
    page++
  }
  renderComment(comments)
})

// 评论
$(".comment-btn").on('click', function () {
  var comment = "/api/comment/post"
  var data = {
    contentid: $(".contentId").val(),
    content: $(".comment-area").val()
  }
  blogAjax(comment, data, function (res) {
    $('.comment-area').val('')
    if (res.code == '666') {
      var comments = res.data.comments.reverse()
      renderComment(comments)
    } else {
      $('.comment-tips').html(res.message)
    }
  })
})