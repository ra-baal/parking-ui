import React, { useState } from 'react';
import { LabeledSelect } from 'src/components/molecules/LabeledSelect';
import { LabeledDateTimeInput } from 'src/components/molecules/LabeledDateTimeInput';
import { FormRow } from 'src/components/molecules/FormRow';
import { Button } from 'src/components/atoms/Button';
import { useParkingAreas } from 'src/api/parkingAreas';
import { useCalculatePayment } from 'src/api/payments';

const currencies = [
    { code: 'USD', label: 'USD ($)' },
    { code: 'EUR', label: 'EUR (€)' },
    { code: 'PLN', label: 'PLN (zł)' },
];

export const PaymentPage = () => {
    const { data: parkingAreas, isLoading: loadingAreas } = useParkingAreas();
    const [parkingArea, setParkingArea] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [submitted, setSubmitted] = useState(false);

    const { mutate, data: payment, status, error } = useCalculatePayment();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        mutate({
            parkingAreaId: parkingArea,
            startTime,
            endTime,
        });
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Parking Payment</h1>
            <form onSubmit={handleSubmit}>
                <FormRow>
                    <LabeledSelect
                        label="Parking Area"
                        value={parkingArea}
                        onChange={e => setParkingArea(e.target.value)}
                        name="parkingArea"
                        required
                        disabled={loadingAreas}
                    >
                        <option value="" disabled>Select area</option>
                        {parkingAreas && parkingAreas.map(area => (
                            <option key={area.id} value={area.id}>{area.name}</option>
                        ))}
                    </LabeledSelect>
                </FormRow>
                <FormRow>
                    <LabeledDateTimeInput
                        label="Start Time"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        name="startTime"
                        required
                    />
                </FormRow>
                <FormRow>
                    <LabeledDateTimeInput
                        label="End Time"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        name="endTime"
                        required
                    />
                </FormRow>
                <FormRow>
                    <LabeledSelect
                        label="Currency"
                        value={currency}
                        onChange={e => setCurrency(e.target.value)}
                        name="currency"
                        required
                    >
                        {currencies.map(c => (
                            <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                    </LabeledSelect>
                </FormRow>
                <Button type="submit" disabled={status === 'pending' || loadingAreas}>Calculate Payment</Button>
            </form>
            {status === 'pending' && submitted && <div style={{ marginTop: 24 }}>Calculating...</div>}
            {status === 'error' && submitted && <div style={{ marginTop: 24, color: 'red' }}>Error: {error?.message}</div>}
            {payment && (
                <div style={{ marginTop: 24 }}>
                    <strong>Amount to pay:</strong>
                    <ul>
                        <li style={{ fontWeight: currency === 'USD' ? 'bold' : undefined }}>
                            USD: {payment.amountUSD}
                        </li>
                        <li style={{ fontWeight: currency === 'EUR' ? 'bold' : undefined }}>
                            EUR: {payment.amountEUR ?? 'N/A'}
                        </li>
                        <li style={{ fontWeight: currency === 'PLN' ? 'bold' : undefined }}>
                            PLN: {payment.amountPLN ?? 'N/A'}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}; 