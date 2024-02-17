import type { MetaFunction } from "@remix-run/node";

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
        <h3>Frontend Developer</h3>
        <p>I design beautifuly simple things, and love what I do</p>
      </main>
    </div>
  );
}
