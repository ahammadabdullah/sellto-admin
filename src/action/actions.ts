import prisma from "@/lib/db";
import { LoginSchema } from "@/schema/zod";
import { signIn } from "next-auth/react";
export type State = {
  message: string | null;
  errors: {
    email?: string[];
    password?: string[];
  };
};
export async function login(prevState: State, formData: FormData) {
  const fields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
      message: null,
      redirectUrl: null,
    };
  }

  const { email, password } = fields.data;
  console.log(email, password, "from actions.ts");
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      return {
        errors: {
          email: ["Invalid email or password"],
          password: ["Invalid email or password"],
        },
        message: null,
        redirectUrl: null,
      };
    } else {
      return {
        errors: {},
        message: "Login successful",
        redirectUrl: "/",
      };
    }
  } catch (error) {
    console.error("Login failed", error);
    return {
      errors: {
        email: ["Invalid email or password"],
      },
      message: null,
      redirectUrl: null,
    };
  }
}
export const getShop = async (id: string) => {
  const res = await prisma.shop.findUnique({
    where: {
      id: id,
    },
  });
  return res;
};
