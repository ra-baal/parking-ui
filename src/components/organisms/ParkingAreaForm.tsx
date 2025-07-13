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

    return (
        <form onSubmit={handleSubmit}>
            <FormRow>
                <LabeledInput
                    label="Parking Area Name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </FormRow>
            <FormRow>
                <LabeledInput
                    label="Weekdays Hourly Rate (USD)"
                    name="weekdayRate"
                    type="number"
                    value={weekdayRate}
                    onChange={e => setWeekdayRate(e.target.value)}
                />
            </FormRow>
            <FormRow>
                <LabeledInput
                    label="Weekend Hourly Rate (USD)"
                    name="weekendRate"
                    type="number"
                    value={weekendRate}
                    onChange={e => setWeekendRate(e.target.value)}
                />
            </FormRow>
            <FormRow>
                <LabeledInput
                    label="Discount Percentage"
                    name="discount"
                    type="number"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                />
            </FormRow>
            <Button type="submit" disabled={isSubmitting}>Save Parking Area</Button>
        </form>
    );
}; 