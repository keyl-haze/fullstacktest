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
 * with role-based access control and security measures.
 */
class UserCrudController extends Controller
{
    /**
     * Initialize controller middleware for authentication and admin access.
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('admin')->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    }

    /**
     * Display a listing of all users.
     * Only accessible to admin users.
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        try {
            $users = DB::select('SELECT id, name, email, role, created_at FROM users');
            
            // Sanitize output for XSS protection using Laravel's e() function
            $users = array_map(function($user) {
                $user->name = e($user->name);
                $user->email = e($user->email);
                $user->role = e($user->role);
                return $user;
            }, $users);
            
            return Inertia::render('Users/Index', [
    /**
     * Store a newly created user in the database.
     * Uses prepared statements via PDO to prevent SQL injection.
     * Passwords are securely hashed using password_hash().
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        try {
            // Validate input with custom error messages
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

            // Securely hash password using Laravel's Hash facade (bcrypt)
            $hashedPassword = Hash::make($validated['password']);
            
            // Use prepared statements for SQL injection prevention
            DB::insert('INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())', [
                $validated['name'],
                $validated['email'],
    /**
     * Show the form for editing the specified user.
     * XSS protection applied to all output.
     * 
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        try {
            $user = DB::selectOne('SELECT id, name, email, role FROM users WHERE id = ?', [$id]);
            
            if (!$user) {
                return redirect()->route('users.index')->with('error', 'User not found.');
            }
    /**
     * Update the specified user in the database.
     * Uses prepared statements to prevent SQL injection.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Validate with user-friendly error messages
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

            // Check if user exists
            $user = DB::selectOne('SELECT * FROM users WHERE id = ?', [$id]);
            if (!$user) {
                return redirect()->route('users.index')->with('error', 'User not found.');
            }

            // Use prepared statement to prevent SQL injection
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

    public function edit($id)
    {
        $user = DB::selectOne('SELECT id, name, email, role FROM users WHERE id = ?', [$id]);
        if (!$user) {
    /**
     * Delete the specified user from the database.
     * Uses prepared statements to prevent SQL injection.
     * Includes confirmation check on frontend.
     * 
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        try {
            // Prevent accidental deletion of the current admin user
            if ($id == Auth::id()) {
                return redirect()->route('users.index')->with('error', 'You cannot delete your own account.');
            }

            // Check if user exists before deletion
            $user = DB::selectOne('SELECT id FROM users WHERE id = ?', [$id]);
            if (!$user) {
                return redirect()->route('users.index')->with('error', 'User not found.');
            }

            // Use prepared statement for SQL injection prevention
            DB::delete('DELETE FROM users WHERE id = ?', [$id]);
            
            return redirect()->route('users.index')->with('success', 'User deleted successfully!');
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->route('users.index')->with('error', 'Database error: Unable to delete user. Please try again.');
        } catch (\Exception $e) {
            return redirect()->route('users.index')->with('error', 'An unexpected error occurred. Please try again.');
        }
        $user->email = e($user->email);
        $user->role = e($user->role);
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'role' => 'required|in:user,admin',
        ], [
            'email.unique' => 'This email is already registered.',
        ]);

        $user = DB::selectOne('SELECT * FROM users WHERE id = ?', [$id]);
        if (!$user) {
            abort(404);
        }

        DB::update('UPDATE users SET name = ?, email = ?, role = ?, updated_at = NOW() WHERE id = ?', [
            $request->name,
            $request->email,
            $request->role,
            $id,
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        DB::delete('DELETE FROM users WHERE id = ?', [$id]);
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
