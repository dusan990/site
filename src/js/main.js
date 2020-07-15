// Hide show header
var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop,
	isVisible = true;

function show(){
	if(!isVisible){
		TweenLite.to("#header", .4, { y: "0%", opacity: 1 }, 0);
		// TweenLite.to(".intro-section h1", .4, { y: "0%",opacity: 1}, 0);
		isVisible = true;
	}
}
function hide(){
	if(isVisible){
		TweenLite.to("#header", .4, { y: "-100%", opacity: 0 }, 0);
		// TweenLite.to(".intro-section h1", .4, { y: "-30%", opacity: 0}, 0);
		isVisible = false;
	}
}
//END END END

function refresh() {
	var newScrollTop = window.pageYOffset || document.documentElement.scrollTop;

	if (newScrollTop > 300) {
		hide();
	} else if (newScrollTop < 400) {
		show();
	}
}
window.addEventListener("scroll", refresh, {
	passive: true
});
refresh();
//end

// Function to add and remove the page transition screen
// function pageTransition() {
// 	var tl = gsap.timeline();
// 	tl.set('.loading-screen', { transformOrigin: "bottom left"});
// 	tl.to('.loading-screen', { duration: .5, scaleY: 1});
// 	tl.to('.loading-screen', { duration: .5, scaleY: 0, skewX: 0, transformOrigin: "top left", ease: "power1.out", delay: 1 });
// }

// Function to animate the content of each page
// function contentAnimation() {
// 	var tl = gsap.timeline();
// 	tl.from('.is-animated', { duration: .8, translateY: 10, opacity: 0, stagger: 0.4 });
// 	tl.from('.main-navigation', { duration: .8, translateY: -10, opacity: 0});

// 	$('.green-heading-bg').addClass('show');
// }
const burgerMenu = document.getElementsByClassName('burger-menu')[0];
const main = document.querySelectorAll('main')[0];
const footer = document.querySelectorAll('footer')[0];
// const closeButton = document.getElementsByClassName('close_link')[0];
// const burgerAnimation = new TimelineMax({
// 	paused: true,
// 	progress: 0
// })
// .to('.menu_link', 0.3, {
// 	opacity: 1,
// 	visibility: 'visible',
// }, "+= 1")
// .to('.burger-menu-line1', 0.3, {
// 	rotate: '45deg',
// 	y: '4px',
// 	top: '28px',
// 	backgroundColor: 'white'
// }, "+= 1")
// .to('.burger-menu-line2', 0.3, {
// 	rotate: '-45deg',
// 	y: '-6px',
// 	top: '28px',
// 	backgroundColor: 'white'
// }, "+= 1")
// .to('.menu_overlay', 0.6, {
// 	opacity: 1,
// 	visibility: 'visible',
// 	ease: "power4.inOut"
// }, 0)
// .to('.nav', 0, {
// 	backgroundColor: 'transparent'
// }, 0)
// .staggerTo('.menu_primary li a', 0.7, {
// 	delay: -0.4,
// 	translateY: 0,
// 	opacity: 1,
// 	ease: "power4.inOut"
// }, 0.05);

// const body = document.getElementsByTagName('body')[0];
// function animationProgress() {
// 	if (burgerAnimation.progress() === 0) {
// 		burgerAnimation.play();
// 		body.classList.add('overflow');
// 	} else {
// 		burgerAnimation.reverse();
// 		body.classList.remove('overflow');
// 	}
// }
// function burgerMotion(e) {
// 	e.addEventListener('click', function () {
// 		animationProgress()
// 	});
// }
// burgerMotion(burgerMenu);

document.body.addEventListener("mousemove", evt => {
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;

    gsap.set(".cursor", {
		x: mouseX,
        y: mouseY
    })
})

const hoverSpanContainer = document.getElementsByClassName("hoverSpanContainer")[0],
linkSensilia = document.getElementsByClassName("linkSensilia"),
linkNorw = document.getElementsByClassName("linkNorw"),
linkRandom = document.getElementsByClassName("linkRandom"),
linkLogofolio = document.getElementsByClassName("linkLogofolio"),

hoverLogofolio = document.getElementsByClassName("hoverLogofolio"),
hoverSensilia = document.getElementsByClassName("hoverSensilia"),
hoverNorw = document.getElementsByClassName("hoverNorw"),
hoverRandom = document.getElementsByClassName("hoverRandom");

function hoverText(eleHover, eleImg) {
	eleHover[0].addEventListener("pointerenter", function (e) {
		TweenMax.to(eleImg[0], 0.3, { scale: 1, opacity: 1, zIndex: 100 });
		positionCircle(e);
	});
	eleHover[0].addEventListener("pointerleave", function (e) {
		TweenMax.to(eleImg[0], 0.3, { scale: 0, opacity: 0, zIndex: 0 });
		positionCircle(e);
	});
	eleHover[0].addEventListener("pointermove", function (e) {
		positionCircle(e);
	});

	TweenMax.set(eleImg[0], { scale: 0, xPercent: -50, yPercent: -50 });

	// function positionCircle(e) {
	// 	var relX = e.pageX - hoverSpanContainer.offsetLeft;
	// 	var relY = e.pageY - hoverSpanContainer.offsetTop;
	// 	TweenMax.to(eleImg[0], 0.3, { x: relX, y: relY });
	// }
}

barba.hooks.afterEnter(() => {
	window.scrollTo(0, 0);
	hoverText(linkSensilia, hoverSensilia);
	hoverText(linkLogofolio, hoverLogofolio);
	hoverText(linkNorw, hoverNorw);
	hoverText(linkRandom, hoverRandom);
});

function leaveAnimation(e) {
	return new Promise(async resolve => {
		const elements = e.querySelectorAll(".animate");
		await gsap.to(elements, {
			duration: .5,
			y: -60,
			opacity: 0,
			ease: "power2.inOut",
			stagger: 0.3
		})
		.then();
		resolve()
	});
}

function enterAnimation(e) {
	return new Promise(resolve => {
		const elements = e.querySelectorAll(".animate");
		gsap.from(elements, {
			duration: .5,
			y: 60,
			opacity: 0,
			ease: "power2.inOut",
			stagger: 0.3,
		})
		.then(resolve());
	});
}

barba.init({
	debug: true,
	preventRunning: true,
	transitions: [{
		// sync: false,
		leave: ({ current }) =>
			leaveAnimation(current.container),

		enter: ({ next }) =>
			enterAnimation(next.container),
	}]
});

// Scrollbar.initAll();