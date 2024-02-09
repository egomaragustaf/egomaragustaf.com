import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex justify-center items-center h-screen">
      <main className="w-full max-w-3xl text-center space-y-2">
        <h1 className="text-xl">Welcome to My Website</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla minima
          alias nostrum veritatis qui sapiente velit rem eaque, animi ad ipsa
          laboriosam autem, facilis deserunt quo, rerum aliquam ab doloribus?
        </p>
      </main>
    </div>
  );
}
