import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import PageInfo from '@/components/page-info';

interface Staff {
    id: number;
    user: {
        name: string;
        email: string;
    };
    branch: {
        name: string;
    };
    assigned_at: string;
}

interface Props {
    staffs: Staff[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Staff Management',
        href: dashboard().url,
    },
];

export default function Index({ staffs }: Props) {
    const [staffsData, setStaffsData] = useState<Staff[]>(staffs);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredStaffs = staffsData.filter(
        (staff) =>
            staff.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this staff member?')) {
            setStaffsData(staffsData.filter((s) => s.id !== id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Management" />

            <div className="space-y-6 p-4 sm:p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <PageInfo title='Staff Management' description='Manage your staff members and their branch assignments' />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1 sm:min-w-[280px] lg:min-w-[320px]">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search staff..."
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
                                <Link href="/staffs/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Staff
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-foreground">
                            All Staff Members ({filteredStaffs.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-muted/50">
                                        <TableHead className="font-semibold">
                                            ID
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Name
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Email
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Branch Name
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Assigned At
                                        </TableHead>
                                        <TableHead className="text-center font-semibold">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStaffs.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                className="py-12 text-center"
                                            >
                                                <div className="flex flex-col items-center gap-3">
                                                    <Search className="h-12 w-12 text-muted-foreground/40" />
                                                    <p className="text-lg font-medium text-muted-foreground">
                                                        No staff members found
                                                    </p>
                                                    <p className="text-sm text-muted-foreground/70">
                                                        Try adjusting your
                                                        search criteria
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredStaffs.map((staff) => (
                                            <TableRow
                                                key={staff.id}
                                                className="transition-colors hover:bg-primary/[0.02]"
                                            >
                                                <TableCell className="font-medium">
                                                    {staff.id}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {staff.user.name}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {staff.user.email}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {staff.branch.name}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {new Date(staff.assigned_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                            className="hover:bg-accent"
                                                        >
                                                            <Link href={`/staffs/${staff.id}/edit`}>
                                                                Edit
                                                            </Link>
                                                        </Button>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    staff.id,
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
