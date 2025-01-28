import { SellerDetailsProfile } from "./seller-details-profile";
import { type AllOrders } from "./order-clmns";

// mock data
const generateMockProducts = (
  count: number,
  shopId: string,
  subdomain: string
) => {
  const productTypes = [
    "Widget",
    "Gadget",
    "Gizmo",
    "Tool",
    "Device",
    "Accessory",
  ];
  const adjectives = [
    "Premium",
    "Deluxe",
    "Super",
    "Ultra",
    "Advanced",
    "Professional",
  ];

  return Array.from({ length: count }, (_, i) => {
    const type =
      productTypes[
        Math.floor(Math.random() * productTypes.length)
      ].toLowerCase();
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const price = Math.floor(Math.random() * 200) + 9.99;
    const stock = Math.random() > 0.1 ? Math.floor(Math.random() * 100) : 0;
    const date = new Date(
      Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
    );

    return {
      id: `P${i + 1}`,
      productName: `${adj} ${type}`,
      price: Number(price.toFixed(2)),
      stock,
      image: "/placeholder.png",
      createdAt: date,
      updatedAt: date,
      type,
      shopId,
      shortDescription: `A ${adj.toLowerCase()} ${type} for everyday use`,
      shopSubDomain: subdomain,
    };
  });
};

const generateMockOrders = (count: number, shopId: string): AllOrders[] => {
  const statuses = ["pending", "completed", "canceled", "delivered", "shipped"];
  const customerNames = [
    "John Smith",
    "Emma Wilson",
    "Michael Brown",
    "Sarah Davis",
    "James Miller",
    "Lisa Anderson",
  ];

  return Array.from({ length: count }, (_, i) => {
    const date = new Date(
      Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
    );
    return {
      id: `ORD${i + 1}`,
      customer_name:
        customerNames[Math.floor(Math.random() * customerNames.length)],
      createdAt: date,
      updatedAt: date,
      shopId,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      revenue: Number((Math.random() * 500 + 50).toFixed(2)),
    };
  });
};

const generateMockSellerData = (id: string) => {
  const firstName = ["Jane", "John", "Alice", "Bob", "Emma", "James"][
    Math.floor(Math.random() * 6)
  ];
  const lastName = ["Smith", "Doe", "Johnson", "Williams", "Brown", "Jones"][
    Math.floor(Math.random() * 6)
  ];
  const name = `${firstName} ${lastName}`;
  const subdomain = `${firstName.toLowerCase()}-store`;

  return {
    name,
    subdomain,
    id,
    totalOrders: Math.floor(Math.random() * 5000),
    totalWarnings: Math.floor(Math.random() * 5),
    totalReports: Math.floor(Math.random() * 3),
    accountBalance: Number((Math.random() * 10000).toFixed(2)),
    openTickets: Math.floor(Math.random() * 5),
    pendingWithdrawal: Number((Math.random() * 10000).toFixed(2)),
    totalWithdrawn: Number((Math.random() * 50000).toFixed(2)),
    products: generateMockProducts(20, id, subdomain),
    orders: generateMockOrders(50, id),
  };
};

const mockSellerData = generateMockSellerData("SELLER123");

export default function SellerDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-medium mb-6 font-clash">Seller Details</h1>
      <SellerDetailsProfile {...mockSellerData} id={params.id} />
    </div>
  );
}
