function register() {
		var province =  $('#province option:selected').val();
		var city =  $('#city option:selected').val();
		var areas =  $('#area option:selected').val();
		if(areas == ""){
			var address = province+city
		}else{
			var address = province+city+areas
		}
		console.log(address)
		
		
	if($("#username").val().trim() == "") {
		alert("用户名不能为空");
		return false;
	}

	if($("#password").val().trim() == "") {
		alert("用户密码不能为空");m
		return false;
	}

	var data = $("#myform").serializeArray();

	ajaxPost(
		Url.REGISTER,
		{
			'userPhone':$("#telphone").val(),
			'userName':$("#username").val(),
			'userAddress':address,
			'userType':'NETWORK',
		},
		function(data){
			console.log(address)
		}
	);

}
//	 验证用户名
function vadName() {
	var tip = document.getElementById("divname");
	var username = document.getElementById("username");
	var val = username.value;
	var reg = /^\S{3,12}$/
	if(reg.test(val)) {
		tip.innerHTML = "<span class='right'>正确</span>";
		return true;
	} else {
		tip.innerHTML = "<span class='wrong'>长度3~12个字符</span>";
		return false;
	}
}
//验证手机号
function phone(){
	var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;//
		if(!reg.test($("#telphone").val().trim())) {
		    alert("请输入正确的手机号码");
		    $("#userPhone").val("")
		    return false;
		}
}
//	   验证密码
function vadPwd() {
	var tip = document.getElementById("divpassword1");
	var password = document.getElementById("password");
	var val = password.value;
	var reg = /\d/;
	var reg2 = /[a-zA-Z]/;
	var reg3 = /^\S{6,18}$/;
	if(reg.test(val) && reg2.test(val) && reg3.test(val)) {

		tip.innerHTML = "<span class='right'>正确</span>";
		return true;
	} else {
		tip.innerHTML = "<span class='wrong'>密码必须由6-18位字母和数字组成</span>";
		return false;
	}

}

function vadPwd2() {
	var tip = document.getElementById("divpassword2");
	var password = document.getElementById("password");
	var val = password.value;
	var password2 = document.getElementById("password2");
	var val2 = password2.value;
	if(val == val2 && val2 != "") {
		tip.innerHTML = "<span class='right'>正确</span>";
		return true;
	} else {
		tip.innerHTML = "<span class='wrong'>两次密码要一致</span>";
		return false;
	}

}
 //验证所有
//	function vad(){
//		var v1=vadName();
//		var v2=vadPwd();
//
//		if(v1&&v2){
//			return true;
//		}else{
//			return false;
//		}
//		
//	}
	



$("select#prov").change(function(){
	alert(2)
})
//=======初始化省市区===========
	address();
	// 更改省份后的操作  
    $("select[name='province']").change(function() {  
    	$("select[name='city']").empty();
    	$("select[name='area']").empty();
        var provCode = $("select[name='province']").val();  
    	addressCity(provCode);  
    });  
    // 更改城市后的操作  
    $("select[name='city']").change(function() {  
    	$("select[name='area']").empty();
        var cityCode = $("select[name='city']").val();  
        addressArea(cityCode);  
    });  
    //===省===
	function address(){
		var firstProvCode;
		ajaxPost(
			Url.ADDRESS,
			{
			'parentCode':'0000'
			},
			function(data){
				$("select[name='city']").empty();  
				$.each(data.result.areaInfos,function(i,d){
					$("select[name='province']").append("<option value='"+i+"'>" + d+ "</option>");
				});
				
				// 获取第一个省份的code  
            	// 根据第一个省份code获取对应城市列表  
				var provCode = $("select[name='province']").val();  
				addressCity(provCode);  
			},
		)
	}
	//===市区===
	function addressCity(prvCode){
		ajaxPost(
			Url.ADDRESS,
			{
			'parentCode':prvCode
			},
			function(data){
//				console.log(data)
				$("select[name='area']").empty();  
//				console.log(data);
				$.each(data.result.areaInfos,function(i,d){
					console.log()
					$("select[name='city']").append("<option value='"+i+"'>" + d+ "</option>");
				})
				
				// 获取第一个城市的code  
            	// 根据第一个城市code获取对应区县列表  
				var cityCode = $("select[name='city']").val();  
       			addressArea(cityCode);  
			},
		)
	}
	
	//===城区===
	function addressArea(cityCode){
		ajaxPost(
			Url.ADDRESS,
			{
			'parentCode':cityCode
			},
			function(data){
//				console.log(data)
				$("select[name='area']").empty();  
//				console.log(data)	
				$.each(data.result.areaInfos,function(i,d){
					$("select[name='area']").append("<option value='"+i+"'>" + d+ "</option>");
				})
			},
		)
	}

	
	
	
