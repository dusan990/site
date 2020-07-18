var mouse = { x: 0, y: 0 };
var pos = { x: 0, y: 0 };
var ratio = 0.15;
var active = false;
var ball = document.getElementById("ball");

TweenLite.set(ball, { xPercent: -50, yPercent: -50 });

document.addEventListener("mousemove", mouseMove);

function mouseMove(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}

TweenLite.ticker.addEventListener("tick", updatePosition);

function updatePosition() {
	if (!active) {
		pos.x += (mouse.x - pos.x) * ratio;
		pos.y += (mouse.y - pos.y) * ratio;

		TweenLite.set(ball, { x: pos.x, y: pos.y });
	}
}

$(".icon-wrap").mouseenter(function(e) {
	TweenMax.to(this, 0.3, { scale: 2 });
	TweenMax.to(ball, 0.3, { scale: 2 });
	active = true;
});

$(".icon-wrap").mouseleave(function(e) {
	TweenMax.to(this, 0.3, { scale: 1 });
	TweenMax.to(ball, 0.3, { scale: 1 });
	TweenMax.to(this.querySelector(".button-icon"), 0.3, { x: 0, y: 0 });
	active = false;
});

$(".icon-wrap").mousemove(function(e) {
	parallaxCursor(e, this, 3);
	callParallax(e, this);
});

function callParallax(e, parent) {
	parallaxIt(e, parent, parent.querySelector(".button-icon"), 10);
}

function parallaxIt(e, parent, target, movement) {
	var boundingRect = parent.getBoundingClientRect();
	var relX = e.pageX - boundingRect.left;
	var relY = e.pageY - boundingRect.top;

	TweenMax.to(target, 0.3, {
		x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
		y: (relY - boundingRect.height / 2) / boundingRect.height * movement,
		ease: Power2.easeOut
	});
}

function parallaxCursor(e, parent, movement) {
	var rect = parent.getBoundingClientRect();
	var relX = e.pageX - rect.left;
	var relY = e.pageY - rect.top;
	pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
	pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
	TweenMax.to(ball, 0.3, { x: pos.x, y: pos.y });
}