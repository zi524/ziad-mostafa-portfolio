// Connect to ROS
var ros = new ROSLIB.Ros({
  url: 'ws://192.168.1.233:9090' // Replace with your ROSBridge WebSocket URL
});
var serviceClient = new ROSLIB.Service({
  ros: ros,
  name: '/control_inputs',  // Match this with the name in the Python script
  serviceType: 'arcpkg/ControlInputs'  // Use the full service type name
});

ros.on('connection', () => {
    console.log('Connected to ROSBridge.');
});
ros.on('error', (error) => {
    console.error('Error connecting to ROSBridge: ' + error);
});
ros.on('close', () => {
    console.log('Connection to ROSBridge closed.');
});

function sendToROS() {
  // Helper function to safely convert inputs to int32
  function safeParseInt(value, defaultValue = -1) {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  // Collect values from the inputs and convert them to int32
  var pitch1 = safeParseInt(document.getElementById('pitch1').value);
  var pitch2 = safeParseInt(document.getElementById('pitch2').value);
  var pitch3 = safeParseInt(document.getElementById('pitch3').value);
  var yaw1 = safeParseInt(document.getElementById('yaw1').value);
  var yaw2 = safeParseInt(document.getElementById('yaw2').value);
  var yaw3 = safeParseInt(document.getElementById('yaw3').value);
  var bldc1 = safeParseInt(document.getElementById('BLDC1').value);
  var bldc2 = safeParseInt(document.getElementById('BLDC2').value);
  var bldc3 = safeParseInt(document.getElementById('BLDC3').value);
  var bldc4 = safeParseInt(document.getElementById('BLDC4').value);
  var bldc5 = safeParseInt(document.getElementById('BLDC5').value);
  var bldc6 = safeParseInt(document.getElementById('BLDC6').value);
  var switchCircuit1 = safeParseInt(document.getElementById('switch1').value);
  var switchCircuit2 = safeParseInt(document.getElementById('switch2').value);
  var switchCircuit3 = safeParseInt(document.getElementById('switch3').value);
  var servoMotor = safeParseInt(document.getElementById('servo').value);
  var dc1 = safeParseInt(document.getElementById('DC1').value);
  var dc2 = safeParseInt(document.getElementById('DC2').value);
  var dc3 = safeParseInt(document.getElementById('DC3').value);
  var dc4 = safeParseInt(document.getElementById('DC4').value);

  // Format the data for ROS service as int32
  var request = new ROSLIB.ServiceRequest({
    yaw_1: yaw1,
    yaw_2: yaw2,
    yaw_3: yaw3,
    pitch_1: pitch1,
    pitch_2: pitch2,
    pitch_3: pitch3,
    bldc_1: bldc1,
    bldc_2: bldc2,
    bldc_3: bldc3,
    bldc_4: bldc4,
    bldc_5: bldc5,
    bldc_6: bldc6,
    switchCircuit_1: switchCircuit1,
    switchCircuit_2: switchCircuit2,
    switchCircuit_3: switchCircuit3,
    servo_1: servoMotor,
    dc_1: dc1,
    dc_2: dc2,
    dc_3: dc3,
    dc_4: dc4
  });

  // Call the ROS service
  serviceClient.callService(request, function(response) {
    console.log('Service response: ', response);
  });
}


// Bind the sendToROS function to the button click event
document.getElementById('rocketToggle').addEventListener('click', sendToROS);
