"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import { CircleCheck, CircleAlert, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
  });

  const [status, setStatus] = useState<string>("");
  const searchParams = useSearchParams();
  const verifyUrl = searchParams.get("verify_url");

  useEffect(() => {
    if (verifyUrl) {
      axios
        .get(verifyUrl)
        .then(() => {
          setStatus("verified");
          window.location.href = "/dashboard";
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [verifyUrl]);

  if (verifyUrl && status !== "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            Verifying...
          </CardTitle>
          <CardDescription>
            Please wait while we verify your email address.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn&apos;t receive the email, we will gladly send you another.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === "verification-link-sent" && (
          <Alert>
            <CircleCheck className="size-4" />
            <AlertDescription>
              A new verification link has been sent to your email address.
            </AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert variant="destructive">
            <CircleAlert className="size-4" />
            <AlertDescription>
              Verification failed. The link may have expired. Please request a
              new one.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between">
          <Button onClick={() => resendEmailVerification({ setStatus })}>
            Resend Verification Email
          </Button>

          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}