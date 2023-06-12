"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please type a valid email.")
      .required("You must type your email."),
    description: yup.string().min(10, "Minimum 10 characters, please."),
    budget: yup
      .number()
      .required("Please type your budget")
      .min(50, "Budget must be $50 or more."),
  })
  .required();

export const ErrorMessage = ({ children }) => {
  return <p className="mt-2 text-red-500">{children}</p>;
};

export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      description: "",
      budget: 0,
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div>
          <Input
            placeholder="me@example.com"
            inputType="input"
            label="Email"
            register={register}
            name="email"
            required={true}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>
        <div>
          <Input
            placeholder="I need a landing page designed for my grocery shop..."
            inputType="textarea"
            label="Describe your project"
            register={register}
            name="description"
            required={true}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <div>
          <Input
            placeholder="$1000"
            inputType="input"
            label="Budget"
            register={register}
            name="budget"
            required={true}
            type="number"
          />
          <ErrorMessage>{errors.budget?.message}</ErrorMessage>
        </div>
        <Button type="submit">Hire Now</Button>
      </form>
      <p className="mt-6 text-gray-500 flex items-center gap-2">
        <Info size={15} />
        You'll be redirected to the payment page.
      </p>
    </>
  );
}