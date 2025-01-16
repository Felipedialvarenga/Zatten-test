import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex content-center justify-center p-8 pb-20 gap-16 sm:p-20 ">
      <SignIn />
    </div>
  );
}
