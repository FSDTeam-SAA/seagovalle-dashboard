import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='h-screen w-screen flex item-center justify-center'>

    <div >
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className='' href="/">Return Home</Link>
    </div>
    </main>
  )
}