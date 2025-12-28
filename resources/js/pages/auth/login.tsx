import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayoutTemplate
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <Head title="Log in" />

            {status && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-lg border border-[#ff6b35]/20 bg-[#0a0a0a]/80 p-4 text-center text-sm font-medium text-white backdrop-blur-sm"
                >
                    {status}
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-[#ff6b35]/3 via-[#1a1410] to-[#ff6b35]/3 blur-xl" />

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="relative flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <motion.div
                                    className="grid gap-2"
                                    whileHover={{ scale: 1.01 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                    }}
                                >
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-200"
                                    >
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="h-11 border-white/10 bg-[#0a0a0a]/50 pr-4 pl-4 text-white transition-all placeholder:text-gray-500 focus:border-[#ff6b35]/50 focus:ring-2 focus:ring-[#ff6b35]/20"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </motion.div>

                                <motion.div
                                    className="grid gap-2"
                                    whileHover={{ scale: 1.01 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                    }}
                                >
                                    <div className="flex items-center">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-medium text-gray-200"
                                        >
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-sm font-medium text-gray-400 transition-colors hover:text-[#ff6b35]"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="h-11 border-white/10 bg-[#0a0a0a]/50 pr-12 pl-4 text-white transition-all placeholder:text-gray-500 focus:border-[#ff6b35]/50 focus:ring-2 focus:ring-[#ff6b35]/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </motion.div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="border-white/20 data-[state=checked]:border-[#ff6b35] data-[state=checked]:bg-[#ff6b35]"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="cursor-pointer text-sm font-medium text-gray-200"
                                    >
                                        Remember me
                                    </Label>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="submit"
                                        className="mt-4 h-11 w-full bg-gradient-to-r from-[#ff6b35] to-[#ff5722] shadow-lg shadow-[#ff6b35]/25 transition-all duration-300 hover:from-[#ff5722] hover:to-[#ff6b35]"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && (
                                            <Spinner className="mr-2" />
                                        )}
                                        Log in
                                    </Button>
                                </motion.div>
                            </div>

                            {canRegister && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center text-sm"
                                >
                                    <span className="text-gray-400">
                                        Don't have an account?
                                    </span>{' '}
                                    <TextLink
                                        href={register()}
                                        tabIndex={5}
                                        className="font-semibold text-[#ff6b35] transition-colors hover:text-[#ff5722]"
                                    >
                                        Sign up
                                    </TextLink>
                                </motion.div>
                            )}
                        </>
                    )}
                </Form>
            </motion.div>
        </AuthLayoutTemplate>
    );
}
