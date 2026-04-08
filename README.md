# Secure Login & Registration System with User Dashboard

A robust, secure PHP-based full-stack web application featuring user authentication, registration, complete CRUD operations, and role-based access control. Built with **PHP 8**, **Laravel 11 (Breeze)**, **React**, **Inertia.js**, and **Tailwind CSS**.

## 🎯 Objective

Build a secure PHP-based login and registration system with a user dashboard featuring full CRUD (Create, Read, Update, Delete) functionality, session-based authentication, and role-based access control.

## ✨ Features Implemented

### 1. User Authentication ✅
- **User Registration**: New users can register with email and password
- **User Login**: Secure session-based authentication
- **Session Management**: Automatic session timeout and secure cookie handling
- **Email Verification**: Built-in email verification support
- **Password Security**: Bcrypt hashing with Laravel's `Hash` facade

### 2. Database Security ✅
- **PDO with Prepared Statements**: All database queries use prepared statements to prevent SQL injection
- **Secure Query Building**: Laravel Query Builder with parameterized queries
- **Data Validation**: Server-side validation of all inputs
- **Efficient Data Handling**: Optimized queries with selective column selection

### 3. CRUD Operations ✅
- **Create**: Admin users can create new user accounts with roles
- **Read**: Display all users in a responsive table with sanitized output
- **Update**: Edit user details including name, email, and role
- **Delete**: Remove users with confirmation prompt and safety checks
- **Soft Delete Protection**: Prevents accidental deletion of own account

### 4. Security Measures ✅
- **XSS Protection**:
  - Output escaping using Laravel's `e()` helper function
  - Client-side input sanitization
  - Content Security Policy ready

