export default function Loading() {
  // Or a custom loading skeleton component
  return <p>Loading...</p>
}# attack at 10000 rps for 60s from one machine (scale across machines)

echo "GET https://scuba-life.net/" | vegeta attack -rate=10000 -duration=60s | vegeta report
