import React, { useState } from 'react';
import { LabeledInput } from '../molecules/LabeledInput';
import { FormRow } from '../molecules/FormRow';
import { Button } from '../atoms/Button';

interface ParkingAreaFormProps {
    onSubmit?: (data: {
        name: string;
        weekdayRate: string;
        weekendRate: string;
        discount: string;
    }) => void;
    isSubmitting?: boolean;
    data?: {
        name: string;
        weekdayRate: string;
        weekendRate: string;
        discount: string;
    };
}

export const ParkingAreaForm = ({ onSubmit, isSubmitting, data: data = { name: '', weekdayRate: '', weekendRate: '', discount: '' } }: ParkingAreaFormProps) => {
    const [name, setName] = useState(data.name);
    const [weekdayRate, setWeekdayRate] = useState(data.weekdayRate);
    const [weekendRate, setWeekendRate] = useState(data.weekendRate);
    const [discount, setDiscount] = useState(data.discount);

    React.useEffect(() => {
        setName(data.name);
        setWeekdayRate(data.weekdayRate);
        setWeekendRate(data.weekendRate);
        setDiscount(data.discount);
    }, [data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ name, weekdayRate, weekendRate, discount });
        }

        setName('');
        setWeekdayRate('');
        setWeekendRate('');
        setDiscount('');
    };

    const isEditing = data.name !== '';

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {isEditing ? 'Edit Parking Area' : 'Create New Parking Area'}
                </h2>
                <p className="text-slate-600">
                    {isEditing ? 'Update the parking area details below' : 'Fill in the details to create a new parking area'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormRow>
                        <LabeledInput
                            label="Parking Area Name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <LabeledInput
                            label="Discount Percentage"
                            name="discount"
                            type="number"
                            value={discount}
                            onChange={e => setDiscount(e.target.value)}
                            min="0"
                            max="100"
                        />
                    </FormRow>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormRow>
                        <LabeledInput
                            label="Weekdays Hourly Rate (USD)"
                            name="weekdayRate"
                            type="number"
                            value={weekdayRate}
                            onChange={e => setWeekdayRate(e.target.value)}
                            min="0"
                            step="0.01"
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <LabeledInput
                            label="Weekend Hourly Rate (USD)"
                            name="weekendRate"
                            type="number"
                            value={weekendRate}
                            onChange={e => setWeekendRate(e.target.value)}
                            min="0"
                            step="0.01"
                            required
                        />
                    </FormRow>
                </div>

                <div className="text-center pt-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                {isEditing ? 'Updating...' : 'Creating...'}
                            </div>
                        ) : (
                            isEditing ? 'Update Parking Area' : 'Create Parking Area'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}; 