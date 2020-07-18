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