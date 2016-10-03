var DWIDTH, DHEIGHT, SCALINGFACTOR, BANNERHEIGHT, GAMESPACE;
	var SIZES = {
		point : 15,
		flag : { x : 40, y : 55 },
		//comumn : 30 + 2,
		column : 50,
		pointsbar : 20,
		margin : {
			x : 20,// * SCALINGFACTOR
			y : 0
		},
		firewall : {
			x : 720,
			y : 176
		}
	}
	var Game = {
		width      		: 6,//9 | 7
		height     		: 9,//6 | 9
//		points     		: 0,
		objectsnum 		: 5,//6
//		level			: 1,
//		maxlevelsnum	: 10, // mappoints.length
		up				: false,
		scrolltime      : 15,
		map : [
//			[ 4, 1, 1, 3, 3 ],
//			[ 5, 1, 5, 1, 4 ],
//			[ 4, 3, 2, 1, 3 ],
//			[ 1, 4, 3, 2, 5 ],
//			[ 4, 6, 2, 5, 1 ],
//			[ 1, 4, 4, 3, 4 ]
		],
		debug_win : false,



//		init : function(){ // забивает карту 0
//			for(var i = 0; i < this.height; i++) {
//				this.map[i] = [];
//				for(var j = 0; j < this.width; j++) {
//					this.map[i][j] = 0;
//				}
//			}
//		},
		randmap : function(){ // рандомно забивает кату
			for(var i = 0; i < this.height; i++) {
				this.map[i] = [];
				for(var j = 0; j < this.width; j++) {
					this.map[i][j] = (Math.random() * this.objectsnum + 1)|0;
				}
			}
		},
		randempty : function(){ // рандомно забивает кату
//			for(var i = 0; i < this.height; i++) {
//				for(var j = 0; j < this.width; j++) {
//					if(this.map[i][j] === 0) {
//						this.map[i][j] = (Math.random() * this.objectsnum + 1)|0;
//					}
//				}
//			}
			for(y in this.map) {
				for(x in this.map[y]) {
					if(this.map[y][x] === 0) {
						this.map[y][x] = (Math.random() * this.objectsnum + 1)|0;
					}
				}
			}
		},
		replace : function(ax, ay, bx, by){
			if(this.debug_win){return;}
			// не менять местами одинаковые
			// менять местами только стоящие рядом
			var xx = ((bx - ax) > 0)?(bx - ax):(ax - bx);
			var yy = ((by - ay) > 0)?(by - ay):(ay - by);
			console.log('--- ' + xx + ' ' + yy);
			if((xx + yy) < 2){
				console.log('ok!');
			} else {
				console.log('error!');
				$('#x_y_' + ax + '_' + ay).addClass('error');
				$('#x_y_' + bx + '_' + by).addClass('error');
				setTimeout(function(){
					$('#x_y_' + ax + '_' + ay).removeClass('error');
					$('#x_y_' + bx + '_' + by).removeClass('error');
				}, 500);
				return false;
			};
			
			//TODO показать что такой ход не возможен X
			if(ax === bx && ay === by){
				console.log('abra kadabra',ax,ay,bx,by);
				//TODO X1
				$('#x_y_' + ax + '_' + ay).addClass('error');
				setTimeout(function(){
					$('#x_y_' + ax + '_' + ay).removeClass('error');
				}, 500);
				return false;
			}
			// не менять местами с "куском" (.point7)
//			if(this.map[ax][ay] === (this.objectsnum + 1) || this.map[bx][by] === (this.objectsnum + 1)){
				//TODO X2
//				return false;
//			} 
			
			console.log(ax + ' ' + ay + ' ' + bx + ' ' + by);
			
			var arrtmp = [];
			for(i in this.map){
				arrtmp[i] = [];
				for(j in this.map[i]){
					arrtmp[i][j] = this.map[i][j];
				}
			}
			
			var tmp = arrtmp[ay][ax];
			arrtmp[ay][ax] = arrtmp[by][bx];
			arrtmp[by][bx] = tmp;
			//arrtmp[ax][ay] = arrtmp[ax][ay] + arrtmp[bx][by];
			//arrtmp[bx][by] = arrtmp[ax][ay] - arrtmp[bx][by];
			//arrtmp[ax][ay] = arrtmp[ax][ay] - arrtmp[bx][by];
			
			//Game.deja(true);
			
			//console.log('=========================');
			//Game.logarr2(arrtmp);
			//console.log('profit ' + this.deja2arr(arrtmp));
			
			// менять только если от этого будет профит
			if(this.deja2arr(arrtmp)) {
				//console.log('profit');
				
				//меняем местами на экране
				
				// hide animation
//				var i = ($('#x_y_3_3').width() / 2);
//				var i = (SIZES.column / 2);
//				$('#x_y_3_3').animate({left:'+=' + i,top:'+=' + i,width:'0px',height:'0px'})

				//$('#map>.row:eq(' + ax + ')>.column:eq(' + ay + ')')//.html('a')
//					.removeClass('point' + this.map[ax][ay])
//					.addClass('point' + this.map[bx][by]);
//				$('#map>.row:eq(' + bx + ')>.column:eq(' + by + ')')//.html('b')
//					.removeClass('point' + this.map[bx][by])
//					.addClass('point' + this.map[ax][ay]);

				// меняем местами
				var c = {
					a : {
						//x : $('#x_y_' + ax + '_' + ay).offset().left,
						x : ax * SIZES.column + SIZES.margin.x,
						//y : $('#x_y_' + ax + '_' + ay).offset().top
						y : ay * SIZES.column + SIZES.margin.y,
					},
					b : {
						//x : $('#x_y_' + bx + '_' + by).offset().left,
						x : bx * SIZES.column + SIZES.margin.x,
						//y : $('#x_y_' + bx + '_' + by).offset().top
						y : by * SIZES.column + SIZES.margin.y,
					}
				}
				$('#x_y_' + ax + '_' + ay).animate({left : c.b.x, top : c.b.y}, 300);
				$('#x_y_' + bx + '_' + by).animate({left : c.a.x, top : c.a.y}, 300);
				
				// a.data() <=> b.data()
				$('#x_y_' + ax + '_' + ay).data({x : bx, y : by});
				$('#x_y_' + bx + '_' + by).data({x : ax, y : ay});
				//a_id <=> b_id
				$('#x_y_' + ax + '_' + ay).attr('id', 'tmp');
				$('#x_y_' + bx + '_' + by).attr('id', 'x_y_' + ax + '_' + ay);
				$('#tmp').attr('id', 'x_y_' + bx + '_' + by)
				
				//this.map[ax][ay] = this.map[ax][ay] + this.map[bx][by];
				//this.map[bx][by] = this.map[ax][ay] - this.map[bx][by];
				//this.map[ax][ay] = this.map[ax][ay] - this.map[bx][by];
				// меняем местами в массиве
				var tmp = this.map[ay][ax];
				this.map[ay][ax] = this.map[by][bx];
				this.map[by][bx] = tmp;
				
				return true;
			} else {
				console.log('impossible');
				$('#x_y_' + ax + '_' + ay).addClass('error');
				$('#x_y_' + bx + '_' + by).addClass('error');
				setTimeout(function(){
					$('#x_y_' + ax + '_' + ay).removeClass('error');
					$('#x_y_' + bx + '_' + by).removeClass('error');
				}, 500);
				return false;
				//TODO X3
			}
		},
		logmap : function(){// выводит первоначальный массив в консоль
			for(var i = 0; i < this.height; i++) {
				var str = "";
				for(var j = 0; j < this.width; j++) {
					str += this.map[i][j] + ' ';
				}
				console.log(str);
			}
		},
		deja : function(clear){//находим все одинаковые, возвращает массив и помечает на карте как 0
			var ret = [];
			ret.found = false;
			for(var i = 0; i < this.height; i++){
				ret[i] = [];
				for(var j = 0; j < this.width; j++){ret[i][j] = 0}
			}
			for(var i = 0; i < this.height; i++) {
				for(var j = 2; j < this.width; j++) {
					if(this.map[i][j] === this.map[i][j - 1] && this.map[i][j - 1] === this.map[i][j - 2] && this.map[i][j - 2] != 0){
						ret[i][j] = ret[i][j - 1] = ret[i][j - 2] = 1;
						ret.found = true;
					}
				}
			}
			for(var i = 0; i < this.width; i++) {
				for(var j = 2; j < this.height; j++) {
					if(this.map[j][i] === this.map[j - 1][i] && this.map[j - 1][i] === this.map[j - 2][i] && this.map[j - 2][i] != 0){
						ret[j][i] = ret[j - 1][i] = ret[j - 2][i] = 1;
						ret.found = true;
					}
				}
			}
			if(clear) {
				for(i in ret) {
					for(j in ret[i]) {
						if(ret[i][j] === 1){
							this.map[i][j] = 0;
							//this.points++;
							localStorage['match3v3points'] = (parseInt(localStorage['match3v3points']) + 1);
						}
					}
				}
			}
			//console.log('++++++++++++++++++++');
			//Game.logarr2(ret);
			return ret;
		},
		deja2arr : function(a){//находим все одинаковые, возвращает массив и помечает на карте как 0
			var found = false;
			for(var i = 0; i < this.height; i++) {
				for(var j = 2; j < this.width; j++) {
					if(a[i][j] === a[i][j - 1] && a[i][j - 1] === a[i][j - 2]){
						found = true;
					}
				}
			}
			for(var i = 0; i < this.width; i++) {
				for(var j = 2; j < this.height; j++) {
					if(a[j][i] === a[j - 1][i] && a[j - 1][i] === a[j - 2][i]){
						found = true;
					}
				}
			}
			return found;
		},
		logarr2 : function(a){// выводит в консоль двумерный массив
			for(i in a) {
				var str = "";
				for(j in a[i]) {
					str += a[i][j] + ' ';
				}
				console.log(str);
			}
		},
		hideempty : function() {
			for(y in this.map) {
				for(x in this.map[y]){
					if(this.map[y][x] === 0) {
						var m = (SIZES.column / 2);
						$('#x_y_' + x + '_' + y).animate({
							left:'+=' + m,
							top:'+=' + m,
							width:'0px',
							height:'0px'
						}, 300, function(){
							var c = $(this).data();
							$('#x_y_' + c.x + '_' + c.y).remove();
							//$('#x_y_' + c.x + '_' + c.y).css({border : '1px solid #f00'});
						});
						//$('#x_y_' + x + '_' + y).hide('slow')
						//setTimeout(, 300, x, y);
						//$('#x_y_' + x + '_' + y).css({border : '1px solid #f00'});
					}
				}
			}
			setTimeout(function(){
				$('#points').html(localStorage['match3v3points']);
				Game.fall();
			}, 400);
		},
		fall : function(){
			//var debug = 0;
			var f = false;
			for(x = 0; x < this.width; x++) {
				f = false;
				var bottom = Game.map.length;
				var top = bottom;
				console.log('>>>',bottom,top);
				for(y = this.map.length - 1; y >= 0; y--) {
					if(this.map[y][x] === 0) {
						console.log('+++', x, y);
						if(y > 0)if(this.map[y - 1][x] !== 0) {
							console.log('f=true');
							f = true;
							top = y;
						} else {
						
						}
					} else {
						if(f) {
							var down = bottom - top;
							//console.log('+++>#x_y_' + x + '_' + y, (y + down));
							this.map[y + down][x] = this.map[y][x];	
							this.map[y][x] = 0;
							var co = $('#x_y_' + x + '_' + y).offset();
							//console.log('#x_y_' + (y - 1) + '_' + x, co);
							var _y = SIZES.column * (y + down) + SIZES.margin.y;
							//console.log('+++#x_y_' + x + '_' + y, down, _y, y, (y + down));
							$('#x_y_' + x + '_' + y).animate({//bottom - 1
								top : _y
							}, 300);
							$('#x_y_' + x + '_' + y).data({'x' : x, 'y' : (y + down)});
							$('#x_y_' + x + '_' + y).attr('id', 'x_y_' + x + '_' + (y + down));
						} else {
							bottom = y;
						}
					}
				}
			}
			setTimeout(function(){
				Game.fill();
			}, 500);
		},
		fill : function() {
			for(y in this.map) {
				for(x in this.map[y]) {
					if(this.map[y][x] === 0) {
						console.log('fill');
						this.map[y][x] = (Math.random() * this.objectsnum + 1)|0;
						$('#map').append(this.drawcolumn(x, y));
					}
					//str = '.row:eq(' +  i + ')>div.column:eq(' + j + ')';
					//$(str).html(this.map[i][j]);
				}
			}
			if( this.iswin() ) {
				this.win();
			}
			$('.column').show('slow');
			if(Game.deja(true).found){
				setTimeout(function(){
					Game.hideempty();
				}, 500);
			} else {
				Game.debug_click = false;
			}
		},
		mappoints : [//320x480
// document.onclick = function(e){console.log(e.pageX + ' ' + e.pageY)}	
			{x : 203, y : 215},
			{x : 214, y : 191},
			{x : 218, y : 167},
			{x : 208, y : 145},
			{x : 202, y : 124},
			{x : 178, y : 117},
			{x : 162, y : 101},
			{x : 146, y : 108},
			{x : 125, y : 122},
			{x : 126, y : 141},
			{x : 136, y : 160},
			{x : 114, y : 181},
			{x : 114, y : 209}
		],
		stepanimation : function(stepnum, steps, o, h) {
			
			//console.log('step', stepnum);
			if(stepnum == steps) {
				stepnum = 0;
			} else {
				stepnum++;
			}
			$(o).css({
				'background-position' : ( '0px ' + (stepnum * h) + 'px' )
			});
			setTimeout(function(){
				//console.log(stepnum, steps, o, h);
				Game.stepanimation(stepnum, steps, o, h);
			}, 100);
			
		},
		resetall : function() {
			localStorage['match3v3level'] = 0;
			localStorage['match3v3points'] = 0;
		},
		drawmap : function(){
			$('#mapsplash').html('');
			//$('#mapsplash').append(' drawmap');
			for(i in this.mappoints){
				//draw point
				
				var l = $('<div>').addClass('buttn')
				//console.log(parseInt(localStorage['atlaslevel']) + ' ' + i);
				if(parseInt(localStorage['match3v3level']) > i) {$(l).addClass('inhistory');}
				if(parseInt(localStorage['match3v3level']) == i) {
					$(l).attr('id', 'thislevel');
					$(l).css({
						left : ( this.mappoints[i].x - ( SIZES.point / 2 ) ) * SCALINGFACTOR,
						top : ( this.mappoints[i].y - SIZES.flag.y ) * SCALINGFACTOR,
						width : SIZES.flag.x,
						height : SIZES.flag.y,
						position : 'absolute'
					})
					.removeClass('buttn');
				} else {
					$(l).css({
						left : ( this.mappoints[i].x - ( SIZES.point / 2 ) ) * SCALINGFACTOR,// * на коэффициент масштабирования
						top : ( this.mappoints[i].y - ( SIZES.point / 2 ) ) * SCALINGFACTOR
					});
				}
				//$(l).html(i);
				$('#mapsplash').append(l);
				//$('#mapsplash').append(' button');
			}
			$('#thislevel').click(function(){
				$('#mapsplash').hide();
				$('#gamescreen').show();
				Game.startgame();
			});
		},
		redrawall : function(a){
			//console.log('redrawall');
			//console.log(' - 1 ---');
			//Game.logmap();
			//console.log(' - 2 ---');
			//Game.logarr2(a);
			//console.log(' - 3 ---');
			
			//var i = 1;
			$('.column').each(function(i){
				var x = $(this).index();
				var y = $(this).parent().index();
				//console.log('log: a.l' + a.length + ' m.l' + Game.map.length + ' y' + y + ' x' + x + ' i' + i);
				//Game.logarr2(a);
				//console.log('-----------');
				
				//if(a[y][x] === Game.map[y][x]){} else {
					$('#map>.row:eq(' + y + ')>.column:eq(' + x + ')')//.html('a')
						.removeClass('point' + a[y][x])
						.addClass('point' + Game.map[y][x]);
				//}
				
			});
		},
		warp : function(a, b) {
			
			// a <=> b array (Game.map)
			var tmp = Game.map[a.y][a.x];
			Game.map[a.y][a.x] = Game.map[b.y][b.x];
			Game.map[b.y][b.x] = tmp;
			
			// a <=> b data()
			// a <=> b css
			$('#x_y_' + a.x + '_' + a.y)
				.data({'x':b.x,'y':b.y})
				.css({
					left : ( SIZES.column * b.x + SIZES.margin.x ),
					top  : ( SIZES.column * b.y + SIZES.margin.y )
				});
			$('#x_y_' + b.x + '_' + b.y)
				.data({'x':a.x,'y':a.y})
				.css({
					left : ( SIZES.column * a.x + SIZES.margin.x ),
					top  : ( SIZES.column * a.y + SIZES.margin.y )
				});
			// a <=> b #id
			$('#x_y_' + a.x + '_' + a.y).attr('id', 'tmp');
			$('#x_y_' + b.x + '_' + b.y).attr('id', 'x_y_' + a.x + '_' + a.y);
			$('#tmp').attr('id', 'x_y_' + b.x + '_' + b.y)
			
		},
		drawcolumn : function(x, y){//j, i
			var l = $('<div>')
				.addClass('column')
				.addClass('hidden')
				.addClass('point' + Game.map[y][x])
				.attr('id', 'x_y_' + x + '_' + y)
				.data({'x' : x, 'y' : y})
				.css({
					left   : ( SIZES.column * x + SIZES.margin.x ),
					top    : ( SIZES.column * y + SIZES.margin.y ),
					width  : SIZES.column,
					height : SIZES.column
				});
			return l;
		},
		cleartop : function() {
			if(this.debug_win){return;}
			for(x in Game.map[0]) {
				$('#x_y_' + x + '_0').hide(300);
			}
			setTimeout(function() {
				
				$('#map').css({
					top : '+=' + SIZES.column + 'px'
				});
				
				var l = Game.map.length;
				for(y = 0; y < l - 1; y++) {
					for(x in Game.map[y]) {
						Game.warp({'x':x,'y':y},{'x':x,'y':(y+1)})
					}
				}
				for(x in Game.map[0]) {
					$('#x_y_' + x + '_0').show();
				}
				// TODO когда верхняя "строчка упала", заменяем её на новые (удаляем и ставим новые)
				for(i in Game.map[l - 1]) {
					var prefix = Game.map[l - 1][i];
					var _rand = (Math.random() * Game.objectsnum + 1)|0;
					$('#x_y_' + i + '_' + (l - 1))
						.removeClass('point' + prefix)
						.addClass('point' + _rand)
						.addClass('hidden')
						.show('slow');
					Game.map[l - 1][i] = _rand;
					console.log('_rand', _rand);
					// TODO check match
//					if(Game.deja().found) {
//						Game.deja(true);
//						Game.hideempty();
//					}
				}
//for(x in Game.map[l]) {
//	$('#x_y_' + x + '_' + l).show('slow');
//}
				Game.mapup();
			
			}, 300);
		},
		mapup : function () {
			//Game.timer = setTimeout()
			//clearTimeout(Game.timer);
			if(this.debug_win){return;}
			var co = $('#map').offset();
			$('#map').animate({
				top : ( '-=' + SIZES.column + 'px' )
				//top : ( '-=300px')
			}, Game.scrolltime * 1000, function() {
				//Game.logmap();
				
				//setTimeout(function(){
					if(Game.isgameover()) {
					
						Game.gameover();
						//console.log('gameover');
					} else {
						Game.cleartop();
//						$('#map').css({
//							top : '+=' + SIZES.column + 'px'
//						});
//						Game.mapup();
					}
					
				//}, 300);
				//console.log('map on top');
			})
		},
		draw : function(){
			console.log('start draw');
			$('#map').html('');
			for(var i = 0; i < this.height; i++) {
				for(var j = 0; j < this.width; j++) {
					$('#map').append(this.drawcolumn(j, i));
				}
			}
			$('.column').show('slow');
			
			// click's ------------------------------------

			//$('.column').click(function(){
			
			this.mapup();
			// -------------------------------------------
			
		},
		addsplinter : function(){
			var c = {}
			c.x = (Math.random() * this.width)|0;
			//c.y = 4;//(Math.random() * (this.height - 1)|0)|0;
			//c.y = (Math.random() * (this.height / 2)|0)|0;
			c.y = (Math.random() * (this.height - 2)|0) + 1;
			console.log('c.y', c.y);
			this.map[c.y][c.x] = this.objectsnum + 1;
		},
		win : function() {
			Game.debug_click = false;
			Game.up = false;
			$('#map').stop();
			this.debug_win = true;
			$('#shadow').show();
			$('#youwin').show();
			var l = parseInt(localStorage.match3v3level);
			if(l < Game.mappoints.length - 1) {
				localStorage.match3v3level = l + 1;
				setTimeout(function() {
					Game.drawmap();
					$('#gamescreen').hide();
					$('#mapsplash').show();
					$('#map').css({
						//top : '+=' + SIZES.column + 'px'
						top : '40px'
					});
					$('#shadow').hide();
					$('#youwin').hide();
				}, 3000);
			}
		},
		gameover : function() {
			Game.debug_click = false;
			Game.up = false;
			$('#map').stop();
			this.debug_win = true;
			$('#shadow').show();
			$('#gameover').show();
				setTimeout(function() {
					Game.drawmap();
					$('#gamescreen').hide();
					$('#mapsplash').show();
					$('#map').css({
						top : '+=' + SIZES.column + 'px'
					});
					$('#shadow').hide();
					$('#gameover').hide();
				}, 3000);
		},
		iswin : function() {
			for(i = 0; i < this.width; i++){if(this.map[this.height - 1][i] === this.objectsnum + 1){return true}}//ищем "сундук" 
			return false;
		},
		isgameover : function() {
			for(i = 0; i < this.width; i++){if(this.map[0][i] === this.objectsnum + 1){return true}}//ищем "сундук" 
			return false;
		},
		redrawchest : function() {
			var h = ( 224 * SCALINGFACTOR / this.mappoints.length ) * ( this.mappoints.length - parseInt(localStorage['match3v3level']) );
			console.log('h: ' + h);
			$('#winlayer2').css({
				height : h
			});
		},
		startgame : function(){
		
			//$('#map').css({
			//	top : SIZES.margin.y + 'px'
			//});
			this.debug_win = false;
			this.randmap();
			this.addsplinter();
			for(;this.deja().found;){
					this.randmap();
					this.addsplinter();
			}
			this.draw();
		},
		init : function(){
			//$('#mapsplash').append(' in');
			if(
				typeof(localStorage['match3v3level']) === 'undefined' ||
				typeof(localStorage['match3v3points']) === 'undefined'
			){
				localStorage['match3v3level'] = 0;
				localStorage['match3v3points'] = 0;
			}
			$('#points').html(localStorage['match3v3points']);
			this.drawmap();
		}
	}
	$(document).ready(function(){
		//$('#mapsplash').append('ready');
	
		DWIDTH = document.body.clientWidth;
		DHEIGHT	= document.body.clientHeight;
		SCALINGFACTOR = DWIDTH / 320;
		BANNERHEIGHT = SCALINGFACTOR * 50;
		SIZES.margin.x = SIZES.margin.x * SCALINGFACTOR;
		//SIZES.margin.y = SIZES.margin.y * SCALINGFACTOR;
		SIZES.margin.y = SIZES.pointsbar  * SCALINGFACTOR + SIZES.margin.x;
		SIZES.column = SIZES.column / 320 * DWIDTH;
		
		GAMESPACE = {
			X : DWIDTH - ( SIZES.margin.x * 2 ),
			Y : DHEIGHT - BANNERHEIGHT - SIZES.margin.y - SIZES.column
		}
		Game.width = ( GAMESPACE.X / SIZES.column )|0;
		
		SIZES.margin.x = ( ( DWIDTH - (SIZES.column * Game.width) ) / 2 );
		
		Game.height = ( ( ( GAMESPACE.Y - SIZES.pointsbar * SCALINGFACTOR ) / SIZES.column )|0 );
		
		$('#youwin').css('width', (DWIDTH - 30 + 'px'));
		$('#gameover').css('width', (DWIDTH - 30 + 'px'));
		//var _h = SIZES.firewall.y / SIZES.firewall.x * SIZES.column * Game.width;
		var _h = SIZES.firewall.y / SIZES.firewall.x * DWIDTH;
		$('#firewall').css({
			width : DWIDTH,//(Game.width * SIZES.column),
			height : _h,
			left : 0,//SIZES.margin.x,
			top : SIZES.margin.y
		});
		Game.stepanimation( 0, 4, $('#firewall'), _h );
		
		$('#map').css({
			width  : GAMESPACE.X,
			height  : GAMESPACE.Y,
			top : SIZES.margin.y + 'px'
		});
		$('#pointsbar').css({
			height : ( SIZES.pointsbar * SCALINGFACTOR )|0,
			'line-height' : ( ( ( SIZES.pointsbar * SCALINGFACTOR )|0 ) + 'px' )
		});
		// winlayer2 245,340
		$('#winlayer2').css({
			top : ( ( 164 * SCALINGFACTOR ) + 'px' ),
			height : ( ( 224 * SCALINGFACTOR ) + 'px' )
		});
		//console.log(((GAMESPACE.X - Game.width * SIZES.comumn) / 2)|0);
		Game.init();
		$('.buttn').css({
			width : SIZES.point * SCALINGFACTOR,
			height : SIZES.point * SCALINGFACTOR
		});
		//$('#thislevel').click(function(){
		//	$('#mapsplash').hide();
		//	$('#gamescreen').show();
			//Game.startgame();
		//});
		
//		if( parseInt(localStorage.match3v3level) == 0 ) {
//			$('#continue').remove()
//		}
			//$('#startgame').remove()
		var _l, _t, _w, _h;
		_w = (108 * SCALINGFACTOR) + 'px';//548
		_h = (49 * SCALINGFACTOR);//247
		_l = (DWIDTH / 2 - 54 * SCALINGFACTOR) + 'px';
		//_t = 270 * SCALINGFACTOR;
		_t = 750 / 1280 * DHEIGHT
		$('#startscreen>div:eq(1)').css({left:_l,top:(_t + 'px'),width:_w,height:_h + 'px'});
		_t += _h + 3;
		$('#startscreen>div:eq(0)').css({left:_l,top:(_t + 'px'),width:_w,height:_h + 'px'});
		SIZES.margin.y += SIZES.column;
		$('#newgame').click(function(){
			Game.resetall();
			$('#startscreen').hide();
			$('#mapsplash').show();
			Game.drawmap();
			});
		$('#continue').click(function(){
			$('#startscreen').hide();
			$('#mapsplash').show();
			Game.drawmap();
		});
		
//----------------------------- bind click delegate
$("#map").delegate(".column", "click", function() {
				console.log('AAA');
				
				if(Game.up == false) {// первый клик
					if(Game.debug_click) {return;}
					console.log('---click1---');
					$(this).addClass('selected');
					//this.up = true;
					// TODO если клик по "куску", то клик не считается
					
					//if($(this).hasClass('point' + (Game.objectsnum + 1)) === false){
						Game.up = {
							//y : $(this).parent().index(),
							y : $(this).data().y,
							//x : $(this).index(),
							x : $(this).data().x,
							o : this
						}
						
						console.log('select ' + Game.up.x + ' ' + Game.up.y);
					//} else {
					//	console.click('click fail');
					//}
				} else {// втрой клик
					console.log('---click2---');
					Game.debug_click = true;
					$(Game.up.o).removeClass('selected');
					console.log('unselect ' + Game.up.x + ' ' + Game.up.y);
					// 0 поменять местами, если получилось продолжить 1, 2, 3...

//					var tmparr2redraw = [];
					
//					for(i in Game.map){
//						tmparr2redraw[i] = [];
//						for(j in Game.map[i]){
//							tmparr2redraw[i][j] = Game.map[i][j];
//						}
//					}

					console.log('*',
						Game.up.x,
						Game.up.y,
						$(this).data().x,
						$(this).data().y
					);
					if(Game.replace(
						Game.up.x,
						Game.up.y,
						$(this).data().x,
						$(this).data().y
					)){
						console.log('okk');
						
						//подождать пока идёт анимация перемещения

						// TODO (replaced ok)
						
						// 1 удалить повторяющиеся
						//while(Game.deja(true).found){
							setTimeout(function(){
								Game.hideempty();
							}, 300);
						//}

						$('#points').html(localStorage['match3v3points']);
						
						//if(Game.iswin()){
						//	console.log('win');
						//}
						
/*						if(Game.iswin()){
							
							if(parseInt(localStorage['atlaslevel']) < Game.mappoints.length - 1){
								console.log('win');
								localStorage['atlaslevel'] = (parseInt(localStorage['atlaslevel']) + 1);
								Game.drawmap();
								
								Game.redrawchest()
								$('#gamescreen').hide();
								$('#youwin').show();
								setTimeout(function(){
									
									$('#youwin').hide();
									$('#mapsplash').show();
								}, 3000);
							} else {
								localStorage['atlaslevel'] = (parseInt(localStorage['atlaslevel']) + 1);
								Game.redrawchest()
								console.log('win all');
								$('#gamescreen').hide();
								$('#youwin').show();
								localStorage['atlaslevel'] = (parseInt(localStorage['atlaslevel']) - 1);
								
								//splash win all
								// вы выиграли
								// начать с начала y/n (обнулить levels, points)
							}
						}
*/
						
						// 4 проверить на WIN, если да то вернуться к выбору уровня, увеличить level, иначе вернуться в 1

					} else {
						Game.debug_click = false;
					}
					Game.up = false;
				}
			});
//-------------------------------------------------		
	});