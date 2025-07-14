import React, { useState } from 'react';
import { LabeledSelect } from 'src/components/molecules/LabeledSelect';
import { LabeledInput } from 'src/components/molecules/LabeledInput';
import { FormRow } from 'src/components/molecules/FormRow';
import { Button } from 'src/components/atoms/Button';
import { useParkingAreas } from 'src/api/parkingAreas';
import { useCalculatePayment } from 'src/api/payments';
import { useConvertCurrency } from 'src/api/currency';

export const PaymentPage = () => {
    const { data: parkingAreas, isLoading: loadingAreas } = useParkingAreas();
    const [parkingArea, setParkingArea] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const { mutate, data: payment, status, error } = useCalculatePayment();
    const {
        mutate: convertCurrency,
        data: convertedPayment,
        status: convertStatus,
        error: convertError,
        reset: resetConvert
    } = useConvertCurrency();

    const combineDateTime = (date: string, time: string) => {
        if (!date || !time) return '';
        return `${date}T${time}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        mutate({
            parkingAreaId: parkingArea,
            startTime: combineDateTime(date, startTime),
            endTime: combineDateTime(date, endTime),
        });
    };

    const handleConvert = (toCurrency: string) => {
        if (!payment) return;
        resetConvert();
        convertCurrency({
            fromCurrency: payment.currency,
            toCurrency,
            amount: payment.amount,
            date: combineDateTime(date, startTime),
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
                    <LabeledInput
                        label="Date"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        name="date"
                    />
                </FormRow>
                <FormRow>
                    <LabeledInput
                        label="Start"
                        type="time"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        name="startTime"
                    />
                </FormRow>
                <FormRow>
                    <LabeledInput
                        label="End"
                        type="time"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        name="endTime"
                    />
                </FormRow>
                <Button type="submit" disabled={status === 'pending' || loadingAreas}>Calculate Payment</Button>
            </form>
            {status === 'pending' && submitted && <div style={{ marginTop: 24 }}>Calculating...</div>}
            {status === 'error' && submitted && <div style={{ marginTop: 24, color: 'red' }}>Error: {error?.message}</div>}
            {payment && (
                <div style={{ marginTop: 24 }}>
                    <strong>Amount to pay:</strong>
                    <div>
                        {payment.amount} {payment.currency}
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                        <Button type="button" onClick={() => handleConvert('EUR')}>Calculate to EUR</Button>
                        <Button type="button" onClick={() => handleConvert('PLN')}>Calculate to PLN</Button>
                    </div>
                    {convertStatus === 'pending' && <div style={{ marginTop: 8 }}>Loading...</div>}
                    {convertStatus === 'error' && <div style={{ marginTop: 8, color: 'red' }}>Error: {convertError?.message}</div>}
                    {convertedPayment && (
                        <div style={{ marginTop: 8 }}>
                            <strong>Recalculated amount:</strong> {convertedPayment.amount} {convertedPayment.currency}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}; 