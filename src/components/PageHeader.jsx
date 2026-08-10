import "../styles/PageHeader.css";

const PageHeader = ({ title, subtitle }) => {
  const today = new Date().toLocaleDateString("en-JP", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <span>{today}</span>
    </div>
  );
};

export default PageHeader;