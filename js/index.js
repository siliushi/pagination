"use strict";

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
