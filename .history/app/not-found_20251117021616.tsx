// app/not-found.tsx
import Link from "next/link";
const style = `.nf-container {
  height: 100vh;
  width: 100%;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.nf-title {
  font-size: 120px;
  font-weight: 800;
  color: #222;
  margin: 0;
  animation: fadeDown 0.7s ease-in-out;
}

.nf-text {
  font-size: 20px;
  color: #666;
  margin-top: 15px;
  animation: fadeIn 1s ease-in-out;
}

.nf-btn {
  margin-top: 30px;
  display: inline-block;
  padding: 12px 28px;
  font-size: 16px;
  color: #222;
  background: #fff;
  border: 2px solid #222;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.3s ease;
}

.nf-btn:hover {
  background: #222;
  color: #fff;
}

/* Simple Animations */
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`

export default function NotFound() {
  return (
    <div className="nf-container">
      <h1 className="nf-title">404</h1>
      <p className="nf-text">Oops! The page you're looking for doesn't exist.</p>

      <Link href="/" className="nf-btn">
        Go back home
      </Link>
    </div>
  );
}
