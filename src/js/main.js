const burgerMenu = document.getElementsByClassName('burgerMenu')[0];
const closeButton = document.getElementsByClassName('close_link')[0];
const burgerMenuLine = document.getElementsByClassName('burgerMenu_line');
const burgerAnimation = new TimelineMax({
	paused: true,
	progress: 0
})
.to(burgerMenuLine[0], .3, {
    rotate: '45deg', top: '28px'
}, "+= 1")
.to(burgerMenuLine[1], .3, {
    x: '+=100', opacity: 0
}, "+= 1")
.to(burgerMenuLine[2], .3, {
    rotate: '-45deg', top: '28px'
}, "+= 1")

.to('.header_overlay', .6, {
	opacity: 1,
	visibility: 'visible',
	ease: "power4.inOut"
}, 0)
.staggerFromTo([".header_overlay__nav p", ".header_overlay__nav a, .header_overlay__contact"], .4, {
	translateY: 20,
	opacity: 0,
	ease: "power4.inOut"
}, {
	translateY: 0,
	opacity: 1,
	ease: "power4.inOut"
}, 0.05 );

// if(burgerMenu.clicked == true) {
//    alert("button was clicked");
// }

const body = document.getElementsByTagName('body')[0];
const logo = document.getElementsByClassName('logo')[0];
const navLink = document.getElementsByClassName('navLink');
function animationProgress() {
	if (burgerAnimation.progress() === 0) {
		burgerAnimation.play();
		// body.classList.add('overflow');
	} else if (burgerAnimation.progress() === 1) {
		burgerAnimation.reverse();
		// body.classList.remove('overflow');
	} 
}
function burgerMotion(e) {
	e.addEventListener('click', function () {
		animationProgress()
	});
}
burgerMotion(burgerMenu)

// document.body.addEventListener("mousemove", evt => {
//     const mouseX = evt.clientX;
//     const mouseY = evt.clientY;

//     gsap.set(".cursor", {
// 		x: mouseX,
//         y: mouseY
//     })
// })

// const hoverSpanContainer = document.getElementsByClassName("hoverSpanContainer")[0],
// linkSensilia = document.getElementsByClassName("linkSensilia"),
// linkNorw = document.getElementsByClassName("linkNorw"),
// linkRandom = document.getElementsByClassName("linkRandom"),
// linkLogofolio = document.getElementsByClassName("linkLogofolio"),

// hoverLogofolio = document.getElementsByClassName("hoverLogofolio"),
// hoverSensilia = document.getElementsByClassName("hoverSensilia"),
// hoverNorw = document.getElementsByClassName("hoverNorw"),
// hoverRandom = document.getElementsByClassName("hoverRandom");

// function hoverText(eleHover, eleImg) {
// 	eleHover[0].addEventListener("pointerenter", function (e) {
// 		TweenMax.to(eleImg[0], 0.3, { scale: 1, opacity: 1, zIndex: 100 });
// 		positionCircle(e);
// 	});
// 	eleHover[0].addEventListener("pointerleave", function (e) {
// 		TweenMax.to(eleImg[0], 0.3, { scale: 0, opacity: 0, zIndex: 0 });
// 		positionCircle(e);
// 	});
// 	eleHover[0].addEventListener("pointermove", function (e) {
// 		positionCircle(e);
// 	});

// 	TweenMax.set(eleImg[0], { scale: 0, xPercent: -50, yPercent: -50 });

// 	function positionCircle(e) {
// 		var relX = e.pageX - hoverSpanContainer.offsetLeft;
// 		var relY = e.pageY - hoverSpanContainer.offsetTop;
// 		TweenMax.to(eleImg[0], 0.3, { x: relX, y: relY });
// 	}
// }

barba.hooks.afterEnter(() => {
	window.scrollTo(0, 0);
	// hoverText(linkSensilia, hoverSensilia);
	// hoverText(linkLogofolio, hoverLogofolio);
	// hoverText(linkNorw, hoverNorw);
	// hoverText(linkRandom, hoverRandom);
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
	// debug: true,
	preventRunning: true,
	transitions: [{
		// sync: false,
		leave: ({ current }) =>
			leaveAnimation(
				current.container, 
				burgerAnimation.reverse()
			),

		enter: ({ next }) =>
			enterAnimation(next.container),
	}]
});

// Scrollbar.initAll();