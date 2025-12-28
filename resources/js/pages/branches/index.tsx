import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import PageInfo from '@/components/page-info';

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

interface Props {
    branches: Branch[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Branch Management',
        href: dashboard().url,
    },
];

export default function Index({ branches }: Props) {
    const [branchesData, setBranchesData] = useState<Branch[]>(branches);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredBranches = branchesData.filter(
        (branch) =>
            branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );

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
                return 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
            case 'closed':
                return 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
            case 'maintenance':
                return 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Branches Management" />

            <div className="space-y-6 p-4 sm:p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <PageInfo title='Branches Management' description='Manage your branches, track orders and income' />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1 sm:min-w-[280px] lg:min-w-[320px]">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search branches..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 pl-10 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20"
                            />
                        </div>

                        <div className="flex gap-3">
                            {searchQuery && (
                                <Button
                                    variant="outline"
                                    onClick={() => setSearchQuery('')}
                                    className="border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 hover:bg-gray-800/50"
                                >
                                    Clear
                                </Button>
                            )}
                            <Button
                                asChild
                                className="bg-gradient-to-r from-primary to-[#ff5722] shadow-lg shadow-primary/25 hover:from-[#ff5722] hover:to-primary hover:shadow-primary/50"
                            >
                                <Link href="/branches/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Branch
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-foreground">
                            All Branches ({filteredBranches.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-muted/50">
                                        <TableHead className="font-semibold">
                                            Branch Name
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Address
                                        </TableHead>
                                        <TableHead className="text-center font-semibold">
                                            Active Orders
                                        </TableHead>
                                        <TableHead className="text-center font-semibold">
                                            To Be Released
                                        </TableHead>
                                        <TableHead className="text-center font-semibold">
                                            Today's Income
                                        </TableHead>
                                        <TableHead className="text-center font-semibold">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-center font-semibold">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBranches.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="py-12 text-center"
                                            >
                                                <div className="flex flex-col items-center gap-3">
                                                    <Search className="h-12 w-12 text-muted-foreground/40" />
                                                    <p className="text-lg font-medium text-muted-foreground">
                                                        No branches found
                                                    </p>
                                                    <p className="text-sm text-muted-foreground/70">
                                                        Try adjusting your
                                                        search criteria
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredBranches.map((branch) => (
                                            <TableRow
                                                key={branch.id}
                                                className="transition-colors hover:bg-primary/[0.02]"
                                            >
                                                <TableCell className="font-medium">
                                                    {branch.name}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {branch.address}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        variant="outline"
                                                        className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                                                    >
                                                        {branch.activeOrders}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        variant="outline"
                                                        className="border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"
                                                    >
                                                        {branch.toBeReleased}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center font-semibold text-primary">
                                                    ₱
                                                    {branch.todayIncome.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            'capitalize',
                                                            getStatusColor(
                                                                branch.status,
                                                            ),
                                                        )}
                                                    >
                                                        {branch.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                            className="hover:bg-accent"
                                                        >
                                                            <Link href="/branches/create">
                                                                Edit
                                                            </Link>
                                                        </Button>

                                                        <Select
                                                            value={
                                                                branch.status
                                                            }
                                                            onValueChange={(
                                                                value: BranchStatus,
                                                            ) =>
                                                                handleStatusChange(
                                                                    branch.id,
                                                                    value,
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger className="w-[120px]">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem
                                                                    value="open"
                                                                    className="hover:bg-accent"
                                                                >
                                                                    Open
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="closed"
                                                                    className="hover:bg-accent"
                                                                >
                                                                    Closed
                                                                </SelectItem>
                                                                <SelectItem
                                                                    value="maintenance"
                                                                    className="hover:bg-accent"
                                                                >
                                                                    Maintenance
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    branch.id,
                                                                )
                                                            }
                                                            className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
