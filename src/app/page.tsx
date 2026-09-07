import { db } from "@/db";
import { aiTools } from "@/db/schema";

export default async function Home() {
  const tools = await db.select().from(aiTools);
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">AI Tool Hub</h1>
      <div className="grid gap-4">
        {tools.map((tool) => (
          <div key={tool.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{tool.name}</h2>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
