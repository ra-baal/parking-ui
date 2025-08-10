import { Button } from '../atoms/Button';

export interface ParkingArea {
    id: string;
    name: string;
    weekdayRate: number;
    weekendRate: number;
    discountPercentage: number;
}

interface ParkingAreaListProps {
    areas: ParkingArea[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const ParkingAreaList = ({ areas, onEdit, onDelete }: ParkingAreaListProps) => {
    if (!areas || areas.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-slate-400 text-lg mb-2">📋</div>
                <div className="text-slate-600">No parking areas available.</div>
                <div className="text-slate-400 text-sm">Create your first parking area above</div>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/5 border border-white/20 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800">Parking Areas</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Weekday Rate (USD)</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Weekend Rate (USD)</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Discount (%)</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50">
                        {areas.map((area, index) => (
                            <tr key={area.id} className={`hover:bg-slate-50/50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/40' : 'bg-white/20'}`}>
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{area.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">${area.weekdayRate}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">${area.weekendRate}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">{area.discountPercentage}%</td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => onEdit && onEdit(area.id)}
                                            className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => onDelete && onDelete(area.id)}
                                            disabled={!onDelete}
                                            className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
