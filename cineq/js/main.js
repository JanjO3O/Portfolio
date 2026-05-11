$(document).ready(function(){
    const visual_swiper_pc = new Swiper('.visual .swiper_pc', {

        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },

        // effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            // type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });

    
    
    $('.visual .swiper_pc .paging .swiper-pagination-bullet').text('')


    const visual_swiper_mo = new Swiper('.visual .swiper_mo', {

        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: false,
        },

        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .swiper_mo .next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .swiper_mo .prev',  
        },
    })


    
    
    const Box_Office_swiper = new Swiper('.Box_Office .swiper', {
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 5, /* 팝업과 팝업 사이 여백 */
        // speed: 5000,
        // autoplay: {  /* 팝업 자동 실행 */
        //     delay: 0,
        // },
        disableOnInteraction: false,
        breakpoints: {
            769: {    /* 769px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 5,  //coverflow 효과로 간격조절 할거라서 0 준거임
            },
        },
        centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        
        effect: 'coverflow',  // css - perspective 속성과 같이 쓰이는 3D 입체 효과를 위한 속성값
        grabCursor: true,
        coverflowEffect: {
            rotate: 10,       // 좌우 회전 각도
            stretch: 5,     // 슬라이드 간격 (겹침 느낌)
            depth: -70,       // Z축 깊이
            modifier: 1.5,      // 강도
            scale: 1,
            slideShadows: false,   //slide 그림자 적용 여부
        },

        watchSlidesProgress: true,

        
    
	loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
	
    });






    let tab_list = $('.biz .tab_list ul li')
    let tab_name

    tab_list.on('click', function(){
        tab_list.removeClass('active')
        tab_list.attr('aria-selected', 'false')
        tab_list.find('button em').text('')
        $(this).addClass('active')
        $(this).attr('aria-selected', 'true')
        $(this).find('button em').text('선택됨')
        tab_name = $(this).attr('aria-controls')

        $('.biz .tab_conts .tab_item').removeClass('active')
        $('.biz .tab_conts').find('#' + tab_name).addClass('active')
    })


    let line_area = $('.biz')  //해당 영역
    let line1 = $('.biz .line1')
    let line2 = $('.biz .line2')

    let win_h //브라우저 높이
    let head_h //header 높이
    
    let line1_start  //line1 시작 위치
    let line1_end  //line1 종료 위치
    let line2_start  //line2 시작 위치
    let line2_end  //line2 종료 위치
    
    let scrolling //현재 스크롤 된 값
    let line_diff  //시작 이후에 얼마나 스크롤 되었는지


    function change(){
        scrolling = $(window).scrollTop() //브라우저 스크롤 값
        win_h = $(window).height()
        head_h = $('.header_wrap').height()

        line1_start = line_area.offset().top
        line1_end = line_area.offset().top + win_h/3

        line2_start = line_area.offset().top + win_h/3 //line1 종료지점에서부터 시작
        line2_end = line_area.offset().top + win_h/2  //반띵한 높이에서  종료

        if(line1_end < scrolling){
            line1.css('transform', 'translateX(0)')
            // console.log('끝')
        }else if(line1_start > scrolling){
            // console.log('시작 전')
            line1.css('transform', 'translateX(-100%)')
        }else{
            // console.log('진행중')
            line_diff = scrolling - line1_start
        }

        if(line2_end < scrolling){
            line2.css('transform', 'translateX(0)')
            // console.log('끝')
        }else if(line2_start > scrolling){
            // console.log('시작 전')
            line2.css('transform', 'translateX(100%)')
        }else{
            // console.log('진행중')
            line_diff = scrolling - line2_start
        }   
    }

    change()  //문서가 로딩되고 단 한 번 실행
    $(window).scroll(function(){ 
        change() //스크롤 될 때마다
    })


    const biz_swiper = new Swiper('.biz .swiper', {
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 12, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            501: {    /* 501px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            651: {    /* 651px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
        },
        loop: false,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: false,
        },
    });






    let mov_tab_list = $('.movie .tab_list ul li')
    let mov_tab_name

    const movie_swiper = new Swiper('.movie .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 6, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 769px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 6,
            },
            1025: {    /* 769px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            1261: {    /* 1261px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.movie .next',
            prevEl: '.movie .prev',
        },
    });

    movie_swiper.emit('slideChange')

    function changeMovieTab(index){
        let currentTab = mov_tab_list.eq(index)

        // 탭 active 변경
        mov_tab_list.removeClass('active')
        mov_tab_list.attr('aria-selected', 'false')
        mov_tab_list.find('button em').text('')

        currentTab.addClass('active')
        currentTab.attr('aria-selected', 'true')
        currentTab.find('button em').text('선택됨')

        // 컨텐츠 변경
        let mov_tab_name = currentTab.attr('aria-controls')

        $('.movie .tab_conts .tab_item').removeClass('active')
        $('#' + mov_tab_name).addClass('active')
    }

    movie_swiper.on('transitionEnd', function () {
        let index = movie_swiper.realIndex
        changeMovieTab(index)
    })

    
    movie_swiper.on('transitionEnd', function () {
        let index = movie_swiper.realIndex

        // 탭 active 변경
        mov_tab_list.removeClass('active')
        mov_tab_list.attr('aria-selected', 'false')
        mov_tab_list.find('button em').text('')

        let currentTab = mov_tab_list.eq(index)

        currentTab.addClass('active')
        currentTab.attr('aria-selected', 'true')
        currentTab.find('button em').text('선택됨')

        // 컨텐츠 변경
        let mov_tab_name = currentTab.attr('aria-controls')

        $('.movie .tab_conts .tab_item').removeClass('active')
        $('#' + mov_tab_name).addClass('active')
    })



    const movie_mo_swiper = new Swiper('.movie .mo_swiper', {
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 12, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            501: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            651: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 4000,
            disableOnInteraction: false,
        },
    });





    let ticket_right_bar_w
    const event_left_swiper = new Swiper('.event .ticket_right .swiper', {
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 8, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            501: {    /* 769px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            769: {    /* 769px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            1025: {    /* 1025px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
        },
        autoplay: {  /* 팝업 자동 실행 */
            delay: 4000,
            disableOnInteraction: false,
        },

        // effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.event .event_left .ticket_right .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.event .event_left .ticket_right .next',
            prevEl: '.event .event_left .ticket_right .prev',  
	    },

        on: {
            autoplayTimeLeft(s, time, progress) {
                // progress: 1 -> 0 
                // 0% -> 100%로 되어야 함 (가상선택자인 before,after는 제어가 안됨)
                ticket_right_bar_w = 100 - (100 * progress)
                $('.event .ticket_right .btn_wrap .bar span').width(ticket_right_bar_w + '%')
            }
        }
    });
    
    $('.event .event_left .ticket .ticket_right .btn_wrap button.stop').on('click', function(){
        event_left_swiper.autoplay.stop()
        $(this).hide()
        $('.event .event_left .ticket .ticket_right .btn_wrap button.play').show()
    })
    $('.event .event_left .ticket .ticket_right .btn_wrap button.play').on('click', function(){
        event_left_swiper.autoplay.start()
        $(this).hide()
        $('.event .event_left .ticket .ticket_right .btn_wrap button.stop').show()
    })


    const event_right_swiper = new Swiper('.event .event_right .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 2, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 12, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },
            effect: "fade", /* fade 효과 */
    });

    /**********************
     * CINE Q 글자 계산
     ********************/ 

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

    if(device_status == 'pc'){

        let cine_area_name = $('.page')

        //  텍스트 (Q 제외)
        let cine_text_items = $('.page .word .text').not('.line06, .line07')

        //  Q wrap
        let cine_Q_first_wrap = $('.page .word .line06')
        let cine_Q_last_wrap = $('.page .word .line07')

        //  Q img
        let cine_Q_first = cine_Q_first_wrap.find('img')
        let cine_Q_last = cine_Q_last_wrap.find('img')

        let cine_area_start
        let cine_area_end
        let cine_area

        let cine_all_step = 9
        let cine_Q_first_step = 3
        let cine_Q_last_step = 1

        let Q_start_step = cine_all_step - cine_Q_first_step - cine_Q_last_step

        let cine_Q_start = 50
        let cine_Q_mid = 100
        let cine_Q_end = 400

        let current_step = -1
        let current_q_state = '' // '', 'first', 'last'

        function cine_chk(){
            if(device_status !== 'pc') return;

            cine_area_start = cine_area_name.offset().top - win_h
            cine_area_end = cine_area_start + cine_area_name.height()
            cine_area = cine_area_end - cine_area_start

            let progress = (scrolling - cine_area_start) / cine_area
            progress = Math.max(0, Math.min(1, progress))

            let step = Math.floor(progress * cine_all_step)

            /* =========================
            시작 전
            ========================= */
            if(scrolling < cine_area_start){

                if(current_step !== 0){
                    cine_text_items.stop(true,true).fadeOut(200)
                    cine_text_items.eq(0).stop(true,true).fadeIn(200)
                    current_step = 0
                }

                //  Q 완전 초기화
                cine_Q_first_wrap.hide()
                cine_Q_last_wrap.hide()
                current_q_state = ''

                cine_Q_first.css({ width: cine_Q_start + 'vw' })
                cine_Q_last.css({ width: cine_Q_mid + 'vw', opacity: 1 })

                cine_area_name.css({ backgroundColor: 'rgba(0,0,0,1)' })

                return
            }

            /* =========================
            종료 후
            ========================= */
            if(scrolling > cine_area_end){

                cine_text_items.stop(true,true).fadeOut(200)

                cine_Q_first_wrap.hide()
                cine_Q_last_wrap.show()
                current_q_state = 'last'

                cine_Q_last.css({
                    width: cine_Q_end + 'vw',
                    opacity: 0
                })

                cine_area_name.css({
                    backgroundColor: 'rgba(0,0,0,0)'
                })

                return
            }

            /* =========================
            텍스트 fade
            ========================= */
            if(step !== current_step){
                current_step = step

                if(step < Q_start_step){
                    cine_text_items.stop(true,true).fadeOut(200)
                    cine_text_items.eq(step).stop(true,true).fadeIn(200)
                }else{
                    cine_text_items.stop(true,true).fadeOut(200)
                }
            }

            /* =========================
            Q 구간 완전 제어 (핵심)
            ========================= */

            //  FIRST 구간
            if(step >= Q_start_step && step < Q_start_step + cine_Q_first_step){

                if(current_q_state !== 'first'){
                    cine_Q_last_wrap.stop(true,true).fadeOut(200)
                    cine_Q_first_wrap.stop(true,true).fadeIn(200)
                    current_q_state = 'first'
                }

                let q_progress = (progress * cine_all_step - Q_start_step) / cine_Q_first_step
                q_progress = Math.max(0, Math.min(1, q_progress))

                let width = cine_Q_start + (cine_Q_mid - cine_Q_start) * q_progress

                cine_Q_first.css({
                    width: width + 'vw'
                })
            }

            //  LAST 구간
            else if(step >= cine_all_step - cine_Q_last_step){

                if(current_q_state !== 'last'){
                    cine_Q_first_wrap.stop(true,true).fadeOut(200)
                    cine_Q_last_wrap.stop(true,true).fadeIn(200)
                    current_q_state = 'last'
                }

                let q_progress = (progress * cine_all_step - (cine_all_step - cine_Q_last_step)) / cine_Q_last_step
                q_progress = Math.max(0, Math.min(1, q_progress))

                let width = cine_Q_mid + (cine_Q_end - cine_Q_mid) * q_progress
                let opacity = 1 - q_progress

                cine_Q_last.css({
                    width: width + 'vw',
                    opacity: opacity
                })

                $('.footer').css({
                    opacity: 1 - opacity
                })

                cine_area_name.css({
                    backgroundColor: `rgba(0,0,0,${opacity})`
                })
            }

            //   둘 다 아닌 구간 (이게 핵심 해결)
            else{
                if(current_q_state !== ''){
                    cine_Q_first_wrap.stop(true,true).fadeOut(200)
                    cine_Q_last_wrap.stop(true,true).fadeOut(200)
                    current_q_state = ''
                }

                cine_Q_first.css({ width: cine_Q_start + 'vw' })
                cine_Q_last.css({ width: cine_Q_mid + 'vw', opacity: 1 })

                $('.footer').css({ opacity: 0 })

                cine_area_name.css({
                    backgroundColor: 'rgba(0,0,0,1)'
                })
            }
        }
        cine_chk()

        $(window).scroll(function(){
            scrolling = $(window).scrollTop()
            cine_chk()
        })
    }

    
    


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