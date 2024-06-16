import PrimaryButton from "@/components/buttons/PrimaryButton";
import InfoMessage from "@/components/commons/InfoMessage";
import InputEmail from "@/components/inputs/InputEmail";
import InputPassword from "@/components/inputs/InputPassword";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Register = () => {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [ConfirmPassword, setConfirmPassword] = useState<string>("");
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
        <title>Belajar | Register</title>
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
        <InputPassword
          id="inputConfirmPassword"
          label="Confirm Password"
          value={ConfirmPassword}
          Set={setConfirmPassword}
        />
        <InfoMessage
          errorMessage={ErrorMessage}
          successMessage={SuccessMessage}
        />
        <PrimaryButton
          label="Register"
          id="buttonRegister"
          Set={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
              const response = await axios.request({
                url: `/api/user/register`,
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                data: JSON.stringify({
                  identifier: Email,
                  password: Password,
                }),
              });
              setSuccessMessage("User has been registered!");
            } catch (error: any) {
              if (error instanceof AxiosError) {
                console.error(error.response?.data.message);
                setErrorMessage(error.response?.data.message);
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
              router.push("/login");
            }}
            className="underline text-blue-600 text-sm"
            data-cyid="linkAlreadyHaveAnAccount"
          >
            Already have an account ?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
