// app/not-found.tsx
import Link from "next/link";
import "./not-found.css"

export default function NotFound() {
  return (
    
    <div className="nf-container">
      <h1 className="nf-title">404</h1>
      <p className="nf-text text-20">Oops! The page you're looking for doesn't exist.</p>

      <Link href="/" className="nf-btn">
        Go back home
      </Link>
    </div>
  );
}
