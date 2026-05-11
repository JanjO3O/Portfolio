$(document).ready(function(){
    
    let lang_wrap = $('.header_wrap .header_banner .lang_wrap')
    let lang_list = $('.header_wrap .header_banner .lang_wrap .lang_list')
    let header_action = $('.header_wrap .header_banner .header_action')

    $(lang_wrap).on('click focusin', function(e){
        e.stopPropagation()
        $(this).addClass('open')
        $(this).find(lang_list).show()
    })
    $(lang_list).find('li > a').on('click', function(e){
        e.stopPropagation()
        lang_wrap.removeClass('open')
        lang_list.hide()
    })
    $(header_action).on('focusin', function(){
        lang_wrap.removeClass('open')
        lang_list.hide()
    })


    let gnb = $('.header_wrap .header_bot .gnb')
    let depth1_li = $('.header_wrap .header_bot .gnb ul.depth1 > li')
    let depth2_bg = $('.header_wrap .header_bot .gnb .depth2_bg')

    depth1_li.on('mouseenter', function(){
        depth1_li.removeClass('over')
        $(this).addClass('over')
        depth2_bg.stop().slideDown()
    })
    gnb.on('focusin', function(e){
        let li = $(e.target).closest('ul.depth1 > li')
        depth1_li.removeClass('over')
        li.addClass('over')
        $('.depth2_bg').stop().slideDown()
    })
    gnb.on('mouseleave', function(){
        depth1_li.removeClass('over')
        depth2_bg.stop().slideUp()
    })
    $('.header_wrap .header_bot .search_wrap').on('focusin', function(){
        depth1_li.removeClass('over')
        depth2_bg.stop().slideUp()
    })



    let header_hidden = $('.header_wrap').hasClass('hide')
    if(header_hidden){
        $('.footer').css({
            opacity: 0
        })
    }
    
    let scrolling   //현재 스크롤된 값
    let prev_scroll = 0  //이전 스크롤 값
    let move_scroll  //얼마나 스크롤 되었는지 변화값
    function header_fixed(){
        scrolling = $(window).scrollTop()
        if(scrolling > 0){
            $('.header_wrap').addClass('fixed')
            move_scroll = prev_scroll - scrolling   // 마이너스가 내려가는 중 / 플러스가 올라가는 중
            if(move_scroll > 0){   // +++++  -> 올라가는 중
                $('.header_wrap').removeClass('hide')
            }else{   // ---- -> 내려가는 중
                $('.header_wrap').addClass('hide')
            }
        }else{
            $('.header_wrap').removeClass('fixed')
        }
        prev_scroll = scrolling
    }
    
    header_fixed()  //로딩되고 단 한 번 실행
    $(window).scroll(function(){  //스크롤 될 때마다 실행
        header_fixed()
    })
    

    let gnb_open = $('.header_wrap .header .mo_gnb .mo_header .gnb_open')
    let gnb_close = $('.header_wrap .site_map .gnb_wrap .gnb_box .gnb_close')
    let site_map = $('.header_wrap .site_map')
    let mo_bg = $('.header_wrap .site_map .gnb_bg')
    let mo_depth1 = $('.header_wrap .site_map .gnb_wrap .gnb_box .gnb ul.depth1 > li')
    let mo_depth2 = $('.header_wrap .site_map .gnb_wrap .gnb_box .gnb ul.depth1 > li > ul.depth2')

    gnb_open.on('click', function(){
        site_map.addClass('open')
    })
    gnb_close.on('click', function(){
        site_map.removeClass('open')
        mo_depth1.removeClass('active')
        mo_depth1.removeClass('n_active')
        mo_depth2.slideUp()
    })
    mo_bg.on('click', function(){
        site_map.removeClass('open')
        mo_depth1.removeClass('active')
        mo_depth1.removeClass('n_active')
        mo_depth2.slideUp()
    })


    

    mo_depth1.on('click', function(){
        if($(this).hasClass('active') == true){ //내가 열린 경우
            $(this).removeClass('active')
            $(this).find('.depth2').slideUp() 
        }else{ //열려 있지 않은 다른 요소를 클릭했을때
            mo_depth1.removeClass('active')
            mo_depth2.slideUp()

            $(this).addClass('active')
            $(this).find('.depth2').slideDown()
        }
    })
    


})