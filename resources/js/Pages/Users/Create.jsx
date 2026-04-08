import React, { useState } from 'react';
import { useForm, Link, usePage, router } from '@inertiajs/react';

/**
 * Create User Form Component
 * Includes client-side validation with user-friendly feedback
 * Server-side validation handles security and uniqueness checks
 */
export default function Create() {
    const { flash, errors: pageErrors } = usePage().props;
    const [passwordStrength, setPasswordStrength] = useState(0);
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
    });

    /**
     * Calculate password strength (1-4)
     * Helps users create secure passwords
     */
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        setPasswordStrength(strength);
    }

    function handlePasswordChange(e) {
        const value = e.target.value;
        setData('password', value);
        checkPasswordStrength(value);
    }

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
        if (data.password.length < 8) {
            alert('Password must be at least 8 characters.');
            return;
        }
        if (data.password !== data.password_confirmation) {
            alert('Passwords do not match.');
            return;
        }

        post(route('users.store'), {
            onSuccess: (page) => {
                // Only navigate if there are no validation errors
                if (!page.props.errors || Object.keys(page.props.errors).length === 0) {
                    setTimeout(() => {
                        router.visit(route('users.index'));
                    }, 500);
                }
            },
        });
    }

    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-emerald-500'];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Create User</h1>
                
                {/* Server Error Messages */}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                        {flash.error}
                    </div>
                )}

                {/* Display any validation errors from the server */}
                {Object.keys(pageErrors).length > 0 && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                        <p className="font-semibold mb-2">Validation Errors:</p>
                        <ul className="list-disc list-inside">
                            {Object.entries(pageErrors).map(([field, message]) => (
                                <li key={field}>{message}</li>
                            ))}
                        </ul>
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

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={data.password} 
                            onChange={handlePasswordChange} 
                            placeholder="••••••••"
                            required 
                        />
                        {data.password && (
                            <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-600">Strength</span>
                                    <span className="text-xs font-semibold text-gray-700">{strengthLabels[passwordStrength - 1] || 'Weak'}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`h-2 rounded-full transition-all ${strengthColors[passwordStrength - 1] || 'bg-red-500'}`} style={{ width: `${passwordStrength * 25}%` }}></div>
                                </div>
                            </div>
                        )}
                        {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input 
                            type="password" 
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={data.password_confirmation} 
                            onChange={e => setData('password_confirmation', e.target.value)} 
                            placeholder="••••••••"
                            required 
                        />
                        {data.password_confirmation && data.password !== data.password_confirmation && (
                            <div className="text-yellow-600 text-sm mt-1">⚠️ Passwords do not match</div>
                        )}
                        {errors.password_confirmation && <div className="text-red-600 text-sm mt-1">{errors.password_confirmation}</div>}
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
                            {processing ? 'Creating...' : 'Create User'}
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
