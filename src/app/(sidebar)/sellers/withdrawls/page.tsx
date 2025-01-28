// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { FileUser } from "lucide-react";

import PageTitle from "@/components/ui/custom/PageTitle";
import { DataTable } from "@/components/helpers/dataTable/data-table";

export default async function Applications() {
  return (
    <>
      <PageTitle
        Icon={FileUser}
        title="Withdrawl Request"
        subTitle="(total 20 request)"
      />
    </>
  );
}
