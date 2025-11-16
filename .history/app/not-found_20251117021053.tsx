import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main>

    <div >
      <h2>Not Found</h2>
    </main>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}