import { cookies } from "next/headers";

export async function Header() {
  const coockieStore = await cookies();
  const token = coockieStore.get("session_token");
  return (
    <header className="flex items-center justify-between p-6 bg-linear-to-r from-slate-950 via-slate-500 to-slate-900">
      <h1 className="md:text-5xl text-3xl font-bold text-transparent tracking-widest [-webkit-text-stroke:1px_var(--color-sky-500)] ">
        AI TOOL HUB
      </h1>
      {token ? <button>Logout</button> : <button>Login</button>}
    </header>
  );
}
