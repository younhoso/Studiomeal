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

            self.scrollState = setTimeout(function(){   // setTimeout은 숫자 값을 반환해주는데. 그걸 self.scrollState곳에 담은것이다.   스크롤를 멈춘후 0.5초후에 실행이 된다. 2)
                self.scrollState = false;
                self.mainEle.classList.remove('running')
            },500);
            this.console.log( self.scrollState);
        });
    }
};
