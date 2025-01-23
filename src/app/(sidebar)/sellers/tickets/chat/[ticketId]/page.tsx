import { getShop } from "@/action/actions";
import { Chat, TMessage } from "./chat";
import { getChatData } from "@/lib/api";
import { auth } from "@/auth";

const TicketData = async (ticketId: string) => {
  const res = await fetch(`${process.env.SERVER_URL}/api/tickets/${ticketId}`);
  const data = await res.json();
  return data;
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  const chats = await getChatData(ticketId);
  const ticket = await TicketData(ticketId);
  const shop = await getShop(ticket.shopId);
  const session = await auth();
  return (
    <main className="w-full overflow-x-hidden relative">
      <Chat
        ticketTopic={ticket.subject}
        customerName={"Admin"}
        sellerName={shop?.name || "Seller"}
        customerAvatar={
          shop?.favicon || `https://ui-avatars.com/api/?name=${shop?.name}`
        }
        sellerAvatar={
          session?.user.image ||
          `https://ui-avatars.com/api/?name=${ticket.email}`
        }
        initialMessages={chats as TMessage[]}
        ticketId={ticketId}
      ></Chat>
    </main>
  );
}
