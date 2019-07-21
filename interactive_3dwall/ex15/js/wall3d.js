(function (){

    const houseele = document.querySelector('.house');
    const barEle = document.querySelector('.progress-bar');
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
        //-1 + 이것과 1 - 는 같은 의미다.
       mousPos.x = -1 + (e.clientX / window.innerWidth) * 2;     //(e.clientX / window.innerWidth) 계산은 비율로 값을 확인 할수 있다. 0 ~ 1까지
       mousPos.y = 1 - (e.clientY / window.innerHeight) * 2;     //(e.clientX / window.innerWidth) * 2 브라우저 가운데 기준으로 마우스 현제 위치가 0, 1, 2 로 계산된다.
                                                                    //-1 + (e.clientX / window.innerWidth) * 2 브라우저 가운데 기준으로 마우스 현제 위치가 -1, 0, 1 로 계산된다. 
   
       //rotateX 같은 경우 가운데 기준으로 y축에 영향이 간다.,  rotateY 같은 경우 가운데 기준으로 x축에 영량이 간다. 
       // * 5씩 계산한것은 0 ~ 1 사이 범위만 찌끔찌끔 되어서 내가 원하는 정도(범위)로 움직이게 하기 위해서 * 5 정도를 계산한것이다.
       stageEle.style.transform = 'rotateX('+(mousPos.y * 5)+'deg). rotateY('+(mousPos.x * 5)+'deg)';
    });                                                                                               

    

    window.addEventListener('resize', resizeHandler);
    resizeHandler();

})(window);