class ROSConnection {
    constructor() {
        if (!ROSConnection.instance) {
            this.ros = new ROSLIB.Ros({
                url: 'ws://192.168.1.233:9090'
            });

            this.ros.on('connection', () => {
                console.log("Connected to ROS");
            });
            this.ros.on('error', (error) => {
                console.error("Error connecting to ROS:", error);
            });
            this.ros.on('close', () => {
                console.log("Connection to ROS closed");
            });

            this.joyTopic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/joystick',
                messageType: 'arcpkg/joystick'
            });

            this.servoTopic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/servo_listener',
                messageType: 'arcpkg/servo'
            });
            this.debug = new ROSLIB.Service({
                ros: this.ros,
                name: '/commandService',
                serviceType: 'arcpkg/commandService'
            });

	    this.raspberryStatusTopic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/raspberry_status',
                messageType: 'arcpkg/rasp'
            });

        // Subscribe and log the temperature and under-voltage status
        this.raspberryStatusTopic.subscribe((message) => {
            console.log("Full Raspberry Status Message:", message);
            console.log(`Temperature: ${message.temperature} °C`);
            console.log(`Under-voltage: ${message.under_voltage ? "Yes" : "No"}`);

            const scrollText = document.getElementById("scrollContainer");
            if (message.temperature < 50) {
                scrollText.style.backgroundColor = "blue";
            } else {
                scrollText.style.backgroundColor = "red";
            }
        });

            ROSConnection.instance = this;
        }

        return ROSConnection.instance;
    }

    publishToJoy(buttonStates, axesArray) {
        const buttonMessage = new ROSLIB.Message({
            axis1: axesArray[0],
            axis2: axesArray[1],
            axis3: axesArray[2],
            axis4: axesArray[3],
            axis5: axesArray[4],
            button1: buttonStates[0],
            button2: buttonStates[1],
            button3: buttonStates[2],
            button4: buttonStates[3],
            button5: buttonStates[4],
            button6: buttonStates[5],
            button7: buttonStates[6],
            button8: buttonStates[7],
            button9: buttonStates[8],
            button10: buttonStates[9],
            button11: buttonStates[10],
            button12: buttonStates[11]
        });
        this.joyTopic.publish(buttonMessage);
        //console.log("Published message to Joystick:", axesArray);
    }

    publishToServos(angle) {
        const servoMessage = new ROSLIB.Message({
            angle: angle
        });
        this.servoTopic.publish(servoMessage);
        //console.log("Published message to SERVOS:", servoMessage);
    }
}

class GameController {
    constructor(rosConnection) {
        this.rosConnection = rosConnection;
        this.controllerIndex = null;
        this.leftRight = 0;
        this.forwardBackward = 0;
        this.rotate = 0;
        this.pitchValue = 0;
        this.upDown = 0;
        this.buttonStates = new Array(12).fill(false);
        this.axesArray = [0, 0, 0, 0, 0];
        this.buttonIndex = -1;
        this.servoReading = 0.00;

        window.addEventListener("gamepadconnected", (event) => {
            this.controllerIndex = event.gamepad.index;
            console.log(
                "Gamepad connected at index %d: %s. %d buttons, %d axes.",
                event.gamepad.index,
                event.gamepad.id,
                event.gamepad.buttons.length,
                event.gamepad.axes.length,
            );
                document.getElementById('joystickToggle').style.backgroundColor = "#ff5733";
        });

        window.addEventListener("gamepaddisconnected", (event) => {
            this.controllerIndex = null;
            console.log(
                "Gamepad disconnected from index %d: %s",
                event.gamepad.index,
                event.gamepad.id,
            );
        });
    }
     handleServoReading(){
        if(this.buttonIndex==6)
        {
            this.servoReading+=0.1;
        }
        else if(this.buttonIndex==7)
        {
            this.servoReading-=0.1;
        }
        if(this.servoReading<0)
        {
            this.servoReading = 0;
        }
        else if(this.servoReading>180)
        {
            this.servoReading = 180;
        }
        document.getElementById("servo_reading").innerText = parseFloat(this.servoReading).toFixed(2);
    }

