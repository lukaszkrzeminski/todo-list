{
    let taskTable = [
    ];

    const removeTask = (index) => {
        
        taskTable = [
            ...taskTable.slice(0, index),
            ...taskTable.slice(index+1),
        ];
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
            <li class="list__item">
                <button class="js-doneButton list__button list__button--done">${task.done ? "✔" : " "}</button>
                <span class="list__taskContent" ${task.done ? " style=\"text-decoration: line-through\"" : ""}>${task.content}</span>
                <button class="js-remove list__button list__button--remove">🗑</button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlTasksList;

        bindEvents();
    };

    const addNewTask = (newTaskContent) => {
        
        taskTable = [
            ...taskTable,
            {content: newTaskContent},
        ];

        renderTasks();
    };

    const clearInput = (targetFocus) =>{
        targetFocus.value = "";
        targetFocus.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const targetFocus = document.querySelector(".js-newTask");

        if (newTaskContent === "") {
            targetFocus.focus();
            return;
        }

        addNewTask(newTaskContent);
        clearInput(targetFocus);
        
    };

    const init = () => {
        renderTasks();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}