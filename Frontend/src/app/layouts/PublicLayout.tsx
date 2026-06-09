import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <>
      <header>
        <nav>
          <h2>MindVault</h2>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Build a second brain.</p>
      </footer>
    </>
  );
}