"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { account } from "@/lib/appwrite";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { ID } from "appwrite";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    createAdminIfNeeded();
  }, []);

  const createAdminIfNeeded = async () => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (!adminEmail) return;

    try {
      // Try to create admin account if it doesn't exist
      await account.create(
        ID.unique(),
        adminEmail,
        'Admin123!', // Default admin password
        'Admin User'
      );
      toast({
        title: "Admin Account Created",
        description: "Default password is: Admin123!",
      });
    } catch (error: any) {
      // Ignore error if account already exists
      if (error.code !== 409) {
        console.error("Error creating admin:", error);
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await account.createEmailSession(email, password);
      
      // Check if user is admin
      const user = await account.get();
      if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        toast({
          title: "Success",
          description: "Signed in as admin",
        });
        router.push("/admin");
      } else {
        toast({
          title: "Success",
          description: "Signed in successfully",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md p-8 backdrop-blur-lg bg-gray-900/50 border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-8">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800/50 border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-800/50 border-gray-700"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          {email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
            <p className="text-center text-sm text-gray-400">
              Default admin password: Admin123!
            </p>
          )}
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300">
              Sign Up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}