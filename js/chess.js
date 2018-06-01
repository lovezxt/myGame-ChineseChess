var chessOriginalPosition = [0,1,2,3,4,5,6,7,8,19,25,27,29,31,33,35,54,56,58,60,62,64,70,81,82,83,84,85,86,87,88,89];//初始棋子位置
var chessPieceInImg = [21,19,18,17,16,17,18,19,21,20,20,22,22,22,22,22,6,6,6,6,6,4,4,5,3,2,1,0,1,2,3,5];//棋子背景坐标
var blackChess = [0,1,2,3,4,5,6,7,8,19,25,27,29,31,33,35];//所有红棋实时位置
var redChess = [54,56,58,60,62,64,70,81,82,83,84,85,86,87,88,89];//所有黑棋实时位置
var staging = "";//取子暂存
var posi = "";//取棋位置暂存
var moveLater = false;//是否可以落子
var redOrBlack = true;//true为红棋落子，flase为黑棋落子
var chessBoeder = false;//需不需要给棋子加边框
var legal = true;//落子吃己方不合法
var ToBeGeneral = false;//对将不合法
var eatMeLegal = false;//象棋规范各棋子合法
var eatMe = "";//判断落子不能吃己方
var redBoss = 85;//帅实时位置
var blackBoss = 4;//将实时位置
var win = true;//胜利控制所有子不能取
function chessChina(){
	var str = "";
	for (var i=0;i<90;i++) {
		str += '<div onclick="clickCheckerBorad(this.id)" id = "'+i+'"></div>'
	}
	$("biggridDiv").innerHTML = str;//生成90个小Div框
	for(var j=0;j<chessOriginalPosition.length;j++){
		$(chessOriginalPosition[j]).innerHTML = '<div onclick="takeTheChlid(this.id)" id = "'+chessOriginalPosition[j]+'chess"></div>';
	}//生成初始象棋棋子并将其添加id
	for (var k = 0; k < chessOriginalPosition.length; k++) {
		pawnBackground(k,chessOriginalPosition[k]);
	}//更改每一棋子的背景位置
}
//落子修改背景位置函数
function pawnBackground(k,loc){
	var across = 0;//横着控制背景坐标
	var verticel = 0;//竖着控制背景坐标
	across = chessPieceInImg[k]%8*-65;//横向背景位置算法
	verticel = Math.floor(chessPieceInImg[k]/8)*-65;//纵向背景位置算法
	$(loc+"chess").style.cssText = "background-position-x: "+across+"px; background-position-y: "+verticel+"px;";
}
//棋盘点击取子函数
function takeTheChlid(id){
	if(!moveLater){//判断可以落子
		staging = id;
		id = parseInt(staging);
		if(redOrBlack){//红方落子
			if(id>40 && win){//红色棋子才能走
				redOrBlack = !redOrBlack;//下次黑方落子
				chessBoeder = true;//给将要走的棋子加边框
				eatMe = "red";//红方落子不能吃红方棋
				setTimeout("whetherToMoveLater()",5);//延时消抖，5ms后可落子
			}
		}else{//黑方落子
			if(id<40 && win){//黑色棋子才能走
				redOrBlack = !redOrBlack;
				chessBoeder = true;
				eatMe = "black";
				setTimeout("whetherToMoveLater()",5);
			}
		}
	}
}
//棋盘点击下子函数
function clickCheckerBorad(locationnumber){
	if(moveLater){//有子可落
		staging = parseInt(staging);
		var lo = chessOriginalPosition.indexOf(staging);
		if(posi != locationnumber){//落下不是原来的位置
			moveLaterLegal(locationnumber);//落子合法函数
			if(legal && eatMeLegal && ToBeGeneral){//落子合法(吃己方;棋子规范;对将)
			$(locationnumber).innerHTML = '<div onclick="takeTheChlid(this.id)" id = "'+staging+'chess"></div>';//落子
			var delChess = parseInt(posi);//旧棋子位置
			if(redChess.indexOf(delChess) >= 0){
				removeByValue(redChess,delChess);//从红棋动态数组中删除掉旧棋子位置
				redChess[redChess.length] = parseInt(locationnumber);//从红棋动态数组中添加新棋子位置
				if(blackChess.indexOf(parseInt(locationnumber) != -1)){//判断是否吃掉了对方棋子
					removeByValue(blackChess,locationnumber);//从黑棋动态数组中删除掉新棋子位置
					}
					if(staging == 85){redBoss = locationnumber;}//实时记录帅的位置
					if(blackChess.indexOf(parseInt(blackBoss)) == -1){alert("红方胜利！");win = false;}
			}else{
				removeByValue(blackChess,delChess);//从黑棋动态数组中删除掉旧棋子位置
				blackChess[blackChess.length] = parseInt(locationnumber);//从黑棋动态数组中添加新棋子位置
					if(redChess.indexOf(parseInt(locationnumber) != -1)){
						removeByValue(redChess,locationnumber);//从红棋动态数组中删除掉新棋子位置
					}
					if(staging == 4){blackBoss = locationnumber;}//实时记录将的位置
					if(redChess.indexOf(parseInt(redBoss)) == -1){alert("黑方胜利！");win = false;}
				}
					$(posi).innerHTML = "";//清除旧棋
					pawnBackground(lo,staging);//重新定义背景位置
					moveLater = false;
					legal = true;
					eatMeLegal = false;
			}else{//落子不合法
					pawnBackground(lo,staging);
					redOrBlack = !redOrBlack;
					moveLater = false;
					legal = true;
					eatMeLegal = false;
					alert("落子不合法");
				}
		}else{//落下是原来的位置
			pawnBackground(lo,staging);
			redOrBlack = !redOrBlack;
			moveLater = false;
			}
	}else{//点击空白位置或点击棋子
		posi = locationnumber;
		if(staging.length > 5){
			if(chessBoeder){
				$(staging).style.cssText += "border: red solid 2px;";
				chessBoeder = false;
			}
		}
	}
}
//落子合法函数
function moveLaterLegal(locationnumber){
	if(staging == 85){//红方帅
	var locat = [66,67,68,75,76,77,84,85,86];
		if((locationnumber - blackBoss)%9 == 0){
			var haveFirst = false;
			var haveSecond = false;
			for (var i = 1; i < (locationnumber - blackBoss)/9; i++) {
				var h = parseInt(blackBoss)+ i*9
				if(blackChess.indexOf(h) != -1){
					haveFirst = true;
					break;
				}
				if(redChess.indexOf(h) != -1){
					haveSecond = true;
					break;
				}
			}
			if(haveFirst || haveSecond){
					for (var j = 0; j < locat.length; j++) {
					if(locationnumber == locat[j] && (Math.abs(posi-locationnumber) == 1 || Math.abs(posi-locationnumber) == 9)){
						eatMeLegal = true;
					}
				}
			}
		}else{
				for (var j = 0; j < locat.length; j++) {
				if(locationnumber == locat[j] && (Math.abs(posi-locationnumber) == 1 || Math.abs(posi-locationnumber) == 9)){
					eatMeLegal = true;
				}
			}
		}
	}else if(staging == 4){//黑方将
	var locat = [3,4,5,12,13,14,21,22,23];
		if((redBoss - locationnumber)%9 == 0){
			var haveFirst = false;
			var haveSecond = false;
			for (var i = 1; i < (redBoss - locationnumber)/9; i++) {
				var h = parseInt(locationnumber)+ i*9
				if(blackChess.indexOf(h) != -1){
					haveFirst = true;
					break;
				}
				if(redChess.indexOf(h) != -1){
					haveSecond = true;
					break;
				}
			}
			if(haveFirst || haveSecond){
			for (var j = 0; j < locat.length; j++) {
				if(locationnumber == locat[j] && (Math.abs(posi-locationnumber) == 1 || Math.abs(posi-locationnumber) == 9)){
					eatMeLegal = true;
					}
				}
			}
		}else{
			for (var j = 0; j < locat.length; j++) {
				if(locationnumber == locat[j] && (Math.abs(posi-locationnumber) == 1 || Math.abs(posi-locationnumber) == 9)){
					eatMeLegal = true;
					}
				}
			}
	}else if(staging == 84 || staging == 86){//红方双仕
		var locat = [66,68,76,84,86];
		for (var j = 0; j < locat.length; j++) {
			if(locationnumber == locat[j] && (posi == 76 || locationnumber == 76)){
				eatMeLegal = true;
			}
		}
	}else if(staging == 3 || staging == 5){//黑方双仕
	var locat = [3,5,13,21,23];
	for (var j = 0; j < locat.length; j++) {
		if(locationnumber == locat[j] && (posi == 13 || locationnumber == 13)){
			eatMeLegal = true;
			}
		}
	}else if(staging == 83 || staging == 87){//红方双象
		var locat = [47,51,63,67,71,83,87];
		for (var j = 0; j < locat.length; j++) {
			if(locationnumber == locat[j] && (Math.abs(posi-locationnumber) == 16 || Math.abs(posi-locationnumber) == 20)){
				eatMeLegal = true;
			}
		}
	}else if(staging == 2 || staging == 6){//黑方双象
		var locat = [2,6,18,22,26,38,42];
		for (var j = 0; j < locat.length; j++) {
			if(locationnumber == locat[j] && (Math.abs(posi-locationnumber) == 16 || Math.abs(posi-locationnumber) == 20)){
				eatMeLegal = true;
			}
		}
	}else if(staging == 1 || staging == 7 || staging == 82 || staging == 88){//双方马
		if(posi-locationnumber == 19 && blackChess.indexOf(parseInt(posi)-9) == -1 && redChess.indexOf(parseInt(posi)-9) == -1){
			eatMeLegal = true;
		}else if(posi-locationnumber == 17 && blackChess.indexOf(parseInt(posi)-9) == -1 && redChess.indexOf(parseInt(posi)-9) == -1){
			eatMeLegal = true;
		}else if(posi-locationnumber == 11 && blackChess.indexOf(parseInt(posi)-1) == -1 && redChess.indexOf(parseInt(posi)-1) == -1){
			eatMeLegal = true;
		}else if(posi-locationnumber == 7 && blackChess.indexOf(parseInt(posi)+1) == -1 && redChess.indexOf(parseInt(posi)+1) == -1){
			eatMeLegal = true;
		}else if(locationnumber-posi== 19 && blackChess.indexOf(parseInt(posi)+9) == -1 && redChess.indexOf(parseInt(posi)+9) == -1){
			eatMeLegal = true;
		}else if(locationnumber-posi== 17 && blackChess.indexOf(parseInt(posi)+9) == -1 && redChess.indexOf(parseInt(posi)+9) == -1){
			eatMeLegal = true;
		}else if(locationnumber-posi== 11 && blackChess.indexOf(parseInt(posi)+1) == -1 && redChess.indexOf(parseInt(posi)+1) == -1){
			eatMeLegal = true;
		}else if(locationnumber-posi== 7 && blackChess.indexOf(parseInt(posi)-1) == -1 && redChess.indexOf(parseInt(posi)-1) == -1){
			eatMeLegal = true;
		}
	}else if(staging == 0 || staging == 8 || staging == 81 || staging == 89){//双方車
		vehicleFun(1,locationnumber);
	}else if(staging == 19 || staging == 25){//黑方炮
		if(redChess.indexOf(parseInt(locationnumber)) == -1){
			vehicleFun(1,locationnumber);
		}else{
			vehicleFun(2,locationnumber);
		}
	}else if(staging == 64 || staging == 70){//红方炮
		if(blackChess.indexOf(parseInt(locationnumber)) == -1){
			vehicleFun(1,locationnumber);
		}else{
			vehicleFun(2,locationnumber);
		}
	}else if(staging == 54 || staging == 56 || staging == 58 || staging == 60 || staging == 62){//红方兵
		if(locationnumber < 45){
			if(Math.abs(locationnumber-posi) == 1 || posi-locationnumber == 9){
				eatMeLegal = true;
			}
		}else{
			if(posi-locationnumber == 9){
				eatMeLegal = true;
				}
			}
	}else if(staging == 27 || staging == 29 || staging == 31 || staging == 33 || staging == 35){//黑方卒
		if(locationnumber > 44){
			if(Math.abs(locationnumber-posi) == 1 || locationnumber-posi == 9){
				eatMeLegal = true;
			}
		}else{
			if(locationnumber-posi == 9){
				eatMeLegal = true;
				}
			}
	}
//判断是否吃己方棋子
	if(eatMe == "red"){
		for (var i = 0; i < redChess.length; i++) {
			if(parseInt(locationnumber) == redChess[i]){
				legal = false;//遍历数组，看数组中有没有己方棋
				break;
				}
			}
	}else{
		for (var i = 0; i < blackChess.length; i++) {
			if(parseInt(locationnumber) == blackChess[i]){
				legal = false;
				break;
			}
		}
	}
//判断是否对将
		if((redBoss - blackBoss)%9 == 0){
			var haveFirst = false;//帅与将之间有没有黑子
			var haveSecond = false;//帅与将之间有没有红子
			ToBeGeneral = false;//对将不合法
			var delChess = parseInt(posi);
			if(blackChess.indexOf(delChess) != -1){//判断走的棋子在不在黑子中
				if(Math.abs(locationnumber - delChess)%9 != 0){
				removeByValue(blackChess,delChess);//将走的棋子从数组中删除	
				}
				for (var i = 1; i < (redBoss - blackBoss)/9; i++) {//循环遍历帅将中间是否有子
					var h = parseInt(blackBoss)+ i*9
					if(blackChess.indexOf(h) != -1){
						haveFirst = true;
						break;
					}
					if(redChess.indexOf(h) != -1){
						haveSecond = true;
						break;
					}
				}
				if(Math.abs(locationnumber - delChess)%9 != 0){
				blackChess[blackChess.length] = delChess;//将走的棋子从数组中恢复
				}
			}else{
				if(Math.abs(locationnumber - delChess)%9 != 0){
				removeByValue(redChess,delChess);//走的棋子在红子中
				}
				for (var i = 1; i < (redBoss - blackBoss)/9; i++) {
					var h = parseInt(blackBoss)+ i*9
					if(blackChess.indexOf(h) != -1){
						haveFirst = true;
						break;
					}
					if(redChess.indexOf(h) != -1){
						haveSecond = true;
						break;
					}
				}
				if(Math.abs(locationnumber - delChess)%9 != 0){
				redChess[redChess.length] = delChess;
				}
			}
			if(haveFirst || haveSecond){//若帅将中间有子，则合法
				ToBeGeneral = true;
				}
		}else{
				ToBeGeneral = true;
		}
}
//是否可以落子
function whetherToMoveLater(){
	moveLater = true;
}
function vehicleFun(num,locationnumber){//車炮公用合法函数
	var aft = Math.abs(locationnumber - posi);
	var max = Math.max(locationnumber,posi);
		if(aft % 9 == 0){
			var arr = new Array;
			var j = 0;
			for (var i = 1; i < aft/9; i++) {
				if(blackChess.indexOf(max - i*9) == -1 && redChess.indexOf(max - i*9) == -1){
					arr[j] = i;
					j++;
				}
			}
			if(arr.length == aft/9-num){
				eatMeLegal = true;
			}
		}else if(aft < 9){
			var arr = new Array;
			var j = 0;
			for (var i = 1; i < aft; i++) {
				if(blackChess.indexOf(max - i) == -1 && redChess.indexOf(max - i) == -1){
					arr[j] = i;
					j++;
				}
			}
			if(arr.length == aft-num){
				eatMeLegal = true;
		}
	}
}
