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
        return <div>No parking areas available.</div>;
    }
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Weekday Rate (USD)</th>
                    <th>Weekend Rate (USD)</th>
                    <th>Discount (%)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {areas.map(area => (
                    <tr key={area.id}>
                        <td>{area.name}</td>
                        <td>{area.weekdayRate}</td>
                        <td>{area.weekendRate}</td>
                        <td>{area.discountPercentage}</td>
                        <td>
                            <Button onClick={() => onEdit && onEdit(area.id)}>Edit</Button>{' '}
                            <Button onClick={() => onDelete && onDelete(area.id)} disabled={!onDelete}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
