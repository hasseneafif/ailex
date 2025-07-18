"use client"

import { companies } from "../../components/Market/companies";
import CompanyCard from "@/components/Market/CompanyCard";
import CompanyCardMobile from "@/components/Market/CompanyCardMobile";
import { useEffect, useState } from "react";


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

const Sparkline = ({ data, color = "#6b7280" }) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const len = data.length;
  const height = 30;
  const width = 80;
  const points = data
    .map((val, i) => {
      const x = (i / (len - 1)) * width;
      const y = height - ((val - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      className="inline-block"
      aria-label="sparkline chart"
      role="img"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
      />
    </svg>
  );
};

const MarketIndexCard = ({ label, percent, value, pts }: { label: string; percent?: number; value?: number | string; pts?: number; }) => {
  const isIndex = percent !== undefined && value !== undefined && pts !== undefined;
  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 rounded-md px-2 py-1 mx-1 min-h-[56px] min-w-[120px] text-xs text-white" style={{ flex: 1, maxWidth: '140px' }}>
      {isIndex ? (
        <>
          <div className="flex w-full justify-between items-center">
            <span className="font-semibold truncate">{label}</span>
            <span className={`font-bold ml-2 ${percent > 0 ? 'text-green-400' : percent < 0 ? 'text-red-500' : 'text-white'}`}>{percent > 0 ? '+' : ''}{percent.toFixed(2)}%</span>
          </div>
          <div className="flex w-full justify-between items-center mt-1">
            <span>{typeof value === 'number' ? value.toLocaleString() : value}</span>
            <span className="text-[10px] text-gray-300 ml-2">{pts}Pts</span>
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center items-center h-full">
          <span className="font-semibold truncate mr-2">{label}</span>
          {value !== undefined && <span className="font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</span>}
        </div>
      )}
    </div>
  );
};

const marketIndices = [
  { label: 'TUNINDEX', percent: 0.13, value: 11768.69, pts: 15.82 },
  { label: 'TUNINDEX20', percent: 0.05, value: 5284.63, pts: 2.85 },
  { label: 'Hausses', value: 0 },
  { label: 'Baisses', value: 0 },
  { label: 'Inchangés', value: 0 },
  { label: 'Actives', value: '0 / 74' },
  { label: 'Total volume', value: '0 DT' },
];

const MarketPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyTicker, setSelectedCompanyTicker] = useState(null);
  const [tab, setTab] = useState("Carnet");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredCompanies = companies.filter(c =>
    c?.referentiel?.stockName?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <section className="overflow-hidden pb-[120px] pt-[110px]">
        <div className="mx-4 lg:mx-4">
          <div className="-mx-4 flex flex-wrap">
            {/* Left/Main Content */}
            <div className="w-full px-4 lg:w-9/12">
              <div className="flex-1 space-y-6">
                {/* Market Index Cards */}
                <div className="flex flex-row flex-nowrap overflow-x-auto mb-2 gap-2">
                  {marketIndices.map((index, i) => (
                    <MarketIndexCard key={index.label + i} {...index} />
                  ))}
                </div>

                {/* Mobile search input under market indices */}
                {isMobile && (
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                )}
                {/* Company Cards Grid */}
                <div className="flex flex-col space-y-2">
                  {isMobile
                    ? filteredCompanies.slice(0, 30).map((company, i) => (
                        <CompanyCardMobile key={company.referentiel?.ticker + i} company={company} />
                      ))
                    : filteredCompanies.slice(0, 30).map((company, i) => {
                        const ticker = company?.referentiel?.ticker ?? `no-ticker-${i}`;
                        return (
                          <CompanyCard
                            key={ticker}
                            company={company}
                            isSelected={selectedCompanyTicker === ticker}
                            expanded={selectedCompanyTicker === ticker}
                            onSelect={() => {
                              if (selectedCompanyTicker === ticker) {
                                setSelectedCompany(null);
                                setSelectedCompanyTicker(null);
                              } else {
                                setSelectedCompany(company);
                                setSelectedCompanyTicker(ticker);
                              }
                            }}
                          />
                        );
                      })}
                </div>
             
              </div>
            </div>

            {/* Right Sidebar - copied exactly from second code */}
            <div className="w-full pr-4 lg:w-3/12">
              {/* Desktop search input in sidebar, styled like mobile */}
              <div className="shadow-three  pb-4  dark:shadow-none lg:mt-0 hidden lg:block">
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                />
              </div>
              {/* Hide AI Prediction and More Infos on mobile, show only on lg+ */}
              <div className="shadow-three dark:bg-gray-dark mb-4 rounded-sm bg-white dark:shadow-none hidden lg:block">
                 
                <div className="p-4">
                  {selectedCompany ? (
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-purple-300">Prédiction IA</h4>
                      <p className="text-white text-xs">Notre IA prévoit une hausse de 2.3% sur les prochaines 24h.</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-xs">Sélectionnez une société pour voir la prédiction IA.</p>
                  )}
                </div>
                </div>
               <div className="shadow-three dark:bg-gray-dark mb-4 rounded-sm bg-white dark:shadow-none hidden lg:block">
                 
                <div className="p-1">
                  {selectedCompany ? (
                    <>
                      <div className="flex w-full mb-2 border-b border-gray-700">
                        {['Carnet', 'Graphique', 'Transactions'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={
                              `flex-1 py-1 font-semibold focus:outline-none transition-colors duration-200 truncate text-[0.7rem] ` +
                              (tab === t
                                ? 'border-b-4 border-purple-600 text-purple-600 bg-transparent'
                                : 'border-b-4 border-transparent text-gray-300 hover:text-purple-400')
                            }
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <div className="bg-gray-800 rounded-b p-3 min-h-[100px]">
                        {tab === 'Carnet' && (
                          <table className="w-full text-xs text-left">
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
                          <div className="flex items-center justify-center h-24">
                            {/* Dummy SVG chart */}
                            <svg width="100%" height="80" viewBox="0 0 200 80">
                              <polyline fill="none" stroke="#a259ff" strokeWidth="3" points="0,60 40,20 80,40 120,10 160,50 200,30" />
                              <circle cx="40" cy="20" r="4" fill="#a259ff" />
                              <circle cx="120" cy="10" r="4" fill="#a259ff" />
                            </svg>
                          </div>
                        )}
                        {tab === 'Transactions' && (
                          <table className="w-full text-xs text-left">
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
                    </>
                  ) : (
                    <p className="text-gray-400 text-xs p-3">Sélectionnez une société pour voir plus d'infos.</p>
                  )}
                </div>
                </div>
       
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketPage;
