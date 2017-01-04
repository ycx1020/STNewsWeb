$(function(){
	navInit();
	pageControl();
	backTop();
});

function navInit(){
	/*导航栏二级菜单*/
	$(".nav").mouseover(function(){
		$(this).children("ul").show();
		$('#focus').css("z-index","-1");
	})
	$(".nav").mouseout(function(){
		$(this).children("ul").hide();
		$('#focus').css("z-index","0");
	})
	/*播放视频*/
	$('.zoom_video').fancyZoom();
}


function pageControl(){
	$("#vedioBox li:gt(8)").hide(); 	//初始化，前面4条数据显示，其他的数据隐藏。
	var news_list = $('#vedioBox li'),
		page_box = $('.page_box'),
		total_q = news_list.length, //总数据
		current_page = 9, //每页显示的数据
		current_num = 1, //当前页数
		total_page = Math.ceil(total_q/current_page),
		arr ={};
	
	//初始化页码个数
	page_box.append("<a href='#' class='prev'>上一页</a>");
	for(var x=1;x<=total_page;x++)
		page_box.append("<a href='#'>"+x+"</a>");
	page_box.append("<a href='#' class='next'>下一页</a>");
	
	var prev = $('.prev'),
		next =$(".next");
	
	arr[1] = $(".page_box a:first").next();
	for(var x=2;x<=total_page;x++){
		arr[x] = arr[x-1].next();}
	arr[current_num].css({"background":"#5b95d3","cursor":"default"});//初始化页码1的样式
	prev.css({"background":"#AAAAAA","cursor":"default"});//初始化上一页的样式

	//上一页
	prev.click(function () {
		if (current_num == 1) {
			return false;
		}else {
			current_num--;
			$.each(news_list, function (index, item) {
				var start = current_page * (current_num - 1); //起始范围
				var end = current_page * current_num; //结束范围
				if (index >= start && index < end)//如果索引值是在start和end之间的元素就显示，否则就隐
					$(this).show();
				else 
					$(this).hide();
			});
		}
		 pageChange();
	})
	prev.mouseover(function(){
		if(current_num !=1)	$(this).css("background","#5b95d3");
	})
	prev.mouseout(function(){
		if(current_num !=1)	$(this).css("background","#707070");
	})
	
	
	
	//下一页
	next.click(function () {
		if (current_num == total_page) {
			return false;
		}
		else {
			current_num++;
			$.each(news_list, function (index, item) {
				var start = current_page * (current_num - 1); //起始范围
				var end = current_page * current_num; //结束范围
				if (index >= start && index < end)//如果索引值是在start和end之间的元素就显示，否则就隐
					$(this).show();
				else
					$(this).hide();
			});
		}
		 pageChange();
	});
	next.mouseover(function(){
		if(current_num !=total_page)	$(this).css("background","#5b95d3");
	})
	next.mouseout(function(){
		if(current_num !=total_page)	$(this).css("background","#707070");
	})
	

	
	$.each(arr,function(key,val) {
		val.click(function (){
			if( current_num == key){
				return false;
			}else{
				$.each(news_list, function (index, item) {
					var start = (key-1)*current_page; //起始范围
					var end = key*current_page; //结束范围
					if (index >= start && index < end)//如果索引值是在start和end之间的元素就显示，否则就隐藏
						$(this).show();
					else
						$(this).hide();
				})
				 current_num = key;
				 pageChange();
			}
		})
		val.mouseover(function(){
			$(this).css("background","#5b95d3");
		})
		val.mouseout(function(){
			if(current_num != key)	$(this).css("background","#707070");
		})
	}) 

	function pageChange(){
		for(i=1;i<=total_page;i++){
			if(i == current_num)
				arr[i].css({"background":"#5b95d3","cursor":"default"});
			else 
				arr[i].css({"background":"#707070","cursor":"pointer"});
			if(current_num == 1)
				prev.css({"background":"#AAAAAA","cursor":"default"});
			else
				prev.css({"background":"#707070","cursor":"pointer"});
			if(current_num == total_page)
				next.css({"background":"#AAAAAA","cursor":"default"});
			else
				next.css({"background":"#707070","cursor":"pointer"});
		}
	}
}
function backTop(){
	var obtn = document.getElementById('topBtn');
	var timer = null;
	var isTop = true;
	
	//获取滚轮事件
	window.onscroll = function(){
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		//解决回到顶部的过程中触发滚轮事件
		if( !isTop){
			clearInterval(timer);
		}
		isTop = false;
		//控制按钮的显示与隐藏
		if( osTop > 0 ){
			obtn.style.display = 'block';
		}else{
			obtn.style.display = 'none';
		}
		
	}
	
	//点击按钮
	obtn.onclick = function(){
		//设置定时器
		timer = setInterval(function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var ispeed = (-osTop/6);
			document.documentElement.scrollTop = document.body.scrollTop = osTop+ispeed;
			isTop = true;
			if( osTop == 0){
				clearInterval(timer);	
			}
			
			},30);
	}	
}