// "use client";

import { use } from "react";

type Todo = {
    title: string
};

async function getData() {
    const response = await fetch('http://localhost:3000/api/todos');
    console.log("log");
    return response.json();
}
  
export default function About() {
    // const todos: Todo[] = await getData();
    const todos: Todo[] = use(getData());

    // async function onClickButton() {
    //     console.log("OnClickExecuteButton");
    // }

    return (
        <main>
            <div>xxx</div>
            <div>
                {todos.map((todo) => (
                    <div>{todo.title}</div>
                    ))}
            </div>
        </main>
    )
}
