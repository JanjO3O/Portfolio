$(document).ready(function(){

    let device_status //브라우저 상태 -> pc인지 모바일인지
    let mobile_size = 768 //모바일 사이즈
    let window_w  //브라우저 넓이

    let prev_scroll = 0  //이전 스크롤 값
    let move_scroll  //얼마나 스크롤 되었는지 변화값

    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mo'
        }
        console.log(device_status)
    }
    device_chk()  //문서 로딩되고 단 한 번 실행
    $(window).resize(function(){  //리사이즈 될 때마다 실행
        device_chk()
    })

    let history_area = $('.history')
    let history_line = $('.history .line')
    let history_line_target
    let history_line_start
    let history_line_end
    let history_name = $('.history .graph ul li')
    let history_start
    let history_end
    let history_time = 60
    let history_time_reset
    let history_clock
    let history_x = []
    let history_y = []
    let history_leng = history_name.length
    let scrolling
    let win_h 
    let history_ing = false
    // console.log(history_leng)

    function history_set(){
        scrolling = $(window).scrollTop()
        win_h = $(window).height()
        history_start = history_area.offset().top - win_h + (win_h * 0.5)
        history_end = scrolling > history_area.offset().top

        for(i=0; i<history_leng; i++){
            history_x[i] = history_name.eq(i).offset().left
            history_y[i] = history_name.eq(i).offset().top
        }

        if(scrolling < history_start){
            console.log('시작전')
            history_ing = false
            history_name.removeClass('active')
        }else if(history_end){ //완전히 화면 위로 올라가서 안보일때
            console.log('끝')
            history_ing = false
            history_name.removeClass('active')
        }else{
            console.log('해도됨')
            if(history_ing == false){
                history_ing = true
                history_time_reset = 0
                history_clock = setInterval(history_draw, 100)
            }
        }
    }

    function history_draw(){
        if(device_status == 'pc'){
            history_time_reset++
            history_line.css({
                top: '',
                height: 4,
                width: 0
            })
        
            if(history_time <= history_time_reset){
                clearInterval(history_clock)
            }

            history_line.width((history_time_reset * 2) + '%')
            history_line_target = history_line.offset().left + history_line.outerWidth()
            for(i=0; i<history_leng; i++){
                //console.log(history_x[i], history_line_target)
                if(history_x[i] <= history_line_target){
                    history_name.eq(i).addClass('active')
                }
            }
        }else{
            history_time_reset++

            let history_area_top = history_area.offset().top

            // 시작: 두번째 li
            history_line_start = history_name.eq(1).offset().top

            // 끝: 마지막 li (필요하면 eq(6) 유지해도 됨)
            history_line_end = history_name.eq(6).offset().top

            // line 위치를 두번째 li에 맞춤
            history_line.css({
                top: history_line_start - history_area_top,
                width: 4
            })

            // 전체 길이
            let history_line_total = history_line_end - history_line_start

            // px 기준 증가
            let history_line_h = history_time_reset * (history_line_total / history_time)

            // 끝에서 멈춤
            if(history_line_h >= history_line_total){
                history_line_h = history_line_total
                clearInterval(history_clock)
            }

            history_line.height(history_line_h)

            history_line_target = history_line.offset().top + history_line.outerHeight()

            for(let i=0; i<history_leng; i++){
                if(history_y[i] <= history_line_target){
                    history_name.eq(i).addClass('active')
                }
            }
        }
        
    }
    history_set()
    history_draw()
    $(window).scroll(function(){
        history_set()
        history_draw()
    })
    $(window).resize(function(){
        history_set()
        history_draw()
    })




    const vision_swiper = new Swiper('.vision .swiper', {
        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },
        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.vision .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            renderBullet: function (i, className) {
                return '<button class="' + className + '"><svg viewBox="0 0 73 73" xmlns="http://www.w3.org/2000/svg"><circle cx="36.5" cy="36.5" r="35.5" class="circle"></circle></svg></button>';
            /* svg에는 넓이높이 삭제, svg안에 circle이든 path든 fill/storke 삭제, 그리고 반드시 circle 클래스 추가 */
            }
        },
        navigation: {
		    nextEl: '.vision .next',
		    prevEl: '.vision .prev',  
	    },
    });

    
    $('.counseling .list_wrap ul.list > li').on('mouseenter', function(){
        let idx = $(this).index()
        $('.counseling')
            .removeClass('bg1 bg2 bg3')
            .addClass('bg' + (idx + 1))
    })
    $('.counseling .list_wrap ul.list > li').on('mouseleave', function(){
        $('.counseling').removeClass('bg1 bg2 bg3')
    })




    $('.top').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500)
    })


    AOS.init({
        offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 500, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });

})