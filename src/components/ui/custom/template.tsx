// "use client";
// import * as React from "react";
// import gsap from "gsap";
// import Link from "next/link";
// import Image from "next/image";

// icon
import { EyeOff } from "lucide-react";

// componets
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
// import { useToast } from "@/components/hooks/use-toast";

interface Component {
  className?: string;
}
export function Component({ className }: Component) {
  // const { toast } = useToast();
  return <div className={cn("", className)}>x</div>;
}
