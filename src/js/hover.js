document.body.addEventListener("mousemove", evt => {
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;

    gsap.set(".cursor", {
        x: mouseX - 150,
        y: mouseY - 150
    })

    // gsap.to(".shape", {
    //     x: mouseX,
    //     y: mouseY,
    //     stagger: -0.2
    // })
})

const hoverSpanContainer = document.getElementsByClassName("hoverSpanContainer")[0],
hoverSpan = document.getElementsByClassName("hoverSpan"),
cursor = document.getElementsByClassName("cursor");

function hoverText(eleHover, eleImg) {
    eleHover[0].addEventListener("pointerenter", function (e) {
        TweenMax.to(eleImg[0], 0.3, { scale: 1, opacity: 1 });
        // positionCircle(e);
    });
    eleHover[0].addEventListener("pointerleave", function (e) {
        TweenMax.to(eleImg[0], 0.3, { scale: 0, opacity: 0 });
        // positionCircle(e);
    });
    eleHover[0].addEventListener("pointermove", function (e) {
        // positionCircle(e);
    });

    TweenMax.set(eleImg[0], { scale: 0, xPercent: -0, yPercent: -0 });

    // function positionCircle(e) {
    //     var relX = e.pageX - hoverSpanContainer.offsetLeft;
    //     var relY = e.pageY - hoverSpanContainer.offsetTop;
    //     // TweenMax.to(eleImg[0], 0.3, { x: relX, y: relY });
    // }
}

hoverText(hoverSpan, cursor);