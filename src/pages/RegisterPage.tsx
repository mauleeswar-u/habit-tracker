
import { Layout } from "@/components/layout/Layout";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <AuthForm type="register" />
      </div>
    </Layout>
  );
}
