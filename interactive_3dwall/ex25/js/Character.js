function Character(info) {
    this.mainEle = document.createElement('div');
    this.mainEle.classList.add('character', );
    this.mainEle.innerHTML = ''
    + '<div class="character-face-con character-head">'
        + '<div class="character-face character-head-face face-front"></div>'
        + '<div class="character-face character-head-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-torso">'
        + '<div class="character-face character-torso-face face-front"></div>'
        + '<div class="character-face character-torso-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-arm character-arm-right">'
        + '<div class="character-face character-arm-face face-front"></div>'
        + '<div class="character-face character-arm-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-arm character-arm-left">'
        + '<div class="character-face character-arm-face face-front"></div>'
        + '<div class="character-face character-arm-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-leg character-leg-left">'
        + '<div class="character-face character-leg-face face-front"></div>'
        + '<div class="character-face character-leg-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-leg character-leg-right">'
        + '<div class="character-face character-leg-face face-front"></div>'
        + '<div class="character-face character-leg-face face-back"></div>'
    + '</div>';

    document.querySelector('.stage').appendChild(this.mainEle);
    this.mainEle.style.left = info.xPos + '%'; 
    
    // 스크롤 중인지 아닌지
    this.scrollState = false;
    // 바로 이전(마지막) 스크롤 위치
    this.lastScrollTop = 0;
    this.xPos = info.xPos;
    this.speed = info.speed;
    console.log( info.speed )
    this.direction;
    this.runingState = false;
    this.rafId;
    this.init();
}


Character.prototype = {
    constructor : Character,
    init: function(){
        // console.log(this)
        const self = this;
        window.addEventListener('scroll', function(){
            
            clearTimeout(self.scrollState);     //clearTimeout는 스크롤 하는 동안에 계속 setTimeout을 취소를 해준다. 1)

            if(!self.scrollState){      // 최소 스크롤할때 true, 스크롤 멈추면 false
                self.mainEle.classList.add('running');
                // this.console.log('runfnd')
            }

            self.scrollState = setTimeout(function(){   // setTimeout은 숫자 값을 반환해주는데. 그걸 self.scrollState곳에 담은것이다.   스크롤를 멈춘후 0.5초후에 실이 된다. 2)
                self.scrollState = false;
                self.mainEle.classList.remove('running')
            },500);
            
            console.log('lastScrollTop' + self.lastScrollTop);  // 바로 이전(마지막) 스크롤 위치
            console.log('pageYOffset' + pageYOffset); //현재 스크롤한 위치
            
            //이전 스크롤 위치와, 현재 스크롤 위치를 비교
            if(self.lastScrollTop > pageYOffset){
                //이전 스크롤 위치가 크다면: 스크롤 올림
                self.mainEle.setAttribute('data-direction', 'backward');
            }else{
                //이전 스크롤 위치가 크다면: 스크롤 내림
                self.mainEle.setAttribute('data-direction', 'forward');
            }
            
            // 바로 이전(마지막) 스크롤 위치
            self.lastScrollTop = pageYOffset;
        });

        window.addEventListener('keydown', function(e){
            if(self.runingState) return;

            console.log(e.keyCode);
            if(e.keyCode === 37){
                //왼쪽
                self.direction = 'left';
                self.mainEle.setAttribute('data-direction', 'left');
                self.mainEle.classList.add('running');
                self.run(self);
                self.runingState = true;
            }else if(e.keyCode === 39){
                //오른쪽
                self.direction = 'right';
                self.mainEle.setAttribute('data-direction', 'right');
                self.mainEle.classList.add('running');
                self.run(self);
                self.runingState = true;
            }
        });

        window.addEventListener('keyup', function(e){
            self.mainEle.classList.remove('running');
            cancelAnimationFrame(self.rafId);   //cancelAnimationFrame 취소시킨다. 2)
            self.runingState = false; // runingState 초기화 작업
        });
    },

    run: function(self){

        if(self.direction === 'left'){
            self.xPos -= self.speed;
        } else if (self.direction === 'right'){
            self.xPos += self.speed;
        }

        if(self.xPos < 2){  // 왼쪽 벽 2까지 지정 해서 안넘어 가도록 한다.
            self.xPos = 2;
        }

        if(self.xPos > 88){ // 오른쪽 벽 88까지 지정 해서 안넘어 가도록 한다.
            self.xPos = 88;
        }

        self.mainEle.style.left = self.xPos + '%';

        self.rafId = requestAnimationFrame(function(){  //requestAnimationFrame에서 리턴하는 숫자를 rafId에 저장해서 1)
            self.run(self);
        });
    },
};
