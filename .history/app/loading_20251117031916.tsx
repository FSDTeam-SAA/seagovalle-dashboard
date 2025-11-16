export default function Loading() {
  // Or a custom loading skeleton component
  return <p>Loading...</p>
}

wrk -t12 -c4000 -d120s --latency https://your-staging.example.com/
