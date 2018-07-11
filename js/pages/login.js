$(".submit").click(function(){
    ajaxPost(
		Url.HOME_LOGIN,
		{
		userPhone:$("#userPhone").val(),
		userPassword:$("#userPassword").val()
		},
		function(data){
			console.log(data)
			sessionStorage["token"]=data.result.token;
			sessionStorage["level"]=data.result.level;

			var myDate = new Date();
			myDate.setDate(myDate.getDate()+30)
			document.cookie="token="+data.result.token+";expires="+myDate;
			window.location.href = "Pages/HomePage.html";

		},
		function(data){
			
		}
	)
});