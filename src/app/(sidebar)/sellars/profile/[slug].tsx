import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p> x {router.query.slug}</p>;
}
// not working
