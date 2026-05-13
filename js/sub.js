$(document).ready(function(){
    $(function(){

        let currentPage = window.location.pathname.split("/").pop();

        $('.header .gnb ul li').removeClass('active');

        $('.header .gnb ul li a').each(function(){

            let linkPage = $(this).attr('href');

            if(currentPage === linkPage){

                $(this).parent('li').addClass('active');

            }

        });

    });

})