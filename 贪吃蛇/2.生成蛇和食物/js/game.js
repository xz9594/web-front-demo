window.onload = function(){
	//页面加载完毕后,执行_init()初始化函数
	class_game._init();
}

var class_game = {
	_column:30,//列数
	_row:20,//行数
	_box_width:20,//画布格子宽度
	_box_height:20,//画布格子高度
	_map:[],//地图数组
	_snake:[],//蛇
	_snake_x:null,//随机列数
	_snake_y:null,//随机行数
	_food_x:null,
	_food_y:null,

	_init: function(){
		//地图数组
		for(var _x=0; _x<this._column; _x++){
			this._map[_x]=[];
			for(var _y=0; _y<this._row; _y++){
				this._map[_x][_y]=0; //0:空 1:方块
				//console.log("["+_x+","+_y+"]");
			}
		}
		
		//随机生成蛇和食物的位置
		this._snake_x=Math.floor(Math.random()*this._column);//随机列数
		this._snake_y=Math.floor(Math.random()*this._row);//随机行数
		this._food_x=Math.floor(Math.random()*this._column);
		this._food_y=Math.floor(Math.random()*this._row);

		//将随机生成蛇和食物的位置放入地图数组
		this._map[this._snake_x][this._snake_y]=1;//1:蛇
		this._map[this._food_x][this._food_y]=2;//2:食物

		//生成画布
		for(var _x=0; _x<this._column; _x++){
			for(var _y=0; _y<this._row; _y++){
				var _div=class_base._create('div');

				if(this._map[_x][_y] == 1){//1:蛇
					//行数:20,列数:30,数组从0开始
					//假设循环至2行2列:二维数组是[1,1] 一维数组是(1*列数+1)=31
					this._snake[0]=_y*this._column+_x;
					_div.setAttribute("class","snake");
				}else if(this._map[_x][_y] == 2){//2:食物
					_div.setAttribute("class","food");
				}else{
					_div.setAttribute("class","box");
				}

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