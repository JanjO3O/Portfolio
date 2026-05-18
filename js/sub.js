$(document).ready(function(){
    $(function(){

        let currentPage = window.location.pathname.split('/').pop();

        $('.header .gnb ul li').removeClass('active');

        $('.header .gnb ul li a').each(function(){

            let linkPage = $(this).attr('href').split('/').pop();

            if(currentPage === linkPage){

                $(this).closest('li').addClass('active');

            }

        });

    });


    $(window).on('pointermove mousemove touchmove', function(e){  /* html cursor가 마우스 포인터를 따라다니게 하는 값 */
        $('.cursor').css('left', e.pageX + 'px');
        $('.cursor').css('top', e.pageY + 'px');
    });
    $('.visual .inner a').hover(function(){ /* 특정한 요소에 마우스를 올렸을때만 on 클래스 주기 */
        $('.cursor').toggleClass('on');
    });

})