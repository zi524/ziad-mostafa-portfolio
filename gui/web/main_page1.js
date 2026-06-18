document.addEventListener("DOMContentLoaded", function() {
    const wifiToggle = document.getElementById('wifiToggle');
    const gripperToggle = document.getElementById('pinToggle');
    const flashToggle = document.getElementById('magicToggle');
    const pidToggle = document.getElementById('pidToggle');
    const rocketToggle = document.getElementById('rocketToggle');
    const cameraElement = document.getElementById('camera1');
    const cameraElement2 = document.getElementById('camera2');
    const cameraElement3 = document.getElementById('camera3');
    const joystickToggle = document.getElementById('joystickToggle');
    var pitchNumberDiv = document.getElementById('pitch_number');

    let pidState = false; 
    let flashState = false; 
    let wifiState=false;
    let gripperState=false;
class GamepadLogger {
    constructor(rosUrl) {
       /* this.logDiv = document.getElementById(logElementId);
        if (!this.logDiv) {
            console.error(`${logElementId} element not found.`);
            return;
        }*/
        this.previousGamepadState = {};
        this.logEntries = {};
        
        // ROS Connection Setup
        this.ros = new ROSLIB.Ros({
            url: rosUrl
        });

        this.ros.on('connection', () => {
            console.log('Connected to ROSBridge.');
        });
        this.ros.on('error', (error) => {
            console.error('Error connecting to ROSBridge: ' + error);
        });
        this.ros.on('close', () => {
            console.log('Connection to ROSBridge closed.');
        });

        this.joystickPublisher = new ROSLIB.Topic({
            ros: this.ros,
            name: '/joystick',
            messageType: 'arcpkg/joystick'
        });

        window.addEventListener("gamepadconnected", (e) => this.handleGamepadConnected(e));
        window.addEventListener("gamepaddisconnected", (e) => this.handleGamepadDisconnected(e));

        pidToggle.addEventListener('click', () => {
            pidState = !pidState; // Toggle button state
            this.toggleWebButton(pidToggle,pidState); // Update the button UI based on the new state
        });

        flashToggle.addEventListener('click', () => {
            flashState = !flashState; // Toggle button state
            this.toggleWebButton(flashToggle,flashState); // Update the button UI based on the new state
        });
       
        wifiToggle.addEventListener('click', () => {
            wifiState = !wifiState; // Toggle button state
            this.toggleWebButton(wifiToggle,wifiState); // Update the button UI based on the new state
        });

        gripperToggle.addEventListener('click', () => {
            gripperState = !gripperState; // Toggle button state
            this.toggleWebButton(gripperToggle,gripperState); // Update the button UI based on the new state
        });
        
    }

    initializeLogEntries(gamepad) {
        const buttonCount = gamepad.buttons.length;
        const axisCount = gamepad.axes.length;
        
        for (let i = 0; i < buttonCount; i++) {
            this.updateLogEntry(`Button ${i + 1}`, 0);
        }
        for (let i = 0; i < axisCount; i++) {
            this.updateLogEntry(`Axis ${i}`, 0);
        }
    }
    
    updateLogEntry(name, value) {
        this.logEntries[name] = value.toFixed(2);
    }

    pollGamepads() {
        const gamepads = navigator.getGamepads();
        for (let i = 0; i < gamepads.length; i++) {
            const gp = gamepads[i];
            if (gp) {
                if (!this.previousGamepadState[i]) {
                    this.previousGamepadState[i] = { buttons: [], axes: [] };
                }

                gp.buttons.forEach((button, index) => {
                    if (button.pressed && (!this.previousGamepadState[i].buttons[index] || !this.previousGamepadState[i].buttons[index].pressed)) {
                        this.updateLogEntry(`Button ${index + 1}`, 1);
                    }
                    if (index === 0) { // Button index for toggleButton for pid button
                        this.toggleWebButton(pidToggle, pidState);
                    } else if (index === 1) { // Button index for flash button
                        this.toggleWebButton(flashToggle, flashState);
                    } 
                    else if (!button.pressed && this.previousGamepadState[i].buttons[index] && this.previousGamepadState[i].buttons[index].pressed) {
                        this.updateLogEntry(`Button ${index + 1}`, 0);
                    }
                    this.previousGamepadState[i].buttons[index] = { pressed: button.pressed };
                });

                gp.axes.forEach((axis, index) => {
                    if (Math.abs(axis) > 0.1) {
                        this.updateLogEntry(`Axis ${index}`, axis);
                    } else if (Math.abs(axis) <= 0.1 && this.previousGamepadState[i].axes[index] && this.previousGamepadState[i].axes[index] !== 0) {
                        this.updateLogEntry(`Axis ${index}`, 0);
                    }
                    if (index==1||index==5) { 
                        this.updateLogEntry(`Axis ${index}`, -axis);
                    }    
                        
                    if (axis<=0.3 && axis>=-0.3) { 
                        this.updateLogEntry(`Axis ${index}`, 0); 
                    }    

                    this.previousGamepadState[i].axes[index] = axis;
                });
                /*
                //control from gui
                pidToggle.addEventListener('click', function() {
                    if (pidToggle.classList.contains('pid-off')) {
                        pidToggle.classList.remove('pid-off');
                        pidToggle.classList.add('pid-on');
                        gp.buttons[0]=1;
                    } 
                    else {
                        pidToggle.classList.remove('pid-on');
                        pidToggle.classList.add('pid-off');
                        gp.buttons[0]=0;
                    }
                
                });*/
                pitchNumberDiv.innerHTML = `<h1>${gp.axes[1]}</h1>`;
                console.log("zmzcfcvgh");
                const joystickMessage = new ROSLIB.Message({
                    axis1: gp.axes[0] || 0,
                    axis2: gp.axes[1] || 0,
                    axis3: gp.axes[2] || 0,
                    axis4: gp.axes[3] || 0,
                    axis5: gp.axes[4] || 0,
                    button1: gp.buttons[0]?.pressed || false,
                    button2: gp.buttons[1]?.pressed || false,
                    button3: gp.buttons[2]?.pressed || false,
                    button4: gp.buttons[3]?.pressed || false,
                    button5: gp.buttons[4]?.pressed || false,
                    button6: gp.buttons[5]?.pressed || false,
                    button7: gp.buttons[6]?.pressed || false,
                    button8: gp.buttons[7]?.pressed || false,
                    button9: gp.buttons[8]?.pressed || false,
                    button10: gp.buttons[9]?.pressed || false,
                    button11: gp.buttons[10]?.pressed || false,
                    button12: gp.buttons[11]?.pressed || false
                });

                this.joystickPublisher.publish(joystickMessage);
            }
        }
    }

    handleGamepadConnected(e) {
        //this.logDiv.innerHTML = '';
        this.logEntries = {};
        this.initializeLogEntries(e.gamepad);
        this.pollingInterval = setInterval(() => this.pollGamepads(), 100);
    }

    handleGamepadDisconnected(e) {
        //this.logDiv.innerHTML = `Gamepad disconnected: ${e.gamepad.id}`;
        delete this.previousGamepadState[e.gamepad.index];
        clearInterval(this.pollingInterval);
    }
    toggleWebButton(button, state) {
        this.updateButtonUI(button, state); // Update the button UI based on the new state
    }
    updateButtonUI(button, state) {
        if (state) {
            button.style.backgroundColor = 'green';  // Change background color to green when ON
        } else {
            button.style.backgroundColor = 'red';  // Change background color to red when OFF
        }
    }
    
}
new GamepadLogger('ws://192.168.1.233:9090');
});


