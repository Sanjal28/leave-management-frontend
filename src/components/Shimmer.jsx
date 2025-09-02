import React from 'react';

const ShimmerCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-200">
        <div className="animate-pulse flex items-center justify-between">
            <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                <div className="h-8 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
        </div>
    </div>
);

export const DashboardShimmer = () => (
    <div className="space-y-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
        </div>
    </div>
);

const ShimmerListItem = () => (
    <div className="border rounded-lg p-4 animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
                <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded-full w-24 mt-2 sm:mt-0"></div>
        </div>
    </div>
);

export const ListShimmer = ({ count = 5 }) => (
    <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mb-6"></div>
        {Array.from({ length: count }, (_, i) => <ShimmerListItem key={i} />)}
    </div>
);