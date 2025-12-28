import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import PageInfo from '@/components/page-info';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

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
            <div className="space-y-6 p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <PageInfo
                        title="Operations Overview"
                        description="An organization-wide view of operations, orders, and revenue performance."
                    />
                    <div className="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm">
                        <Select
                            defaultValue={String(new Date().getMonth() + 1)}
                        >
                            <SelectTrigger className="w-[140px] border-muted">
                                <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">January</SelectItem>
                                <SelectItem value="2">February</SelectItem>
                                <SelectItem value="3">March</SelectItem>
                                <SelectItem value="4">April</SelectItem>
                                <SelectItem value="5">May</SelectItem>
                                <SelectItem value="6">June</SelectItem>
                                <SelectItem value="7">July</SelectItem>
                                <SelectItem value="8">August</SelectItem>
                                <SelectItem value="9">September</SelectItem>
                                <SelectItem value="10">October</SelectItem>
                                <SelectItem value="11">November</SelectItem>
                                <SelectItem value="12">December</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue={String(new Date().getFullYear())}>
                            <SelectTrigger className="w-[120px] border-muted">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from(
                                    { length: 10 },
                                    (_, i) => new Date().getFullYear() - i,
                                ).map((year) => (
                                    <SelectItem key={year} value={String(year)}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto px-8 pb-8">
                {data.subscriptionStatus && (
                    <Alert
                        variant={
                            data.subscriptionStatus.status === 'expired'
                                ? 'destructive'
                                : data.subscriptionStatus.status ===
                                    'expiring_soon'
                                  ? 'default'
                                  : 'default'
                        }
                        className={
                            data.subscriptionStatus.status === 'expired'
                                ? 'shadow-lg'
                                : data.subscriptionStatus.status ===
                                    'expiring_soon'
                                  ? 'border-yellow-500/50 bg-yellow-50 shadow-lg shadow-yellow-500/10 dark:bg-yellow-950/20'
                                  : 'border-green-500/50 bg-green-50 shadow-lg shadow-green-500/10 dark:bg-green-950/20'
                        }
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <AlertTitle className="text-base font-semibold">
                                    Account Subscription Status
                                </AlertTitle>
                                <AlertDescription className="space-y-3">
                                    <Badge
                                        variant={
                                            data.subscriptionStatus.status ===
                                            'expired'
                                                ? 'destructive'
                                                : data.subscriptionStatus
                                                        .status ===
                                                    'expiring_soon'
                                                  ? 'outline'
                                                  : 'default'
                                        }
                                        className={
                                            data.subscriptionStatus.status ===
                                            'expired'
                                                ? 'shadow-sm'
                                                : data.subscriptionStatus
                                                        .status ===
                                                    'expiring_soon'
                                                  ? 'border-yellow-500 bg-yellow-100 text-yellow-800 shadow-sm dark:bg-yellow-900/30 dark:text-yellow-400'
                                                  : 'border-green-500 bg-green-600 text-white shadow-sm'
                                        }
                                    >
                                        {data.subscriptionStatus.status ===
                                        'expired'
                                            ? 'Expired'
                                            : data.subscriptionStatus.status ===
                                                'expiring_soon'
                                              ? 'Expiring Soon'
                                              : 'Active'}
                                    </Badge>
                                    <p className="text-sm leading-relaxed">
                                        {data.subscriptionStatus.status ===
                                        'expired'
                                            ? 'Your subscription has expired. Please renew to continue.'
                                            : `Expires on ${new Date(data.subscriptionStatus.expiryDate).toLocaleDateString()} (${data.subscriptionStatus.daysRemaining} days remaining)`}
                                    </p>
                                </AlertDescription>
                            </div>
                            {data.subscriptionStatus.status !== 'active' && (
                                <button className="rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#ff5722] px-6 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-[#ff6b35]/30 transition-all duration-300 hover:scale-105 hover:from-[#ff5722] hover:to-[#ff6b35] hover:shadow-xl">
                                    Renew Now
                                </button>
                            )}
                        </div>
                    </Alert>
                )}
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-sm font-medium">
                                Orders Up to Date
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-3xl font-bold tracking-tight">
                                {data.todayOrders.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Total orders today
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-sm font-medium">
                                Monthly Average
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-3xl font-bold tracking-tight">
                                {data.monthlyAverage.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Average orders per month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-sm font-medium">
                                Additional Report
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-3xl font-bold tracking-tight">
                                {data.additionalMetric.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Additional metric
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="min-h-[400px] transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">
                                Top 10 Branches by Income
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-muted/50">
                                            <TableHead className="w-[80px] font-semibold">
                                                Rank
                                            </TableHead>
                                            <TableHead className="font-semibold">
                                                Branch
                                            </TableHead>
                                            <TableHead className="text-right font-semibold">
                                                Income
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.topBranches.length > 0 ? (
                                            data.topBranches
                                                .slice(0, 10)
                                                .map((branch, index) => (
                                                    <TableRow
                                                        key={branch.id}
                                                        className="transition-colors hover:bg-muted/50"
                                                    >
                                                        <TableCell className="font-medium">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                                {index + 1}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {branch.name}
                                                        </TableCell>
                                                        <TableCell className="text-right font-semibold">
                                                            $
                                                            {branch.income.toLocaleString()}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="h-32 text-center"
                                                >
                                                    <p className="text-muted-foreground">
                                                        No data available
                                                    </p>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="min-h-[400px] transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">
                                Annual Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[300px] items-end justify-between gap-3 rounded-lg border bg-muted/30 p-4">
                                {data.annualData.length > 0 ? (
                                    data.annualData.map((month) => {
                                        const maxOrders = Math.max(
                                            ...data.annualData.map(
                                                (m) => m.orders,
                                            ),
                                        );
                                        const height =
                                            maxOrders > 0
                                                ? (month.orders / maxOrders) *
                                                  100
                                                : 0;
                                        return (
                                            <div
                                                key={month.month}
                                                className="group flex flex-1 flex-col items-center gap-3"
                                            >
                                                <div className="relative w-full">
                                                    <div
                                                        className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/70 shadow-sm transition-all duration-300 group-hover:from-primary group-hover:to-primary group-hover:shadow-md"
                                                        style={{
                                                            height: `${Math.max(height, 5)}%`,
                                                        }}
                                                        title={`${month.orders} orders`}
                                                    />
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-popover px-2 py-1 text-xs font-medium whitespace-nowrap text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                                                        {month.orders.toLocaleString()}{' '}
                                                        orders
                                                    </div>
                                                </div>
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {month.month}
                                                </span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex w-full items-center justify-center">
                                        <p className="text-muted-foreground">
                                            No data available
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
