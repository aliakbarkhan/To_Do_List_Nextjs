'use client';
import { ITask } from "@/types/tasks";
import {BiEdit} from 'react-icons/bi'
import {BsTrash3Fill} from 'react-icons/bs'
import React, { FormEventHandler, useState } from "react"
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/public/api";

interface TaskProps{
    task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) =>{
  const router = useRouter();
const [openModalEdit, setopenModalEdit] = useState<boolean>(false);
const [openModalDelete, setopenModalDelete] = useState<boolean>(false);
const [tasktoEdit, setTasktoEdit] = useState<string>(task.text)

const handleSubmitEditTodo : FormEventHandler<HTMLFormElement> = async(e) =>{
  e.preventDefault();
  await editTodo(
    {
      id:task.id,
      text:tasktoEdit,
    }
  );
  setopenModalEdit(false);
  router.refresh();
};
const handleDeleteTask = async(id:string) =>{
  await deleteTodo(id);
  setopenModalDelete(false);
  router.refresh();
}

  return (
    <tr key={task.id}>
      <td className='w-full'>{task.text}</td>
      <td className='flex gap-5'>
      <BiEdit 
      onClick={() => setopenModalEdit(true)}
      cursor='pointer' className='text-blue-500' size={25}/>
      <Modal modalOpen={openModalEdit} setModalOpen={setopenModalEdit}>
      <form onSubmit={handleSubmitEditTodo}>
        <h3 className="font-bold text-lg">Edit task</h3>
        <div className="modal-action">
        <input 
        value={tasktoEdit}
        onChange={e=> setTasktoEdit(e.target.value)}
        type="text" 
        placeholder="Type here" 
        className="input input-bordered w-full " />
        <button type='submit' className="btn">Submit</button>
        </div>
        
        </form> 
      </Modal>
      <BsTrash3Fill 
      onClick={() => setopenModalDelete(true)}
      cursor='pointer' className='text-red-500' size={25}/>
      <Modal modalOpen={openModalDelete} setModalOpen={setopenModalDelete}>
      <h3 className='text-lg'>Are you sure you want to delete this task?</h3>
      <div className='modal-action'>
        <button
        onClick={() => handleDeleteTask(task.id)}
        className='btn'>Yes</button>
      </div>
      </Modal>
      </td>
    </tr>
  )
}

export default Task