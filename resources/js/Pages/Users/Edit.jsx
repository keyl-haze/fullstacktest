import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';

/**
 * Edit User Form Component
 * Allows updating user details with validation
 * CSRF protection handled automatically by Laravel
 */
export default function Edit({ user }) {
    const { flash } = usePage().props;
    
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
    });

    function handleSubmit(e) {
        e.preventDefault();
        
        // Client-side validation
        if (data.name.trim() === '') {
            alert('Please enter a name.');
            return;
        }
        if (data.email.trim() === '') {
            alert('Please enter an email.');
            return;
        }

        put(route('users.update', user.id));
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit User</h1>
                
                {/* Server Error Messages */}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                        {flash.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)} 
                            placeholder="John Doe"
                            required 
                        />
                        {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={data.email} 
                            onChange={e => setData('email', e.target.value)} 
                            placeholder="john@example.com"
                            required 
                        />
                        {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
                        <select 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                errors.role ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={data.role} 
                            onChange={e => setData('role', e.target.value)} 
                            required
                        >
                            <option value="user">Regular User</option>
                            <option value="admin">Administrator</option>
                        </select>
                        {errors.role && <div className="text-red-600 text-sm mt-1">{errors.role}</div>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button 
                            type="submit" 
                            className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={processing}
                        >
                            {processing ? 'Updating...' : 'Update User'}
                        </button>
                        <Link href={route('users.index')} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200 text-center">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
