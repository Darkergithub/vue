$(function(){
	//退出登陆
	$("span img").click(function(){
		window.location.href="../login.html"
	})
	
	$("li").each(function(){
		$(this).click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
//			var code = $(this).attr("code");
//			console.log(code)
//			$(".content iframe").attr("src", code + ".html");
//			$(".content iframe").attr("target",code + ".html");
			
		})
	})
})
