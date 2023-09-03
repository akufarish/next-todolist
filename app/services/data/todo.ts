import { useState } from "react";
import axios from "../axios";
import { Todo } from "@/app/utils";
import useSwal from "../swal";
import { useRouter } from "next/navigation";

export default function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [singleTodos, setSingleTodos] = useState<Todo>();
  const { accepted, rejected, confirmed } = useSwal();
  const router = useRouter();

  async function index() {
    const resposne = await axios.get("/api/todo");
    console.log(resposne.data);
    setTodos(resposne.data.data);
  }

  async function show(id: string | string[]) {
    const response = await axios.get(`/api/todo/${id}`);
    setSingleTodos(response.data.data);
    console.log(response.data);
  }

  async function store(params: Todo) {
    try {
      const response = await axios.post("/api/todo", params);
      console.log(response.data);
      accepted(response.data.message);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        rejected(error.response?.data.message);
      }
    }
  }

  async function destroy(id: string | string[]) {
    const response = await confirmed("Anda yakin mau menghapus list ini?");

    if (response.isConfirmed) {
      try {
        const response = await axios.delete(`/api/todo/${id}`);
        console.log(response.data);
        accepted(response.data.message);
        router.push("/dashboard");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          rejected(error.response?.data.message);
        }
      }
    }
  }

  return {
    todos,
    index,
    store,
    show,
    singleTodos,
    destroy,
  };
}
