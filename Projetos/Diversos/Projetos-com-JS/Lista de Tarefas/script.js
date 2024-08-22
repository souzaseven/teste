   const tasklist = document.getElementById("taskList");
        const taskInput = document.getElementById("taskInput");

        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                const maxText = taskText.substring(0, 35);
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${maxText}</span>
                    <input type="checkbox" class="completeButton" onclick="toggleTaskCompletion(this)">
                    <button class="editButton" onClick="editTask(this)">Editar</button>
                    <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
                `;
                tasklist.appendChild(li);
                taskInput.value = "";
            }
        }

        function toggleTaskCompletion(checkbox) {
            const li = checkbox.parentElement;
            const span = li.querySelector("span");
            if (checkbox.checked) {
                span.classList.add("completed");
            } else {
                span.classList.remove("completed");
            }
        }

        function editTask(button) {
            const li = button.parentElement;
            const span = li.querySelector("span");
            const newText = prompt("Editar tarefa:", span.textContent);
            if (newText !== null && newText.trim() !== "") {
                span.textContent = newText.trim();
            }
        }

        function deleteTask(button) {
            const li = button.parentElement;
            tasklist.removeChild(li);
        }
    