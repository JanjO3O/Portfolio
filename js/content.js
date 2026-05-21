$(document).ready(function(){

	const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */
		autoScrolling:true, /* 한페이지씩 스크롤 */
		scrollHorizontally: true,
		verticalCentered: true, /* 컨텐츠 요소 위아래 가운데 */
		scrollOverflow: false, /* 컨텐츠가 넘쳐도 스크롤 금지 */

		afterLoad: function(origin, destination, direction, trigger){
			if(destination.index == 0){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				console.log('1번째')
			}else if(destination.index == 1){
			console.log('2번째')
			}else if(destination.index == 2){
			console.log('3번째')
			}else if(destination.index == 3){
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