function feedNotFound(id) {
    document.getElementById(id).src = "dbg.svg";    
}

/*
const wifiToggle = document.getElementById('wifiToggle');
const joystickToggle = document.getElementById('joystickToggle');
const pinToggle = document.getElementById('pinToggle');
const magicToggle = document.getElementById('magicToggle');
const pidToggle = document.getElementById('pidToggle');
const rocketToggle = document.getElementById('rocketToggle');
const cameraElement = document.querySelector('.camera1');
const cameraElement2 = document.querySelector('.camera2');
const cameraElement3 = document.querySelector('.camera3');
cameraElement.addEventListener('click', () => {
    if (cameraElement.requestFullscreen) {
        cameraElement.requestFullscreen();
    } else if (cameraElement.mozRequestFullScreen) { // Firefox
        cameraElement.mozRequestFullScreen();
    } else if (cameraElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        cameraElement.webkitRequestFullscreen();
    } else if (cameraElement.msRequestFullscreen) { // IE/Edge
        cameraElement.msRequestFullscreen();
    }
});

cameraElement2.addEventListener('click', () => {
    if (cameraElement2.requestFullscreen) {
        cameraElement2.requestFullscreen();
    } else if (cameraElement2.mozRequestFullScreen) { // Firefox
        cameraElement2.mozRequestFullScreen();
    } else if (cameraElement2.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        cameraElement2.webkitRequestFullscreen();
    } else if (cameraElement2.msRequestFullscreen) { // IE/Edge
        cameraElement2.msRequestFullscreen();
    }
});

cameraElement3.addEventListener('click', () => {
    if (cameraElement3.requestFullscreen) {
        cameraElement3.requestFullscreen();
    } else if (cameraElement3.mozRequestFullScreen) { // Firefox
        cameraElement3.mozRequestFullScreen();
    } else if (cameraElement3.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        cameraElement3.webkitRequestFullscreen();
    } else if (cameraElement3.msRequestFullscreen) { // IE/Edge
        cameraElement3.msRequestFullscreen();
    }
});


wifiToggle.addEventListener('click', function() {
    if (wifiToggle.classList.contains('wifi-off')) {
        wifiToggle.classList.remove('wifi-off');
        wifiToggle.classList.add('wifi-on');
    } 
    else {
        wifiToggle.classList.remove('wifi-on');
        wifiToggle.classList.add('wifi-off');
    }
});

joystickToggle.addEventListener('click', function() {
    if (joystickToggle.classList.contains('joystick-off')) {
        joystickToggle.classList.remove('joystick-off');
        joystickToggle.classList.add('joystick-on');
    } 
    else {
        joystickToggle.classList.remove('joystick-on');
        joystickToggle.classList.add('joystick-off');
    }
});

pinToggle.addEventListener('click', function() {
    if (pinToggle.classList.contains('pin-off')) {
        pinToggle.classList.remove('pin-off');
        pinToggle.classList.add('pin-on');
    } 
    else {
        pinToggle.classList.remove('pin-on');
        pinToggle.classList.add('pin-off');
    }
});

magicToggle.addEventListener('click', function() {
    if (magicToggle.classList.contains('magic-off')) {
        magicToggle.classList.remove('magic-off');
        magicToggle.classList.add('magic-on');
    } 
    else {
        magicToggle.classList.remove('magic-on');
        magicToggle.classList.add('magic-off');
    }
});

pidToggle.addEventListener('click', function() {
    if (pidToggle.classList.contains('pid-off')) {
        pidToggle.classList.remove('pid-off');
        pidToggle.classList.add('pid-on');
    } 
    else {
        pidToggle.classList.remove('pid-on');
        pidToggle.classList.add('pid-off');
    }
});


rocketToggle.addEventListener('click', function() {
    if (rocketToggle.classList.contains('rocket-off')) {
        rocketToggle.classList.remove('rocket-off');
        rocketToggle.classList.add('rocket-on');
    } 
    else {
        rocketToggle.classList.remove('rocket-on');
        rocketToggle.classList.add('rocket-off');
    }
});
async function startCamera() {
    try {
        const constraints = {
            video: {
                facingMode: 'user', // or 'environment' for rear camera
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.getElementById('video');
        videoElement.srcObject = stream;
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

window.addEventListener('load', startCamera);

*/

