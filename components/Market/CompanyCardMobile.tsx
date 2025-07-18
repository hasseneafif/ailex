import { useState } from "react";

const Pill = ({ label, value }) => (
  <div className="mt-1 bg-gray-700 text-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap flex items-center space-x-1 select-none">
    <span className="font-bold">{label}</span>
    <span>{value}</span>
  </div>
);

// Attribute importance order (excluding name and price)
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
  // Support nested keys like 'referentiel.stockName' or 'limit.ask'
  return key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), company);
}

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

const CompanyCardMobile = ({ company }) => {
  const [expandLevel, setExpandLevel] = useState(0); // 0: card, 1: first, 2: second, ...
  const [showMore, setShowMore] = useState(false);
  const [tab, setTab] = useState("Carnet");
  const pillsPerLevel = 6;
  const totalLevels = Math.ceil(attributeList.length / pillsPerLevel);
  // Remove buttonHover state

  // Always show name and price at the top
  const name = getValue(company, "referentiel.stockName") ?? "N/A";
  const last = getValue(company, "last");
  const varValue = getValue(company, "percentage_change");
  let varColor = "text-white";
  if (varValue > 0) varColor = "text-green-400";
  else if (varValue < 0) varColor = "text-red-500";

  // Pills for current expand level, grouped into rows of 3
  const pillsToShow = attributeList.slice(0, (expandLevel + 1) * pillsPerLevel);
  const pillRows = [];
  for (let i = 0; i < pillsToShow.length; i += 3) {
    pillRows.push(pillsToShow.slice(i, i + 3));
  }

  // Only show expand button if more levels are available
  const canExpand = expandLevel < totalLevels - 1;
  const canCollapse = expandLevel > 0;
  const expanded = expandLevel > 0;

  return (
    <div className={`relative w-full bg-gray-900 text-white rounded-lg p-2 shadow-md transition-all duration-300 mb-2 border-2 ${expanded ? "border-purple-300" : "border-transparent"}`}>
      {/* Header: Name and Price */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-sm truncate">{name}</span>
        <span className="text-base font-extrabold flex items-center gap-1">
          <span className={`font-bold ${varColor} text-[12px]`}>{varValue !== undefined ? `${varValue.toFixed(2)}%` : ""}</span>
          {last !== undefined ? last.toFixed(2) + " TND" : "N/A"}
        </span>
      </div>
      {/* Pills: rows of 3, left-aligned, buttons at far right of last row */}
      <div className="flex flex-col gap-1 items-start w-full">
        {pillRows.map((row, idx) => (
          <div key={idx} className="flex flex-nowrap gap-1 w-full items-center">
            {row.map(({ key, label }) => (
              <Pill key={key} label={label} value={getValue(company, key) ?? "N/A"} />
            ))}
            {/* Place + and - buttons at the far right of the last row only */}
            {idx === pillRows.length - 1 && (
              <span className="ml-auto flex gap-1 z-20 relative" style={{ pointerEvents: 'auto' }}>
                {canCollapse && (
                  <button
                    className="text-2xl font-extrabold px-3 py-1 z-20 relative"
                    style={{ lineHeight: 1.2 }}
                    onClick={() => setExpandLevel(expandLevel - 1)}
                  >
                    -
                  </button>
                )}
                {canExpand && (
                  <button
                    className="text-2xl font-extrabold pl-1 pr-3 py-1 z-20 relative"
                    style={{ lineHeight: 1.2 }}
                    onClick={() => setExpandLevel(expandLevel + 1)}
                  >
                    +
                  </button>
                )}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* 4th Expandable Section: AI Prediction & Tabs */}
      <div className="mt-2 w-full">
        <button
          className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 rounded-lg text-xs font-semibold text-purple-300 focus:outline-none"
          onClick={() => setShowMore((v) => !v)}
        >
          <span>Plus d'infos IA & Marché</span>
          <svg className={`w-4 h-4 ml-2 transition-transform ${showMore ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showMore && (
          <div className="mt-2 bg-gray-800 rounded-lg p-2">
            {/* AI Prediction */}
            <div className="mb-3">
              <h4 className="font-bold text-xs mb-1 text-purple-300">Prédiction IA</h4>
              <p className="text-white text-xs">Notre IA prévoit une hausse de 2.3% sur les prochaines 24h.</p>
            </div>
            {/* Tabs */}
            <div>
              <div className="flex space-x-1 mb-2">
                {['Carnet', 'Graphique', 'Transactions'].map((t) => (
                  <button
                    key={t}
                    onClick={e => { e.stopPropagation(); setTab(t); }}
                    className={`px-2 py-1 rounded-t font-semibold text-xs focus:outline-none transition-colors duration-200 ${tab === t ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="bg-gray-900 rounded-b p-2 min-h-[80px]">
                {tab === 'Carnet' && (
                  <table className="w-full text-[11px] text-left">
                    <thead>
                      <tr className="text-purple-300">
                        <th>Type</th><th>Prix</th><th>Qté</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyOrderBook.map((row, i) => (
                        <tr key={i} className="border-t border-gray-700">
                          <td>{row.type}</td>
                          <td>{row.price}</td>
                          <td>{row.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {tab === 'Graphique' && (
                  <div className="flex items-center justify-center h-16">
                    {/* Dummy SVG chart */}
                    <svg width="100%" height="60" viewBox="0 0 120 60">
                      <polyline fill="none" stroke="#a259ff" strokeWidth="2" points="0,45 24,15 48,30 72,8 96,38 120,20" />
                      <circle cx="24" cy="15" r="3" fill="#a259ff" />
                      <circle cx="72" cy="8" r="3" fill="#a259ff" />
                    </svg>
                  </div>
                )}
                {tab === 'Transactions' && (
                  <table className="w-full text-[11px] text-left">
                    <thead>
                      <tr className="text-purple-300">
                        <th>ID</th><th>Prix</th><th>Qté</th><th>Heure</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyTransactions.map((row) => (
                        <tr key={row.id} className="border-t border-gray-700">
                          <td>{row.id}</td>
                          <td>{row.price}</td>
                          <td>{row.qty}</td>
                          <td>{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCardMobile; 