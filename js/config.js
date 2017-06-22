var host = "http://27.221.10.82:7070";
var host_82 = "http://27.221.10.82:8777"
var host_230 = "http://118.122.88.230:7070/"
var PICURL = host + "/poster/gitv/";
var PICURL_TV = host + "/poster/live/channel_logo3.0_gitv/"
//关键词搜索接口例子
//http://118.122.88.230:7070/api/vod/search/programs.json?keyword=%E8%8A%B1%E5%8D%83%E9%AA%A8&startIndex=0&maxResults=20&platform=android
var globalParmers = {
	menuList: null,
	listData: null,
	currentPage: 1,
	pageSize: 12,
	lastCid: null,
	status: false,
	homePageData: null,
	menuId: null,
	pid: null,
	movieData: null,
	promotion: null,
	phoneType: null,
	lastListData: null,
	searchData: null,
	lastPos: 0,
}

function getUrl(_url, _data, _type, _more) {
	if(type = 1) {
		if(_url == ajaxUrl.movieDeatil) {
			console.log(globalParmers.pid)
		}
		var  queryTruckAjax; 
		if(queryTruckAjax) {            
			queryTruckAjax.abort();        
		}
		queryTruckAjax = $.ajax({
			type: "get",
			url: _url,
			data: _data,
			success: function(res) {
				console.log(res)
				if(_url == ajaxUrl.menuListUrl) {
					if(res != "" && res != null) {
						globalParmers.menuList = res.menus;
						initMenu();
					}
				} else if(_url == ajaxUrl.getListData) {
					if(_more == 1) {
						clearData();
					}
					if(res != "" && res != null) {

						globalParmers.listData = res.movieInfoProxy.programs;
						console.log(globalParmers.listData);

						initList();
					}
				} else if(_url == ajaxUrl.homePage) {
					globalParmers.homePageData = res.programList;
					console.log(globalParmers.homePageData)
				} else if(_more == 1) {
					globalParmers.movieData = res;
//					document.getElementById("moviePic").src = PICURL + globalParmers.movieData.program.programPicUrl;
					initDeatil()
				} else if(_url == ajaxUrl.promotion) {
					globalParmers.promotion = res.promotionList;
					initPromotion();
				} else if(_url == ajaxUrl.search) {
					globalParmers.searchData = res.programList;
					initSearch();
				}
			},
			error: function(res) {
				//			alert(res)
			}
		})
	}

};

function initPromotion() {

}

function inithomePage(_type) {
	if(_type != 1) {
		return
	}
	$.ajax({
		type: "get",
		data: "",
		url: ajaxUrl.homePage,
		success: function(data) {

			globalParmers.homePageData = data.programList;
			newArr = [],
				n = 0;
			for(var i = 0; i < globalParmers.homePageData.length; i++) {
				if(globalParmers.homePageData[i].type == "live") {
					newArr.push(globalParmers.homePageData.slice(n, globalParmers.homePageData.length));
					globalParmers.homePageData = newArr;
					console.log(globalParmers.homePageData)
					initHomeData();
					return
				}
				if(globalParmers.homePageData[i].cateId != globalParmers.homePageData[i + 1].cateId) {
					newArr.push(globalParmers.homePageData.slice(n, i + 1))
					n = i + 1;
				}
			}

		},
		complete: function(data) {
			//			console.log(data)
		}
	})
}

