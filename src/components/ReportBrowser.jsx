import { useGlobalContext } from '../context';
import ReportCard from './ReportCard';

const ReportBrowser = ({ selectedReports, setSelectedReports }) => {
  const { reports } = useGlobalContext();

  const onShowReportCheckboxInput = (e) => {
    const checkbox = e.target;
    // TODO maybe rewrite, looks ugly now
    const reportId = parseInt(checkbox.id);
    if (checkbox.checked) {
      selectReport(reportId);
    } else {
      unselectReport(reportId);
    }
  };

  const selectReport = (id) => {
    const report = reports.find((r) => r.id === id);
    if (selectedReports.includes(report)) {
      return;
    }
    setSelectedReports([...selectedReports, report]);
  };

  const unselectReport = (id) => {
    setSelectedReports(selectedReports.filter((r) => r.id !== id));
  };

  return (
    <div className="reports-browser">
      {reports.map((report) => {
        return (
          <ReportCard
            key={report.id}
            report={report}
            onShowReportCheckboxInput={onShowReportCheckboxInput}
          />
        );
      })}
    </div>
  );
};

export default ReportBrowser;
