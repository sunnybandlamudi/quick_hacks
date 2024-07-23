function init() {
    // Check if controls already exist
    if (document.getElementById('videoSpeedControls')) return;

    // Get the video element
    const video = document.querySelector('video');
    if (!video) {
        alert('No video element found on this page.');
        return;
    }

    // Add styles for the controls
    const style = document.createElement('style');
    style.innerHTML = `
        #videoSpeedControls {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 10px;
            border-radius: 5px;
            cursor: move;
            z-index: 9999;
            pointer-events: auto;
        }
        #videoSpeedControls button {
            width: 40px;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            font-size: 18px;
            border-radius: 5px;
            transition: background-color 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            pointer-events: auto;
        }
        #videoSpeedControls button:hover {
            background-color: rgba(0, 0, 0, 0.9);
        }
        #speedDisplay {
            color: white;
            font-size: 14px;
            margin-left: 10px;
            white-space: nowrap;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Create controls container
    const controls = document.createElement('div');
    controls.id = 'videoSpeedControls';

    // Create control buttons
    const increaseSpeedBtn = document.createElement('button');
    increaseSpeedBtn.textContent = '+';
    const decreaseSpeedBtn = document.createElement('button');
    decreaseSpeedBtn.textContent = '-';
    const pauseBtn = document.createElement('button');
    pauseBtn.textContent = '⏸';

    // Create speed display
    const speedDisplay = document.createElement('div');
    speedDisplay.id = 'speedDisplay';
    speedDisplay.textContent = `Speed: ${video.playbackRate.toFixed(2)}`;

    // Append elements to controls container
    controls.appendChild(decreaseSpeedBtn);
    controls.appendChild(increaseSpeedBtn);
    controls.appendChild(pauseBtn);
    controls.appendChild(speedDisplay);
    document.body.appendChild(controls);

    // Update the speed display
    const updateSpeedDisplay = () => {
        speedDisplay.textContent = `Speed: ${video.playbackRate.toFixed(2)}`;
    };

    // Event listeners for speed control buttons
    increaseSpeedBtn.addEventListener('click', function() {
        video.playbackRate += 0.25;
        updateSpeedDisplay();
    });

    decreaseSpeedBtn.addEventListener('click', function() {
        if (video.playbackRate > 0.25) {
            video.playbackRate -= 0.25;
        } else {
            video.playbackRate = 0.25;
        }
        updateSpeedDisplay();
    });

    // Event listener for pause button
    pauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            pauseBtn.textContent = '⏸';
        } else {
            video.pause();
            pauseBtn.textContent = '▶';
        }
    });

    // Drag functionality
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (x, y) => {
        isDragging = true;
        offsetX = x - controls.getBoundingClientRect().left;
        offsetY = y - controls.getBoundingClientRect().top;
    };

    const drag = (x, y) => {
        if (isDragging) {
            controls.style.left = (x - offsetX) + 'px';
            controls.style.top = (y - offsetY) + 'px';
        }
    };

    const endDrag = () => {
        isDragging = false;
    };

    // Mouse events
    controls.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
    document.addEventListener('mousemove', e => drag(e.clientX, e.clientY));
    document.addEventListener('mouseup', endDrag);

    // Touch events
    controls.addEventListener('touchstart', e => startDrag(e.touches[0].clientX, e.touches[0].clientY));
    document.addEventListener('touchmove', e => drag(e.touches[0].clientX, e.touches[0].clientY));
    document.addEventListener('touchend', endDrag);
}
