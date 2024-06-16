import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useRouter } from "next/router";
import { JWT_TOKEN_KEY } from "@/helpers/const.helper";
import Head from "next/head";
import AppBorder from "../commons/AppBorder";
import axios, { AxiosError } from "axios";

const DashboardLayout = ({
  children,
  contentTitle,
}: {
  children: any;
  contentTitle: string;
}) => {
  const [Email, setEmail] = useState<string>("");
  const router = useRouter();
  const validateToken = async () => {
    try {
      const response = await axios.request({
        url: `/api/user/me`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        },
        method: "GET",
      });
      setEmail(response.data.identifier);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.message);
        router.push("/logout");
        return;
      }
      console.error(error.message);
      router.push("/logout");
    }
  };
  useEffect(() => {
    if (localStorage.getItem(JWT_TOKEN_KEY) === null) router.push("/logout");
    validateToken();
  }, [router]);
  return (
    <div className="flex flex-row h-screen w-screen">
      <Head>
        <title>{contentTitle}</title>
      </Head>
      <div className="w-72 h-screen">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full">
          <DashboardHeader email={Email} />
        </div>
        <div className="w-full p-2">
          <div className="m-5 p-3 border rounded-xl shadow-gray-800">
            <p className="text-xl">{contentTitle}</p>
            <AppBorder />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
