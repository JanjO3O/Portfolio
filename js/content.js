$(document).ready(function(){

	const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */
		autoScrolling:true, /* 한페이지씩 스크롤 */
		scrollHorizontally: true,
		verticalCentered: true, /* 컨텐츠 요소 위아래 가운데 */
		scrollOverflow: false, /* 컨텐츠가 넘쳐도 스크롤 금지 */

		afterLoad: function(origin, destination, direction, trigger){

		if(destination.index == 0){
			$('body').removeClass('design_active')
			$('body').removeClass('nonghyup_active')
			$('.header .home.cineq a, .header .home.nonghyup a').removeClass('active')
			$('.header .gnb.nonghyup ul li a').removeClass('active')
			console.log('1번째')
		}else if(destination.index == 1){
			$('body').addClass('design_active')
			$('.header .home.cineq a, .header .home.nonghyup a').addClass('active')
			$('.header .gnb.nonghyup ul li a').addClass('active')
			console.log('2번째')
		}else if(destination.index == 2){
			$('body').removeClass('design_active')
			$('body').addClass('nonghyup_active')
			$('.header .home.cineq a').removeClass('active')
			$('.header .home.nonghyup a').addClass('active')
			$('.header .gnb.nonghyup ul li a').addClass('active')
			console.log('3번째')
		}else if(destination.index == 3){
			$('body').removeClass('nonghyup_active')
			$('body').removeClass('design_active')
			$('.header .home.cineq a, .header .home.nonghyup a').removeClass('active')
			$('.header .gnb.nonghyup ul li a').removeClass('active')
			console.log('4번째')
		}
	}
		
	});



	$(window).on('pointermove mousemove touchmove', function(e){  /* html cursor가 마우스 포인터를 따라다니게 하는 값 */
		$('.cursor').css('left', e.pageX + 'px');
		$('.cursor').css('top', e.pageY + 'px');
	});
	$('.visual .inner a').hover(function(){ /* 특정한 요소에 마우스를 올렸을때만 on 클래스 주기 */
		$('.cursor').toggleClass('on');
	});


	

})