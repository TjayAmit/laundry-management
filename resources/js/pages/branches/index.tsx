import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Plus } from 'lucide-react';

type BranchStatus = 'open' | 'closed' | 'maintenance';

interface Branch {
    id: number;
    name: string;
    address: string;
    activeOrders: number;
    toBeReleased: number;
    todayIncome: number;
    status: BranchStatus;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Branch Management',
        href: dashboard().url,
    },
];

export default function Index() {
    const [branchesData, setBranchesData] = useState<Branch[]>([
        {
            id: 1,
            name: 'Main Branch',
            address: '123 Main St',
            activeOrders: 15,
            toBeReleased: 8,
            todayIncome: 25000,
            status: 'open',
        },
        {
            id: 2,
            name: 'Downtown Branch',
            address: '456 Downtown Ave',
            activeOrders: 22,
            toBeReleased: 12,
            todayIncome: 38500,
            status: 'open',
        },
    ]);

    const handleStatusChange = (id: number, status: BranchStatus) => {
        setBranchesData(
            branchesData.map((b) => (b.id === id ? { ...b, status } : b)),
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this branch?')) {
            setBranchesData(branchesData.filter((b) => b.id !== id));
        }
    };

    const getStatusColor = (status: BranchStatus) => {
        switch (status) {
            case 'open':
                return 'bg-green-500/20 text-green-400 border border-green-500/30';
            case 'closed':
                return 'bg-red-500/20 text-red-400 border border-red-500/30';
            case 'maintenance':
                return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Branches Management" />
            <div className="space-y-8 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Branches Management
                        </h1>
                        <p className="mt-2 text-sm text-gray-400">
                            Manage your branches, track orders and income
                        </p>
                    </div>
                    <Link
                        href={'/branches/create'}
                        className="flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#ff5722] px-6 shadow-lg shadow-[#ff6b35]/25 transition-all duration-300 hover:from-[#ff5722] hover:to-[#ff6b35]"
                    >
                        <Plus className="h-5 w-5" />
                        Add Branch
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Branch Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Address
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">
                                        Active Orders
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">
                                        To Be Released
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">
                                        Today's Income
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {branchesData.map((branch) => (
                                    <tr
                                        key={branch.id}
                                        className="border-b border-white/5 transition-colors hover:bg-white/5"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {branch.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {branch.address}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center justify-center rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
                                                {branch.activeOrders}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center justify-center rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-400">
                                                {branch.toBeReleased}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-semibold">
                                            ₱
                                            {branch.todayIncome.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span
                                                    className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium uppercase ${getStatusColor(branch.status)}`}
                                                >
                                                    {branch.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={'/branches/create'}
                                                    className="rounded-lg bg-white/10 px-3 py-1 text-sm transition-colors hover:bg-white/20"
                                                >
                                                    Edit
                                                </Link>
                                                <div className="relative">
                                                    <select
                                                        value={branch.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                branch.id,
                                                                e.target
                                                                    .value as BranchStatus,
                                                            )
                                                        }
                                                        className="appearance-none rounded-lg border border-white/20 bg-black/40 py-1 pr-8 pl-2 text-sm transition-colors hover:border-white/40"
                                                    >
                                                        <option value="open">
                                                            Open
                                                        </option>
                                                        <option value="closed">
                                                            Closed
                                                        </option>
                                                        <option value="maintenance">
                                                            Maintenance
                                                        </option>
                                                    </select>
                                                    <svg
                                                        className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(branch.id)
                                                    }
                                                    className="rounded-lg bg-red-500/20 px-3 py-1 text-sm text-red-400 transition-colors hover:bg-red-500/30"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
