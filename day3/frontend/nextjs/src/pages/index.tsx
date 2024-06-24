import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return <p>Redirecting..</p>;
};

export default Index;
