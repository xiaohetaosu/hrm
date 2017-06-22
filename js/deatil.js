//初始化页面，根据不同类型初始化不同类型
function initDeatil() {
	initPlayer(0);
	do_equal_width();
	$("#name_des").html(globalParmers.movieData.program.programName);
	if(globalParmers.movieData.program.movieType == "电视剧" ||globalParmers.movieData.program.movieType == "动漫"){
		console.log(globalParmers.movieData.program.movieList);
		
		document.getElementById("selection_1").style.display = "block";
		var moveieData = globalParmers.movieData.program.movieList;
		var selecDiv = document.getElementById('selection');
		for(var i=0;i<moveieData.length;i++){
			var newLi = document.createElement("li");
			newLi.setAttribute("id","select_"+i);
			newLi.setAttribute("class","selection");
			newLi.innerHTML = i+1;
			selecDiv.appendChild(newLi)
		}
		
	}else if(globalParmers.movieData.program.movieType == "电影"){
		document.getElementById("selection_1").style.display = "none";
	}else if(globalParmers.movieData.program.movieType == "综艺" ||globalParmers.movieData.program.movieType == "其他"){
		document.getElementById("selection_1").style.display = "block";
		var moveieData = globalParmers.movieData.program.movieList;
		var selecDiv = document.getElementById('selection');
		var newTab = document.createElement("table");
		newTab.setAttribute("class","table-responsive");
		newTab.setAttribute("id","esTable")
		selecDiv.appendChild(newTab);
		var newThread = document.createElement("thead");
		newThread.setAttribute("id","esThread");
		document.getElementById("esTable").appendChild(newThread);
		var headTr = document.createElement("tr");
		headTr.setAttribute("id","headTr");
		document.getElementById("esThread").appendChild(headTr);
		var newTbody = document.createElement("tbody");
		newTbody.setAttribute("id","tbody");
		document.getElementById("esTable").appendChild(newTbody);
		var newTr = document.createElement("tr");
		newTr.setAttribute("id","newTr");
		document.getElementById("tbody").appendChild(newTr)
		for(var i= 0 ;i<moveieData.length;i++){
			var newTh=document.createElement('th');
			newTh.setAttribute("id","th"+i);
			if(globalParmers.movieData.program.movieType == "其他"){
				newTh.innerHTML = moveieData[i].movieName;
			}else{
				newTh.innerHTML = moveieData[i].episode;
			}
			document.getElementById("headTr").appendChild(newTh);
			var newTh=document.createElement('td');
			newTh.setAttribute("id","td"+i);
			if(globalParmers.movieData.program.movieType == "其他"){
//				newTh.innerHTML = moveieData[i].movieDesc;
				
			}else{
				newTh.innerHTML = moveieData[i].movieName;
				document.getElementById("newTr").appendChild(newTh);
			}
//			newTh.innerHTML = moveieData[i].movieName;
			
		}
	}
	if(globalParmers.movieData != "" && globalParmers.movieData != null) {
		var moveieData = globalParmers.movieData.program.movieList[0];
		document.getElementById("movieName").innerHTML = globalParmers.movieData.program.programName;
		if(moveieData.director == null){
		document.getElementById("director").innerHTML ="";
		}else{
		document.getElementById("director").innerHTML = "导演:" + moveieData.director;
		}
		if( moveieData.role == null){
		document.getElementById("role").innerHTML=""
		}else{
		document.getElementById("role").innerHTML = "主演:" + moveieData.role;
		}
		document.getElementById("moviePic").src = PICURL+globalParmers.movieData.program.programPicUrl
		document.getElementById("movieDesc").innerHTML = "影片介绍:" + globalParmers.movieData.program.programDesc;
		document.getElementById("years").innerHTML = "上映时间:" + globalParmers.movieData.program.years;
	}
	if(globalParmers.movieData.associateProgramList!= "" && globalParmers.movieData.associateProgramList != null){
		var assData = globalParmers.movieData.associateProgramList;
		for(var i =0;i<globalParmers.movieData.associateProgramList.length;i++){
			document.getElementById("recPic"+i).parentElement.parentElement.id=assData[i].pid;
			document.getElementById("recPic"+i).src =PICURL+ assData[i].programPicUrl;
			document.getElementById("recName"+i).innerHTML = assData[i].programName;
			document.getElementById("recDer"+i).innerHTML = "导演:"+ assData[i].director;
			document.getElementById("recRole"+i).innerHTML = "主演:"+assData[i].role;
			document.getElementById("recCla"+i).innerHTML = "类型:"+assData[i].movieClass;
			document.getElementById("recYear"+i).innerHTML ="上映日期:"+assData[i].years;
		}
	}
	
	
}
//跳转播放页及相关数据的使用与销毁；暂用事件委托，后期进行优化处理
//$("#movie").live('click',function(){
//	var moveieData = globalParmers.movieData.program.movieList;
////	if(globalParmers.movieData.program.movieType == "电影"){
////		alert(moveieData[0].guid);
//		var guid = "http://118.122.88.230:1220" + moveieData[0].guid.slice(25,moveieData[0].guid.length);
//		// window.open("vodPlay2.html?"+guid)
//		window.location.href = "vodPlay2.html?"+guid;
//	
//})
var do_equal_width = function() {
		$('.eq_width_wrapper').each(function(index, ele){
			console.log("do_equal_width: ", $(this));
			var h = $(this).find('.eq_width_src').height();
			$(this).find('.eq_width_dest').each(function(index, ele){
				$(this).height(h);
			})
		})
	}
$("li").live('click',function(){
	console.log(this.parentElement.id)
	if(this.parentElement.id == "selection"){
		var id = this.id;
		var len =id.length;
		var count = parseInt(id.slice(len - len%7,len)) ;
		initPlayer(count);
	}
	
});
$(".details").live('click',function(){
	var conDiv = document.getElementById("movie").style.display;
	if(conDiv == "none"){
		document.getElementById("des_img").style.transform ="rotate(180deg)"
		document.getElementById("movie").style.display="block";
		do_equal_width();
	}else{
		document.getElementById("des_img").style.transform ="none"
		document.getElementById("movie").style.display="none"
	}
});
//
//$("td").live('click',function(){
//	console.log(this.parentElement.id)
//	if(this.parentElement.id == "newTr"){
//		var id = this.id;
//		var len =id.length;
//		var count = parseInt(id.slice(len - len%2,len)) ;
//		var moveieData = globalParmers.movieData.program.movieList;
//		var  guid = "http://118.122.88.230:1220" + moveieData[count].guid.slice(25,moveieData[0].guid.length);
//		// window.location = "vodPlay2.html?"+guid;
//		window.location.href = "vodPlay2.html?"+guid;
//	}
//});
//$("th").live('click',function(){
//	console.log(this.parentElement.id)
//	if(this.parentElement.id == "headTr"){
//		var id = this.id;
//		var len =id.length;
//		var count = parseInt(id.slice(len - len%2,len)) ;
//		var moveieData = globalParmers.movieData.program.movieList;
//		var  guid = "http://118.122.88.230:1220" + moveieData[count].guid.slice(25,moveieData[0].guid.length);
//		// window.location = "vodPlay2.html?"+guid;
//		window.location.href = "vodPlay2.html?"+guid;
//	}
//});

function test(_id){
	window.location = "vodDetail2.html?" + _id;
	console.log(_id)
}
