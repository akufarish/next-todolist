"use client";

import useAuth from "@/app/services/auth";
import { User } from "@/app/utils";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const { register } = useAuth();
  const [forms, setForms] = useState<User>({
    name: "",
    password: "",
  });

  function doRegister(e: React.FormEvent) {
    e.preventDefault();
    register(forms);
  }

  return (
    <>
      <div className="bg-slate-900 h-screen">
        <div className="grid place-items-center h-screen">
          <div className="bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-center text-white text-3xl uppercase font-sans font-bold mb-5">
              Register
            </h3>
            <form onSubmit={doRegister} className="flex flex-col gap-5">
              <div className="">
                <input
                  type="text"
                  className="bg-slate-900 h-11 text-white ring-0 outline-none transition-all duration-200 focus:border-none font-medium focus:outline-blue-500 rounded-md placeholder:text-white  pl-3"
                  placeholder="name"
                  value={forms.name}
                  onChange={(e) => setForms({ ...forms, name: e.target.value })}
                />
              </div>
              <div className="">
                <input
                  type="password"
                  className="bg-slate-900 h-11 text-white ring-0 outline-none transition-all duration-200 focus:border-none font-medium focus:outline-blue-500 rounded-md placeholder:text-white  pl-3"
                  placeholder="password"
                  value={forms.password}
                  onChange={(e) =>
                    setForms({ ...forms, password: e.target.value })
                  }
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="w-full text-blue-500 py-2 border-2 border-blue-500 rounded- hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
                >
                  Register
                </button>
              </div>
              <div className="text-slate-300 text-sm">
                <Link href={"/auth/login"}>Sudah punya akun?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
