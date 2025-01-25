document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const aadhar = document.getElementById('aadhar').value;

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role, aadhar })
        });

        const data = await response.json();
        alert(data.message);

        if (response.ok) {
            window.location.href = '/login.html';
        }
    } catch (error) {
        console.error('Registration error:', error.message);
        alert('Registration failed. Please try again.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error('The login form is missing from the DOM!');
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form from submitting normally

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        console.log('Email:', email); // Debugging: Check email
        console.log('Password:', password); // Debugging: Check password

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Response status:', response.status); // Debugging: Check status
            console.log('Response data:', data); // Debugging: Check response data

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', `Bearer ${data.token}`);
                console.log('Token stored:', localStorage.getItem('token')); // Debugging: Check stored token

                // Redirect based on role
                switch (data.role) {
                    case 'Farmer':
                        window.location.href = '/farmer-dashboard.html';
                        break;
                    case 'Pesticide Seller':
                        window.location.href = '/pesticide-dashboard.html';
                        break;
                    case 'Vendor':
                        window.location.href = '/vendor-dashboard.html';
                        break;
                    default:
                        alert('Invalid role. Contact support.');
                }
            } else {
                alert(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // On page load, check if the user is already logged in (optional)
    if (localStorage.getItem('token')) {
        window.location.href = '/dashboard'; // Or appropriate dashboard page based on the role
    }
});
