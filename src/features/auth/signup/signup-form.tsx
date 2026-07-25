"use client";


import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { AuthContext } from "@/shared/contexts/auth-context";
import axios from "axios";
import { secureApi } from "@/shared/api/http-clients";
import { FirebaseError } from "firebase/app";

const imageHostingKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
interface SignupFields { name: string; email: string; image: FileList; password: string }

const SignupForm = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("SignupForm must be rendered within AuthProvider");
  const { signUp, successToast, updateUser } = authContext;
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFields>();

  const onSubmit = async (data: SignupFields) => {
    setSubmitError("");
    try {
      const imageResponse = await axios.post(
        imageHostingApi,
        { image: data.image[0] },
        { headers: { "content-type": "multipart/form-data" } },
      );
      const imageUrl = imageResponse.data.data.display_url;
      await signUp(data.email, data.password);
      await updateUser(data.name, imageUrl);
      await secureApi.post("/users", { email: data.email, name: data.name, image: imageUrl });
      successToast("Account created successfully");
      router.replace("/");
    } catch (error: unknown) {
      const duplicateEmail = error instanceof FirebaseError && error.code === "auth/email-already-in-use";
      setSubmitError(duplicateEmail ? "This email already has an account. Sign in instead." : "Your account could not be created. Check the form and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="signup-name" className="mb-2 block text-sm font-bold">Full name</label>
        <input id="signup-name" type="text" autoComplete="name" placeholder="Your full name…" className="field-control" {...register("name", { required: "Enter your full name." })} />
        {errors.name ? <p className="mt-2 text-sm font-medium text-error">{errors.name.message}</p> : null}
      </div>
      <div>
        <label htmlFor="signup-email" className="mb-2 block text-sm font-bold">Email address</label>
        <input id="signup-email" type="email" autoComplete="email" spellCheck={false} placeholder="you@example.com…" className="field-control" {...register("email", { required: "Enter your email address.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." } })} />
        {errors.email ? <p className="mt-2 text-sm font-medium text-error">{errors.email.message}</p> : null}
      </div>
      <div>
        <label htmlFor="signup-photo" className="mb-2 block text-sm font-bold">Profile photo</label>
        <input id="signup-photo" type="file" accept="image/png,image/jpeg,image/webp" className="file-input w-full" {...register("image", { required: "Choose a profile photo." })} />
        <p className="mt-2 text-xs text-base-content/50">JPG, PNG, or WebP. Use a clear photo of yourself.</p>
        {errors.image ? <p className="mt-2 text-sm font-medium text-error">{errors.image.message}</p> : null}
      </div>
      <div>
        <label htmlFor="signup-password" className="mb-2 block text-sm font-bold">Password</label>
        <input id="signup-password" type="password" autoComplete="new-password" placeholder="Create a secure password…" className="field-control" {...register("password", {
          required: "Create a password.",
          minLength: { value: 8, message: "Use at least 8 characters." },
          validate: {
            uppercase: (value) => /[A-Z]/.test(value) || "Add at least 1 uppercase letter.",
            number: (value) => /\d/.test(value) || "Add at least 1 number.",
            symbol: (value) => /[^A-Za-z0-9]/.test(value) || "Add at least 1 symbol.",
          },
        })} />
        <p className="mt-2 text-xs text-base-content/50">At least 8 characters with an uppercase letter, number, and symbol.</p>
        {errors.password ? <p className="mt-2 text-sm font-medium text-error">{errors.password.message}</p> : null}
      </div>

      {submitError ? <p className="rounded-xl bg-error/10 px-4 py-3 text-sm font-medium text-error" role="alert">{submitError}</p> : null}

      <button type="submit" disabled={isSubmitting} className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-content transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-60">
        {isSubmitting ? "Creating your account…" : "Create resident account"}
        {!isSubmitting ? <HiOutlineArrowRight aria-hidden="true" /> : null}
      </button>
    </form>
  );
};

export default SignupForm;
