
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Head, Link, useForm} from '@inertiajs/react';
import { type FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Branch {
    id: number;
    name: string;
}

interface Props {
    branches: Branch[];
}

export default function Create({ branches }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        branch_id: '',
        position: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/staffs', {
            onSuccess: () => {
                // Handle success
            },
            onError: () => {
                // Handle error
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Create Branch Staff" />
            <div className="space-y-8 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Branch Staff Registration
                        </h1>
                        <p className="mt-2 text-sm text-gray-400">
                            Create a new staff account and assign to a branch.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">
                                Staff Account Details
                            </h2>
                            <p className="text-sm text-gray-400">
                                Fill in the staff information. All fields are
                                required.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Staff Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="border-gray-700 bg-gray-800 text-white"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="border-gray-700 bg-gray-800 text-white"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="border-gray-700 bg-gray-800 text-white"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    className="border-gray-700 bg-gray-800 text-white"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-500">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="branch_id">
                                    Assign to Branch
                                </Label>
                                <Select
                                    value={data.branch_id}
                                    onValueChange={(value) =>
                                        setData('branch_id', value)
                                    }
                                >
                                    <SelectTrigger
                                        id="branch_id"
                                        className="border-gray-700 bg-gray-800 text-white"
                                    >
                                        <SelectValue placeholder="Select a branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branches.map((branch) => (
                                            <SelectItem
                                                key={branch.id}
                                                value={branch.id.toString()}
                                            >
                                                {branch.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.branch_id && (
                                    <p className="text-sm text-red-500">
                                        {errors.branch_id}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Staff Position</Label>
                                <Input
                                    id="position"
                                    type="text"
                                    value={data.position}
                                    onChange={(e) =>
                                        setData('position', e.target.value)
                                    }
                                    className="border-gray-700 bg-gray-800 text-white"
                                    required
                                />
                                {errors.position && (
                                    <p className="text-sm text-red-500">
                                        {errors.position}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link
                        href="/branch-users"
                        className="flex h-11 items-center justify-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 text-white transition-colors hover:bg-gray-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Cancel
                    </Link>
                    <Button
                        type="submit"
                        onClick={submit}
                        disabled={processing}
                        className="h-11 bg-gradient-to-r from-[#ff6b35] to-[#ff5722] shadow-lg shadow-[#ff6b35]/25 transition-all duration-300 hover:from-[#ff5722] hover:to-[#ff6b35]"
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Creating Staff...
                            </span>
                        ) : (
                            'Create Staff'
                        )}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}

