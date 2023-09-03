"use client";

import useTodo from "@/app/services/data/todo";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Single() {
  const { show, singleTodos, destroy } = useTodo();
  const params = useParams();

  console.log(params);

  function hapus(e: React.FormEvent) {
    e.preventDefault();
    destroy(params.id);
  }

  useEffect(() => {
    show(params.id);
  }, []);

  return (
    <>
      <div className="bg-slate-900 h-screen">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-gray-800 p-6 rounded-md shadow-md text-white">
            <h3>{singleTodos?.judul}</h3>
            <h3>{singleTodos?.konten}</h3>
            <button
              onClick={hapus}
              className="w-full text-blue-500 py-2 border-2 border-blue-500 rounded- hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
