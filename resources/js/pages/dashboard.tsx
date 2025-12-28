import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface BranchIncome {
    id: number;
    name: string;
    income: number;
}

interface MonthlyData {
    month: string;
    orders: number;
}

interface SubscriptionStatus {
    status: 'active' | 'expiring_soon' | 'expired';
    expiryDate: string;
    daysRemaining: number;
}

interface DashboardStats {
    todayOrders: number;
    monthlyAverage: number;
    topBranches: BranchIncome[];
    annualData: MonthlyData[];
    additionalMetric: number;
    subscriptionStatus?: SubscriptionStatus;
}

interface Props {
    stats?: DashboardStats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ stats }: Props) {
    const defaultStats: DashboardStats = {
        todayOrders: 0,
        monthlyAverage: 0,
        topBranches: [],
        annualData: [],
        additionalMetric: 0,
        subscriptionStatus: undefined,
    };

    const data = stats || defaultStats;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-8 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Operations Overview
                        </h1>
                        <p className="mt-2 text-sm text-gray-400">
                            An organization-wide view of operations, orders, and
                            revenue performance.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            className="bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] appearance-none rounded-lg border border-sidebar-border bg-white bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat px-4 py-2 pr-10 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-sidebar-border dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
                            defaultValue={new Date().getMonth() + 1}
                        >
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                        </select>
                        <select
                            className="bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] appearance-none rounded-lg border border-sidebar-border bg-white bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat px-4 py-2 pr-10 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-sidebar-border dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
                            defaultValue={new Date().getFullYear()}
                        >
                            {Array.from(
                                { length: 10 },
                                (_, i) => new Date().getFullYear() - i,
                            ).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {data.subscriptionStatus && (
                    <div
                        className={`relative overflow-hidden rounded-xl border p-6 ${
                            data.subscriptionStatus.status === 'expired'
                                ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                                : data.subscriptionStatus.status ===
                                    'expiring_soon'
                                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                                  : 'border-green-500 bg-green-50 dark:bg-green-950/20'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                    Account Subscription Status
                                </h3>
                                <p
                                    className={`mt-2 text-2xl font-bold ${
                                        data.subscriptionStatus.status ===
                                        'expired'
                                            ? 'text-red-700 dark:text-red-400'
                                            : data.subscriptionStatus.status ===
                                                'expiring_soon'
                                              ? 'text-yellow-700 dark:text-yellow-400'
                                              : 'text-green-700 dark:text-green-400'
                                    }`}
                                >
                                    {data.subscriptionStatus.status ===
                                    'expired'
                                        ? 'Expired'
                                        : data.subscriptionStatus.status ===
                                            'expiring_soon'
                                          ? 'Expiring Soon'
                                          : 'Active'}
                                </p>
                                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                                    {data.subscriptionStatus.status ===
                                    'expired'
                                        ? 'Your subscription has expired. Please renew to continue.'
                                        : `Expires on ${new Date(data.subscriptionStatus.expiryDate).toLocaleDateString()} (${data.subscriptionStatus.daysRemaining} days remaining)`}
                                </p>
                            </div>
                            {data.subscriptionStatus.status !== 'active' && (
                                <button className="rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#ff5722] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#ff6b35]/25 transition-all duration-300 hover:from-[#ff5722] hover:to-[#ff6b35]">
                                    Renew Now
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-4 dark:border-sidebar-border dark:bg-neutral-900">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            Orders Up to Date
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                            {data.todayOrders.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                            Total orders today
                        </p>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-4 dark:border-sidebar-border dark:bg-neutral-900">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            Monthly Average
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                            {data.monthlyAverage.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                            Average orders per month
                        </p>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-4 dark:border-sidebar-border dark:bg-neutral-900">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            Additional Report
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                            {data.additionalMetric.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                            Additional metric
                        </p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative min-h-[400px] overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-neutral-900">
                        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            Top 10 Branches by Income
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-neutral-200 dark:border-neutral-800">
                                    <tr>
                                        <th className="pb-2 font-medium text-neutral-600 dark:text-neutral-400">
                                            Rank
                                        </th>
                                        <th className="pb-2 font-medium text-neutral-600 dark:text-neutral-400">
                                            Branch
                                        </th>
                                        <th className="pb-2 text-right font-medium text-neutral-600 dark:text-neutral-400">
                                            Income
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.topBranches
                                        .slice(0, 10)
                                        .map((branch, index) => (
                                            <tr
                                                key={branch.id}
                                                className="border-b border-neutral-100 last:border-0 dark:border-neutral-800"
                                            >
                                                <td className="py-3 text-neutral-900 dark:text-neutral-100">
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 text-neutral-900 dark:text-neutral-100">
                                                    {branch.name}
                                                </td>
                                                <td className="py-3 text-right text-neutral-900 dark:text-neutral-100">
                                                    $
                                                    {branch.income.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    {data.topBranches.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="py-8 text-center text-neutral-500 dark:text-neutral-500"
                                            >
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="relative min-h-[400px] overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-neutral-900">
                        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            Annual Statistics
                        </h3>
                        <div className="flex h-[300px] items-end justify-between gap-2">
                            {data.annualData.length > 0 ? (
                                data.annualData.map((month) => {
                                    const maxOrders = Math.max(
                                        ...data.annualData.map((m) => m.orders),
                                    );
                                    const height =
                                        maxOrders > 0
                                            ? (month.orders / maxOrders) * 100
                                            : 0;
                                    return (
                                        <div
                                            key={month.month}
                                            className="flex flex-1 flex-col items-center gap-2"
                                        >
                                            <div
                                                className="w-full rounded-t bg-blue-500 transition-all dark:bg-blue-600"
                                                style={{ height: `${height}%` }}
                                                title={`${month.orders} orders`}
                                            />
                                            <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                                {month.month}
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex w-full items-center justify-center">
                                    <p className="text-neutral-500 dark:text-neutral-500">
                                        No data available
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
