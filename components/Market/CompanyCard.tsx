import { useState } from "react";

const dummyOrderBook = [
  { price: 100.5, qty: 20, type: "Achat" },
  { price: 101.2, qty: 10, type: "Vente" },
  { price: 99.8, qty: 15, type: "Achat" },
];
const dummyTransactions = [
  { id: 1, price: 100.7, qty: 5, time: "10:01" },
  { id: 2, price: 101.0, qty: 8, time: "10:03" },
  { id: 3, price: 100.2, qty: 12, time: "10:05" },
];


const Pill = ({ label, value }) => (
  <div className="mt-2 bg-gray-700 text-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap flex items-center space-x-1 select-none">
    <span className="font-bold">{label}</span>
    <span>{value}</span>
  </div>
);

const attributeList = [
  { key: "volume", label: "Volume" },
  { key: "limit.bid", label: "Achat" },
  { key: "limit.ask", label: "Vente" },
  { key: "high", label: "S.Haut" },
  { key: "low", label: "S.Bas" },
  { key: "open", label: "Ouv" },
  { key: "close", label: "Réf" },
  { key: "max", label: "P.Haut" },
  { key: "min", label: "P.Bas" },
  { key: "time", label: "H" },
  { key: "caps", label: "Capit" },
  { key: "limit.askQty", label: "Qté.V" },
  { key: "limit.bidQty", label: "Qté.A" },
  { key: "limit.askOrd", label: "Ord.V" },
  { key: "limit.bidOrd", label: "Ord.A" },
  { key: "aiSentiment", label: "AI Sentiment" },
  { key: "aiConfidence", label: "AI Note" },
];

function getValue(company, key) {
  return key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), company);
}

const CompanyCard = ({ company, isSelected, onSelect, expanded: expandedProp }) => {
  const [expandedState, setExpandedState] = useState(false);
  const isDesktop = typeof onSelect === 'function';
  const expanded = isDesktop ? expandedProp : expandedState;
  const [tab, setTab] = useState("Carnet");

  const name = getValue(company, "referentiel.stockName") ?? "N/A";
  const last = getValue(company, "last");
  const varValue = getValue(company, "percentage_change");
  const varColor = varValue > 0 ? "text-green-400" : varValue < 0 ? "text-red-500" : "text-white";

  const pillsMain = attributeList.slice(0, 8);
  const pillsExpand = attributeList.slice(8, 18);

  const handleClick = (e) => {
    if (isDesktop) {
      e.stopPropagation();
      onSelect();
    } else {
      setExpandedState(prev => !prev);
    }
  };

  return (
    <div
      className={
        `relative w-full bg-gray-900 text-white rounded-lg py-1 px-3 shadow-md cursor-pointer transition-all duration-300 overflow-hidden ` +
        (expanded ? 'max-h-[520px] border-2 border-purple-300 ' : 'max-h-[90px] border-2 border-transparent ') +
        (isSelected ? 'ring-2 ring-purple-300 ' : '')
      }
      onClick={handleClick}
    >
      <div className="flex items-center justify-between relative mb-1 w-full gap-2 flex-wrap">
        <h3 className="font-semibold text-xs truncate mr-2 whitespace-nowrap">{name}</h3>

        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
          {pillsMain.map(({ key, label }) => (
            <Pill key={key} label={label} value={getValue(company, key) ?? "N/A"} />
          ))}
        </div>

        <div className="flex items-end min-w-fit ml-2">
          <span className={`font-bold ${varColor} text-[12px] mr-1`}>
            {varValue !== undefined ? `${varValue.toFixed(2)}%` : ""}
          </span>
          <span className="text-base font-extrabold flex items-end" style={{ fontSize: "0.9rem" }}>
            {last !== undefined ? (
              <>
                {last.toFixed(2)}
                <span className="text-[10px] ml-1">TND</span>
              </>
            ) : "N/A"}
          </span>
          <div className="-mr-1 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 border-t border-gray-700 pt-2 text-xs text-gray-300 flex flex-wrap gap-1">
          {pillsExpand.map(({ key, label }) => (
            <Pill key={key} label={label} value={getValue(company, key) ?? "N/A"} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
