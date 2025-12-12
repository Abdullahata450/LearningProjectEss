// src/app/dashboard/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isAdmin = session.user.role === "admin";

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">User Information</h2>
              <p className="text-gray-700">
                <strong>Name:</strong> {session.user.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {session.user.email}
              </p>
              <p className="text-gray-700">
                <strong>Role:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${isAdmin
                      ? "bg-purple-200 text-purple-800"
                      : "bg-green-200 text-green-800"
                    }`}
                >
                  {session.user.role}
                </span>
              </p>
            </div>

            {isAdmin && (
              <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <h2 className="text-xl font-semibold mb-2 text-purple-800">
                  Admin Section
                </h2>
                <p className="text-gray-700">
                  This section is only visible to administrators.
                </p>
                <div className="mt-4 space-y-2">
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                    Manage Users
                  </button>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                    View Reports
                  </button>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                    System Settings
                  </button>
                </div>
              </div>
            )}

            <div className="p-4 bg-green-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
              <p className="text-gray-700">
                You are successfully authenticated and can access protected
                content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
