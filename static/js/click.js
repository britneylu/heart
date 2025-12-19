(function (window, document) {

    const hearts = [];

    function animateHearts() {
        for (let i = 0; i < hearts.length; i++) {
            const heart = hearts[i];

            if (heart.alpha <= 0) {
                document.body.removeChild(heart.element);
                hearts.splice(i, 1);
                i--;
            } else {
                heart.y--;
                heart.scale += 0.004;
                heart.alpha -= 0.013;

                heart.element.style.cssText =
                    "left:" + heart.x + "px;" +
                    "top:" + heart.y + "px;" +
                    "opacity:" + heart.alpha + ";" +
                    "transform: scale(" + heart.scale + ") rotate(45deg);" +
                    "background:" + heart.color + ";" +
                    "z-index: 10";
            }
        }

        requestAnimationFrame(animateHearts);
    }

    function bindClickHandler() {
        const previousClick = typeof window.onclick === "function" && window.onclick;

        window.onclick = function (event) {
            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "BUTTON"
            ) return;

            previousClick && previousClick();
            createHeart(event);
        };
    }

    function createHeart(event) {
        const heartElement = document.createElement("div");
        heartElement.className = "heart";

        hearts.push({
            element: heartElement,
            x: event.clientX - 5,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: getRandomColor()
        });

        document.body.appendChild(heartElement);
    }

    function injectStyles(cssText) {
        const style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(cssText));
        document.head.appendChild(style);
    }

    function getRandomColor() {
        return `rgb(
      ${~~(255 * Math.random())},
      ${~~(255 * Math.random())},
      ${~~(255 * Math.random())}
    )`;
    }

    window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (fn) {
            setTimeout(fn, 1000 / 60);
        };

    injectStyles(`
    .heart {
      width: 10px;
      height: 10px;
      position: fixed;
      background: red;
      transform: rotate(45deg);
    }
    .heart::before,
    .heart::after {
      content: '';
      width: inherit;
      height: inherit;
      background: inherit;
      border-radius: 50%;
      position: fixed;
    }
    .heart::before { left: -5px; }
    .heart::after { top: -5px; }
  `);

    bindClickHandler();
    animateHearts();

})(window, document);
