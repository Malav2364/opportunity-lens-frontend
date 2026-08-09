import { LoginForm } from "@/components/login-form"
import LoginToastHandler from "@/components/login-toast-handler"
import { Suspense } from "react"

export const metadata = {
  title: "Log In",
  description: "Log in to Opportunity Lens to continue your personalized AI learning path.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginToastHandler />
      </Suspense>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
