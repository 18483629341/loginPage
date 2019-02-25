//前端验证
let postObj = {
	user: "",
	password: "",
	isSave: true
}

$(function () {
	autoFit();
})
window.onresize = function () {
	autoFit();
}
$('body').on('click', '.login', function () {
	var flag = valid();
	if (flag) { //如果flag为true，则发送信息
		console.log('验证通过', postObj);
		// $.post('url',{info:postObj},function(data){//！！！！！这里需要后台添加
		//})
	}
})

function valid() { //格式验证，以及获取输入框信息

	/*   获取输入框信息   */
	let user = trim($('input[name="userName"]').val()) || null;
	let password = trim($('input[name="password"]').val()) || null;
	let isSave = $('.checkBox').hasClass('active');
	let userFlag = true; //表示用户名的前端验证是否通过
	let passFlag = true; //表示密码的前端验证是否通过
	console.log('是否为邮箱：' + isEmail(user), '是否为电话号码：' + isPhone(user));
	/*   前端验证用户名   */
	if (!user) {
		$('.user').addClass('error');
		$('.user').siblings('.helpBolck').addClass('error');
		$('.user').siblings('.helpBolck').html('输入的手机号码/邮箱不能为空哦！');
		userFlag = false;
	} else if (!isEmail(user) && !isPhone(user)) { //当两个验证都没有通过时，报错；
		$('.user').addClass('error');
		$('.user').siblings('.helpBolck').addClass('error');
		$('.user').siblings('.helpBolck').html('请输入正确的手机号码/邮箱！');
		userFlag = false;
	} else {
		$('.user').removeClass('error');
		$('.user').siblings('.helpBolck').removeClass('error');
		userFlag = true;
		postObj.user = user;
	}

	/*   前端验证密码   */
	if (!password) {
		$('.password').addClass('error');
		$('.password').siblings('.helpBolck').addClass('error');
		$('.password').siblings('.helpBolck').html('输入的密码不能为空哦！');
		passFlag = false;
	} else {
		$('.password').removeClass('error');
		$('.password').siblings('.helpBolck').removeClass('error');
		passFlag = true;
		postObj.password = password;
	}
	postObj.isSave = isSave;
	console.log(userFlag, passFlag);
	return (userFlag && passFlag);
}
$('body').on('click', '.checkBox', function () {
	$(this).toggleClass('active');
})
$('body').on('focus', 'input', function () {
	$(this).removeClass('error');
	$(this).parent('.inputP').siblings('.helpBolck').removeClass('error');
})
/** 去除首尾的空格 **/
function trim(str) {
	return str.replace(/^[' '||' ']*/i, '').replace(/[' '||'  ']$/i, ''); //去除首尾的空格
}
/** 判断是否为邮箱地址 **/

function isEmail(emailStr) {
	var reg = /^[a-zA-Z0-9]+([._-]*[a-zA-Z0-9]*)*@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,5}$/;
	return reg.test(emailStr);
}
//isEmail('714402934@qq.com')

/** 判断是否为手机 **/

function isPhone(phone) {
	var reg = /^1\d{10}$/;
	return reg.test(phone);
}
//isPhone(18483629341);
var swidth = null;
var W = null;
//header部分里面的所有元素的宽高全自适应方法

function autoFit() {
	swidth = $(window).width();
	if (swidth > 1366 || swidth === 1366) {
		resize();
	}
}
//resize();
//整屏等比缩放


function resize() {
	var winratio = $(window).width() / 1920;
	var height = $(window).height();
	//height>parseInt(winratio*1080)?height:
	$('.header').css({
		transform: "scale(" + winratio + ")",
		transformOrigin: "center top"
	});

	$('.login_content').css({
	  transform: "scale("+winratio+")",
	  transformOrigin: "left middle"
	});
	$('.themeBox').css({
		transform: "scale("+winratio+")",
		transformOrigin: "center middle"
	  });
	//$(window).height();
}