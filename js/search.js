function initSearch(){
	if(globalParmers.searchData != "" && globalParmers.searchData != null){
	$("#warning").html("");
	$("button").removeAttr("disabled");
		var conDiv = document.getElementById("content");
	for(var i = 0; i < globalParmers.searchData.length; i++) {
		var newArticle = document.createElement("article");
		newArticle.setAttribute("class", "excerpt");
		newArticle.setAttribute("id", globalParmers.searchData[i].pid);
		conDiv.appendChild(newArticle);
		var newP = document.createElement("p");
		newP.setAttribute("class", "image-container");
		newP.setAttribute("id", "p" + globalParmers.searchData[i].pid);
		document.getElementById( globalParmers.searchData[i].pid).appendChild(newP);
		var newImg = document.createElement("img");
		newImg.setAttribute("class", "thumb");
		newImg.setAttribute("id", "img" + globalParmers.searchData[i].pid);
		newImg.setAttribute("src", PICURL + globalParmers.searchData[i].programPicUrl);
		document.getElementById("p" + globalParmers.searchData[i].pid).appendChild(newImg);
		var newHeader = document.createElement("header");
		newHeader.setAttribute("id", "header" + globalParmers.searchData[i].pid);
		document.getElementById(globalParmers.searchData[i].pid).appendChild(newHeader);
		var newH = document.createElement("h2");
		newH.setAttribute("title", globalParmers.searchData[i].programName)
		newH.innerHTML = globalParmers.searchData[i].programName;
		newH.style.textAlign = "center"
		document.getElementById("header" + globalParmers.searchData[i].pid).appendChild(newH)

	}
	
	}else{
		$("#warning").html("没有搜索到相关结果，请您搜搜别的试试吧!")
	}
}
function getKeyWord(){
	$("#warning").html("搜索中，请稍后。。");
	$("button").attr("disabled", true);
	var search = location.href.substring(location.href.indexOf("?") + 1);
	var keyword = decodeURI(search);
	var android ="android";
	var newData = {
		keyword : keyword,
		startIndex : 0,
		maxResults : 20,
		platform : android
	}
	 getUrl(ajaxUrl.search,newData,1);
	
}
function pushKeyWord(){
	var val = document.getElementById("searchVal").value;
	if(val == "" || val == null){
		$("#warning").html("请您输入内容~")
	}else{
		var conDiv = document.getElementById("content");
		$("article").remove();
		$("button").attr("disabled", true);
		$("#warning").html("搜索中，请稍后。。")
		var android ="android";
		var newData = {
		keyword : val,
		startIndex : 0,
		maxResults : 20,
		platform : android
	}
	 	getUrl(ajaxUrl.search,newData,1);
	}
	return false
}
(function(e){
 	$("article").live("click",function(){
 		gotoDeatil(this.id);
 	})
})()
