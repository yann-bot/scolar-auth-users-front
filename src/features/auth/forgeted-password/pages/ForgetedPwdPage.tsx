import ForgetPwdForm from "../../components/ForgetPwdForm";

export default function ForgetedPwdPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-linear-to-r from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <ForgetPwdForm />
      </div>
    </main>
  );
}
