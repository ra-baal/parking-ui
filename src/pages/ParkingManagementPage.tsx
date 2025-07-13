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
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Parking Areas Management</h1>
            <ParkingAreaForm
                onSubmit={handleFormSubmit}
                data={formData}
                isSubmitting={isCreating || isUpdating}
            />
            {createError && <div style={{ color: 'red' }}>Error: {createError.message}</div>}
            {updateError && <div style={{ color: 'red' }}>Error: {updateError.message}</div>}
            {deleteError && <div style={{ color: 'red' }}>Error: {deleteError.message}</div>}
            <div style={{ marginTop: 32 }}>
                {isLoading && <div>Loading parking areas...</div>}
                {isError && <div>Error: {(error as Error).message}</div>}
                {areas && <ParkingAreaList areas={areas} onEdit={handleEdit} onDelete={handleDelete} />}
            </div>
        </div>
    );
};

export default ParkingManagementPage;
