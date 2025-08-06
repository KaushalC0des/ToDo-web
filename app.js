let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if(text){
        tasks.push({text:text,completed:false});
        taskInput.value = "";
        renderTasks();
        console.log(tasks);
    }
};
const renderTasks = () =>{
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task,index) => {
        const li = document.createElement("li");
        // Add 'done' class if completed
        if(task.completed){
            li.classList.add("done"); // if value of completed is true the done class css will be added to our task
        }

        li.textContent = task.text;// this line is adding text in the list

        // Toggle task completed when clicked
        li.addEventListener("click",() => {
            tasks[index].completed = !tasks[index].completed;
            console.log("task completed")
            renderTasks(); //Re-render to reflect the change
        });

        // 🗑 Create a delete button
        const deletebtn = document.createElement("button");
        deletebtn.innerHTML = "🗑";
        console.log(task.text);
        deletebtn.classList.add("delete-btn");

        // delete the task when btn is clicked
        deletebtn.addEventListener("click",(e) => {
            e.stopPropagation(); // prevent the click from toggling completion
            tasks.splice(index,1); // remove 1 item at this index
            console.log("button deleted");
            renderTasks(); //Re-render list
        });

        //Add the delete button to the <li>
        li.appendChild(deletebtn);

        // Add the <li> to the task list
        taskList.appendChild(li);
    });

    // progress bar update
    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    if (totalTasks === 0){
        progress.style.width = "0%";
        numbers.textContent = "0 / 0";
    } else {
        const percent = (completedTasks / totalTasks) * 100;
        numbers.textContent = `${completedTasks} / ${totalTasks}`;
        progress.style.width = `${percent}%`;
    }
    
};

document.getElementById("newTask").addEventListener("click",function(e){
    e.preventDefault();
    
    addTask()
})