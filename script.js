// Load saved tasks on page load
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(({ text, completed }) => {
    createTaskElement(text, completed);
  });
};

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task === "") return;

  createTaskElement(task, false);
  input.value = "";
  saveTasks();
}

// Reusable function to create task list item
function createTaskElement(task, completed) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = task;
  if (completed) {
    span.classList.add("completed");
  }

  span.onclick = function () {
    this.classList.toggle("completed");
    saveTasks();
  };

  const delBtn = document.createElement("button");
  delBtn.innerText = "×";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = function () {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").innerText;
    const completed = li.querySelector("span").classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Dark mode toggle
document.getElementById("toggleDark").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
document.getElementById("clearAll").addEventListener("click", function () {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks");
});