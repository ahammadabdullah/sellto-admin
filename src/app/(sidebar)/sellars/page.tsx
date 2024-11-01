// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/custom/PageTitle";
import { Store } from "lucide-react";
export default function Home() {
  return (
    <div className=" p-8">
      <PageTitle Icon={Store} title="Sellars" subTitle="(total 54 sellars)" />
    </div>
  );
}
