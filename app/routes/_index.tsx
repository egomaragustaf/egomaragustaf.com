import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Ego Maragustaf" },
    { name: "description", content: "Welcome to egomaragustaf.com!" },
  ];
};

export default function Index() {
  return (
    <div className="flex justify-center items-center h-screen">
      <main className="w-full max-w-3xl text-center space-y-2">
        <h1 className="text-xl">Hi!</h1>
        <h2>I'm Ego Maragustaf</h2>
        <p>This is my personal website with Remix.</p>
        <div className="space-x-2">
          <Button>Contact Me</Button>
          <Button variant={"secondary"}>Github</Button>
        </div>
      </main>
    </div>
  );
}
