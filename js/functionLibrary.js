//生成范围内随机数
function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
//产生随机数:	start:开始	end:结束		length：长度
function randomNumber(start,end,length){
	var balls = new Array();
	if (length > end - start +1) {
		alert("参数有误");
	}else{
		var size = end - start + 1;
		var allBalls = new Array(size);
		for (var i = 0; i < allBalls.length; i++) {
			allBalls[i] = i + start;
		}
		while(balls.length < length){
			var m = Math.floor(Math.random()*size);
			if(allBalls[m]!= 0){
				if (allBalls[m] < 10) {
					balls[balls.length] = "0"+allBalls[m];
				}else{
					balls[balls.length] = allBalls[m];
				}
				allBalls[m] = 0;
			}
		}
		balls.sort();	
		return balls;	
	}
}

//用$代替document.getElementById():
function $(id){
	return document.getElementById(id);
}
//用$$代替document.getElementsByName():
function $$(name){
	return document.getElementsByName(name);
}
//数组排序:	var 数列 = 数列.sort(sortNumber);
function sortNumber(a,b)
{
return a - b;
}
//合并字符串:  arr:字符串	joinOperator:合并的符号	var 数列 = joinArray2String(arr,joinOperator);
function joinArray2String(arr,joinOperator){
	var ns = arr[0];
	for (var i = 1; i < arr.length; i++) {
	ns += joinOperator + arr[i] ;
	}
		return ns;
}
//计数器	arr:数列		element:计的数字
function myCounter(arr,element){
	var count = 0;
	var indexes = new Array();
	var values = new Array();
	for (var i = arr.length-1; i >= 0; i--) {
		if(arr[i] > element){
			indexes[count] = i;
			values[count] = arr[i];
			count++;
		}
	}
	return count;
}
//冒泡排序		array:数列	sort:ture/false		新数列 = sortArray(旧数列,ture/false);
function sortArray(array,sort){
	for (var i = 0; i < array.length - 1; i++) {
		for (var j = 0; j < array.length - 1 - i; j++) {
			
			if(sort){
				if (array[j] < array[j+1]) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
				}
			}else{
				if (array[j] > array[j+1]) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
				}
			}
		}
			
	}
	return array;
}
//替换字符串		str旧字符串	oldStr:需要替换的字符		newSt:替换的字符
function replaceAll(str,oldStr,newStr){
	var s = str.split(oldStr);
	var dest = "";
	for (var i = 0; i < s.length; i++) {
		dest += s[i] + newStr;
	}
	return dest.substr(0,dest.length-newStr.length);
}
//从数组中删除指定值函数
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
//倒计时函数
function leftTimer(year,month,day,hour,minute,second){
	 var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数 
	 var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
	 var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
	 var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
	 var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
	 days = checkTime(days); 
	 hours = checkTime(hours); 
	 minutes = checkTime(minutes); 
	 seconds = checkTime(seconds); 
	 setInterval("leftTimer(2016,11,11,11,11,11)",1000); 
	 $("timer").innerHTML = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒"; 
}
function checkTime(val){ //将0-9的数字前面加上0，例1变为01 
 if(val<10) 
 { 
  val = "0" + val; 
 } 
 return val; 
}
/**
 * 
 * @desc 随机生成颜色
 * @return {String} 
 */
function randomColor() { 
	return'#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
/**
 * 
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean} 
 */
function isEmail(str) {
    return/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}
/**
 * 
 * @desc  判断是否为身份证号
 * @param  {String|Number} str 
 * @return {Boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}
/**
 * 
 * @desc   判断是否为手机号
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}
/**
 * 
 * @desc   判断是否为URL地址
 * @param  {String} str 
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}