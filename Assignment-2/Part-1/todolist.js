window.setTimeout(function() {
	var list=[]
 	while(true)
 	{
 		var select=prompt("Which option do you want to select?")
 		if(select.toLowerCase().indexOf("add")!=-1)
 		{
 			var task=prompt("Add a new task.")
 			list.push(task)
 			console.log("Task added successfully!!")
 		}

 		else if(select.toLowerCase().indexOf("view")!=-1)
 		{
 			console.log("Here is your todo list:")
 			for(var i=0;i<list.length;i++)
 			{
 				if(list[i]!=undefined)
 					console.log(list[i])
 			}
 		}

 		else if(select.toLowerCase().indexOf("done")!=-1)
 		{
 			var task=prompt("Input the task you want to remove")
 			for(var i=0;i<list.length;i++)
 			{
 				if(list[i].toLowerCase().indexOf(task)!=-1)
 				{
 					list.splice(i,1)
 					console.log(i)
 					console.log("Task removed successfully!!")
 					break;
 				}

 				else if(i==list.length-1)
 				{
 					console.log("Task not found!!")
 				}
 			}
 		}

 		else if(select.toLowerCase().indexOf("quit")!=-1)
 		{
 			break;
 		}

 		else
 		{
 			console.log("Please select the one of the options in the list!!")
 		}
 	}
}, 500);