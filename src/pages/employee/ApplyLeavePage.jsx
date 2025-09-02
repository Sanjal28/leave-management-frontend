import React, { useState } from 'react';
import apiService from '../../api/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ApplyLeavePage = () => {
    const [formData, setFormData] = useState({
        managerEmail: '',
        startDate: '',
        endDate: '',
        reason: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiService.post('/employee/apply-leave', formData);
            toast.success('Leave request submitted successfully!');
            navigate('/employee/history');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit leave request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input type="email" name="managerEmail" placeholder="Manager's Email" onChange={handleChange} required className="input-style w-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" name="startDate" onChange={handleChange} required className="input-style w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input type="date" name="endDate" onChange={handleChange} required className="input-style w-full" />
                    </div>
                </div>
                <textarea name="reason" placeholder="Reason for leave..." onChange={handleChange} required rows="4" className="input-style w-full"></textarea>
                <button type="submit" disabled={loading} className="w-full btn-primary disabled:bg-indigo-300">
                    {loading ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default ApplyLeavePage;