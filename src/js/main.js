//show and hide header intro section
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

// Infinte txt animation
var colors = ["#f38630","#6fb936", "#ccc", "#6fb936"];

gsap.set(".box", {
  backgroundColor: (i) => colors[i % colors.length],
  x: (i) => i * 50
});

gsap.to(".box", {
  duration: 5,
  ease: "none",
  x: "+=500", //move each box 500px to right
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % 500) //force x value to be between 0 and 500 using modulus
  },
  repeat: -1
});
//END END END

function refresh() {
	var newScrollTop = window.pageYOffset || document.documentElement.scrollTop;

	if (newScrollTop > 300) {
		hide();
	} else if (newScrollTop < 400) {
		show();
	}
	//  else if (newScrollTop < 10) {
	// 	show()
	// 	TweenLite.to(".nav", .4, { 
	// 		backgroundColor: "transparent"
	// 	}, 0);
	// }
	// else if (newScrollTop < currentScrollTop) {
	// 	show();
	// 	TweenLite.to(".nav", .4, { backgroundColor: "rgba(241,241,241, 0.7)" }, 0);
	// }
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

function leaveAnimation(e) {
	return new Promise(async resolve => {
		const elements = e.querySelectorAll("section");
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
		const elements = e.querySelectorAll("section");
		gsap.from(elements, {
			duration: .5,
			y: 60,
			opacity: 0,
			ease: "power2.inOut",
			stagger: 0.3
		})
		.then(resolve());
	});
}
barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});
barba.init({
	debug: true,
	transitions: [
		{
			sync: false,
			leave: ({ current }) =>
			leaveAnimation(current.container.querySelector("main")),
			once: ({ next }) => enterAnimation(next.container.querySelector("main")),
			enter: ({ next }) => enterAnimation(next.container.querySelector("main"))
		}
	]
});