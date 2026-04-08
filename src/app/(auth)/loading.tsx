import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AuthLoading() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="h-5 w-24 animate-pulse rounded bg-muted" />
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="h-9 w-full animate-pulse rounded-3xl bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-9 w-full animate-pulse rounded-3xl bg-muted" />
        </div>
        <div className="h-9 w-full animate-pulse rounded-4xl bg-muted" />
      </CardContent>
    </Card>
  );
}
