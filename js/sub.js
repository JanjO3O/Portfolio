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


    

})