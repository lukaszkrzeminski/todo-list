{
    let taskTable = [
    ];
    let hideDoneTasks = false;

    const removeTask = (index) => {

        taskTable = [
            ...taskTable.slice(0, index),
            ...taskTable.slice(index + 1),
        ];
        render();
    };

    const doneTask = (index) => {
        taskTable[index].done = !taskTable[index].done;
        render();
    };

    const addNewTask = (newTaskContent) => {

        taskTable = [
            ...taskTable,
            { content: newTaskContent },
        ];

        render();
    };

    const showUnchecked = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const checkAll = () => {
        taskTable = taskTable.map((task) => ({
            ...task,
            done: true,
        }));

        render();
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

    const bindButtonEvents = () => {
        const toggleCheckButton = document.querySelector(".js-showDoneButton");
        if (toggleCheckButton) {
            toggleCheckButton.addEventListener("click", () => {
                showUnchecked();
            });
        };

        const allCheckButton = document.querySelector(".js-checkAllButton");
        if (allCheckButton) {
            allCheckButton.addEventListener("click", () => {
                checkAll();
            });
        };

    };

    const renderTasks = () => {
        htmlTasksList = "";

        if (!hideDoneTasks) {
            for (const task of taskTable) {
                htmlTasksList += `
                <li class="list__item">
                    <button class="js-doneButton list__button list__button--done">${task.done ? "✔" : " "}</button>
                    <span class="list__taskContent" ${task.done ? " style=\"text-decoration: line-through\"" : ""}>${task.content}</span>
                    <button class="js-remove list__button list__button--remove">🗑</button>
                </li>
                `;
            };
        }
        else {
            const undoneTaskTable = taskTable.filter(({ done }) => !done);
            for (const task of undoneTaskTable) {
                htmlTasksList += `
                <li class="list__item">
                    <button class="js-doneButton list__button list__button--done">${task.done ? "✔" : " "}</button>
                    <span class="list__taskContent" ${task.done ? " style=\"text-decoration: line-through\"" : ""}>${task.content}</span>
                    <button class="js-remove list__button list__button--remove">🗑</button>
                </li>
                `;
            };
        }

        document.querySelector(".js-tasks").innerHTML = htmlTasksList;
    }

    const renderButtons = () => {
        const listButtons = document.querySelector(".js-listButtons");

        if (!taskTable.length) {
            listButtons.innerHTML = "";
            return;
        }

        htmlListButtons = `
        <button class="list__button list__button--showDone js-showDoneButton" ${taskTable.every(({ done }) => !done) ? "disabled" : ""}>
        ${hideDoneTasks ? "Wyświetl" : "Ukryj"} wykonane
        </button>
        <button class="list__button list__button--checkAll js-checkAllButton" ${taskTable.every(({ done }) => done) ? "disabled" : ""}>
        Zakończ wszystkie
        </button>
        `;
        document.querySelector(".js-listButtons").innerHTML = htmlListButtons;
    }

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonEvents();
    };

    const clearInput = (targetFocus) => {
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
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}