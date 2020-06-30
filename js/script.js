{
    const taskTable = [
        {
            content: "Test task",
            done: true,
        },
    ];

    const renderTasks = () => {
        htmlTasksList = "";

        for (const task of taskTable) {
            htmlTasksList += `
            <li>
                ${task.content}
            </li>
            `;

        }

        document.querySelector(".js-tasks").innerHTML = htmlTasksList;
    };

    const addNewTask = (newTaskContent) => {
        taskTable.push({
            content: newTaskContent,
        });

        renderTasks();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        renderTasks();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}