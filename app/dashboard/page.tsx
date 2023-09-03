"use client";

import { useEffect } from "react";
import useAuth from "../services/auth";
import useTodo from "../services/data/todo";
import Link from "next/link";

export default function Dashboard() {
  const { isLogged, logout } = useAuth();
  const { index, todos } = useTodo();

  useEffect(() => {
    isLogged();
    index();

    const fetch = setInterval(() => {
      index();
    }, 3000);

    return () => clearInterval(fetch);
  }, []);

  return (
    <>
      <div className="bg-slate-900 h-screen">
        <h3 className="text-center text-white text-2xl">Todo List</h3>
        <div className="">
          <Link
            href={"/dashboard/add"}
            className="w-full text-blue-500 py-2 border-2 border-blue-500 rounded- hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
          >
            Tambah
          </Link>
        </div>
        <div className="">
          <button
            onClick={logout}
            className="w-full text-blue-500 py-2 border-2 border-blue-500 rounded- hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
          >
            Logout
          </button>
        </div>
        <div className="flex justify-center items-center h-screen gap-5">
          {todos.map((todo, index) => (
            <Link
              href={`/dashboard/${todo.id}`}
              key={index}
              className="bg-gray-800 p-6 rounded-md shadow-md text-white"
            >
              <h3 className="">{todo.judul}</h3>
              <h3 className="">{todo.konten}</h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