function initHomeData() {
	var promotionData = {
		position: "homeTop"
	};
	getUrl(ajaxUrl.promotion, promotionData, 1, 2);
	console.log(globalParmers.promotion)
	var conDiv = document.getElementById("conten");
	for(var i = 0; i < globalParmers.homePageData.length; i++) {
		if(i == globalParmers.homePageData.length-1){
			return
		}
		var newDiv = document.createElement("div");
		newDiv.setAttribute("class", "content");
		newDiv.setAttribute("id", "divContent_" + i);
		conDiv.appendChild(newDiv);
		var contentDiv = document.getElementById("divContent_" + i);
		var divTit = document.createElement("div");
		divTit.setAttribute("class", "title");
		divTit.setAttribute("id", "divtit_" + i);
		contentDiv.appendChild(divTit);
		var titDiv = document.getElementById("divtit_" + i);
		
		var tit = document.createElement("h3");
		tit.setAttribute("id", "title_" + i);
		var recData = globalParmers.homePageData[i];
		tit.innerHTML = recData[0].cateName;
		titDiv.appendChild(tit)
		for(var j = 0; j < recData.length; j++) {
		if(recData[j].type == "live") {
				return
				}
			var newArticle = document.createElement("article");
			newArticle.setAttribute("class", "excerpt");
			newArticle.setAttribute("id", recData[j].pid);
			contentDiv.appendChild(newArticle);
			var newP = document.createElement("p");
			newP.setAttribute("class", "image-container");
			newP.setAttribute("id", "p" + i + "cla" + j);
			document.getElementById(recData[j].pid).appendChild(newP);
			var newImg = document.createElement("img");
			newImg.setAttribute("class", "thumb");
			newImg.setAttribute("id", "img" + i + "cla" + j);
			if(recData[j].type == "live") {
				return
				newImg.setAttribute("src", PICURL_TV + recData[j].programPicUrl);
			} else {
				newImg.setAttribute("src", PICURL + recData[j].programPicUrl);
			}
			document.getElementById("p" + i + "cla" + j).appendChild(newImg);
			var newHeader = document.createElement("header");
			newHeader.setAttribute("id", "header" + i + "cla" + j);
			document.getElementById(recData[j].pid).appendChild(newHeader);
			var newH = document.createElement("h2");
			newH.setAttribute("title", recData[j].programName)
			newH.innerHTML = recData[j].programName;
			newH.style.textAlign = "center"
			document.getElementById("header" + i + "cla" + j).appendChild(newH);
		}
	}
	globalParmers.menuId = 001
}

function clearData() {
	var conDiv = document.getElementById("conten");
	while(conDiv.hasChildNodes()) {
		conDiv.removeChild(conDiv.firstChild);
	}
}

function initMenu() {
	//	try {
	//		var parDiv = document.getElementById("menuList");
	//		for(var i = 0; i < globalParmers.menuList.length; i++) {
	//			if(globalParmers.menuList[i].title != "欧洲杯" && globalParmers.menuList[i].title != "极清影院"){
	//				var newDiv = document.createElement("li");
	//				newDiv.setAttribute("id", "itemdiv" + i);
	//				newDiv.setAttribute("class", "selection");
	//				newDiv.innerHTML = globalParmers.menuList[i].title ;
	//				newDiv.style.paddingTop = "3px";
	//				parDiv.appendChild(newDiv);
	//			}
	//			
	//		}
	//	} catch(e) {
	//		alert(e)
	//	}
	initActive();

}

function initList() {
	var conDiv = document.getElementById("conten");
	var countNum = (globalParmers.currentPage - 1) * globalParmers.pageSize
	for(var i = 0; i < globalParmers.listData.length; i++) {
		var newArticle = document.createElement("article");
		newArticle.setAttribute("class", "excerpt");
		newArticle.setAttribute("id",  globalParmers.listData[i].pid);
		conDiv.appendChild(newArticle);
		var newP = document.createElement("p");
		newP.setAttribute("class", "image-container");
		newP.setAttribute("id", "p" + globalParmers.listData[i].pid);
		document.getElementById( globalParmers.listData[i].pid).appendChild(newP);
		var newImg = document.createElement("img");
		newImg.setAttribute("class", "thumb");
		newImg.setAttribute("id", "img" + globalParmers.listData[i].pid);
		newImg.setAttribute("src", PICURL + globalParmers.listData[i].picurl);
		document.getElementById("p" + globalParmers.listData[i].pid).appendChild(newImg);
		var newHeader = document.createElement("header");
		newHeader.setAttribute("id", "header" + globalParmers.listData[i].pid);
		document.getElementById(globalParmers.listData[i].pid).appendChild(newHeader);
		var newH = document.createElement("h2");
		newH.setAttribute("title", globalParmers.listData[i].programname)
		newH.innerHTML = globalParmers.listData[i].programname;
		newH.style.textAlign = "center"
		document.getElementById("header" + globalParmers.listData[i].pid).appendChild(newH)

	}
}

