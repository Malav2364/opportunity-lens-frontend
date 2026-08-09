import { SgForm } from "@/components/signup-form"

export const metadata = {
  title: "Sign Up",
  description: "Create an Opportunity Lens account to start a personalized AI learning path.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpForm() {
  return (
    (<div
      className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SgForm />
      </div>
    </div>)
  );
}
