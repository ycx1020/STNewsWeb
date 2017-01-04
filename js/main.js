$(function(){
	navInit();
	pageControl();
	$.focus("#focus");
	backTop();
});

function navInit(){
	$(".nav").mouseover(function(){
		$(this).children("ul").show();
		$('#focus').css("z-index","-1");
	})
	$(".nav").mouseout(function(){
		$(this).children("ul").hide();
		$('#focus').css("z-index","0");
	})
}

jQuery.focus = function(slid) {
		var sWidth = $(slid).width(); //获取焦点图的宽度（显示面积）
		var len = $(slid).find("ul li").length; //获取焦点图个数
		var index = 0;
		var picTimer;
		
		//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
		var btn = "<div class='btnBg'></div><div class='btn'>";
		for(var i=0; i < len; i++) {
			var ii = i+1;
			btn += "<span></span>";
		}
		btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
		$(slid).append(btn);
		$(slid).find("div.btnBg").css("opacity",0.5);
	
		//为小按钮添加鼠标滑入事件，以显示相应的内容
		$(slid+" div.btn span").css("opacity",0.4).mouseenter(function() {
			index = $(slid+" .btn span").index(this);
			showPics(index);
		}).eq(0).trigger("mouseenter");
	
		//上一页、下一页按钮透明度处理
		$(slid+" .preNext").css("opacity",0.05).hover(function() {
			$(this).stop(true,false).animate({"opacity":"0.5"},300);
		},function() {
			$(this).stop(true,false).animate({"opacity":"0.05"},300);
		});
	
		//上一页按钮
		$(slid+" .pre").click(function() {
			index -= 1;
			if(index == -1) {index = len - 1;}
			showPics(index);
		});
	
		//下一页按钮
		$(slid+" .next").click(function() {
			index += 1;
			if(index == len) {index = 0;}
			showPics(index);
		});
	
		//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
		$(slid+" ul").css("width",sWidth * (len));
		
		//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
		$(slid).hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				showPics(index);
				index++;
				if(index == len) {index = 0;}
			},4000); //此4000代表自动播放的间隔，单位：毫秒
		}).trigger("mouseleave");
		
		//显示图片函数，根据接收的index值显示相应的内容
		function showPics(index) { //普通切换
			var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
			$(slid+" ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
			$(slid+" .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
			$(slid+" .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
		}
	
};


function pageControl(){
	$("#news ul li:gt(3)").hide(); 	//初始化，前面4条数据显示，其他的数据隐藏。
	var news_list = $('#news ul li'),
		page_box = $('.page_box'),
		total_q = news_list.length, //总数据
		current_page = 4, //每页显示的数据
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