"use client";

import Link from "next/link";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import config from "../../../../config";
import { ResetPasswordSchema } from "@/lib/schema";
import { Input } from "@/components/ui";

type Inputs = z.infer<typeof ResetPasswordSchema>;

// This a login/singup page for Supabase Auth.
// Successfull login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
export default function ResetPassword() {
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast.error("Erro ao atualizar senha.", { position: "top-right" });
      }

      toast.success("Senha atualizada com sucesso!", { position: "top-right" });

      setIsDisabled(true);

      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 md:p-24" data-theme={config.colors.theme}>
      <div className="text-center mb-4">
        <Link href="/sign-in" className="btn btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Sign-in
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
        Nova senha
      </h1>

      <div className="space-y-8 max-w-xl mx-auto">
        <form
          className="form-control w-full space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              type="password"
              placeholder="Sua nova senha"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register("password")}
              errorName={errors?.password?.message}
            />
          </div>

          <button
            className="btn btn-primary btn-block"
            disabled={isLoading || isDisabled}
            type="submit"
          >
            {isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Resetar
          </button>
        </form>
      </div>
    </main>
  );
}
