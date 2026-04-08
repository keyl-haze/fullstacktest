import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4">Welcome, {auth.user.name}!</h3>
                                <p className="text-gray-600 mb-6">You're logged in as a <span className="font-semibold">{auth.user.role}</span>.</p>
                            </div>

                            {isAdmin && (
                                <div className="mt-8 pt-6 border-t">
                                    <h4 className="text-md font-semibold mb-4">Admin Features</h4>
                                    <Link
                                        href={route('users.index')}
                                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                                    >
                                        👥 Manage Users (CRUD)
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-2">Create, read, update, and delete user accounts</p>
                                </div>
                            )}

                            {!isAdmin && (
                                <div className="mt-8 pt-6 border-t bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        💡 <strong>Note:</strong> User management is available only to administrators. Contact an admin for more features.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
