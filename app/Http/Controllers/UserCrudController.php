<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\User;

/**
 * UserCrudController - Manages complete CRUD operations for users
 * with role-based access control and comprehensive security measures.
 * 
 * Security Features:
 * - Prepared statements prevent SQL injection
 * - Output escaping prevents XSS attacks
 * - Password hashing with bcrypt
 * - Role-based access control
 * - Comprehensive error handling
 */
class UserCrudController extends Controller
{
    /**
     * Initialize controller middleware for authentication and admin access.
     * All CRUD operations require admin role.
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('admin')->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    }

    /**
     * Display a listing of all users.
     * Only accessible to admin users via middleware.
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        try {
            // PDO prepared statement - prevents SQL injection
            $users = DB::select('SELECT id, name, email, role, created_at FROM users');
            
            // Sanitize output for XSS protection using Laravel's e() helper function
            $users = array_map(function($user) {
                $user->name = e($user->name);
                $user->email = e($user->email);
                $user->role = e($user->role);
                return $user;
            }, $users);
            
            return Inertia::render('Users/Index', [
                'users' => $users,
                'userRole' => Auth::user()->role,
            ]);
        } catch (\Exception $e) {
            return redirect()->route('dashboard')->with('error', 'Unable to fetch users. Please try again.');
        }
    }

    /**
     * Show the form for creating a new user.
     * 
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created user in the database.
     * Uses prepared statements via PDO to prevent SQL injection.
     * Passwords are securely hashed using Laravel's Hash facade (bcrypt).
     * 
     * Security:
     * - Prepared statements prevent SQL injection
     * - Password confirmed before hashing
     * - Password hashed with bcrypt (CRYPT_BLOWFISH)
     * - Input validation on server-side
     * - Custom error messages for user feedback
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        try {
            // Server-side validation with custom user-friendly error messages
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
                'role' => 'required|in:user,admin',
            ], [
                'name.required' => 'The name field is required.',
                'email.required' => 'The email field is required.',
                'email.email' => 'Please provide a valid email address.',
                'email.unique' => 'This email is already registered. Try logging in instead.',
                'password.required' => 'The password field is required.',
                'password.min' => 'Password must be at least 8 characters long.',
                'password.confirmed' => 'Passwords do not match.',
                'role.required' => 'Please select a role.',
                'role.in' => 'Invalid role selected.',
            ]);

            // Securely hash password using Laravel's Hash facade (bcrypt algorithm)
            $hashedPassword = Hash::make($validated['password']);
            
            // Use prepared statements with parameterized queries for SQL injection prevention
            DB::insert('INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())', [
                $validated['name'],
                $validated['email'],
                $hashedPassword,
                $validated['role'],
            ]);

            return redirect()->route('users.index')->with('success', 'User created successfully!');
        } catch (\Illuminate\Database\QueryException $e) {
            return back()->with('error', 'Database error: Unable to create user. Please try again.');
        } catch (\Exception $e) {
            return back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    /**
     * Show the form for editing the specified user.
     * XSS protection applied to all output using e() helper.
     * 
     * @param  int  $id User ID to edit
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        try {
            // PDO prepared statement to prevent SQL injection
            $user = DB::selectOne('SELECT id, name, email, role FROM users WHERE id = ?', [$id]);
            
            if (!$user) {
                return redirect()->route('users.index')->with('error', 'User not found.');
            }
            
            // Escape output for XSS protection using Laravel's e() helper
            $user->name = e($user->name);
            $user->email = e($user->email);
            $user->role = e($user->role);
            
            return Inertia::render('Users/Edit', [
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return redirect()->route('users.index')->with('error', 'Unable to load user. Please try again.');
        }
    }

    /**
     * Update the specified user in the database.
     * Uses prepared statements to prevent SQL injection.
     * Provides comprehensive error handling and validation.
     * 
     * Security:
     * - Prepared statements prevent SQL injection
     * - User existence checked before update
     * - Server-side validation of all inputs
     * - User-friendly error messages
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id User ID to update
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Validate input with user-friendly error messages
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $id,
                'role' => 'required|in:user,admin',
            ], [
                'name.required' => 'The name field is required.',
                'email.required' => 'The email field is required.',
                'email.email' => 'Please provide a valid email address.',
                'email.unique' => 'This email is already registered.',
                'role.required' => 'Please select a role.',
                'role.in' => 'Invalid role selected.',
            ]);

            // Check if user exists before attempting update
            $user = DB::selectOne('SELECT * FROM users WHERE id = ?', [$id]);
            if (!$user) {
                return redirect()->route('users.index')->with('error', 'User not found.');
            }

            // Use PDO prepared statements to prevent SQL injection
            DB::update('UPDATE users SET name = ?, email = ?, role = ?, updated_at = NOW() WHERE id = ?', [
                $validated['name'],
                $validated['email'],
                $validated['role'],
                $id,
            ]);

            return redirect()->route('users.index')->with('success', 'User updated successfully!');
        } catch (\Illuminate\Database\QueryException $e) {
            return back()->with('error', 'Database error: Unable to update user. Please try again.');
        } catch (\Exception $e) {
            return back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    /**
     * Delete the specified user from the database.
     * Uses prepared statements to prevent SQL injection.
     * Includes safety checks to prevent accidental data loss.
     * 
     * Security:
     * - Prepared statements prevent SQL injection
     * - User existence verified before deletion
     * - Prevents deletion of own account
     * - Confirmation required on frontend
     * - User-friendly error messages
     * 
     * @param  int  $id User ID to delete
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        try {
            // Prevent accidental deletion of the current admin user's own account
            if ($id == Auth::id()) {
                return redirect()->route('users.index')->with('error', 'You cannot delete your own account.');
            }

            // Check if user exists before attempting deletion
            $user = DB::selectOne('SELECT id FROM users WHERE id = ?', [$id]);
            if (!$user) {
                return redirect()->route('users.index')->with('error', 'User not found.');
            }

            // Use PDO prepared statements for SQL injection prevention
            DB::delete('DELETE FROM users WHERE id = ?', [$id]);
            
            return redirect()->route('users.index')->with('success', 'User deleted successfully!');
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->route('users.index')->with('error', 'Database error: Unable to delete user. Please try again.');
        } catch (\Exception $e) {
            return redirect()->route('users.index')->with('error', 'An unexpected error occurred. Please try again.');
        }
    }
}
