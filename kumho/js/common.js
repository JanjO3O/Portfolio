/********************
 * header와 footer 공통 사항에 들어가는 스크립트
 *********************************/
$(document).ready(function(){
    let device_status //브라우저 상태 -> pc인지 모바일인지
    let mobile_size = 1024 //모바일 사이즈
    let window_w  //브라우저 넓이

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
    
    let gnb_x
    $('.header .gnb ul.depth1 > li').on('mouseenter', function(){
        if(device_status == 'pc'){
            gnb_x = $(this).position().left + ($(this).width() / 2)
            // console.log(gnb_x)
            $('.header .gnb .nav_bar').css('left', gnb_x)
        }
    })
    $('.header .gnb ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('.header').addClass('menu_over')
            $(this).find('ul.depth2').stop().slideDown()  //stop을 줌으로써 하위메뉴가 펼쳐졌다 닫혔다 무한반복하는 버그를 제어함
        }
    })
    $('.header .gnb ul.depth1 > li').on('mouseleave', function(){
        if(device_status == 'pc'){
            $('.header').removeClass('menu_over')
            $(this).find('ul.depth2').stop().slideUp()
        }
    })
    $('.header .util .lang').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $(this).addClass('over')
            $('.header').removeClass('menu_over')
            $('.header .gnb ul.depth1 > li > ul.depth2').slideUp()
        }
    })
    $('.header .util .lang').on('mouseleave focusout', function(){
        if(device_status == 'pc'){
            $(this).removeClass('over')
        }
    })
    $('.header .util .sitemap_btn').on('click', function(){
        $('.header').toggleClass('menu_open')
        if($('.header').hasClass('menu_open') == true){   //hasClass => class 있는지 여부 확인
            $(this).attr('title', '메뉴 닫기')  //attr-> 주어진 조건에 맞는 속성값을 갖고오는건데,, 여기선 sitemap_btn에 있는 title값을 '메뉴 닫기'값으로 변경하라는 뜻
        }else{
            $(this).attr('title', '메뉴 열기')
            $('.header').removeClass('menu_open')
            $('.header .sitemap .sitemap_wrap ul.depth1 > li').removeClass('open')
            $('.header .sitemap .sitemap_wrap ul.depth1 > li > ul.depth2').slideUp(300, function(){
                $(this).removeAttr('style')
            })
        }
    })
    

    let scrolling   //현재 스크롤된 값
    let prev_scroll = 0  //이전 스크롤 값
    let move_scroll  //얼마나 스크롤 되었는지 변화값
    function header_fixed(){
        scrolling = $(window).scrollTop()
        if(scrolling > 0){
            $('.header').addClass('fixed')
            move_scroll = prev_scroll - scrolling   // 마이너스가 내려가는 중 / 플러스가 올라가는 중
            if(move_scroll > 0){   // +++++  -> 올라가는 중
                $('.header').removeClass('hide')
            }else{   // ---- -> 내려가는 중
                $('.header').addClass('hide')
            }
        }else{
            $('.header').removeClass('fixed')
        }
        prev_scroll = scrolling
    }
    
    header_fixed()  //로딩되고 단 한 번 실행
    $(window).scroll(function(){  //스크롤 될 때마다 실행
        header_fixed()
    })
    


    let sitemap_wrap_y
    let li_h
    let dot_h
    let li_top
    $('.header .sitemap .sitemap_wrap ul.depth1 > li').on('mouseenter', function(){
        if(device_status == 'pc'){
            li_h = $(this).outerHeight()  //padding을 포함한 높이
            dot_h = 18   //원의 높이
            li_top = $(this).position().top    //li의 top 값
            sitemap_wrap_y = li_top + (li_h / 2) - (dot_h / 2)   //li의 정중앙에 위치하기 위한 값
            // console.log(sitemap_wrap_y)
            $('.header .sitemap .sitemap_wrap .sitemap_nav_bar').css('top', sitemap_wrap_y + 'px')
        }
    })


    $('.header .sitemap .sitemap_wrap ul.depth1 > li').on('click', function(){
        if(device_status == 'mo'){
            if($(this).hasClass('open') == true){
                $(this).removeClass('open')
                $(this).find('ul.depth2').slideUp(300, function(){
                    $(this).removeAttr('style')
                })
            }else{
                $('.header .sitemap .sitemap_wrap ul.depth1 > li').removeClass('open')
                $('.header .sitemap .sitemap_wrap ul.depth1 > li > ul.depth2').slideUp(300, function(){
                    $(this).removeAttr('style')
                })
                $(this).addClass('open')
                $(this).find('ul.depth2').slideDown()
            }
        }
    })

    $('.header .sitemap .sitemap_bg').on('click', function(){
        if(device_status == 'mo'){
            $('.header').removeClass('menu_open')
            $('.header .sitemap .sitemap_wrap ul.depth1 > li').removeClass('open')
            $('.header .sitemap .sitemap_wrap ul.depth1 > li > ul.depth2').slideUp(300, function(){
                $(this).removeAttr('style')
            })
        }
    })



    let trackAnim;
    $('.header .sitemap .sitemap_wrap ul.depth1 > li > button').on('click', function(){
        if(device_status == 'mo'){
            let btn = $(this)
            let wrap = $('.header .sitemap .sitemap_wrap')
            let nav_bar = $('.header .sitemap .sitemap_wrap .sitemap_nav_bar')
            let dot_h = 12
            let duration = 400 // 스르륵 이동할 시간 (0.4초 = 400ms)

            // 1. 진행 중이던 이전 애니메이션 멈춤
            cancelAnimationFrame(trackAnim)

            // 2. CSS transition 충돌 방지를 위해 잠시 transition-top 끄기
            nav_bar.css('transition', 'opacity 0.3s')

            let startTime = null
            
            // 3. 인디케이터가 현재 있는 출발점 Y좌표 파악
            let startY = parseFloat(nav_bar.css('top')) || 0

            // 4. 스르륵 부드럽게 쫓아가는 유도 미사일 함수
            function animateIndicator(timestamp) {
                if (!startTime) startTime = timestamp
                let elapsed = timestamp - startTime // 흐른 시간
                let progress = Math.min(elapsed / duration, 1) // 0부터 1까지 진행률

                // 자연스러운 속도 조절 (처음엔 빠르고 도착할때쯤 스르륵 느려지는 ease-out 효과)
                let ease = 1 - Math.pow(1 - progress, 3)

                // 목표물(버튼)의 실시간 위치 계산 (다른 메뉴가 닫히면서 움직이는 위치까지 실시간 파악)
                let btn_h = btn.outerHeight()
                let btn_top = btn.offset().top
                let wrap_top = wrap.offset().top
                let targetY = (btn_top - wrap_top) + (btn_h / 2) - (dot_h / 2)

                // 출발점에서 움직이는 목표물까지 남은 거리를 계산해서 서서히 다가감
                let currentY = startY + (targetY - startY) * ease

                // 실시간 좌표 적용
                nav_bar.css('top', currentY + 'px')

                if (progress < 1) {
                    // 아직 0.3초가 안 끝났으면 계속 쫓아감
                    trackAnim = requestAnimationFrame(animateIndicator)
                } else {
                    // 완전히 도착하면 다시 CSS transition 원상복구
                    nav_bar.css('top', targetY + 'px') // 오차 없는 정확한 마무리
                    nav_bar.css('transition', 'top 0.4s, opacity 0.4s')
                }
            }

            // 유도 미사일 발사!
            trackAnim = requestAnimationFrame(animateIndicator)
        }
    })

   



    $('.top').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500)
    })

    function footer_count(){ //함수 선언
        footer_h = $('.footer').outerHeight()
        // console.log(footer_h)
        $('.container').css('margin-bottom', footer_h)
    }

    footer_count()  //로딩되고 단 한 번 실행
    $(window).resize(function(){  //브라우저 리사이즈 될 때마다 실행
        footer_count()
    })

})//$(document).ready