// Components
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Forgot password"
            description="Enter your email to receive a password reset link"
        >
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-amber-500">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    className="h-11 border-white/10 bg-[#0a0a0a]/50 pr-12 pl-4 text-white transition-all placeholder:text-gray-500 focus:border-[#ff6b35]/50 focus:ring-2 focus:ring-[#ff6b35]/20"
                                    autoFocus
                                    placeholder="email@example.com"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="mt-4 h-11 w-full bg-gradient-to-r from-[#ff6b35] to-[#ff5722] shadow-lg shadow-[#ff6b35]/25 transition-all duration-300 hover:from-[#ff5722] hover:to-[#ff6b35]"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Email password reset link
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-gray-400">
                    <span>Or, return to</span>
                    <TextLink
                        className="font-semibold text-[#ff6b35] transition-colors hover:text-[#ff5722]"
                        href={login()}
                    >
                        Log in
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
