function Game(view) {
    let graphics = new Graphics(view);

    let data = {};
    let input = new Input(view, data);

    this.start = function() {
        data.currentLevel = localStorage.getItem('level') || 0;
        localStorage.setItem('level', data.currentLevel);

        data.board = BoardCreator.create();

        input.listen();
        gameLoop();
    }

    function gameLoop() {
        window.requestAnimationFrame(gameLoop);
        calculateFps();
        graphics.update(data);
    };

    function calculateFps() {
        let now = Date.now();
        data.lastFrame = data.lastFrame || now;
        data.frameHistory = data.frameHistory || [];
        if(data.frameHistory.length >= 50) {
            data.frameHistory.shift();
        }
        data.frameHistory.push(now - data.lastFrame);
        data.lastFrame = now;
        data.fps = 0;
        for(let i = 0; i < data.frameHistory.length; i++) {
            data.fps += data.frameHistory[i];
        }
        data.fps = Math.round(1000 / (data.fps / data.frameHistory.length));
    }
}
