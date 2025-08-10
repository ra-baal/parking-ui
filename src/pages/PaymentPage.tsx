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
        <div className="p-8 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">Parking Payment</h1>
                <p className="text-slate-600 text-lg">Calculate your parking fees and convert to different currencies</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/5 border border-white/20 p-8 mb-8">
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
                    <div className="text-center mt-8">
                        <Button type="submit" disabled={status === 'pending' || loadingAreas} className="px-8 py-3 text-lg">
                            Calculate Payment
                        </Button>
                    </div>
                </form>
            </div>

            {status === 'pending' && submitted && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-xl text-center mb-6">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                    <div>Calculating your payment...</div>
                </div>
            )}

            {status === 'error' && submitted && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center mb-6">
                    Error: {error?.message}
                </div>
            )}

            {payment && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 text-center">
                    <div className="text-2xl font-bold text-slate-800 mb-4">Payment Summary</div>
                    <div className="text-4xl font-bold text-green-600 mb-6">
                        {payment.amount} {payment.currency}
                    </div>
                    <div className="text-slate-600 mb-6">Amount to pay</div>

                    <div className="flex justify-center gap-4 mb-6">
                        <Button
                            type="button"
                            onClick={() => handleConvert('EUR')}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Convert to EUR
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleConvert('PLN')}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Convert to PLN
                        </Button>
                    </div>

                    {convertStatus === 'pending' && (
                        <div className="text-blue-600">
                            <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mb-2"></div>
                            Converting currency...
                        </div>
                    )}

                    {convertStatus === 'error' && (
                        <div className="text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-xl">
                            Error: {convertError?.message}
                        </div>
                    )}

                    {convertedPayment && (
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-200">
                            <div className="text-lg font-semibold text-slate-700 mb-2">Converted Amount</div>
                            <div className="text-2xl font-bold text-emerald-600">
                                {convertedPayment.amount} {convertedPayment.currency}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}; 