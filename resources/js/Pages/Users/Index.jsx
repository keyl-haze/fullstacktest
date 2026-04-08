import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

/**
 * User Management Dashboard
 * Displays list of users with CRUD operations
 * Admin-only access with role-based control
 */
export default function Index({ users, userRole }) {
    const { flash } = usePage().props;

    const handleDelete = (userId) => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            router.delete(route('users.destroy', userId));
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
                <p className="text-gray-600">Manage system users and their roles</p>
            </div>

            {/* Success Message */}
            {flash?.success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {flash.success}
                </div>
            )}

            {/* Error Message */}
            {flash?.error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {flash.error}
                </div>
            )}

            {/* Create User Button */}
            <div className="mb-6">
                <Link href={route('users.create')} className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                    + Create User
                </Link>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {users.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <p>No users found. <Link href={route('users.create')} className="text-blue-600 hover:underline">Create one</Link></p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            user.role === 'admin' 
                                                ? 'bg-purple-100 text-purple-800' 
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm space-x-3">
                                        <Link href={route('users.edit', user.id)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800 font-medium cursor-pointer border-none bg-transparent p-0"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