function toggle() {
	var dis = document.getElementById("d1").style.display;
	if(dis == "none") {
		document.getElementById("d1").style.display = "block"
	} else {
		document.getElementById("d1").style.display = "none"
	}
}
$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	if(scrollTop >100){
		document.getElementById("d1").style.display = "none";
		document.getElementById("toTop").style.display = "block";
	}else{
		document.getElementById("toTop").style.display = "none";
	}　
	var scrollHeight = $(document).height();　　
	var windowHeight = $(this).height();　　
	
	if($(document).height() - $(this).scrollTop() - $(this).height() < 100) {
		if(globalParmers.status == false) {
			if(globalParmers.menuId == 001) {
				return
			}
			globalParmers.status = true;
			globalParmers.currentPage += 1;
			var listData = {
				cid: globalParmers.lastCid,
				pageSize: 12,
				currentPage: globalParmers.currentPage
			};　　　　
			getUrl(ajaxUrl.getListData, listData, 1);
			setTimeout(function() {
				globalParmers.status = false;
			}, 2000)
		}

		　　
	}
});
//初始化页面行为
function siblings(elm) {

	var a = [];

	var p = elm.parentNode.children;

	for(var i = 0, pl = p.length; i < pl; i++) {

		if(p[i] !== elm) a.push(p[i]);

	}

	return a;

}

function initActive() {
	$("#toTop").live("click",function(e){
		window.scrollTo(0,0);
	})
	$("#swiper-wrapper").on('click', function() {
		console.log(this.parentId)
		var liId = this.id;
		globalParmers.listData = null;
		if(this.id == "first") {

			clearData();
			inithomePage(1);
			return;
		}

		var d = siblings(document.getElementById(this.id))
		for(var i = 0; i < d.length; i++) {
			d[i].style.borderBottom = "";
			d[i].style.color = ""
		}
		//	var test =  parseInt(liId.substr(liId.length-1,1));
		if(parseInt(liId.substr(liId.length - 2, 2)) == 10) {
			test = parseInt(liId.substr(liId.length - 2, 2));
		} else {
			test = parseInt(liId.substr(liId.length - 1, 1));
		}
		clearData();
		initPage(test);
	});
	$("article").live('click', function() {
		if(globalParmers.menuId == 1) {
			var id = this.id;
			var a = parseInt(id.slice(7, 8));
			var b = parseInt(id.slice(11, 12));
			globalParmers.pid = globalParmers.homePageData[a][b].pid;
			gotoDeatil(globalParmers.pid)
		} else {
			var id = this.id;
			
			gotoDeatil(id)
		}
	})
	var u = navigator.userAgent;
	if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
		//alert("安卓手机");
		globalParmers.phoneType = "android";
	} else if(u.indexOf('iPhone') > -1) { //苹果手机
		//alert("苹果手机")
		globalParmers.phoneType = "iphone";
	} else if(u.indexOf('Windows Phone') > -1) { //winphone手机
		//alert("winphone手机");
		globalParmers.phoneType = "windowsPhone"
	}
}

function initPage(_id) {
	//	clearData();
	conDiv = document.getElementById("conten");
	globalParmers.menuId = _id
	var listData = {
		cid: _id,
		pageSize: 12,
		currentPage: 1
	};
	globalParmers.currentPage = 1;
	globalParmers.lastCid = _id;
	getUrl(ajaxUrl.getListData, listData, 1, 1)
}

function gotoDeatil(_pid) {

	window.location = "vodDetail2.html?" + _pid;

}

function getDeatil() {
	globalParmers.pid = location.search.split("?")[1];
	var url = ajaxUrl.movieDeatil + globalParmers.pid + ".json?count=5&platform=android"
	getUrl(url, 1, 1, 1);

}

var ajaxUrl = {
	menuListUrl: host + "/vodEPG/jsonp/GetMenuDataAction.action",
	getListData: host + "/vodEPG/jsonp/SearchProgramByMovieClassify.action",
	homePage: host_82 + "/api/recommendations.json",
	movieDeatil: host_82 + "/api/vod/programs/",
	promotion: host + "/vodEPG/jsonp/promotionAction.action",
	search: host_82 + "/api/vod/search/programs.json?"
}
$(document).keydown(function(event) {
	//alert(event.keyCode);
	//判断当event.keyCode 为37时（即左方面键），执行函数to_left();
	//判断当event.keyCode 为39时（即右方面键），执行函数to_right();
	if(event.keyCode == 13) {
		var val = document.getElementById("searchVal").value;
		gotoSearch(val)
	}
});

function gotoSearch(_key) {
	if(_key == null || _key == "") {
		var _key = document.getElementById("searchVal").value;
	}
	window.location = "search.html?" + _key;
}