- **Password Security**:
  - Bcrypt hashing with `password_hash()` equivalent (Laravel's `Hash::make()`)
  - Password verification using `password_verify()` equivalent
  - Password confirmation validation
  - Minimum 8 character requirement with strength indicator

- **Session Management**:
  - Secure Laravel session handling
  - CSRF Token protection (automatic with Laravel Breeze)
  - Session timeout configuration
  - Secure cookie attributes
  - User agent and IP verification

### 5. Form Handling & Validation ✅
- **Client-Side Validation**:
  - HTML5 form validation
  - Real-time password strength indicator
  - Immediate feedback for form errors
  - User-friendly validation messages

- **Server-Side Validation**:
  - Laravel validation rules applied before database operations
  - Custom error messages for better UX
  - Email uniqueness validation
  - Role validation
  - Password confirmation matching

### 6. Error Handling ✅
- **User-Friendly Messages**:
  - Clear error messages for invalid login
  - Duplicate email registration feedback
  - Database operation error handling
  - Graceful error recovery

- **Security**:
  - No sensitive information exposed in error messages
  - Server errors logged without exposing details
  - 404 handling for non-existent resources
  - 403 Forbidden for unauthorized access

### 7. Role-Based Access Control (RBAC) ✅
- **Admin Middleware**: `AdminOnly` middleware restricts CRUD operations to admin users only
- **User Roles**:
  - `admin`: Full access to user management and CRUD operations
  - `user`: Limited access based on permissions
- **Route Protection**: All user management routes protected by role-based middleware
- **Database Role Column**: Enum field storing user roles

## 🔧 Tech Stack

- **Backend**: PHP 8.2+ with Laravel 11 (Breeze)
- **Frontend**: React 18+ with Inertia.js
- **Database**: MySQL with PDO drivers
- **Styling**: Tailwind CSS v3
- **Package Manager**: Composer (PHP) and npm/yarn (Node.js)
- **Development**: Laravel Herd (Built-in PHP server, database, queue support)

## 📋 Requirements

- **PHP 8.2 or higher**
- **Composer** (PHP package manager)
- **Node.js 18.x or higher** (for npm)
- **MySQL 8.0 or SQLite**
- **Laravel Herd** (recommended) or manual PHP/Laravel setup

## 🚀 Installation & Setup

### Option 1: Using Laravel Herd (Recommended)

#### Step 1: Install Laravel Herd
Download and install from [Laravel Herd Official Website](https://herd.laravel.com)

#### Step 2: Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/fullstacktest.git
cd fullstacktest
```

#### Step 3: Install Dependencies
```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

#### Step 4: Setup Environment
```bash
# Copy example environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# Set DB_CONNECTION=mysql (or sqlite)
# Set DB_DATABASE, DB_USERNAME, DB_PASSWORD as needed with Herd
```

#### Step 5: Run Database Migrations
```bash
# Run all migrations (creates users table with role column)
php artisan migrate
```

#### Step 6: Build Frontend Assets
```bash
# Development build with hot reload
npm run dev

# Production build
npm run build
```

#### Step 7: Start the Application
```bash
# Laravel Herd automatic start or manual start:
php artisan serve

# Access at http://fullstacktest.test (or http://localhost:8000)
```

### Option 2: Manual Setup (Without Herd)

#### Step 1: Install PHP & Composer
- Install PHP 8.2+ from [php.net](https://php.net)
- Install Composer from [getcomposer.org](https://getcomposer.org)

#### Step 2: Install Node.js
```bash
# Install from nodejs.org or use nvm
node --version  # Verify v18+
npm --version   # Verify npm
```

#### Step 3: Clone and Setup
```bash
git clone https://github.com/YOUR_USERNAME/fullstacktest.git
cd fullstacktest
composer install
npm install
cp .env.example .env
php artisan key:generate
```

#### Step 4: Configure Database
```bash
# Update .env with your database credentials
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fullstacktest
DB_USERNAME=root
DB_PASSWORD=

# Or use SQLite (easier for local development)
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

#### Step 5: Create Database and Run Migrations
```bash
# Create MySQL database
mysql -u root -e "CREATE DATABASE fullstacktest;"

# Or for SQLite (automatic with migration)
php artisan migrate
```

#### Step 6: Build and Run
```bash
npm run dev  # In one terminal
php artisan serve  # In another terminal
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔐 Security Features Details

### 1. SQL Injection Prevention
- All queries use prepared statements with parameterized values
- Example:
  ```php
  DB::select('SELECT * FROM users WHERE email = ?', [$email]);
  ```

### 2. XSS Protection
- All database output escaped with Laravel's `e()` function
- React automatically escapes JSX variables
- Content never displayed without escaping

### 3. Password Security
- Bcrypt hashing with Laravel's `Hash` facade
- Password confirmation validation
- Minimum 8 characters required
- Password strength indicator on frontend

### 4. Authentication & Sessions
- Laravel's robust session handler
- CSRF token protection (automatic)
- Secure cookie flags
- User agent verification
- IP address logging

### 5. Role-Based Access Control
- Middleware enforces admin-only access to CRUD operations
- Routes protected with `->middleware('admin')`
- Graceful 403 Forbidden responses

### 6. Input Validation
- Server-side validation before database operations
- Client-side validation for immediate feedback
- Email format validation
- Unique email validation

## 👥 User Roles

### Admin Role
- Full access to user management
- Can create, read, update, and delete users
- Can assign roles to other users
- Access to `/users` dashboard

### User Role
- Limited to own profile management
- Cannot access user management dashboard
- Cannot create, update, or delete other users

## 📱 API Routes

### Authentication Routes
```
POST   /register              - Register new user
POST   /login                 - Login user
POST   /logout                - Logout user
GET    /forgot-password       - Forgot password form
POST   /forgot-password       - Send password reset email
GET    /reset-password/{token} - Reset password form
POST   /reset-password        - Reset password
```

### Authenticated Routes
```
GET    /dashboard             - User dashboard
GET    /profile               - Edit profile
PATCH  /profile               - Update profile
DELETE /profile               - Delete account
```

### Admin-Only CRUD Routes
```
GET    /users                 - List all users
GET    /users/create          - Create user form
POST   /users                 - Store new user
GET    /users/{id}/edit       - Edit user form
PUT    /users/{id}            - Update user
DELETE /users/{id}            - Delete user
```

## 🧪 Testing

```bash
# Run Laravel tests
php artisan test

# Run Pest tests (default in Laravel Breeze)
./vendor/bin/pest

# Run tests with coverage
./vendor/bin/pest --coverage
```

## 📦 File Structure

```
fullstacktest/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── UserCrudController.php    # User CRUD logic
│   │   └── Middleware/
│   │       └── AdminOnly.php             # Role-based middleware
│   └── Models/
│       └── User.php                      # User model with role
├── database/
│   ├── migrations/
│   │   └── *_create_users_table.php      # User table schema
│   │   └── *_add_role_to_users_table.php # Role column addition
│   └── seeders/
│       └── DatabaseSeeder.php            # Database seeding
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   ├── Users/
│   │   │   │   ├── Index.jsx             # User list page
│   │   │   │   ├── Create.jsx            # Create user page
│   │   │   │   └── Edit.jsx              # Edit user page
│   │   │   └── Dashboard.jsx
│   │   └── app.jsx
│   ├── css/
│   │   └── app.css                       # Tailwind styles
│   └── views/
│       └── app.blade.php                 # Laravel template
├── routes/
│   ├── web.php                           # Web routes
│   ├── auth.php                          # Auth routes
│   └── console.php
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── database.php
│   └── session.php
├── bootstrap/
│   └── app.php                           # Application bootstrap
├── public/
│   └── index.php                         # Entry point
├── .env.example                          # Environment template
├── composer.json                         # PHP dependencies
├── package.json                          # Node.js dependencies
├── vite.config.js                        # Vite build configuration
└── README.md                             # This file
```

## 🌐 Environment Variables

Create a `.env` file from `.env.example` and configure:

```env
APP_NAME="Secure User Management"
APP_ENV=local
APP_DEBUG=true
APP_KEY=base64:YOUR_KEY_HERE

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fullstacktest
DB_USERNAME=root
DB_PASSWORD=

SESSION_LIFETIME=120
SESSION_DRIVER=database
CACHE_DRIVER=database
```

## 🚀 Performance Optimization

- Database indexes on `users.email` and `sessions.user_id`
- Selective column queries (only fetch needed fields)
- React component code splitting
- Inertia.js lazy prop loading
- Tailwind CSS purging for production

## 📝 Code Examples

### Secure Database Query
```php
// Prevents SQL injection with prepared statement
$user = DB::selectOne(
    'SELECT id, name, email FROM users WHERE email = ?',
    [$email]
);
```

### XSS Protection
```php
// Escapes output in controller
$user->name = e($user->name);

// React automatically escapes
<td>{user.name}</td>
```

### Password Hashing
```php
// Secure password storage
$hashedPassword = Hash::make($request->password);

// Verification
if (Hash::check($request->password, $user->password)) {
    // Password matches
}
```

### Role-Based Middleware
```php
// Routes protected by admin middleware
Route::middleware('admin')->group(function () {
    Route::resource('users', UserCrudController::class);
});
```

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Verify database exists and credentials in .env are correct
mysql -u root -e "SHOW DATABASES;"

# Ensure MySQL service is running
# On Windows: sc start MySQL80
# On macOS: brew services start mysql
```

### JavaScript Build Errors
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Permission Issues
```bash
# On Linux/macOS, ensure proper permissions
chmod -R 775 storage bootstrap/cache
```

### Session Issues
```bash
# Clear session cache
php artisan session:flush

# Clear all cache
php artisan cache:clear
```

## 📚 Documentation Links

- [Laravel 11 Documentation](https://laravel.com/docs/11.x)
- [Laravel Breeze](https://laravel.com/docs/11.x/starter-kits#breeze)
- [Inertia.js React Guide](https://inertiajs.com/client-side-setup)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Laravel Herd Documentation](https://herd.laravel.com)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## ✅ Compliance Checklist

- ✅ User Authentication (Registration & Login)
- ✅ Session-Based Access Control
- ✅ PDO with Prepared Statements
- ✅ SQL Injection Prevention
- ✅ Full CRUD Operations
- ✅ XSS Protection (Escaping & Sanitization)
- ✅ Bcrypt Password Hashing
- ✅ Session Management & Timeout
- ✅ POST for Sensitive Data
- ✅ Client & Server Validation
- ✅ User-Friendly Error Messages
- ✅ Role-Based Access Control (RBAC)
- ✅ CSRF Protection (Automatic with Laravel)
- ✅ PHP 8 with Laravel 11 & React/Inertia
- ✅ Tailwind CSS Styling
- ✅ Complete Source Code with Comments
- ✅ Database Schema (users.sql)
- ✅ Comprehensive README
- ✅ GitHub Repository (Public)

## 🎓 Key Security Principles Implemented

1. **Defense in Depth**: Multiple layers of security (validation, escaping, hashing)
2. **Least Privilege**: Role-based access ensures users only have needed permissions
3. **Secure by Default**: Laravel best practices applied throughout
4. **Input Validation**: Both client and server-side validation
5. **Output Escaping**: All data escaped before display
6. **Secure Sessions**: Laravel's robust session handling with CSRF tokens
7. **Parameterized Queries**: PDO prepared statements prevent injection

---

**Created**: April 2026  
**Last Updated**: April 8, 2026  
**Status**: Production Ready
