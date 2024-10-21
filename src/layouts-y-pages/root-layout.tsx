import { useLoadingStore } from "@/store/loading-store";
import { useSigninCheck } from "reactfire";
import AuthLayout from "./auth-layout"; // Para login/register
import ChatLayout from "./chat-layout";  // Para el chat después de autenticarse
import { Route, Routes } from "react-router-dom";

const RootLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();
  const { loading } = useLoadingStore();

  console.log({
    status,
    signInCheckResult,
    hasEmitted,
  });

  if (status === "loading" || !hasEmitted) {
    return <span>Loading...</span>;
  }

  if (!signInCheckResult) {
    return <div>Error checking authentication. Try again later.</div>;
  }

  return (
    <Routes>
      {/* Si está autenticado, va al chat, si no, al login/register */}
      {signInCheckResult.signedIn && !loading ? (
        <Route path="*" element={<ChatLayout />} />
      ) : (
        <Route path="*" element={<AuthLayout />} />
      )}
    </Routes>
  );
};

export default RootLayout;
