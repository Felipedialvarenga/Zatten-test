import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex content-center justify-center p-8 pb-20 gap-16 sm:p-20 ">
      <SignUp />
    </div>
  );
}
