class Control{
    constructor() {
        this.connected = false;
        this.ros = null;
        this.debug = null;
        this.currentCommand = null;
        this.initialize();
    }

    initialize() {
        // Initialize ROS connection
        this.ros = new ROSLIB.Ros({
            url: 'ws://192.168.1.233:9090'
        });

        this.debug = new ROSLIB.Service({
            ros: this.ros,
            name: '/commandService',
            serviceType: 'arcpkg/commandService' 
        });

        this.connected = true;
        this.setupButtonListeners();
    }
    setupButtonListeners() {
        document.getElementById('debug-button').addEventListener('click', () => this.showAdditionalButtons('debug'));
        document.getElementById('test-button').addEventListener('click', () => this.showAdditionalButtons('test'));
        document.getElementById('kill-button').addEventListener('click', () => this.showAdditionalButtons('kill'));
        document.querySelectorAll('.component-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const component = event.target.textContent;
                this.sendToROS(this.currentCommand, component);
            });
        });

        document.getElementById('publish-button').addEventListener('click', () => this.hideAdditionalButtons());
        document.getElementById('close-btn').addEventListener('click', () => this.hideAdditionalButtons());
    }
    showAdditionalButtons(command) {
        this.currentCommand = command;
        const additionalButtonsDiv = document.getElementById("additional-buttons");
        const testButtonsDiv = document.getElementById("test-buttons");
        const debugButtonsDiv = document.getElementById("debug-buttons");
        const killButtonsDiv = document.getElementById("kill-buttons");
        // Hide all button groups initially
        testButtonsDiv.style.display = "none";
        debugButtonsDiv.style.display = "none";
        killButtonsDiv.style.display = "none";
        // Show specific buttons based on the command
        if (command === 'test') {
            document.querySelectorAll('.test-btn').forEach(button => {
                testButtonsDiv.style.display = 'flex';
            });
        } else if (command === 'debug') {
            document.querySelectorAll('.debug-btn').forEach(button => {
                debugButtonsDiv.style.display = 'block';
            });
        }
        else if (command === 'kill') {
            document.querySelectorAll('.kill-btn').forEach(button => {
                killButtonsDiv.style.display = 'block';
            });
        }
        // Show the additional buttons panel
        additionalButtonsDiv.style.display = "block";
    }

    hideAdditionalButtons() {
        const additionalButtonsDiv = document.getElementById('additional-buttons');
        additionalButtonsDiv.style.display = 'none';
    }
 
    // Function to send command and component to ROS
         sendToROS(command, component) {
        if (!this.connected) {
            console.error('Not connected to ROS');
            return;
        }    
        // ROS service call implementation here
        const request = new ROSLIB.ServiceRequest({
            command: command,
            component_name: component,
        });
        console.log('Sending request:', request);  // Log the request
        this.debug.callService(request, (result) => {
            // Display the response in the textarea
            console.log('Received response:', result);
            document.getElementById('response-output').value += `Response: ${result.message}\n`;
        }, (error) => {
            console.error('Service call failed:', error);
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Create an instance of the Control class
    const control = new Control();
});
/*document.addEventListener('DOMContentLoaded', function() {
    let currentCommand = '';

    // Function to show the additional buttons panel
    function showAdditionalButtons(command) {
        currentCommand = command;
        const additionalButtonsDiv = document.getElementById('additional-buttons');
        additionalButtonsDiv.style.display = 'block';
    }

    // Function to hide the additional buttons panel
    function hideAdditionalButtons() {
        const additionalButtonsDiv = document.getElementById('additional-buttons');
        additionalButtonsDiv.style.display = 'none';
    }

    // Event listeners for the main command buttons
    document.getElementById('debug-button').addEventListener('click', function() {
        showAdditionalButtons('Debug');
    });

    document.getElementById('test-button').addEventListener('click', function() {
        showAdditionalButtons('Test');
    });

    document.getElementById('kill-button').addEventListener('click', function() {
        showAdditionalButtons('Kill');
    });

    // Event listener for the component buttons
    document.querySelectorAll('.component-btn').forEach(button => {
        button.addEventListener('click', function() {
            const component = this.textContent;
            sendToROS(currentCommand, component);
        });
    });

    // Event listener for the publish button
    document.getElementById('publish-button').addEventListener('click', hideAdditionalButtons);

    // Event listener for the close (X) button
    document.getElementById('close-btn').addEventListener('click', hideAdditionalButtons);

    
});
*/

   /*callService(command) {
        const request = new ROSLIB.ServiceRequest({
            command_type: command,
            component: 'component_name', // Replace with actual component if needed
            information: 'Additional information' // Replace or leave blank as needed
        });

        this.debug.callService(request, (result) => {
            // Display the response in the textarea
            document.getElementById('response-output').value = `Response: ${result.information}`;
        }, (error) => {
            console.error('Service call failed:', error);
        });
    }*/
