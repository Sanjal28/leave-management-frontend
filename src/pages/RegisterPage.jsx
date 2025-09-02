import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', role: 'EMPLOYEE', managerEmail: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };
        if (formData.role === 'MANAGER') {
            delete dataToSubmit.managerEmail;
        }
        dispatch(register(dataToSubmit))
            .unwrap()
            .then(() => {
                toast.success('Registration successful! Please log in.');
                navigate('/login');
            })
            .catch(() => toast.error('Registration failed. The email might already be in use.'));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="input-style" />
                        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="input-style" />
                    </div>
                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="input-style w-full" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input-style w-full" />
                    <select name="role" value={formData.role} onChange={handleChange} className="input-style w-full">
                        <option value="EMPLOYEE">Employee</option>
                        <option value="MANAGER">Manager</option>
                    </select>
                    {formData.role === 'EMPLOYEE' && (
                        <input type="email" name="managerEmail" placeholder="Manager's Email" onChange={handleChange} required className="input-style w-full" />
                    )}
                    <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:bg-indigo-300">
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;