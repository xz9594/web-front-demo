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
		case _up:
			class_game._move_up();
			break;		
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
	_map:[],//地图
	_block:[],//方块坐标

	_init: function(){
		//地图数组
		for(var _x=0; _x<this._column; _x++){
			this._map[_x]=[];
			for(var _y=0; _y<this._row; _y++){
				this._map[_x][_y]=0; //0:空 1:方块
				//console.log("["+_x+","+_y+"]");
			}
		}

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
				this._block[0] = {_x:4, _y:0};
				this._block[1] = {_x:5, _y:0};
				this._block[2] = {_x:4, _y:1};
				this._block[3] = {_x:5, _y:1};
				break;
			case 2:
				this._block[0] = {_x:3, _y:0};
				this._block[1] = {_x:4, _y:0};
				this._block[2] = {_x:5, _y:0};
				this._block[3] = {_x:6, _y:0};
				break;
			case 3:
				this._block[0] = {_x:4, _y:0};
				this._block[1] = {_x:5, _y:0};
				this._block[2] = {_x:3, _y:1};
				this._block[3] = {_x:4, _y:1}; 
				break;
			case 4:
				this._block[0] = {_x:4, _y:0};
				this._block[1] = {_x:5, _y:0};
				this._block[2] = {_x:5, _y:1};
				this._block[3] = {_x:6, _y:1};
				break;
			case 5:
				this._block[0] = {_x:4, _y:0};
				this._block[1] = {_x:5, _y:0};
				this._block[2] = {_x:5, _y:1};
				this._block[3] = {_x:5, _y:2}; 
				break;
			case 6:
				this._block[0] = {_x:3, _y:0};
				this._block[1] = {_x:4, _y:0};
				this._block[2] = {_x:5, _y:0};
				this._block[3] = {_x:5, _y:1};
				break;
			case 7:
				this._block[0] = {_x:5, _y:0}; 
				this._block[1] = {_x:4, _y:1}; 
				this._block[2] = {_x:5, _y:1}; 
				this._block[3] = {_x:5, _y:2}; 
				break;
		}
	},

	//向下移动
	_move_down:function(){
		//下边界检测
		if(!class_check._down()){//原图形已移动至底部,获取下一个图形

			this._update_block();//更新图形状态

			var _delete_rows = this._delete_rows();//返回需要删除的行数
			if(_delete_rows != 0){
				for(var _x=0; _x<this._column; _x++){
					for(var _y=0; _y<this._row; _y++){

						var index = _y*this._column+_x;
						class_base._get(index).setAttribute("class","box");
					}
				}

				for(var _x=0; _x<this._column; _x++){
					for(var _y=0; _y<this._row; _y++){

						if(this._map[_x][_y]==1){
							var index = _y*this._column+_x;
							class_base._get(index).setAttribute("class","block");
						}
					}
				}

			}

			this._get_block();
			this._draw_block();//重绘
			class_game._move_down();//向下移动
			return false;
		}

		this._clear();//清除

		for(var _i=0; _i<4; _i++){
			this._block[_i]._y = this._block[_i]._y + 1;
		}

		this._draw_block();//重绘

		//定时器
		setTimeout(function(){class_game._move_down()},200);
	},

	//旋转
	_move_up:function(){
		var temp = [];
		for(var _i=0; _i<4; _i++){ 
			temp[_i] = {_x:0, _y:0}; 
		}

		for(var _i=0; _i<4; _i++){
			temp[_i]._x = this._block[_i]._x; 
			temp[_i]._y = this._block[_i]._y; 
		}

		var _center_x = Math.round((temp[0]._x + temp[1]._x + temp[2]._x + temp[3]._x)/4);
		var _center_y = Math.round((temp[0]._y + temp[1]._y + temp[2]._y + temp[3]._y)/4); 

		for(var _i=0; _i<4; _i++){ 
			temp[_i]._x = _center_x+_center_y-this._block[_i]._y;
			temp[_i]._y = _center_y-_center_x+this._block[_i]._x;
		}

		for(var _i=0; _i<4; _i++){ 
			if(!class_check._is_block(temp[_i]._x,temp[_i]._y)){
				return false;
			}		
		}

		this._clear();//清除
		for(var _i=0; _i<4; _i++){
			this._block[_i]._x = temp[_i]._x; 
			this._block[_i]._y = temp[_i]._y; 
		}

		this._draw_block();//重绘
	},


	//向左移动
	_move_left:function(){
		//左边界检测
		if(!class_check._left()){
			return false;
		}

		this._clear();//清除

		for(var _i=0; _i<4; _i++){
			this._block[_i]._x = this._block[_i]._x - 1;
		}

		this._draw_block();//重绘
	},

	//向右移动
	_move_right:function(){
		//左边界检测
		if(!class_check._right()){
			return false;
		}

		this._clear();//清除

		for(var _i=0; _i<4; _i++){
			this._block[_i]._x = this._block[_i]._x + 1;
		}

		this._draw_block();//重绘
	},

	//清除
	_clear:function(){		
		for(var _i=0; _i<4; _i++){
			var index = this._block[_i]._y*this._column+this._block[_i]._x;
			class_base._get(index).setAttribute("class","box");
		}
	},

	//绘制图形
	_draw_block:function(){
		for(var _i=0; _i<4; _i++){
			//二维转一维公式: 一维=y*列数+x
			var index = this._block[_i]._y*this._column+this._block[_i]._x;
			class_base._get(index).setAttribute("class","block");
		}
	},

	//更新图形状态
	_update_block:function(){
		for(var _i=0; _i<4; _i++){
			//console.log("x="+this._block[_i]._x+",y="+this._block[_i]._y);
			this._map[this._block[_i]._x][this._block[_i]._y]=1;
		} 
	},

	//需要删除的行数
	_delete_rows:function(){
		var _rows = 0;//行数
		for(var _y=0; _y<this._row; _y++){

			var _columns=0;//列数
			for(var _x=0; _x<this._column; _x++){
				_columns++;
				if(this._map[_x][_y]==0){
					break; //跳出循环
				}
			}

			if(_columns==this._column){
				_rows++;

				for(var _x=0; _x<this._column; _x++){
					this._map[_x][_y]=0;//删除行
				}
				
				for(var _i=_y-1; _i>0; _i--){
					for(var _x=0; _x<this._column; _x++){
						this._map[_x][_i+1]=this._map[_x][_i]; //上一行坐标赋值到下一行
					}
				}
			}
		}

		return _rows;
	}

}

