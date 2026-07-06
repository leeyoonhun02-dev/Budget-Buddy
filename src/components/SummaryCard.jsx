import "../styles/SummaryCard.css";

const SummaryCard = ({ icon, title, amount }) => {
  return (
    <div className="summary-card">
      <div className="summary-icon">
        {icon}
      </div>

      <div className="summary-content">
        <h3>{title}</h3>
        <h2>{amount}</h2>
      </div>
    </div>
  );
};

export default SummaryCard;