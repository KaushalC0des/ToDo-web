const task=document.getElementById("new-task");
const taskList=document.getElementById("task-list");
let counter=0;
document.getElementById("submit_btn").onclick=function append_Task(){
    if(task.value.trim() === "") {
        alert("Please enter a task.");
    }
    else{
        let li =document.createElement("li");
        li.innerHTML = task.value;
        taskList.appendChild(li);
        counter++;
        task.value="";
    }
}
