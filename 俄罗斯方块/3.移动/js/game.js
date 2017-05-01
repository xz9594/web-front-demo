window.onload = function(){
	//页面加载完毕后,执行_init()初始化函数
	class_game._init();
}

//移动
document.onkeydown=function(event){
	var _left=37,_up=38,_right=39,_down=40;//键位值
	var event = event || window.event;
	var _key_value = event.which || event.keyCode;

	switch(_key_value){
		case _left:
			class_game._move_left();
			break;
		case _right:
			class_game._move_right();
			break;
	}
}

var class_game = {
	_row:18,//行数
	_column:10,//列数
	_box_width:30,//画布格子宽度
	_box_height:30,//画布格子高度
	_block:[],//方块坐标

	_init: function(){
		this._draw_pannel();//生成画布
		this._get_block();//随机选择图形
		this._move_down();//向下移动
	},

	//生成画布
	_draw_pannel:function(){
		for(var _x=0; _x<this._column; _x++){
			for(var _y=0; _y<this._row; _y++){
				var _div=class_base._create('div');
				_div.setAttribute("class","box");
				//行数:18,列数:10,数组从0开始
				//二维转一维公式: 一维=y*列数+x   二维坐标[1,1]=1*10+1=11
				_div.setAttribute("id",_y*this._column+_x);
				_div.setAttribute("style","width:"+this._box_width+"px;height:"+this._box_height+"px;top:"+(this._box_height*_y)+"px;left:"+(this._box_width*_x)+"px;"); 
				//console.log(_div);
				//_div.innerHTML = _y*this._column+_x+"["+_x+","+_y+"]";
				class_base._get('game_panel').appendChild(_div);
			}
		}
	},

	//随机选择图形
	_get_block:function(){
		//Math.random()获取0~1之间的一个随机数
		//Math.floor()向下取整
		//假设Math.random()最大值是0.9		0.9x6+1=6.4; Math.floor(6.4)=6;
		//假设Math.random()最小值是0.1		0.1x6+1=1.6; Math.floor(1.6)=1;
		var number=Math.floor(Math.random() * 6 + 1);
		/*
		for(var i=0;i<50;i++){
			var number=Math.floor(Math.random() * 6 + 1);
			console.log(number);
		}
		*/

		switch(number){
			case 1:
				//二维转一维公式: 一维=y*列数+x
				this._block[0] = {x:4, y:0};
				this._block[1] = {x:5, y:0};
				this._block[2] = {x:4, y:1};
				this._block[3] = {x:5, y:1};
				break;
			case 2:
				this._block[0] = {x:3, y:0};
				this._block[1] = {x:4, y:0};
				this._block[2] = {x:5, y:0};
				this._block[3] = {x:6, y:0};
				break;
			case 3:
				this._block[0] = {x:4, y:0};
				this._block[1] = {x:5, y:0};
				this._block[2] = {x:3, y:1};
				this._block[3] = {x:4, y:1}; 
				break;
			case 4:
				this._block[0] = {x:4, y:0};
				this._block[1] = {x:5, y:0};
				this._block[2] = {x:5, y:1};
				this._block[3] = {x:6, y:1};
				break;
			case 5:
				this._block[0] = {x:4, y:0};
				this._block[1] = {x:5, y:0};
				this._block[2] = {x:5, y:1};
				this._block[3] = {x:5, y:2}; 
				break;
			case 6:
				this._block[0] = {x:3, y:0};
				this._block[1] = {x:4, y:0};
				this._block[2] = {x:5, y:0};
				this._block[3] = {x:5, y:1};
				break;
			case 7:
				this._block[0] = {x:5, y:0}; 
				this._block[1] = {x:4, y:1}; 
				this._block[2] = {x:5, y:1}; 
				this._block[3] = {x:5, y:2}; 
				break;
		}
	},

	//向下移动
	_move_down:function(){
		this._clear();//清除

		for(var i=0; i<4; i++){
			this._block[i].y = this._block[i].y + 1;
		}

		this._draw_block();//重绘

		//定时器
		setTimeout(function(){class_game._move_down()},500);
	},

	//向左移动
	_move_left:function(){
		this._clear();//清除

		for(var i=0; i<4; i++){
			this._block[i].x = this._block[i].x - 1;
		}

		this._draw_block();//重绘
	},

	//向右移动
	_move_right:function(){
		this._clear();//清除

		for(var i=0; i<4; i++){
			this._block[i].x = this._block[i].x + 1;
		}

		this._draw_block();//重绘
	},	

	//清除
	_clear:function(){		
		for(var i=0; i<4; i++){
			var index = this._block[i].y*this._column+this._block[i].x;
			class_base._get(index).setAttribute("class","box");
		}
	},

	//绘制图形
	_draw_block:function(){
		for(var i=0; i<4; i++){
			//二维转一维公式: 一维=y*列数+x
			var index = this._block[i].y*this._column+this._block[i].x;
			class_base._get(index).setAttribute("class","block");
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