window.onload = function(){
	//页面加载完毕后,执行_init()初始化函数
	class_game._init();
}

var class_game = {
	_column:10,//列数
	_row:10,//行数
	_box_width:50,//画布格子宽度
	_box_height:50,//画布格子高度

	_init: function(){
		//生成画布
		for(var _x=0; _x<this._column; _x++){
			for(var _y=0; _y<this._row; _y++){
				var _div=class_base._create('div');
				_div.setAttribute("class","box");
				//行数:18,列数:10,数组从0开始
				//二维转一维公式: 一维=y*列数+x   二维坐标[1,1]=1*10+1=11
				_div.setAttribute("id",_y*this._column+_x);
				_div.setAttribute("style","width:"+this._box_width+"px;height:"+this._box_height+"px;top:"+(this._box_height*_y)+"px;left:"+(this._box_width*_x)+"px;"); 
				//console.log(_div);
				//_div.innerHTML = _y*this._column+_x+"<br/>["+_x+","+_y+"]";
				class_base._get('game_panel').appendChild(_div);
			}
		}
	}
}

var class_base = {
	//封装document.getElementById
	_get: function(_id){
		return document.getElementById(_id);
	},
	_create: function(_element){
		return document.createElement(_element);
	}
}