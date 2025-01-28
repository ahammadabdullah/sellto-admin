import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/helpers/dataTable/data-table";
import { StatsCard } from "@/components/stats-card";
import {
  ShoppingBag,
  AlertTriangle,
  Flag,
  Wallet,
  TicketIcon,
  Package,
  ExternalLink,
  Banknote,
  BaggageClaim,
} from "lucide-react";
import { columns, type Product } from "./product-clmns";
import { Button } from "@/components/ui/button";
import { WithdrawalRequest } from "./withdrawal-request";
import { columns as orderColumns, type AllOrders } from "./order-clmns";

interface SellerDetailsProps {
  name: string;
  subdomain: string;
  id: string;
  totalOrders: number;
  totalWarnings: number;
  totalReports: number;
  accountBalance: number;
  openTickets: number;
  pendingWithdrawal: number;
  totalWithdrawn: number;
  products: Product[];
  orders: AllOrders[];
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
  pendingWithdrawal,
  totalWithdrawn,
  products,
  orders,
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
              <Link
                href={`https://${subdomain}.sellto.io`}
                target="_blank"
                className="hover:opacity-55 transition-opacity"
              >
                <Badge variant="outline" className="mt-2 p-2 px-4">
                  {subdomain}.sellto.io{" "}
                  <ExternalLink className="size-4 text-muted-foreground ml-2" />
                </Badge>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Total number of orders completed"
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Warnings"
          value={totalWarnings}
          subtitle="Number of warnings received"
          icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Reports"
          value={totalReports}
          subtitle="Number of reports filed by shop customers"
          icon={<Flag className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Open Tickets"
          value={openTickets}
          subtitle="Active support tickets"
          icon={<TicketIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Products"
          value={products.length}
          subtitle="Total number of products listed"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Account Balance"
          value={`$${accountBalance}`}
          subtitle="Shop's current available balance"
          icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Pending Withdrawal"
          value={`$${pendingWithdrawal}`}
          icon={<Banknote className="h-4 w-4 text-muted-foreground" />}
          subtitle="Pending withdrawal requests amount"
        />
        <StatsCard
          title="Total Money Withdrawn"
          value={`$${totalWithdrawn}`}
          icon={<BaggageClaim className="h-4 w-4 text-muted-foreground" />}
          subtitle="Total withdrawl amount approved to date"
        />
      </div>
      <WithdrawalRequest amount={pendingWithdrawal} />
      <div className="py-2">
        <h2 className="text-3xl font-medium mb-4 font-clash">Products</h2>
        <div className="bg-background rounded p-4 border">
          <DataTable columns={columns} data={products} pagination={true} />
        </div>
      </div>

      <div className="py-2">
        <h2 className="text-3xl font-medium mb-4 font-clash">Orders</h2>
        <div className="bg-background rounded p-4 border">
          <DataTable columns={orderColumns} data={orders} pagination={true} />
        </div>
      </div>

      {/* <Card>
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
      </Card> */}
    </div>
  );
}
