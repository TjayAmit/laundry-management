
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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        status: '',
        time_open: '',
        time_close: '',
        capacity_limit: '',
        warning_threshold: '',
        latitude: '',
        longitude: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/branches', {
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
            <Head title="Create Branch" />
            <div className="space-y-8 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Branch Registration
                        </h1>
                        <p className="mt-2 text-sm text-gray-400">
                            Register a new branch for operations management.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">
                                Branch Information
                            </h2>
                            <p className="text-sm text-gray-400">
                                Fill in the details for the new branch. All
                                fields are required.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Branch Name</Label>
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
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData('address', e.target.value)
                                    }
                                    className="border-gray-700 bg-gray-800 text-white"
                                    required
                                />
                                {errors.address && (
                                    <p className="text-sm text-red-500">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value)
                                    }
                                >
                                    <SelectTrigger
                                        id="status"
                                        className="border-gray-700 bg-gray-800 text-white"
                                    >
                                        <SelectValue placeholder="Select branch status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="open">
                                            Open
                                        </SelectItem>
                                        <SelectItem value="close">
                                            Close
                                        </SelectItem>
                                        <SelectItem value="under_maintenance">
                                            Under Maintenance
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="time_open">
                                        Opening Time
                                    </Label>
                                    <Input
                                        id="time_open"
                                        type="time"
                                        value={data.time_open}
                                        onChange={(e) =>
                                            setData('time_open', e.target.value)
                                        }
                                        className="border-gray-700 bg-gray-800 text-white"
                                        required
                                    />
                                    {errors.time_open && (
                                        <p className="text-sm text-red-500">
                                            {errors.time_open}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="time_close">
                                        Closing Time
                                    </Label>
                                    <Input
                                        id="time_close"
                                        type="time"
                                        value={data.time_close}
                                        onChange={(e) =>
                                            setData(
                                                'time_close',
                                                e.target.value,
                                            )
                                        }
                                        className="border-gray-700 bg-gray-800 text-white"
                                        required
                                    />
                                    {errors.time_close && (
                                        <p className="text-sm text-red-500">
                                            {errors.time_close}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="capacity_limit">
                                        Capacity Limit
                                    </Label>
                                    <Input
                                        id="capacity_limit"
                                        type="number"
                                        value={data.capacity_limit}
                                        onChange={(e) =>
                                            setData(
                                                'capacity_limit',
                                                e.target.value,
                                            )
                                        }
                                        className="border-gray-700 bg-gray-800 text-white"
                                        required
                                    />
                                    {errors.capacity_limit && (
                                        <p className="text-sm text-red-500">
                                            {errors.capacity_limit}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="warning_threshold">
                                        Warning Threshold
                                    </Label>
                                    <Input
                                        id="warning_threshold"
                                        type="number"
                                        value={data.warning_threshold}
                                        onChange={(e) =>
                                            setData(
                                                'warning_threshold',
                                                e.target.value,
                                            )
                                        }
                                        className="border-gray-700 bg-gray-800 text-white"
                                        required
                                    />
                                    {errors.warning_threshold && (
                                        <p className="text-sm text-red-500">
                                            {errors.warning_threshold}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">
                                Store Location
                            </h2>
                            <p className="text-sm text-gray-400">
                                Click on the map to select the branch location.
                            </p>
                        </div>

                        <div className="flex h-[500px] items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50">
                            <div className="text-center">
                                <p className="text-gray-400">
                                    Map Component Placeholder
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    {data.latitude && data.longitude
                                        ? `Selected: ${data.latitude}, ${data.longitude}`
                                        : 'Click to select location'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link
                        href="/branches"
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
                                Creating...
                            </span>
                        ) : (
                            'Create Branch'
                        )}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}

