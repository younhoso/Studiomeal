(function (){
    const stageEle = document.querySelector('.stage');
    const houseele = document.querySelector('.house');
    const barEle = document.querySelector('.progress-bar');
    const mousPos = {x:0, y:0}
    let maxScrollValue = 0;
    // window.innerHeight는 스크롤 하지 않고 눈에 보이는 브라우저 Height 값을 말한다.(가변적임)
    // document.body.offsetHeight는 스크롤을 끝까지 내렸을때 눈에 보이는 브라우저 Height 값을 말한다.

    const resizeHandler = function(){
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
        console.log(maxScrollValue)
    };


    window.addEventListener('scroll', function() {
        //pageYOffset는 현재 스크롤 위치값을 확인할수 있다.
        const scrollPer = pageYOffset / maxScrollValue;
        console.log(pageYOffset / maxScrollValue ); //pageYOffset / maxScrollValue 계산은 비율로 값을 확인 할수 있다. 0 ~ 1까지
        console.log(pageYOffset / maxScrollValue * 1000); //pageYOffset / maxScrollValue * 1000 계산은 비율로 값을 확인 할수 있다. 0 ~ 1000까지
        console.log(pageYOffset / maxScrollValue * 1000 - 490); //pageYOffset / maxScrollValue * 1000 - 490 계산은 css에서 .house에 translateZ(-490vw); Z축 거리를 빼준것이다.
        const zMove = scrollPer * 980 - 490;
        
        houseele.style.transform = 'translateZ('+ zMove +'vw)';

        //progress bar
        barEle.style.width = scrollPer * 100 + '%';

    });

    window.addEventListener('mousemove', function(e){
        mousPos.x = -1 + (e.clientX / this.window.innerWidth) * 2;
        mousPos.y = 1 - (e.clientY / this.window.innerHeight) * 2;

        stageEle.style.transform = 'rotateX('+(mousPos.y * 5)+'deg) rotateY('+(mousPos.x * 5)+'deg)';
    });

    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    stageEle.addEventListener('click', function(e){
        new Character({
            xPos: e.clientX / window.innerWidth * 100
        });
    });


})(window);