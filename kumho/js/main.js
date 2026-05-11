/****************************
 * main.js는 메인페이지에서만 구동되는 스크립트임
 ***************************/ 
$(document).ready(function(){
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싸는 요소의 class명 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: false,  //이게 false여야 마우스로 넘겼다가 떼도 swiper가 자동재생됨!!!
        },
        effect: "fade", /* fade 효과 */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    });




    let tab_list = $('.exhibition .tab_list ul li')
    let tab_name

    tab_list.on('click', function(){
        tab_list.removeClass('active')
        tab_list.attr('aria-selected', 'false')
        tab_list.find('button em').text('')
        $(this).addClass('active')
        $(this).attr('aria-selected', 'true')
        $(this).find('button em').text('선택됨')
        tab_name = $(this).attr('aria-controls')
        // console.log(tab_name)
        $('.exhibition .tab_conts .tab_item').removeClass('active')
        $('.exhibition .tab_conts').find('#' + tab_name).addClass('active')
        
        $('.exhibition .tab_conts .tab_item.active swiper-wrapper').swiper('setPosition')
    })

    const exh01_swiper = new Swiper('.exhibition #exh_conts01 .swiper', { /* 팝업을 감싸는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 12, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 840 ~ 769px 적용 */
                slidesPerView: 2,
                spaceBetween: 12,
            },
            841: {  /* 1024 ~ 841 사이 */
                slidesPerView: 'auto',      /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            1025: { /* 1025 이상 */
                slidesPerView: 1,
                spaceBetween: 0,
            },
        },
        loop: false,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: "slide",   /* fade 효과 끔 - 반응형 때문 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.exhibition #exh_conts01 .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },
    });

    
    const exh02_swiper = new Swiper('.exhibition #exh_conts02 .swiper', { /* 팝업을 감싸는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 12, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {
                slidesPerView: 2,
                spaceBetween: 12,
            },
            841: {
                slidesPerView: 'auto',
                spaceBetween: 12,
            },
            1025: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        },
        loop: false,
        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: "slide",
        
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.exhibition #exh_conts02 .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },
    });
        
    const exh03_swiper = new Swiper('.exhibition #exh_conts03 .swiper', { /* 팝업을 감싸는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 12, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {
                slidesPerView: 2,
                spaceBetween: 12,
            },
            841: {
                slidesPerView: 'auto',
                spaceBetween: 12,
            },
            1025: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        },
        loop: false,
        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: "slide",
        
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.exhibition #exh_conts03 .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },
    });



    $('.program .pro_wrap .pro_right .list_wrap ul li a').on('click', function(e){
        e.preventDefault() // a 태그 클릭 시 스크롤이 위로 튀는 현상 방지

        // 클릭한 a 태그의 부모 li 요소와 그 순서(index) 가져오기
        let clicked_li = $(this).parent('li')
        let idx = clicked_li.index() // 0, 1, 2, 3 ...

        $('.program .pro_wrap .pro_right .list_wrap ul li').removeClass('active')
        $('.program .pro_wrap .pro_right .text_wrap ul li').removeClass('active')
        $('.program .pro_wrap .pro_left .photo').removeClass('active')

        clicked_li.addClass('active')
        $('.program .pro_wrap .pro_right .text_wrap ul li').eq(idx).addClass('active')
        $('.program .pro_wrap .pro_left .photo').eq(idx).addClass('active')
    });



    // 1. 공통으로 사용할 변경 함수 (타겟 인덱스 삭제)
    function collection_change(swiper_id) {
        // curr_cont는 하나뿐이므로 eq() 없이 바로 선택합니다.
        let $target = $('.collection .tab_wrap .tab_list .curr_cont');
        
        // loop: true 일 때 복제된 슬라이드까지 잡히지 않도록 .first() 추가
        let $source = $(swiper_id + ' .swiper-slide-active .text_info').first();
        
        // 기존 값을 지우고 복사본을 넣은 뒤, CSS에서 보이도록 active 클래스를 강제로 추가합니다.
        $target.empty().append($source.clone()).addClass('active');
    }

    // 2. 스와이퍼 선언 부분
    const collect01_swiper = new Swiper('.collection #collect_conts01 .swiper', { 
        slidesPerView: 'auto', //425 이하부터
        spaceBetween: 6, 
        breakpoints: {
            426: { //1024~426
                slidesPerView: 'auto',
                 spaceBetween: 12 
            },
            1025: { //1025 이상
                slidesPerView: 'auto',
                 spaceBetween: 24 
            },
        },
        loop: true, 
        navigation: {
            nextEl: '.collection #collect_conts01 .btn_wrap .next',
            prevEl: '.collection #collect_conts01 .btn_wrap .prev',
        },
        observer: true,       
        observeParents: true, 
        on: {
            init: function() { 
                // 현재 활성화된 탭이 첫 번째 탭일 때만 텍스트 적용
                if($('#collect_tab01').hasClass('active')){
                    collection_change('#collect_conts01'); 
                }
            },
            slideChangeTransitionEnd: function() { 
                if($('#collect_tab01').hasClass('active')){
                    collection_change('#collect_conts01'); 
                }
            }
        }
    });

    const collect02_swiper = new Swiper('.collection #collect_conts02 .swiper', { 
        slidesPerView: 'auto', //425 이하부터
        spaceBetween: 6, 
        breakpoints: {
            426: { //1024~426
                slidesPerView: 'auto',
                 spaceBetween: 12 
            },
            1025: { //1025 이상
                slidesPerView: 'auto',
                 spaceBetween: 24 
            },
        },
        loop: true, 
        navigation: {
            nextEl: '.collection #collect_conts02 .btn_wrap .next',
            prevEl: '.collection #collect_conts02 .btn_wrap .prev',
        },
        observer: true,       
        observeParents: true, 
        on: {
            init: function() { 
                // 현재 활성화된 탭이 두 번째 탭일 때만 텍스트 적용
                if($('#collect_tab02').hasClass('active')){
                    collection_change('#collect_conts02'); 
                }
            },
            slideChangeTransitionEnd: function() { 
                if($('#collect_tab02').hasClass('active')){
                    collection_change('#collect_conts02'); 
                }
            }
        }
    });

    // 3. 탭 클릭 이벤트 선언부
    let coll_tab_list = $('.collection .tab_list ul li');
    let coll_tab_name;

    coll_tab_list.on('click', function(){
        let tab_idx = $(this).index(); // 클릭한 탭이 몇 번째인지 확인

        // 탭 버튼 활성화 변경
        coll_tab_list.removeClass('active').attr('aria-selected', 'false');
        coll_tab_list.find('button em').text('');
        
        $(this).addClass('active').attr('aria-selected', 'true');
        $(this).find('button em').text('선택됨');

        // 탭 콘텐츠(스와이퍼 영역) 변경
        coll_tab_name = $(this).attr('aria-controls');
        $('.collection .tab_conts .tab_item').removeClass('active');
        $('#' + coll_tab_name).addClass('active');

        // [핵심] 탭이 눌렸을 때, 하나뿐인 curr_cont에 각 스와이퍼의 정보를 복사
        if (tab_idx === 0) {
            collect01_swiper.update();
            collection_change('#collect_conts01'); // 1번 스와이퍼 데이터 갱신
        } else if (tab_idx === 1) {
            collect02_swiper.update();
            collection_change('#collect_conts02'); // 2번 스와이퍼 데이터 갱신
        }
    });

    

    $('.business .list .swiper-slide:nth-child(even)').addClass('even-slide');
    const business_swiper = new Swiper('.business .swiper', { /* 팝업을 감싸는 요소의 class명 */
        
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 6, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            426: {    /* 426~651px 사이 */
                slidesPerView: 2,
                spaceBetween: 6,
            },
            651: {    /* 950~651px 사이 */
                slidesPerView: 'auto',
                spaceBetween: 12,
            },
            951: {    /* 951 이상 */
                slidesPerView: 3,
                spaceBetween: 12,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 1000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
            this.el.addEventListener('mouseenter', () => {
                this.autoplay.stop();
            });
            this.el.addEventListener('mouseleave', () => {
                this.autoplay.start();
            });
            },
        },
    });

    

    AOS.init({
        offset: 300, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 500, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });


})//$(document).ready
