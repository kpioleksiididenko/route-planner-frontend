const ReportCard = ({ report, onShowReportCheckboxInput }) => {
  return (
    <div className="report-card">
      <span className="report-title">{report.title}</span>
      <div className="report-details">
        <p className="report-detail">
          <span className="detail-name">author: </span>
          {report.authorName || '-'}
        </p>
        <p className="report-detail">
          <span className="detail-name">difficulty: </span>
          {report.difficulty || '-'}
        </p>
        <p className="report-detail">
          <span className="detail-name">season: </span>
          {report.season || '-'}
        </p>
        <p className="report-detail">
          <span className="detail-name">source:</span>{' '}
          {report.url ? (
            <a
              href={report.url}
              className="report-source-link"
              target="_blank"
              rel="noreferrer"
            >
              url
            </a>
          ) : (
            '-'
          )}
        </p>
        <div>
          <label htmlFor={report.id}>show report: </label>
          <input
            type="checkbox"
            name="show-report"
            id={report.id}
            onInput={onShowReportCheckboxInput}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
