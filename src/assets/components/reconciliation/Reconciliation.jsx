import ReconciliationForm from './ReconciliationForm';
import UploadForm from '../upload/UploadForm';

const Reconciliation = () => {
    return (
        <div className="flex flex-col gap-4 w-full ">
            <div>
                <h4>Reconciliation Dashboard</h4>
            </div>
            <div className="space-y-4">
                <UploadForm />
                <ReconciliationForm />
            </div>
        </div>
    );
};

export default Reconciliation;
