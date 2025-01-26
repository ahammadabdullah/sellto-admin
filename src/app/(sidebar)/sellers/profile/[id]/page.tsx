import { SellerDetailsProfile } from "@/components/seller-details-profile";

// This would typically come from an API or database
const mockSellerData = {
  name: "Jane Doe",
  subdomain: "jane-store",
  id: "SELLER123",
  totalOrders: 1234,
  totalWarnings: 2,
  totalReports: 1,
  accountBalance: 5678.9,
  openTickets: 3,
  products: [
    { id: "P1", name: "Premium Widget", price: 29.99, stock: 50 },
    { id: "P2", name: "Deluxe Gadget", price: 49.99, stock: 25 },
    { id: "P3", name: "Super Gizmo", price: 99.99, stock: 0 },
  ],
};

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
