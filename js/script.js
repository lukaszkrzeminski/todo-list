{
    const taskTable = [
        {
            content: "Test task",
            done: true,
        },
    ];

    const renderTasks = () =>{
        htmlTasksList = "";

        for(const task of taskTable){
            htmlTasksList += `
            <li>
                ${task.content}
            </li>
            `;

        }

        document.querySelector('.js-tasks').innerHTML = htmlTasksList;
    };

    const init = () =>{
        renderTasks();
    };

    init();
}