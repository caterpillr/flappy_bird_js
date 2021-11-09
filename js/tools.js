var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;

function tick() {
    var time = Date.now();
    frame++;
    if (time - startTime > 1000) {
        fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
        startTime = time;
        frame = 0;
    }
    window.requestAnimationFrame(tick);
}
document.addEventListener("DOMContentLoaded", tick)


<body translate="no">
    <span id="fps">41.7</span> FPS
<script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-157cd5b220a5c80d4ff8e0e70ac069bffd87a61252088146915e8726e5d9f147.js"></script>


<script id="rendered-js">
    var fps = document.getElementById("fps");
    var startTime = Date.now();
    var frame = 0;

    function tick() {
    var time = Date.now();
    frame++;
    if (time - startTime > 1000) {
    fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
    startTime = time;
    frame = 0;
}
    window.requestAnimationFrame(tick);
}
    tick();
    //# sourceURL=pen.js
</script>







</body>