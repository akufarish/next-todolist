"use client";

import useTodo from "@/app/services/data/todo";
import { Todo } from "@/app/utils";
import Link from "next/link";
import { useState } from "react";

export default function Add() {
  const { store } = useTodo();
  const [todos, setTodos] = useState<Todo>({
    judul: "",
    konten: "",
  });

  function submitTodo(e: React.FormEvent) {
    e.preventDefault();
    store(todos);
  }

  return (
    <>
      <div className="bg-slate-900 h-screen">
        <div className="grid place-items-center h-screen">
          <div className="bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-center text-white text-3xl uppercase font-sans font-bold mb-5">
              Add Todo
            </h3>
            <form onSubmit={submitTodo} className="flex flex-col gap-5">
              <div className="">
                <input
                  type="text"
                  className="bg-slate-900 h-11 text-white ring-0 outline-none transition-all duration-200 focus:border-none font-medium focus:outline-blue-500 rounded-md placeholder:text-white  pl-3"
                  placeholder="judul"
                  value={todos.judul}
                  onChange={(e) =>
                    setTodos({ ...todos, judul: e.target.value })
                  }
                />
              </div>
              <div className="">
                <textarea
                  className="bg-slate-900 w-full h-12 text-white ring-0 outline-none transition-all duration-200 focus:border-none font-medium focus:outline-blue-500 rounded-md placeholder:text-white  pl-3"
                  placeholder="password"
                  value={todos.konten}
                  onChange={(e) =>
                    setTodos({ ...todos, konten: e.target.value })
                  }
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="w-full text-blue-500 py-2 border-2 border-blue-500 rounded- hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
                >
                  Tambah
                </button>
              </div>
              <div className="text-slate-300 text-sm">
                <Link href={"/dashboard"}>Back?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
