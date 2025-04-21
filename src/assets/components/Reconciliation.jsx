import ReconciliationForm from '../shared/ReconciliationForm';
import UploadForm from '../shared/UploadForm';

const Reconciliation = () => {
    return (
        <div className="flex flex-col gap-4 w-full ">
            <div>
                <h4>Reconciliation Dashboard</h4>
            </div>
            <UploadForm />
            <ReconciliationForm />
        </div>
    );
};

export default Reconciliation;
