import { useState } from 'react';
import { ParkingAreaForm } from 'src/components/organisms/ParkingAreaForm';
import { ParkingAreaList } from 'src/components/organisms/ParkingAreaList';
import { useParkingAreas, useCreateParkingArea, useDeleteParkingArea, useUpdateParkingArea } from 'src/api/parkingAreas';

const ParkingManagementPage = () => {
    const { data: areas, isLoading, isError, error } = useParkingAreas();
    const { mutate: createParkingArea, isPending: isCreating, error: createError } = useCreateParkingArea();
    const { mutate: deleteParkingArea, isPending: _isDeleting, error: deleteError } = useDeleteParkingArea();
    const { mutate: updateParkingArea, isPending: isUpdating, error: updateError } = useUpdateParkingArea();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        weekdayRate: '',
        weekendRate: '',
        discount: '',
    });

    const handleFormSubmit = (data: { name: string; weekdayRate: string; weekendRate: string; discount: string }) => {
        if (editingId) {
            updateParkingArea({
                id: editingId,
                name: data.name,
                weekdayRate: parseFloat(data.weekdayRate),
                weekendRate: parseFloat(data.weekendRate),
                discountPercentage: parseFloat(data.discount),
            }, {
                onSuccess: () => {
                    setEditingId(null);
                    setFormData({ name: '', weekdayRate: '', weekendRate: '', discount: '' });
                }
            });
        } else {
            createParkingArea({
                name: data.name,
                weekdayRate: parseFloat(data.weekdayRate),
                weekendRate: parseFloat(data.weekendRate),
                discountPercentage: parseFloat(data.discount),
            });
            setFormData({ name: '', weekdayRate: '', weekendRate: '', discount: '' });
        }
    };

    const handleEdit = (id: string) => {
        const area = areas?.find(a => a.id === id);
        if (area) {
            setEditingId(id);
            setFormData({
                name: area.name,
                weekdayRate: area.weekdayRate.toString(),
                weekendRate: area.weekendRate.toString(),
                discount: area.discountPercentage.toString(),
            });
        }
    };

    const handleDelete = (id: string) => {
        deleteParkingArea(id);
        if (editingId === id) {
            setEditingId(null);
            setFormData({ name: '', weekdayRate: '', weekendRate: '', discount: '' });
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">Parking Areas Management</h1>
                <p className="text-slate-600 text-lg">Manage your parking areas, rates, and discounts</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/5 border border-white/20 p-8 mb-8">
                <ParkingAreaForm
                    onSubmit={handleFormSubmit}
                    data={formData}
                    isSubmitting={isCreating || isUpdating}
                />
            </div>

            {createError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">Error: {createError.message}</div>}
            {updateError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">Error: {updateError.message}</div>}
            {deleteError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">Error: {deleteError.message}</div>}

            <div className="mt-12">
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                        <div className="text-slate-600">Loading parking areas...</div>
                    </div>
                )}
                {isError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                        Error: {(error as Error).message}
                    </div>
                )}
                {areas && <ParkingAreaList areas={areas} onEdit={handleEdit} onDelete={handleDelete} />}
            </div>
        </div>
    );
};

export default ParkingManagementPage;
