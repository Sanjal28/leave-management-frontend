import React, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { ListShimmer } from '../../components/Shimmer';


const TeamPage = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [newBalance, setNewBalance] = useState('');

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const res = await apiService.get('/manager/team');
            setTeam(res.data);
        } catch (error) {
            toast.error("Failed to fetch team data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        setNewBalance(employee.leaveBalance);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleBalanceUpdate = async (e) => {
        e.preventDefault();
        if (!selectedEmployee) return;
        try {
            await apiService.put(`/manager/employee/${selectedEmployee.id}/leave-balance`, { newBalance: parseInt(newBalance) });
            toast.success("Leave balance updated successfully!");
            closeModal();
            fetchTeam();
        } catch (error) {
            toast.error("Failed to update balance.");
        }
    };

if (loading) return <ListShimmer />;

    return (
        <>
            <div className="animate-fade-in">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Team Members</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.length > 0 ? team.map(employee => (
                        <div key={employee.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold mb-3">
                                    {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                                </div>
                                <p className="font-bold text-lg text-gray-900">{employee.firstName} {employee.lastName}</p>
                                <p className="text-sm text-gray-500">{employee.email}</p>
                                <div className="mt-4 bg-gray-100 px-4 py-2 rounded-lg">
                                    <p className="text-sm font-medium text-gray-600">Leave Balance</p>
                                    <p className="text-2xl font-bold text-indigo-600">{employee.leaveBalance}</p>
                                </div>
                                <button onClick={() => openModal(employee)} className="mt-4 btn-primary w-full flex items-center justify-center space-x-2 text-sm">
                                    <PencilSquareIcon className="h-4 w-4" />
                                    <span>Update Balance</span>
                                </button>
                            </div>
                        </div>
                    )) : <p className="col-span-full text-center text-gray-500 py-8">You have no team members assigned to you.</p>}
                </div>
            </div>

            <Modal isOpen={isModalOpen} closeModal={closeModal} title={`Update Balance for ${selectedEmployee?.firstName}`}>
                <form onSubmit={handleBalanceUpdate} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">New Leave Balance (days)</label>
                        <input
                            type="number"
                            value={newBalance}
                            onChange={(e) => setNewBalance(e.target.value)}
                            required
                            min="0"
                            className="input-style w-full"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="btn-primary px-4 py-2 text-sm">Save Changes</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default TeamPage;
