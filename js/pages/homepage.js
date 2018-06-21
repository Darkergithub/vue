$(function(){
	$("li").each(function(){
		$(this).click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			var code = $(this).attr("code");
			console.log(code)
			$(".content iframe").attr("src", code + ".html")
			
		})
	})
})
