$(document).ready(function(){

    const SWIPE_THRESHOLD = 30;
    const mainSections = Array.from(document.querySelectorAll('.full_area')); //fullapge로 구성할 영역의 이름
    const lastSection = mainSections[mainSections.length - 1];
    let touchStartY = 0;
    let lastTouchY = 0;
    let touchDirection = 0;
    let isSnapping = false;
    let currentSnapTween = null;
    let snapTweenStartTime = null;
    let currentTargetIndex = -1;
    let snapperActive = true;
    let horizontalActive = false;

    function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
        ScrollTrigger.refresh();
        if (isSnapping && currentTargetIndex >= 0) touchSnapToTarget(currentTargetIndex);
    }

    function touchSnapToTarget(targetIndex) {
        const panelTops = mainSections.map(section => section.offsetTop);
        if (targetIndex == null) {
            const scroll = Math.round(window.scrollY);
            let currentIndex = panelTops.findIndex(top => scroll < top);
            if (currentIndex == -1) {
                currentIndex = panelTops.length;
                if (touchDirection > 0 || scroll > lastSection.offsetTop + lastSection.offsetHeight) {
                    return;
                }
            }

            currentIndex--;
            targetIndex = Math.min(Math.max(currentIndex + touchDirection, 0), panelTops.length - 1);
        }

        currentTargetIndex = targetIndex;
        const target = panelTops[currentTargetIndex];
        if (target !== scroll) {
            snapTo(target, 0.4, 0, true);
        }
    }

    function snapTo(targetY, duration, resetDelay, blockOverflow = false, pauseScrollTrigger = false) {
        if (currentSnapTween?.isActive()) {
            currentSnapTween.kill();
            duration = Math.max(0, duration - (Date.now() - snapTweenStartTime) / 1000);
        }

        isSnapping = true;
        const isForward = targetY > window.scrollY;
        if (blockOverflow) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                document.body.style.overflow = '';
            }, duration / 2);
        }

        if (pauseScrollTrigger) ScrollTrigger.disable();
        snapTweenStartTime = Date.now();
        currentSnapTween = gsap.to(window, {
            scrollTo: targetY,
            duration: duration,
            ease: 'power2.out',
            onComplete: () => {
                if (pauseScrollTrigger) {
                    ScrollTrigger.enable();
                }

                setTimeout(() => {
                    isSnapping = false;
                }, resetDelay * 1000);
            }
        });
    }

    if (isMobileDevice()) {
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    }

    window.addEventListener('touchstart', (e) => {
        if (isSnapping) {
            if (e.cancelable) e.preventDefault();
            return;
        }
        touchStartY = lastTouchY = e.touches[0].clientY;
        touchDirection = 0;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        const currentY = e.touches[0].clientY;
        const delta = lastTouchY - currentY;
        if (Math.abs(delta) > 5) {
            touchDirection = delta > 0 ? 1 : 0;
        }

        lastTouchY = currentY;
        if (isSnapping && e.cancelable) e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
        if (isSnapping) {
            if (e.cancelable) e.preventDefault();
            return;
        }

        const deltaY = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
        touchSnapToTarget();
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) {
            const panelTops = mainSections.map(section => section.offsetTop);
            const scroll = Math.round(window.scrollY);
            const direction = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 :
                e.key === 'ArrowUp' || e.key === 'PageUp' ? -1 :
                    e.key === 'Home' ? -Infinity :
                        e.key === 'End' ? Infinity : 0;
            let currentIndex = panelTops.findIndex(top => scroll + (direction > 0 ? 0 : -1) < top);
            if (currentIndex === -1) {
                snapperActive = false;
                return;
            }

            e.preventDefault();
            let targetIndex;
            if (!snapperActive) {
                snapperActive = true;
                targetIndex = currentIndex;
            }

            else {
                if (direction > 0) {
                    currentIndex--;
                }

                if (direction === Infinity) {
                    targetIndex = panelTops.length - 1;
                } else if (direction === -Infinity) {
                    targetIndex = 0;
                } else {
                    targetIndex = Math.min(Math.max(currentIndex + direction, 0), panelTops.length - 1);
                }
            }

            snapTo(panelTops[targetIndex], 0.8, 0);
        }
    }, { passive: false });


    let worksIndex = 0;
    let worksMoving = false;
    let worksItems = $('.works_list > ul > li');
    let worksTotal = worksItems.length;
    let worksUl = $('.works_list > ul');

    function worksMove(index){
        worksMoving = true;
        worksIndex = index;

        gsap.to(worksUl, {
            x: -window.innerWidth * worksIndex,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: function(){
                worksMoving = false;
            }
        });
    }

    window.addEventListener('wheel', (e) => {
        const scroll = Math.round(window.scrollY);
        const direction = e.deltaY > 0 ? 1 : -1;
        const worksTop = $('.works_list').offset().top;

        if (scroll === Math.round(worksTop)) {
            e.preventDefault();

            if (worksMoving) return;

            if (direction > 0) {
                if (worksIndex < worksTotal - 1) {
                    worksMove(worksIndex + 1);
                    return;
                }
            } else {
                if (worksIndex > 0) {
                    worksMove(worksIndex - 1);
                    return;
                }
            }
        }
        
        if (isSnapping) {
            e.preventDefault();
            return;
        }

        
        const panelTops = mainSections.map(section => section.offsetTop);
        let currentIndex = panelTops.findIndex(top => scroll + (direction > 0 ? 0 : -1) < top);
        if (currentIndex == -1) {
            currentIndex = panelTops.length;
            if (direction > 0 || scroll > lastSection.offsetTop) {
                snapperActive = false;
                return;
            }
        }

        e.preventDefault();
        let targetIndex;
        if (!snapperActive) {
            snapperActive = true;
            targetIndex = currentIndex
        }

        else {
            if (direction > 0) {
                currentIndex--;
            }
            targetIndex = Math.min(Math.max(currentIndex + direction, 0), panelTops.length - 1);
        }

        const target = panelTops[targetIndex];
        if (target !== scroll) {
            snapTo(target, 0.8, 0.4);
        }
    }, { passive: false });



    $(function(){

        let secNav = $('.sec_nav')
        let navLi = $('.sec_nav > ul > li')
        let navA = $('.sec_nav > ul > li > a')

        secNav.hide()

        function navChk(){
            let scrollTop = $(window).scrollTop()
            let winH = $(window).height()

            if(scrollTop >= $('#about_me').offset().top - winH / 2){
                secNav.show()
            }else{
                secNav.hide()
            }

            navLi.removeClass('active')

            if(scrollTop >= $('#footer').offset().top - winH / 2){
                navLi.eq(3).addClass('active')
            }else if(scrollTop >= $('#works_list').offset().top - winH / 2){
                navLi.eq(2).addClass('active')
            }else if(scrollTop >= $('#about_me').offset().top - winH / 2){
                navLi.eq(1).addClass('active')
            }else{
                navLi.eq(0).addClass('active')
            }
        }

        navChk()

        $(window).on('scroll resize', function(){
            navChk()
        })

        navA.on('click', function(e){
            e.preventDefault()

            let href = $(this).attr('href')
            let moveTop = 0

            if(href === '#visual'){
                moveTop = $('#visual').offset().top
            }else if(href === '#about_me'){
                moveTop = $('#about_me').offset().top
            }else if(href === '#works_list'){
                moveTop = $('#works_list').offset().top

                // Works 클릭 시 무조건 첫 번째 프로젝트로 초기화
                worksIndex = 0
                worksMoving = false

                gsap.set(worksUl, {
                    x: 0
                })
            }else if(href === '#footer'){
                moveTop = $('#footer').offset().top
            }

            gsap.to(window, {
                scrollTo: moveTop,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: function(){
                    navChk()
                }
            })
        })

    })



})