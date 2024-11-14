// Function to check if the username input is filled
function checkUsername() {
    const username = document.getElementById('username').value;
    const startButton = document.getElementById('start-button');
    
    // Enable the button if the input is not empty
    if (username.trim() !== "") {
        startButton.disabled = false;
        startButton.style.opacity = 1;  // Make the button fully visible
    } else {
        startButton.disabled = true;
        startButton.style.opacity = 0.5;  // Make the button semi-transparent
    }
}

// Function to start the quiz (you can define the next page or action here)
function startQuiz() {
    const username = document.getElementById('username').value;
    if (username.trim() !== "") {
        alert(`Welcome ${username}! Let's start the quiz!`);
        // You can navigate to the quiz page here if you have one
    }
}
