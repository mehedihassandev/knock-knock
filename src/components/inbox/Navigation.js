import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <h1 className="text-white text-xl font-bold uppercase">
              knock-knock
            </h1>
          </Link>
          <ul>
            <li className="text-white">
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
