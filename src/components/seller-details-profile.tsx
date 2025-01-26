import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatsCard } from "@/components/stats-card";
import {
  ShoppingBag,
  AlertTriangle,
  Flag,
  Wallet,
  TicketIcon,
  Package,
  ExternalLink,
  Eye,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface SellerDetailsProps {
  name: string;
  subdomain: string;
  id: string;
  totalOrders: number;
  totalWarnings: number;
  totalReports: number;
  accountBalance: number;
  openTickets: number;
  products: Product[];
}

export function SellerDetailsProfile({
  name,
  subdomain,
  id,
  totalOrders,
  totalWarnings,
  totalReports,
  accountBalance,
  openTickets,
  products,
}: SellerDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
              />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{name}</CardTitle>
              <p className="text-sm text-muted-foreground">ID: {id}</p>
              <Badge variant="outline" className="mt-2 p-2 px-4">
                {subdomain}.example.com{" "}
                <Link
                  href={`https://${subdomain}.example.com`}
                  className="ml-2"
                >
                  <ExternalLink className="size-4 text-muted-foreground" />
                </Link>
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Warnings"
          value={totalWarnings}
          icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Reports"
          value={totalReports}
          icon={<Flag className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Account Balance"
          value={`$${accountBalance.toFixed(2)}`}
          icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Open Tickets"
          value={openTickets}
          icon={<TicketIcon className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Package className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={product.stock > 0 ? "default" : "destructive"}
                  >
                    {product.stock > 0
                      ? `In Stock: ${product.stock}`
                      : "Out of Stock"}
                  </Badge>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
