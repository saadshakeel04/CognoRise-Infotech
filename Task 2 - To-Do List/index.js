document.addEventListener("DOMContentLoaded", function() {
    const TaskBtn = document.getElementById("addTaskBtn");
    const ListOfTask = document.getElementById("taskList");
    const themeBtn = document.getElementById("changetheme");
    const themeIcon = document.getElementById("icon");
    const filterTask = document.getElementById("taskFilter");

    //defining the tasks i used 
    let tasks = {
        pending: [],
        completed: [],
        deleted: []
    };
     
    //declare theme for local storage
    let theme = localStorage.getItem('theme') || "light";

    // this function loads the tasks in local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            tasks = storedTasks;
        }
    }

    // This one is for saving 
    function saveTasks() {
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    // Starting theme when refreshed
    function startingTheme() {
        document.body.classList.add(theme + "-theme");
        themeIcon.classList.add(theme === "light" ? "fa-sun" : "fa-moon");
        themeIcon.style.color = theme === "light" ? "#000" : "#fff";
    }

    // The below logic is for toggling between the themes
    themeBtn.addEventListener("click", function() {
        if (theme === "dark") {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            themeIcon.style.color = "#000";
            theme = "light";
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            themeIcon.style.color = "#fff";
            theme = "dark";
        }
        localStorage.setItem('Theme', theme);
    });

    
    startingTheme();  

    // Adding the task
    TaskBtn.addEventListener("click", function() {
        const titleInput = document.getElementById("titleInput");
        const descriptionInput = document.getElementById("descriptionInput");
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (title && description) {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();
            const formattedTime = currentDate.toLocaleTimeString();

            tasks.pending.push({
                title: title,
                description: description,
                time: `${formattedDate} - ${formattedTime}`
            });

            titleInput.value = "";
            descriptionInput.value = "";

            saveTasks();
            TaskRender();
        }
    });

    // This function is for filtering the tasks based on choice of user 
    function TaskRender() {
        const filterValue = filterTask.value;
        const filteredTasks = tasks[filterValue];

        ListOfTask.innerHTML = "";

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = "task-item";
            taskItem.innerHTML = `
                <div>
                    <strong>${task.title}</strong><br>
                    <p>${task.description}</p>
                    <small>Added on: ${task.time}</small>
                </div>
                <div class="task-buttons">
                    ${filterValue === "pending" ? `
                        <button class="complete-icon" onclick="completeTask(${index})"><i class="fas fa-check"></i></button>
                        <button class="delete-icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
                    ` : ''}
                    ${filterValue === "completed" || filterValue === "deleted" ? `
                        <button class="delete-icon" onclick="permanentDeleteTask(${index})"><i class="fas fa-trash"></i></button>
                    ` : ''}
                </div>
            `;
            ListOfTask.appendChild(taskItem);
        });
    }

   
    window.completeTask = function(index) {
        const task = tasks.pending.splice(index, 1)[0];
        tasks.completed.push(task);
        saveTasks();
        TaskRender();
    };

    
    window.deleteTask = function(index) {
        const task = tasks.pending.splice(index, 1)[0];
        tasks.deleted.push(task);
        saveTasks();
        TaskRender();
    };

    
    window.permanentDeleteTask = function(index) {
        const currentFilter = filterTask.value;
        tasks[currentFilter].splice(index, 1);
        saveTasks();
        TaskRender();
    };

    
    filterTask.addEventListener("change", function() {
        TaskRender();
    });

    
    loadTasks();
    TaskRender();
});

