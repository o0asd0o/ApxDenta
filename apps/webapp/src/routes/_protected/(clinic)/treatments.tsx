import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/(clinic)/treatments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/treatments"!</div>
}
