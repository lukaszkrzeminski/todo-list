{
    const taskTable = [
        {
            content: "Test task 1",
        },
    ];

    const removeTask = (index) => {
        taskTable.splice(index, 1);
        renderTasks();
    };

    const renderTasks = () => {
        htmlTasksList = "";

        for (const task of taskTable) {
            htmlTasksList += `
            <li>
                ${task.content}
                <button class="js-removeButton">Delete task</button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlTasksList;

        const removeButtons = document.querySelectorAll(".js-removeButton");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask();
            });
        });
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