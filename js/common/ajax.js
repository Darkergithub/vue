var _base = "http://47.94.242.151";
var _baseUrl = _base + '/yuechanxin'; //服务
var Url = {
	HOME_LOGIN: _baseUrl + "/innerreq/userlogin",//登录
	REGISTER: _baseUrl + "/innerreq/userregiste",//注册网点
	CHANGE_MSG: _baseUrl + "/innerreq/useredit",//信息变更
	WDCX: _baseUrl + "/httpreq/queryuser",//网店查询接口
	UNDER_CLASS: _baseUrl + "/innerreq/addoffline",//增加线下课程
	ONLINE_CLASS: _baseUrl + "/innerreq/addonline",//增加线上课程
	XG_ONLINECLASS: _baseUrl + "/innerreq/modifyonline",//修改线上课程
	XG_UNDERCLASS: _baseUrl + "/innerreq/modifyoffline",//修改线下课程
	ADDRESS: _baseUrl + "/httpreq/getareacode",//地址信息

}

function ajaxPost(url, data, successCallback, errorCallback){
	$.ajax({
		type:"post",
		url:url,
		data:data,
		success:function(data){
			if(data.success==true){
				successCallback(data)
			}else if(data.success == false){
				alert(data.errMsg)
			}

		},
		error:function(data){
			errorCallback(data)
		}
	});
}

