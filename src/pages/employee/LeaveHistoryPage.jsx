import React, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import Spinner from '../../components/Spinner';
import { format } from 'date-fns';
import { ListShimmer } from '../../components/Shimmer';


const LeaveHistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await apiService.get('/employee/leave-history');
                // Sort by most recent request date
                setHistory(res.data.sort((a, b) => new Date(b.requestedDate) - new Date(a.requestedDate)));
            } catch (error) {
                console.error("Failed to fetch leave history", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

   if (loading) return <ListShimmer />;

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Leave History</h2>
            <div className="space-y-4">
                {history.length > 0 ? history.map(req => (
                    <div key={req.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                        <div className="flex-1">
                            <p className="font-semibold text-gray-700">{req.reason}</p>
                            <p className="text-sm text-gray-500">
                                {format(new Date(req.startDate), 'MMM d, yyyy')} - {format(new Date(req.endDate), 'MMM d, yyyy')}
                            </p>
                        </div>
                        <div className="w-full md:w-auto text-right">
                             <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                                ${req.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                req.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'}`}>
                                {req.status}
                            </span>
                        </div>
                    </div>
                )) : <p>You have no leave history.</p>}
            </div>
        </div>
    );
};

export default LeaveHistoryPage;