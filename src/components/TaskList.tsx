import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

import {v4 as uuid} from 'uuid';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function createPlaceHolderTaskList(){
    let placeholderTaskListForThisFunction: Task[] = [...tasks];
    return placeholderTaskListForThisFunction;
  }

  function createNewTaskObject() {
    const newTaskBeingCreated: Task = {
      id: uuid(),
      title: newTaskTitle,
      isComplete: false
    };

    return newTaskBeingCreated;
  }

  function addNewTaskToTaskList(item: Task){
    let placeholderList: Task[] = createPlaceHolderTaskList();

    placeholderList.push(item); 

    setTasks(placeholderList);
  }
  
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle !== ''){ 
      let newTask: Task = createNewTaskObject();

      addNewTaskToTaskList(newTask);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let placeholderList: Task[] = createPlaceHolderTaskList();

    const indexOfTaskToBeCompleted: number = placeholderList.map((item) => item.id).indexOf(id);

    placeholderList[indexOfTaskToBeCompleted].isComplete = true;

    setTasks(placeholderList);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let placeholderList: Task[] = createPlaceHolderTaskList();

    const indexOfTaskToBeRemoved: number = placeholderList.map((item) => item.id).indexOf(id);
    
    placeholderList.splice(indexOfTaskToBeRemoved, 1);

    setTasks(placeholderList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}