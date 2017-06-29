"use strict";
import {pagination} from "../dist/paginationEs6.js";
let data = [
'1、这是第1条数据',
'2、这是第2条数据',
'3、这是第3条数据',
'4、这是第4条数据',
'5、这是第5条数据',
'6、这是第6条数据',
'7、这是第7条数据',
'8、这是第8条数据',
'9、这是第9条数据',
'10、这是第10条数据',
'11、这是第11条数据',
'12、这是第12条数据',
'13、这是第13条数据',
'14、这是第14条数据',
'15、这是第15条数据',
'16、这是第16条数据',
'17、这是第17条数据',
'18、这是第18条数据',
'19、这是第19条数据',
'20、这是第20条数据',
'21、这是第21条数据',
'22、这是第22条数据',
'23、这是第23条数据',
'24、这是第24条数据',
'25、这是第25条数据',
'26、这是第26条数据',
'27、这是第27条数据',
'28、这是第28条数据',
'29、这是第29条数据',
'30、这是第30条数据'
]

function initUI(pageNo, pageSize) {
	var html = '';
	for(var i = (pageNo-1)*pageSize; i < pageNo*pageSize; i++) {
		var item = data[i];
		html += '<li class="list-item">'+item+'</li>';
	}
	document.getElementsByClassName('data-list')[0].innerHTML = html;
	pagination({
		cur: pageNo,
		total: 6,
		len: 5,
		targetId: 'pagination',
		callback: function(total) {
			var oPages = document.getElementsByClassName('page-index');
			for(var i = 0; i < oPages.length; i++) {
				oPages[i].onclick=function() {
					initUI(this.getAttribute('data-index'), 5);
				}
			}
			var goPage = document.getElementById('go-search');
			goPage.onclick = function() {
				var index = document.getElementById('yeshu').value;
				if(!index || (+index > total) || (+index < 1)) {
					return;
				}
				initUI(index, 5);
			}
		}
	});
}
initUI(1,5);
