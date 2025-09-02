import React, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import Spinner from '../../components/Spinner';
import { format, differenceInCalendarDays } from 'date-fns';
import { toast } from 'react-toastify';
import { ListShimmer } from '../../components/Shimmer';


const LeaveRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await apiService.get('/manager/leave-requests');
            setRequests(res.data.sort((a, b) => new Date(b.requestedDate) - new Date(a.requestedDate)));
        } catch (error) {
            toast.error("Failed to fetch leave requests.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await apiService.put(`/manager/leave-requests/${id}/status`, { status });
            toast.success(`Request has been ${status.toLowerCase()}.`);
            fetchRequests();
        } catch (error) {
            toast.error(error.response?.data?.message || `Failed to ${status.toLowerCase()} request.`);
        }
    };

    if (loading) return <ListShimmer />;

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Team Leave Requests</h1>
            <div className="space-y-4">
                {requests.length > 0 ? requests.map(req => {
                    const days = differenceInCalendarDays(new Date(req.endDate), new Date(req.startDate)) + 1;
                    return (
                        <div key={req.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 mb-3">
                                <div>
                                    <p className="font-bold text-lg text-gray-900">{req.employee.firstName} {req.employee.lastName}</p>
                                    <p className="text-sm text-gray-500">{req.employee.email}</p>
                                </div>
                                <span className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-semibold 
                                    ${req.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                    req.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'}`}>
                                    {req.status}
                                </span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {format(new Date(req.startDate), 'EEE, MMM d')} - {format(new Date(req.endDate), 'EEE, MMM d, yyyy')}
                                    <span className="text-gray-500 font-normal"> ({days} {days > 1 ? 'days' : 'day'})</span>
                                </p>
                                <p className="text-gray-600 mt-2 italic">"{req.reason}"</p>
                            </div>
                             {req.status === 'PENDING' && (
                                <div className="flex items-center space-x-3 pt-4 mt-3">
                                    <button onClick={() => handleUpdateStatus(req.id, 'APPROVED')} className="btn-primary flex-1 bg-green-600 hover:bg-green-700 focus:ring-green-500">
                                        Approve
                                    </button>
                                    <button onClick={() => handleUpdateStatus(req.id, 'REJECTED')} className="btn-primary flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500">
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                }) : <p className="text-center text-gray-500 py-8">No leave requests to show.</p>}
            </div>
        </div>
    );
};

export default LeaveRequestsPage;
