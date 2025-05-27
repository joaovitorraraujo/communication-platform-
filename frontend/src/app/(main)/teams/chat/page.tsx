import ChatHeader from "./components/ChatHeader";

export default function ChatPage() {
  return (
    <div className="bg-zinc-900 w-full min-h-screen rounded-2xl flex">
      <div className="hidden md:block border-r-1 border-zinc-950 w-full p-4">
        All teams
      </div>

      {/* MAIN */}
      <section className="h-full w-full">
        <ChatHeader />
        {/* CONTENT MAIN */}
        <div className="p-4 ">
          <p>CONTENT</p>
          <p>CONTENT</p>
          <p>CONTENT</p>
        </div>
      </section>
    </div>
  );
}
