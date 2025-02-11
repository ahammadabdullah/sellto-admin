import { SellerDetailsProfile } from "./seller-details-profile";
import { type AllOrders } from "./order-clmns";
import prisma from "@/lib/db";

const getProducts = async (id: string) => {
  const res = await prisma.product.findMany({
    where: {
      shopId: id,
    },
    include: {
      Variant: true,
      Shop_Product_shopIdToShop: true,
    },
  });
  return res.map((p) => {
    return {
      id: p.id,
      productName: p.productName,
      price: p.price,
      stock: p.stock,
      image: p.image,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      shopId: p.shopId,
      shortDescription: p.shortDescription,
      shopSubDomain: p.Shop_Product_shopIdToShop.subDomain,
    };
  });
};

const getOrders = async (id: string) => {
  const res = await prisma.order.findMany({
    where: {
      shopId: id,
    },
  });
  return res.map((o) => {
    return {
      id: o.id,
      customer_name: o.customer_name,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
      shopId: o.shopId,
      status: o.status,
      revenue: o.revenue,
    };
  });
};

const generateSellerData = async (id: string) => {
  const products = await getProducts(id);
  const orders = await getOrders(id);

  const shop = await prisma.shop.findUnique({
    where: {
      id,
    },
    include: {
      User: true,
    },
  });
  const tickets = await prisma.ticket.findMany({
    where: {
      shopId: id,
      AND: {
        status: "open",
      },
    },
  });
  const withdrawal = await prisma.withdraw.findMany({
    where: {
      shopId: id,
    },
  });

  const totalOrders = orders.length;
  const totalWarnings = 0;
  const totalReports = 0;
  const accountBalance = shop?.balance || 0;
  const openTickets = tickets.length;
  const pendingWithdrawal = withdrawal
    .filter((w) => w.status === "pending")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalWithdrawn = withdrawal
    .filter((w) => w.status === "completed")
    .reduce((acc, curr) => acc + curr.amount, 0);
  return {
    name: shop?.User?.name || "",
    subdomain: shop?.subDomain || "",
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
  };
};

export default async function SellerDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const sellerData = await generateSellerData(id);
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-medium mb-6 font-clash">Seller Details</h1>
      <SellerDetailsProfile {...sellerData} id={id} />
    </div>
  );
}
