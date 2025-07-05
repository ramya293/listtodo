document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to save tasks to Local Storage
    function saveTasks() {
        // Get all task items from the list
        const tasks = [];
        taskList.querySelectorAll('li span').forEach(span => {
            tasks.push(span.textContent); // Get the text content of each task
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save as a JSON string
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')); // Parse the JSON string back to an array
        if (tasks) {
            tasks.forEach(taskText => addTaskToDOM(taskText)); // Add each saved task to the DOM
        }
    }

    // Function to add a task to the DOM (display on the page)
    function addTaskToDOM(taskText) {
        if (taskText === "") {
            alert("Task cannot be empty!");
            return;
        }

        const listItem = document.createElement('li'); // Create a new list item (<li>)

        const taskSpan = document.createElement('span'); // Create a span for the task text
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        const deleteButton = document.createElement('button'); // Create a delete button
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskList.removeChild(listItem); // Remove the list item from the DOM
            saveTasks(); // Save tasks after deletion
        };
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem); // Add the new list item to the <ul>
    }

    // Event listener for the "Add Task" button click
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // Get the input value and remove leading/trailing spaces
        addTaskToDOM(taskText); // Add the task to the display
        saveTasks(); // Save the updated list of tasks
        taskInput.value = ''; // Clear the input field
    });

    // Event listener for pressing "Enter" key in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click(); // Simulate a click on the Add Task button
        }
    });

    // Load tasks when the page first loads
    loadTasks();
});