    updateGamepadState() {
        if (this.controllerIndex !== null) {
            const gamepads = navigator.getGamepads();
            const gamepad = gamepads[this.controllerIndex];
            if (gamepad) {
                this.leftRight = gamepad.axes[0];
                this.forwardBackward = gamepad.axes[1];
                this.rotate = gamepad.axes[5];
                this.upDown = gamepad.axes[6];
                this.pitchValue = gamepad.axes[9];
                this.upDown = -parseFloat(this.upDown).toFixed(2);
                document.getElementById("z-axis").innerText = parseFloat(this.upDown);
                document.getElementById('pitch').innerText = parseFloat(this.pitchValue).toFixed(2);
                if (this.pitchValue === -1) {
                    this.pitchValue += 0.01;
                } else if (this.pitchValue === 0.14285719394683838) {
                    this.pitchValue -= 0.01;
                }
                this.pitchValue = Math.max(-1, Math.min(1, this.pitchValue));
                if (Math.abs(this.pitchValue) < 0.000015) this.pitchValue = 0;
                if (Math.abs(this.leftRight) < 0.05) this.leftRight = 0;
                if (Math.abs(this.forwardBackward) < 0.05) this.forwardBackward = 0;
                if (Math.abs(this.rotate) < 0.09) this.rotate = 0;
                        this.axesArray[0] = this.leftRight;
                        this.axesArray[1] = -1*this.forwardBackward;
                        this.axesArray[2] = this.rotate;
                        this.axesArray[3] = this.upDown;
                        this.axesArray[4] = this.pitchValue;

                //console.log("Axes Values:", this.leftRight, this.forwardBackward, this.rotate, this.upDown, this.pitchValue);
            }
        }
    }

    updateButtonState() {
        if (this.controllerIndex !== null) {
            const gamepads = navigator.getGamepads();
            const gamepad = gamepads[this.controllerIndex];
            if (gamepad) {
                for (let k = 0; k < 12; k++) {
                    this.buttonStates[k] = k < gamepad.buttons.length && gamepad.buttons[k].pressed;
                    //console.log(`Button ${k} pressed: ${this.buttonStates[k]}`);
                        if(k < gamepad.buttons.length && gamepad.buttons[k].pressed){
                                this.buttonIndex = k;
                                this.handleServoReading();
                        console.log(this.buttonIndex);
                    }
                }
            } else {
                //console.log("Gamepad not found.");
            }
        }
}

    gameLoop() {
        console.log("Game loop running...");
        this.updateGamepadState();
        this.updateButtonState();
        this.rosConnection.publishToJoy(this.buttonStates, this.axesArray);
        requestAnimationFrame(() => this.gameLoop());
    }
}

function toggleFullscreen(id) {
    var image = document.getElementById(id);
    if (!document.fullscreenElement) {
        // Enter fullscreen mode
        if (image.requestFullscreen) {
            image.requestFullscreen();
        } else if (image.mozRequestFullScreen) { // Firefox
            image.mozRequestFullScreen();
        } else if (image.webkitRequestFullscreen) { // Chrome, Safari and Opera
            image.webkitRequestFullscreen();
        } else if (image.msRequestFullscreen) { // IE/Edge
            image.msRequestFullscreen();
        }
        if(image.style.transform !== "rotate(180deg"){
        image.style.transform = "rotate(180deg)";
        image.style.transition = "transform 0.5s"; // Optional: smooth rotation
}
    } else {
        // Exit fullscreen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        image.style.transform = "rotate(0deg)";
    }
}

function feedNotFound(id) {
    document.getElementById(id).src = "no_feed.jpg";
}





const rosConnection = new ROSConnection();
const gameController = new GameController(rosConnection);
gameController.gameLoop();

function sendToROS(command, component) {
    if (gameController.rosConnection == null) {
        console.error('Not connected to ROS');
        return;
    }
    // ROS service call implementation here
    const request = new ROSLIB.ServiceRequest({
        command: command,
        component_name: component,
    });
    console.log('Sending request:', request);  // Log the request
    rosConnection.debug.callService(request, (result) => {
        // Display the response in the textarea
        console.log('Received response:', result);
        document.getElementById('response-output').value += `Response: ${result.message}\n`;
    }, (error) => {
        console.error('Service call failed:', error);
    });
}
