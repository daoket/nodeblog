$(".submit-btn").on('click', function () {
  var data = { username: $(".name").val(), password: $(".password").val(), repassword: $(".repassword").val() };
  $.ajax({
    type: "POST",
    url: "/api/user/register",
    data: data,
    dataType: "JSON",
    error: function(data) {
      console.log('加载异常，请稍后重试')
    },
    success: function(res) {
      console.log(res);
    }
  });
})