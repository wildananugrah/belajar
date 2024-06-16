import PrimaryButton from "@/components/buttons/PrimaryButton";
import InfoMessage from "@/components/commons/InfoMessage";
import InputEmail from "@/components/inputs/InputEmail";
import InputPassword from "@/components/inputs/InputPassword";
import { JWT_TOKEN_KEY } from "@/helpers/const.helper";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [ErrorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [SuccessMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Head>
        <title>Belajar | Login</title>
      </Head>
      <div className="flex flex-col space-y-5 border px-2 py-5 rounded-xl w-96">
        <div className="flex flex-row justify-center items-center w-full">
          <p className="text-xl">Logo</p>
        </div>
        <InputEmail
          id="inputEmail"
          label="Email"
          value={Email}
          Set={setEmail}
        />
        <InputPassword
          id="inputPassword"
          label="Password"
          value={Password}
          Set={setPassword}
        />
        <InfoMessage
          successMessage={SuccessMessage}
          errorMessage={ErrorMessage}
        />
        <PrimaryButton
          id="buttonLogin"
          label="Log In"
          Set={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
              const response = await axios.request({
                url: `/api/user/login`,
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                data: JSON.stringify({
                  identifier: Email,
                  password: Password,
                }),
              });
              setSuccessMessage("Login succeed");
              localStorage.setItem(JWT_TOKEN_KEY, response.data.token);
              router.push("/admin/dashboard");
            } catch (error: any) {
              if (error instanceof AxiosError) {
                console.error(error.response?.data.message);
                setErrorMessage(error.response?.data.message);
                return;
              }
              console.error(error.message);
              setErrorMessage(error.message);
            }
          }}
        />
        <p className="flex flex-row justify-center items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push("/register");
            }}
            className="underline text-blue-600 text-sm"
            data-cyid="linkDontHaveAnAccount"
          >
            Don&apos;t have an account ?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
