function maker(p){
  var path = maker.resolve(p);
  var mod = maker.modules[path];
  if (!mod) throw new Error('failed to require "' + p + '"');
  if (!mod.exports) {
    mod.exports = {};
    mod.call(mod.exports, mod, mod.exports, maker.relative(path));
  }
  return mod.exports;
}

maker.modules = {};

maker.resolve = function (path){
  var orig = path;
  var reg = path + '.js';
  var index = path + '/index.js';
  return maker.modules[reg] && reg
    || maker.modules[index] && index
    || orig;
};

maker.register = function (path, fn){
  maker.modules[path] = fn;
};

maker.relative = function (parent) {
  return function(p){
    if ('.' != p.charAt(0)) return maker(p);
    var path = parent.split('/');
    var segs = p.split('/');
    path.pop();

    for (var i = 0; i < segs.length; i++) {
      var seg = segs[i];
      if ('..' == seg) path.pop();
      else if ('.' != seg) path.push(seg);
    }

    return maker(path.join('/'));
  };
};

(function(window){
	window.require = function(url) {
		
		var fullpath = require.getFullPath(url);
		
		try {
			return maker(fullpath);
		} catch(e) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", fullpath, false);
			xhr.send();
			
			if(!/^file:/.test(location.protocol) && xhr.status != 200) {
				throw new Error("require error: http status " + xhr.status);
			}
			
			var code = babel.transform(xhr.responseText).code;
			maker.register(maker.resolve(fullpath), new Function("module, exports, require",code));
			return maker(fullpath);
		}
	};

	var _require = window.require;

	require._options = { path: ""};
	require.config = function(options) {
		require._options = options;
	};

	require.getFullPath = function(name) {
		name = require._options.path + name;
		return name;
	};


	require.noConflict = function() {
		if (window.require === require ) {
			window.require = _require;
		}
		return require;
	};

	require.register = maker.register;
	require.relative = maker.relative;
	require.resolve  = maker.resolve;
	require.modules  = maker.modules;
})(window);


