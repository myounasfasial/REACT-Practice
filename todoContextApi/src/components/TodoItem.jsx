import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
    const [Statement,setStatement]=useState(todo.Statement);
    const [isTodoEditable,setIsTodoEditable]=useState(false);
    const {updateTodo,toggleTodo,deleteTodo}=useTodo();

    const editTodo=()=>{
        if(todo.id && todo.Statement!==""){
            updateTodo(Statement,todo.id);
            setIsTodoEditable(!isTodoEditable);
        }
    }

    const toggleComplete=()=>{
        toggleTodo(todo.id);

    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.Completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.Completed}
                onChange={toggleComplete}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.Completed ? "line-through" : ""}`}
                value={Statement}
                onChange={(e)=>{
                setStatement(e.target.value); 
                }}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={()=>{
                    if(todo.Completed)return;
                    if(isTodoEditable){
                        editTodo();}
                        else{
                        setIsTodoEditable(!isTodoEditable)
                    }
                }}
                disabled={todo.Completed}
            >
                { isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
