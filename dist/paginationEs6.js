/**
 * 分页函数
 * @date   2015-12-22
 * @param  {[Number]}   cur   当前页
 * @param  {[Number]}   total 总页数
 * @param  {[Number]}   len   显示多少页数
 * @param  {[String]}   targetId  分页选择器id
 * @param  {[Boolean]}   disabledTotal 是否禁用总页数，默认false
 * @param  {[Boolean]}   disabledIpt   是否禁用输入跳转页码功能，默认false
 * @param  {[Boolean]}   showStartPage   前多少页不折起，默认0
 * @return {[type]}         [description]
 */
export let pagination = ({
    cur = 1,
    total = 0,
    len = 0,
    targetId = '',
    disabledTotal = false,  // 是否禁用总页数，默认false
    disabledIpt = false,    // 是否禁用输入跳转功能，默认false
    showStartPage = 0,   // 显示开始的多少页，这几页会默认显示不隐藏，比如showStartPage=2,则会显示< 1，2……7,8,9 >这样的格式
    callback = null //回调函数
}) => {
    total = Number.parseInt(total, 10);
    if(!targetId || !total) {
        return '';
    }
    let tar = document.getElementById(targetId);
    if(!tar) {
        return '';
    }
    cur = Number.parseInt(cur, 10);
    len = Number.parseInt(len, 10);
    showStartPage = Number.parseInt(showStartPage,10);
    // 总数1页
    // cur 当前页，total总页数， len显示多少
    // 第一页，   1、总共不超过len条（下一页），2、超过5条（下一页  右more）
    // 中间       上一页/下一页         上一页/下一页  左右more
    // 最后一页   1、总数不超过5条（上一页），2、超过5条（上一页，左more）
    let html = `
        <ul class="pages">
            <li class="page">
    `;
    if (cur !== 1 && total !== 1) {
        // 上一页
        html += `
            <a href="javascript:void(0);" class="prev page-index" data-index="${cur - 1}">&lt;</a>
        `;
    }
    if (total > len && cur > Math.ceil(len / 2) && total !== 1 && !showStartPage) {
        // 左more
        html += `
            <span class="more">...</span>
        `;
    }
    if (total !== 1) {
        // 只有一页的情况不显示页码
        // len 5 total 10  23456  10 6  4-6+1  5678  4-6 5   5-7 5678  7-7  45678910     4 2  53   len-cur+j
        // curr > Math.floor(len/2)    5   var a = Math.floor(len/2);  cur-a cur-a+1 cur-a+2
        // cur > 14    12 13 14 15 16
        let _l = len > total ? total : len;
        if (len < total && cur > Math.floor(len / 2) && (cur <= total - Math.floor(len / 2))) {
            // 显示多少个连续页
            let rightLen = len;
            // 如果有默认显示前几页的选项且达到显示省略号的条件
            if(showStartPage && cur > (Math.floor(len / 2)) + showStartPage + 1) {
                for(let k = 1;k <= showStartPage;k++) {
                    html += `
                        <a href="javascript:void(0);" class="page-index" data-index="${k}">${k}</a>
                    `; 
                }
                if(showStartPage) {
                    // 左more
                    html += `
                        <span class="more">...</span>
                    `;
                }
                rightLen = len - showStartPage;
            }
            for (let j = 1; j <= rightLen; j++) {
                if (cur === (cur - Math.ceil(len / 2) + j)) {
                    html += `
                        <a href="javascript:void(0);" class="page-index cur" data-index="${cur - Math.ceil(len / 2) + j}">${cur - Math.ceil(len / 2) + j}</a>
                    `;
                    continue;
                }
                html += `
                    <a href="javascript:void(0);" class="page-index" data-index="${cur - Math.ceil(len / 2) + j}">${cur - Math.ceil(len / 2) + j}</a>
                    `;
            }
        } else if (cur < len) {
            for (let i = 1; i <= _l; i++) {
                if (cur === i) {
                    html += `
                        <a href="javascript:void(0);" class="cur page-index" data-index="${i}">${i}</a>
                    `;
                    continue;
                }
                html += `
                    <a href="javascript:void(0);" class="page-index" data-index="${i}">${i}</a>
                `;
            }
        } else {
            // 显示多少个连续页
            let rightLen = len;
            // 页数达到最后几页时
            if (len < total && cur > Math.floor(len / 2) && showStartPage) {
                // 如果有默认显示前几页的选项且达到显示省略号的条件
                if(showStartPage && cur > (Math.floor(len / 2)) + showStartPage + 1) {
                    for(let k = 1;k <= showStartPage;k++) {
                        html += `
                            <a href="javascript:void(0);" class="page-index" data-index="' + k + '">' + k + '</a>
                        `; 
                    }
                    if(showStartPage) {
                        // 左more
                        html += `
                            <span class="more">...</span>
                        `;
                    }
                    rightLen = rightLen - showStartPage;
                }
            }
            for (let i = rightLen - 1; i >= 0; i--) {
                if (cur === (total - i)) {
                    html += `
                        <a href="javascript:void(0);" class="cur page-index" data-index="${total - i}">${total - i}</a>
                    `;
                    continue;
                }
                html += `
                    <a href="javascript:void(0);" class="page-index" data-index="${total - i}">${total - i}</a>
                `;
            }
        }
    }
    if (total > len && cur < total - Math.floor(len / 2) && cur !== total && total !== 1) {
        // 右more
        html += `
            <span class="more">...</span>
        `;
    }
    if (cur !== total && total !== 1) {
        // 下一页
        html += `
            <a href="javascript:void(0);" class="page-index next" data-index="${cur + 1}">&gt;</a>
        `;
    }
    // 是否禁用总页数
    if(!disabledTotal) {
         html += `
            <span class="page-total">共<span class="number">${total}</span>页</span>
        `;
    }
     // 是否禁用输入跳转功能
    if(!disabledIpt) {
         html += `
            <span class="page-go">到第<input class="w35 go" id="yeshu" type="text" value="">页</span>
            <input type="button" class="gray-btn" id="go-search" value="确定">
        `;
    }
    tar.innerHTML = html;
    if(callback && typeof callback === 'function') {
        // 执行回调
        callback(total);
    }
};
