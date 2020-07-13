{
    const taskTable = [
        {
            content: "Test task 1",
            done: false,
        },
    ];

    const removeTask = (index) => {
        taskTable.splice(index, 1);
        renderTasks();
    };

    const doneTask = (index) => {
        taskTable[index].done = !taskTable[index].done;
        renderTasks();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-doneButton");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                doneTask(index);
            });
        });
    };

    const renderTasks = () => {
        htmlTasksList = "";

        for (const task of taskTable) {
            htmlTasksList += `
            <li class="list__item" ${task.done ? " style=\"text-decoration: line-through\"" : ""} >
                <button class="js-doneButton list__button list__button--done">${task.done ? "✔" : "X"}</button>
                <span class="list__taskContent">${task.content}</span>
                <button class="js-remove list__button list__button--remove">🗑</button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlTasksList;

        bindEvents();
    };

    const addNewTask = (newTaskContent) => {
        taskTable.push({
            content: newTaskContent,
        });

        renderTasks();
    };

    const clearInput = () =>{
        document.querySelector(".js-newTask").value = "";
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        clearInput();
    };

    const init = () => {
        renderTasks();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}