$(document).ready(function(){
    
    let device_status //브라우저 상태 -> pc인지 모바일인지
    let mobile_size = 768 //모바일 사이즈
    let window_w  //브라우저 넓이

    let scrolling   //현재 스크롤된 값
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

    let gnb = $('.header .gnb')
    let gnb_open = $('.header .gnb .gnb_open')
    let gnb_close = $('.header .gnb .gnb_wrap .gnb_close')
    
    let depth1 = $('.header .gnb .gnb_wrap ul.depth1 > li')
    let depth2 = $('.header .gnb .gnb_wrap ul.depth1 > li > ul.depth2')

    gnb_open.on('click focusin', function(){
        gnb.addClass('open')
        if(device_status == 'pc'){
            depth2.removeAttr('style')
        }
        menuOpen()
    })
    gnb_close.on('click focusin', function(){
        gnb.removeClass('open')
        if(device_status == 'mo'){
            depth1.removeClass('open')
            depth2.hide()
        }
        menuClose()
    })

    depth1.on('click', function(){
        if(device_status == 'mo'){
            depth1.removeClass('open')
            depth2.hide()
            $(this).addClass('open')
            $(this).find('ul.depth2').show()
        }
    })


    function menuOpen() {
        $('html, body').on('scroll.menuLock touchmove.menuLock mousewheel.menuLock', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }

    function menuClose() {
        $('html, body').off('.menuLock');
    }
    
   
    function header_fixed(){
        scrolling = $(window).scrollTop()
        move_scroll = prev_scroll - scrolling   // 마이너스가 내려가는 중 / 플러스가 올라가는 중
        
        if(scrolling > 0){
            $('.header').addClass('fixed')
            if(gnb.hasClass('open')){
                $('.header').removeClass('hide')
            }else{
                if(move_scroll > 0){   // +++++  -> 올라가는 중
                    $('.header').removeClass('hide')
                }else{   // ---- -> 내려가는 중
                    $('.header').addClass('hide')
                }
            }
        }else{
            $('.header').removeClass('fixed hide')
        }
        prev_scroll = scrolling
    }
    
    header_fixed()  //로딩되고 단 한 번 실행
    $(window).scroll(function(){  //스크롤 될 때마다 실행
        header_fixed()
    })



})