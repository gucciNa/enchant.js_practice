enchant();

window.onload = function() {
   
    var core =new Core(320, 320);
 
    core.preload('chara5.png');
    core.preload('chara7.png');
    core.fps = 15;
    
    core.onload = function() {

        var knight = new Sprite(32, 32);
        knight.image = core.assets['chara5.png'];
        knight.x = 2 * 16 -8; //ここ変えたらできたっ！
        knight.y = 2 * 16;
        knight.scale(1.3,1.3);
        //knight.scale = 19;
        knight.isMoving = false;
        knight.direction = 0;
        knight.walk = 1;
        
        var spacePush = 0; //あとで考える!
        var cnt = 0;  //攻撃フレームアニメーション
		  
        knight.addEventListener('enterframe', function(e) {   //もっと細かく動きたい
            this.frame = this.direction * 9 + this.walk;
            if (this.x > 320) this.x = 0;
            
            
	    
            if (this.isMoving) {
		this.moveBy(this.vx, this.vy);
                if (!(core.frame % 3)) { 
                   this.walk++; // walkを1増加
                   this.walk %= 3; // walkを3で割った余りに＝0,1,2のどれかにする
                }
                if ((this.vx && (this.x-8) % 16 == 0) || (this.vy && this.y % 16 == 0)) { //次マスに移動しきったらとまる
                   this.isMoving = false; // isMovingをFalseに
                   this.walk = 1; // walkを1に
                }              
            } else { 
                this.vx = this.vy = 0;
                if (core.input.left) {
                   this.direction = 1; // 移動方向の設定　0:down, 1:left, 2:right, 3:up
                   this.vx = -4;       // 移動距離の設定
                } else if (core.input.right) {
                   this.direction = 2;
                   this.vx = 4;
                } else if (core.input.up) {
                   this.direction = 3;
                   this.vy = -4;
                } else if (core.input.down) {
                   this.direction = 0;
                   this.vy = 4;
                }
                if (this.vx || this.vy) { // vxかvyが0じゃない場合＝動こうとしている場合
                   var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                   var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
                   if (0 <= x && x < 320 && 0 <= y && y < 320/* && !map.hitTest(x, y)*/) {
                      this.isMoving = true;
                      arguments.callee.call(this);
                   }
                }
		if (!(core.frame % 3) && spacePush) {
			this.walk++;
                        this.walk %= 3;
                }

                if(spacePush == 0){  //攻撃もっと連発したい
                  this.frame = this.direction * 9 + this.walk; // 攻撃してない時のフレーム設定
                  cnt =0;
                } else {
                    if (cnt < 4){
                       this.frame = this.direction * 9 + this.walk + 6; // 攻撃用フレーム設定
                       cnt++;
                    } else if (this.isMoving){
                              this.frame = this.direction * 9 + this.walk;
                    } else {
                       this.frame = this.direction * 9;
                    }
                }  
 
            }

	    
        });
  
        var black = new Sprite(32, 32);
        black.image = core.assets['chara7.png'];
        black.x = 200;
        black.y = 200;
        black.scale(1.3, 1.3);
        black.frame = 10;





        core.keybind(32,'space');
	core.addEventListener("spacebuttondown" , function(e) {
            spacePush = 1;        
          


        });
	core.addEventListener("spacebuttonup" , function(e){
            spacePush = 0;
        });



        core.rootScene.addChild(knight);
        core.rootScene.addChild(black);
      
    }

    core.start();

};

