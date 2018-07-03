
var token = sessionStorage["token"];

layui.use(['table', 'form'], function() {
	var table = layui.table;
	var form = layui.form;
	$ = layui.$;
	$(".add").live("click", function() {
		$(".bg").show();
		$(".model").show();
		//加载地区
		address();
	})
	$(".head span").click(function() {
		$(".model").hide();
		$(".bg").hide();
//		$("select[name='province']").empty();
//		$("select[name='city']").empty();
//  	$("select[name='area']").empty();
	})
	//更改省份
	form.on('select(province)', function(data){
	  console.log(data.value); //得到被选中的值
	  addressCity(data.value);
	 
	});  
	//更改城市
	form.on('select(city)', function(data){
	  console.log(data.value); //得到被选中的值
	  addressArea(data.value);
	}); 



//=======初始化省市区===========

	//===省===
	function address() {
		ajaxPost(
			Url.ADDRESS, {
				'token': token,
				'parentCode': '0000'
			},
			function(data) {
					console.log(data);
				$("select[name='city']").empty();
				$.each(data.result.areaInfos, function(i, d) {
					$("select[name='province']").append("<option value='" + i + "'>" + d + "</option>");
					form.render("select");
				});
				
				// 获取第一个省份的code  
				// 根据第一个省份code获取对应城市列表  
				var provCode = $("select[name='province']").val();
//				addressCity(provCode);
			},
		)
	}
	//===市区===
	function addressCity(prvCode) {
		console.log(prvCode)
		ajaxPost(
			Url.ADDRESS, {
				'token': token,
				'parentCode': prvCode
			},
			function(data) {
				console.log(data)
				$("select[name='city']").empty();
				$.each(data.result.areaInfos, function(i, d) {
					$("select[name='city']").append("<option value='" + i + "'>" + d + "</option>");
					form.render("select");
				})
	
				// 获取第一个城市的code  
				// 根据第一个城市code获取对应区县列表  
				var cityCode = $("select[name='city']").val();
//				addressArea(cityCode);
			},
		)
	}
	
	//===城区===
	function addressArea(cityCode) {
		ajaxPost(
			Url.ADDRESS, {
				'token': token,
				'parentCode': cityCode
			},
			function(data) {
				//console.log(data)
				$("select[name='area']").empty();
				$.each(data.result.areaInfos, function(i, d) {
					$("select[name='area']").append("<option value='" + i + "'>" + d + "</option>");
					form.render("select");
				})
			},
		)
	}






	//监听表格复选框选择
	table.on('checkbox(demo)', function(obj) {
		console.log(obj)
	});
	//监听工具条
	table.on('tool(demo)', function(obj) {
		var data = obj.data;
		if(obj.event === 'detail') {

			layer.msg('ID：' + data.id + ' 的查看操作');
		} else if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
				layer.close(index);
			});
		} else if(obj.event === 'edit') {
			layer.alert('编辑行vvvvvvv：<br>' + JSON.stringify(data))
		}
	});
	var $ = layui.$,
		active = {
			getCheckData: function() { //获取选中数据
				var checkStatus = table.checkStatus('idTest'),
					data = checkStatus.data;
				layer.alert(JSON.stringify(data));
			},
			getCheckLength: function() { //获取选中数目
				var checkStatus = table.checkStatus('idTest'),
					data = checkStatus.data;
				layer.msg('选中了：' + data.length + ' 个');
			},
			isAll: function() { //验证是否全选
				var checkStatus = table.checkStatus('idTest');
				layer.msg(checkStatus.isAll ? '全选' : '未全选')
			}
		};

	$('.demoTable .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});
layui.use('layer', function() { //独立版的layer无需执行这一句
	var $ = layui.jquery,
		layer = layui.layer; //独立版的layer无需执行这一句

});






