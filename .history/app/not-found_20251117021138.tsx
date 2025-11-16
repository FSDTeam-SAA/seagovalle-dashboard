import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='min-h-screen w-screen flex item-center justify-center'>
      <div >
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link className='text-blue-500' href="/">Return Home</Link>
      </div>
    </main>
  )
}