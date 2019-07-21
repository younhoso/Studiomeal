(function (){

    const houseele = document.querySelector('.house');
    let maxScrollValue = document.body.offsetHeight - window.innerHeight;
    // window.innerHeight는 스크롤 하지 않고 눈에 보이는 브라우저 Height 값을 말한다.(가변적임)
    // document.body.offsetHeight는 스크롤을 끝까지 내렸을때 눈에 보이는 브라우저 Height 값을 말한다.(가변적임)

    window.addEventListener('scroll', function() {
        //pageYOffset는 현재 스크롤 위치값을 확인할수 있다.
        console.log(pageYOffset / maxScrollValue ); //pageYOffset / maxScrollValue 계산은 비율로 값을 확인 할수 있다. 0 ~ 1까지
        console.log(pageYOffset / maxScrollValue * 1000); //pageYOffset / maxScrollValue * 1000 계산은 비율로 값을 확인 할수 있다. 0 ~ 1000까지
        console.log(pageYOffset / maxScrollValue * 1000 - 490); //pageYOffset / maxScrollValue * 1000 - 490 계산은 css에서 .house에 translateZ(-490vw); Z축 거리를 빼준것이다.
        const zMove = pageYOffset / maxScrollValue * 980 - 490;
        
        houseele.style.transform = 'translateZ('+ zMove +'vw)';
    });

})(window);