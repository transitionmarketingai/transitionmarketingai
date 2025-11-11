import { Lock } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <Section className="bg-muted/30" containerClassName="items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center gap-3 text-center">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Lock className="size-6" />
          </div>
          <CardTitle>Operator Login</CardTitle>
          <CardDescription>
            Secure portal for Transition Marketing AI operators. External access
            coming soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button disabled className="w-full">
            Sign in with workspace
          </Button>
          <p className="text-xs text-muted-foreground">
            Need access? Contact your engagement lead or email
            ops@transitionmarketing.ai
          </p>
        </CardContent>
      </Card>
    </Section>
  );
}
