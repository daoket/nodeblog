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

$('.go-register').on('click', function () {
  $('.login').hide()
  $('.register').show()
})
$('.go-login').on('click', function () {
  $('.register').hide()
  $('.login').show()
})

// 注册
$(".register-btn").on('click', function () {
  const register = "/api/user/register"
  const data = {
    username: $(".register .username").val(),
    password: $(".register .password").val(),
    repassword: $(".register .repassword").val()
  }
  blogAjax(register, data, function (res) {
    // 注册成功
    if (res.code == '000') {
      $('.register-tips').html(res.message)
      $('.register').hide()
      $('.login').show()
    } else {
      $('.register-tips').html(res.message).css('color', 'red')
    }
  })
})

// 登录
$(".login-btn").on('click', function () {
  const register = "/api/user/login"
  const data = {
    username: $(".login .username").val(),
    password: $(".login .password").val()
  }
  blogAjax(register, data, function (res) {
    // 登录成功
    if (res.code == '010') {
      window.location.reload()
    } else {
      $('.login-tips').html(res.message).css('color', 'red')
    }
  })
})

// 退出
$(".login-out").on('click', function () {
  const logout = "/api/user/logout"
  $.ajax({
  	type:"get",
  	url: logout,
  	success: function () {
      location.href = '/'
  	}
  });
})

// 增加分类
$('.add-category').on('click', function () {
  const add = location.href
  const data = {
    category: $("#name").val(),
  }
  addCategory(add, data)
  function addCategory(url, data) {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: "JSON",
      async:true,
      error: function(data) {
        alert('加载异常，请稍后重试')
      },
      success: function(res) {
        console.log(res)
      }
    });
  }
})