//检测
var class_check = {
	//下边界检测
	_down: function(){
		for(var _i=0; _i<class_game._block.length; _i++){
			if(class_game._block[_i]._y == (class_game._row-1) ){
				return false;
			}

			if(!this._is_block(class_game._block[_i]._x, class_game._block[_i]._y+1)){
				return false;
			}
		}

		return true;
	},

	//左边界检测
	_left: function(){
		for(var _i=0; _i<class_game._block.length; _i++){
			if(class_game._block[_i]._x==0){
				return false;
			}

			if(!this._is_block(class_game._block[_i]._x-1, class_game._block[_i]._y)){
				return false;
			}
		}

		return true;
	},

	//右边界检测
	_right: function(){
		for(var _i=0; _i<class_game._block.length; _i++){
			if(class_game._block[_i]._x == (class_game._column-1) ){
				return false;
			}

			if(!this._is_block(class_game._block[_i]._x+1, class_game._block[_i]._y)){
				return false;
			}
		}		

		return true;
	},

	//检测坐标位置是否已存在方块
	_is_block: function(_x,_y){
		
		if(_x>(class_game._column-1) || _x<0 || _y>(class_game._row-1) || _y<0){
			return false;
		}
		

		if(class_game._map[_x][_y]==1){
			return false;
		}

		return true; 
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