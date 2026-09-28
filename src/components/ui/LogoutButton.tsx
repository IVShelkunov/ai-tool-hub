import { logoutAction } from "@/app/actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="transition-all duration-300  p-1 cursor-pointer rounded-lg border border-transparent  hover:border-white/50"
      >
        LOGOUT
      </button>
    </form>
  );
}
