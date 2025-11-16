import { Sidebar } from '@/components/sidebar'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
