import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/(finance)/accounts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/(finance)/accounts"!</div>
}
