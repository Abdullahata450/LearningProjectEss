'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const SignIn = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
            else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            setError('An unexpected error occurred');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-200 to-purple-300">
            <div className="bg-white p-8 rounded-lg  shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Sign In
                </h1>
                {
                    error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            {error}
                        </div>
                    )
                }
                <button className=" w-full h-14 px-6 mt-4 text-xl bg-black text-white border-2 rounded-2xl flex items-center justify-center cursor-pointer focus:shadow-outline "
                    onClick={() => signIn("google")}>Sign in with Google</button>
                <button className=" w-full h-14 px-6 mt-4 text-xl bg-black text-white border-2 rounded-2xl flex items-center justify-center cursor-pointer focus:shadow-outlin"
                    onClick={() => signIn("github")}>Sign in with Github</button>
                <p className="text-2xl text-center font-semibold ">
                    or
                </p>
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg "
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg "
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignIn
