import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/(physical-asset)/stocks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/(physical-asset)/stocks"!</div>
}
