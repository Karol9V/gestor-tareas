
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

let tasks = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskName = input.value.trim();

    if (taskName === "") {
        return;
    }

    tasks.push({
        id: Date.now(),
        name: taskName,
        completed: false
    });

    input.value = "";
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.name;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    pendingCount.textContent = "Pendientes: " + pending;
    completedCount.textContent = "Completadas: " + completed;
}
