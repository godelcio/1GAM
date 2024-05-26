// shim layer with setTimeout fallback
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnumationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
}());

(function() {
	var canvas = document.getElementById('snakeCanvas'),
        ctx = canvas.getContext('2d'),
        score = 0,
        highScore = 20,
        leftButton = document.getElementById('leftButton'),
        rightButton = document.getElementById('rightButton'),
        input = {left: false, right: false};

    canvas.width = 320;
    canvas.height = 350;
    
    window.addEventListener('keyup', function(e) {
        switch(e.keyCode) {
            case 37: input.left = true; break;
            case 39: input.right = true; break;
        }
    }, false);

    var clickEvent = 'click';
    try {
        document.createEvent('TouchEvent');
        clickEvent = 'touchend';
    } catch(e) { }
    
    leftButton.addEventListener(clickEvent, function(e) {
        e.preventDefault();
        input.left = true;
    }, false);
    
    rightButton.addEventListener(clickEvent, function(e) {
        e.preventDefault();
        input.right = true;
    }, false);
    
   var draw = {
        clear: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },    
 
        rect: function(x, y, w, h, col) {
            ctx.fillStyle = col;
            ctx.fillRect(x, y, w, h);
        },
       
      circle: function(x, y, radius, col) {
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
      },
 
        text: function(str, x, y, size, col) {
            ctx.font = 'bold ' + size + 'px monospace';
            ctx.fillStyle = col;
            ctx.fillText(str, x, y);
        }
    };

    var Snake = function() {
        this.init = function() {
            this.dead = false;
            this.len = 0;
            this.speed = 2;
            this.history = [];
            this.dir = [
                [0,-1],
                [1,0],
                [0,1],
                [-1,0]
            ];
            
            this.x = 100;
            this.y = 100;
            this.w = this.h = 16;
            this.currentDir = 2;
            this.col = 'darkgreen';
        };
        
        this.move = function() {
            if(this.dead) {
                return;
            }
            
            // check for input
            if(input.left) {
                this.currentDir += 1;
                if(this.currentDir > 3){
                    this.currentDir = 0;
                }
            }
            else if(input.right){
                this.currentDir -=1;
                if(this.currentDir < 0){
                    this.currentDir = 3;
                }
            }
            
            // check bounds
            if(this.x < 0 || this.x > (canvas.width - this.w) || this.y < 0 || this.y > (canvas.height - this.h)) {
                this.dead = true;
            }
            
            //update position
            this.x += (this.dir[this.currentDir][0] * this.speed);
            this.y += (this.dir[this.currentDir][1] * this.speed);
            
            // store current position in array
            this.history.push({x: this.x, y:this.y, dir:this.currentDir});
            
        };
        
        this.draw = function() {
            
            var i, offset, segPos, col;
            for(i = 1; i <= this.len; i +=1) {
                offset = i * Math.floor(this.w / this.speed);
                offset = this.history.length - offset;
                segPos = this.history[offset];
                
                col = this.col;
                segPos.w = segPos.h = (this.w - this.speed);
                
                if(i>2 && i !== this.len && this.collides(segPos)) {
                    this.dead = true;
                    col = 'darkred';
                }
                draw.rect(segPos.x, segPos.y, this.w,this.h, col);
            }
            
            draw.rect(this.x, this.y, this.w, this.h, this.col);  //head
            draw.rect(this.x + 4, this.y + 1,3, 3, 'white'); //eyes
            draw.rect(this.x + 12, this.y + 1, 3, 3, 'white');
        };
        
        this.collides = function(obj) {
            this.left = this.x;
            this.right = this.x + this.w;
            this.top = this.y;
            this.bottom = this.y + this.h;
            
            obj.left = obj.x;
            obj.right = obj.x + obj.w;
            obj.top = obj.y;
            obj.bottom = obj.y + obj.h;
            
            //check for intersection
            if(this.bottom < obj.top) {
                return false;
            }
            if(this.top > obj.bottom) {
                return false;
            }
            if(this.right < obj.left) {
                return false;
            }
            if(this.left > obj.right) {
                return false;
            }
            
            return true;
        };
        
    };
    
    var Apple = function() {
        this.x = 0;
        this.y = 0;
        this.w = 16;
        this.h = 16;
        this.col = 'red';
        this.replace = 0; // game turns until the apple is translated
        
        this.draw = function() {
            if(this.replace === 0) { // time to move the apple to somewhere else
                this.relocate();
            }
            draw.rect(this.x, this.y, this.h, this.h, this.col);
            this.replace -= 1;
        };
        
        this.relocate = function() {
            this.x = Math.floor(Math.random() * (canvas.width - this.w));
            this.y = Math.floor(Math.random() * (canvas.height - this.h));
            this.replace = Math.floor(Math.random() * 200) + 200;
        };
    };
    
    
    var p1 = new Snake();
    var apple = new Apple();
    
    p1.init();
    
    (function loop() {
        var time, opacity, col;
        window.scrollTo(0, 0);
        
        draw.clear();
        apple.draw();
        p1.move();
        p1.draw();
    
        if(p1.collides(apple)) {
            score += 1;
            p1.len += 1;
            apple.relocate();
        }
        
        if(score > highScore) {
            highScore = score;
        }

        draw.text('Score: ' + score, 20, 20, 12, 'white');
        draw.text('Hi: ' + highScore, 260, 20, 12, 'white');
        
        if(p1.dead === true) {
            time = new Date().getTime() * 0.002;
            
            draw.text('Game Over', 100, 100, 12, 'white');
            if(input.right || input.left) {
                p1.init();
                score = 0;
            }
        }

        //reset input to avod snake seek on turning
        input.right = input.left = false;
        
        requestAnimFrame(loop);
        //setInterval(loop, 1000 / 60);
        
     
     }());
    
}());