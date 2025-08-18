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

        // const taskText = document.createElement("span");
        // taskText.textContent = task.text;
        // li.appendChild(taskText);

        // Toggle task completed when clicked
        li.addEventListener("click",() => {
            const wasCompleted = tasks[index].completed;
            tasks[index].completed = !tasks[index].completed;

            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.completed).length;

            if(!wasCompleted && totalTasks > 0 && completedTasks === totalTasks){
                celebrate();
            }
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
    const message = document.getElementById("progress-message");

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

     const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    progress.style.width = `${percent}%`;
    numbers.textContent = `${completedTasks} / ${totalTasks}`;


    // motivational messages
    if(percent === 0){
        message.textContent = "Lets get Started 💪";
    } else if(percent>0 && percent < 50){
        message.textContent = "you are making progress🚀"
    } else if(percent >=50 && percent < 100){
        message.textContent = "Over halfway there !🔥";
    } else if(percent === 100) {
        message.textContent = "All done 🎉";
        celebrate(); 
    } else if(totalTasks === 0){
        message.textContent - "No tasks yet - add one!"
    }
    
};

//confetti function
const celebrate = () => {
    const duration = 2*1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount : 5,
            angle : 60,
            spread : 55,
            origin: {x:0}
        });

        confetti({
            particleCount : 6,
            angle : 120,
            spread : 55,
            origin: {x:1}
        });
        if(Date.now() < end){
            requestAnimationFrame(frame);
        }
    })();
};

document.getElementById("newTask").addEventListener("click",function(e){
    e.preventDefault();
    
    addTask()
});
