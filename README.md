# pagination
   Pagination is a front page plugin, do not rely on any JS Library. Support es6   paginationEs6.js   
[demo](http://baixuexiyang.github.io/pagination/)
# Install
+ in your html, you just do like this    
```
<link rel="stylesheet" href="dist/pagination.css">
<script src="dist/pagination.js"></script>     
```
+ or you use requireJs      
`
define(["pagination"], function () {   
	// your code   
});   
`  
+ or maybe you use seaJs  
`    
seaJs.use('pagination');   
`   
   
# example

```
pagination({
	cur: 1,     // 当前页数    
	total: 6,        // 总共多少页   
	len: 5,          // 分页显示多少     
	targetId: 'pagination', // 分页元素绑定     
	callback: function() {    
		// 回调函数   
	}   
})   
```

# options

### cur
当前页数，每次调用传递当前分页

### total
总共多少页，根据总数和每页显示数量可以获取

### len
分页栏上显示的数量

### targetId
分页元素绑定的

### callback
页面渲染完成之后执行的函数，比如事件绑定等。

# tips
demo是用的静态数据，如果调用服务端的数据，只需将index.js文件中的for循环改成Ajax请求就可以了。
