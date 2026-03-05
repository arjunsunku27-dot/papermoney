import { useState, useEffect, useCallback, useRef } from "react";

// ─── HUGE TICKER LIBRARY ────────────────────────────────────────────────────
const TICKER_LIBRARY = [
  // INDICES
  { symbol: "^GSPC",  name: "S&P 500",              category: "Index" },
  { symbol: "^DJI",   name: "Dow Jones Industrial",  category: "Index" },
  { symbol: "^IXIC",  name: "NASDAQ Composite",      category: "Index" },
  { symbol: "^RUT",   name: "Russell 2000",           category: "Index" },
  { symbol: "^VIX",   name: "CBOE Volatility Index",  category: "Index" },
  { symbol: "^FTSE",  name: "FTSE 100",               category: "Index" },
  { symbol: "^N225",  name: "Nikkei 225",             category: "Index" },
  { symbol: "^STOXX50E", name: "Euro Stoxx 50",       category: "Index" },
  // MEGA CAP TECH
  { symbol: "AAPL",  name: "Apple Inc.",              category: "Technology" },
  { symbol: "MSFT",  name: "Microsoft Corp.",         category: "Technology" },
  { symbol: "NVDA",  name: "NVIDIA Corp.",            category: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc.",           category: "Technology" },
  { symbol: "META",  name: "Meta Platforms",          category: "Technology" },
  { symbol: "AMZN",  name: "Amazon.com Inc.",         category: "Technology" },
  { symbol: "TSLA",  name: "Tesla Inc.",              category: "Technology" },
  { symbol: "AVGO",  name: "Broadcom Inc.",           category: "Technology" },
  { symbol: "ORCL",  name: "Oracle Corp.",            category: "Technology" },
  { symbol: "CRM",   name: "Salesforce Inc.",         category: "Technology" },
  { symbol: "AMD",   name: "Advanced Micro Devices",  category: "Technology" },
  { symbol: "INTC",  name: "Intel Corp.",             category: "Technology" },
  { symbol: "QCOM",  name: "Qualcomm Inc.",           category: "Technology" },
  { symbol: "TXN",   name: "Texas Instruments",       category: "Technology" },
  { symbol: "ADBE",  name: "Adobe Inc.",              category: "Technology" },
  { symbol: "NOW",   name: "ServiceNow Inc.",         category: "Technology" },
  { symbol: "UBER",  name: "Uber Technologies",       category: "Technology" },
  { symbol: "ABNB",  name: "Airbnb Inc.",             category: "Technology" },
  { symbol: "SHOP",  name: "Shopify Inc.",            category: "Technology" },
  { symbol: "NET",   name: "Cloudflare Inc.",         category: "Technology" },
  { symbol: "SNOW",  name: "Snowflake Inc.",          category: "Technology" },
  // FINANCE
  { symbol: "JPM",   name: "JPMorgan Chase",           category: "Finance" },
  { symbol: "BAC",   name: "Bank of America",          category: "Finance" },
  { symbol: "WFC",   name: "Wells Fargo",              category: "Finance" },
  { symbol: "GS",    name: "Goldman Sachs",            category: "Finance" },
  { symbol: "MS",    name: "Morgan Stanley",           category: "Finance" },
  { symbol: "BRK-B", name: "Berkshire Hathaway B",     category: "Finance" },
  { symbol: "V",     name: "Visa Inc.",                category: "Finance" },
  { symbol: "MA",    name: "Mastercard Inc.",          category: "Finance" },
  { symbol: "PYPL",  name: "PayPal Holdings",          category: "Finance" },
  { symbol: "AXP",   name: "American Express",         category: "Finance" },
  { symbol: "C",     name: "Citigroup Inc.",           category: "Finance" },
  { symbol: "BLK",   name: "BlackRock Inc.",           category: "Finance" },
  { symbol: "SCHW",  name: "Charles Schwab Corp.",     category: "Finance" },
  { symbol: "USB",   name: "U.S. Bancorp",             category: "Finance" },
  { symbol: "PNC",   name: "PNC Financial Services",   category: "Finance" },
  { symbol: "TFC",   name: "Truist Financial",         category: "Finance" },
  { symbol: "COF",   name: "Capital One Financial",    category: "Finance" },
  { symbol: "CB",    name: "Chubb Ltd.",               category: "Finance" },
  { symbol: "MMC",   name: "Marsh & McLennan",         category: "Finance" },
  { symbol: "AON",   name: "Aon PLC",                  category: "Finance" },
  { symbol: "ICE",   name: "Intercontinental Exchange",category: "Finance" },
  { symbol: "CME",   name: "CME Group Inc.",           category: "Finance" },
  { symbol: "SPGI",  name: "S&P Global Inc.",          category: "Finance" },
  { symbol: "MCO",   name: "Moody's Corp.",            category: "Finance" },
  { symbol: "FIS",   name: "Fidelity National Info",   category: "Finance" },
  { symbol: "FISV",  name: "Fiserv Inc.",              category: "Finance" },
  { symbol: "SQ",    name: "Block Inc.",               category: "Finance" },
  { symbol: "COIN",  name: "Coinbase Global",          category: "Finance" },
  // HEALTHCARE
  { symbol: "JNJ",   name: "Johnson & Johnson",        category: "Healthcare" },
  { symbol: "UNH",   name: "UnitedHealth Group",       category: "Healthcare" },
  { symbol: "PFE",   name: "Pfizer Inc.",              category: "Healthcare" },
  { symbol: "ABBV",  name: "AbbVie Inc.",              category: "Healthcare" },
  { symbol: "MRK",   name: "Merck & Co.",              category: "Healthcare" },
  { symbol: "LLY",   name: "Eli Lilly & Co.",          category: "Healthcare" },
  { symbol: "TMO",   name: "Thermo Fisher Scientific", category: "Healthcare" },
  { symbol: "ABT",   name: "Abbott Laboratories",      category: "Healthcare" },
  { symbol: "ISRG",  name: "Intuitive Surgical",       category: "Healthcare" },
  { symbol: "DHR",   name: "Danaher Corp.",            category: "Healthcare" },
  { symbol: "BSX",   name: "Boston Scientific",        category: "Healthcare" },
  { symbol: "MDT",   name: "Medtronic PLC",            category: "Healthcare" },
  { symbol: "CVS",   name: "CVS Health Corp.",         category: "Healthcare" },
  { symbol: "CI",    name: "Cigna Group",              category: "Healthcare" },
  { symbol: "HUM",   name: "Humana Inc.",              category: "Healthcare" },
  { symbol: "MRNA",  name: "Moderna Inc.",             category: "Healthcare" },
  { symbol: "GILD",  name: "Gilead Sciences",          category: "Healthcare" },
  { symbol: "AMGN",  name: "Amgen Inc.",               category: "Healthcare" },
  { symbol: "BIIB",  name: "Biogen Inc.",              category: "Healthcare" },
  { symbol: "REGN",  name: "Regeneron Pharma",         category: "Healthcare" },
  { symbol: "VRTX",  name: "Vertex Pharmaceuticals",   category: "Healthcare" },
  { symbol: "ZTS",   name: "Zoetis Inc.",              category: "Healthcare" },
  { symbol: "SYK",   name: "Stryker Corp.",            category: "Healthcare" },
  { symbol: "EW",    name: "Edwards Lifesciences",     category: "Healthcare" },
  // ENERGY
  { symbol: "XOM",   name: "ExxonMobil Corp.",         category: "Energy" },
  { symbol: "CVX",   name: "Chevron Corp.",            category: "Energy" },
  { symbol: "COP",   name: "ConocoPhillips",           category: "Energy" },
  { symbol: "SLB",   name: "Schlumberger Ltd.",        category: "Energy" },
  { symbol: "OXY",   name: "Occidental Petroleum",     category: "Energy" },
  { symbol: "EOG",   name: "EOG Resources",            category: "Energy" },
  { symbol: "PXD",   name: "Pioneer Natural Resources",category: "Energy" },
  { symbol: "MPC",   name: "Marathon Petroleum",       category: "Energy" },
  { symbol: "VLO",   name: "Valero Energy",            category: "Energy" },
  { symbol: "PSX",   name: "Phillips 66",              category: "Energy" },
  { symbol: "KMI",   name: "Kinder Morgan",            category: "Energy" },
  { symbol: "WMB",   name: "Williams Companies",       category: "Energy" },
  { symbol: "HAL",   name: "Halliburton Co.",          category: "Energy" },
  { symbol: "DVN",   name: "Devon Energy",             category: "Energy" },
  { symbol: "FANG",  name: "Diamondback Energy",       category: "Energy" },
  // CONSUMER
  { symbol: "WMT",   name: "Walmart Inc.",            category: "Consumer" },
  { symbol: "COST",  name: "Costco Wholesale",        category: "Consumer" },
  { symbol: "HD",    name: "Home Depot Inc.",         category: "Consumer" },
  { symbol: "MCD",   name: "McDonald's Corp.",        category: "Consumer" },
  { symbol: "SBUX",  name: "Starbucks Corp.",         category: "Consumer" },
  { symbol: "NKE",   name: "Nike Inc.",               category: "Consumer" },
  { symbol: "PG",    name: "Procter & Gamble",        category: "Consumer" },
  { symbol: "KO",    name: "Coca-Cola Co.",           category: "Consumer" },
  { symbol: "PEP",   name: "PepsiCo Inc.",            category: "Consumer" },
  { symbol: "TGT",   name: "Target Corp.",            category: "Consumer" },
  { symbol: "LOW",   name: "Lowe's Companies",        category: "Consumer" },
  { symbol: "TJX",   name: "TJX Companies",           category: "Consumer" },
  { symbol: "MO",    name: "Altria Group",            category: "Consumer" },
  { symbol: "PM",    name: "Philip Morris Intl",      category: "Consumer" },
  { symbol: "CL",    name: "Colgate-Palmolive",       category: "Consumer" },
  { symbol: "GIS",   name: "General Mills",           category: "Consumer" },
  { symbol: "K",     name: "Kellanova",               category: "Consumer" },
  { symbol: "YUM",   name: "Yum! Brands",             category: "Consumer" },
  { symbol: "CMG",   name: "Chipotle Mexican Grill",  category: "Consumer" },
  { symbol: "LULU",  name: "Lululemon Athletica",     category: "Consumer" },
  // MEDIA / ENTERTAINMENT
  { symbol: "NFLX",  name: "Netflix Inc.",            category: "Media" },
  { symbol: "DIS",   name: "Walt Disney Co.",         category: "Media" },
  { symbol: "SPOT",  name: "Spotify Technology",      category: "Media" },
  { symbol: "PARA",  name: "Paramount Global",        category: "Media" },
  { symbol: "CMCSA", name: "Comcast Corp.",           category: "Media" },
  { symbol: "WBD",   name: "Warner Bros Discovery",   category: "Media" },
  { symbol: "TTD",   name: "The Trade Desk",          category: "Media" },
  // ETFs
  { symbol: "SPY",   name: "SPDR S&P 500 ETF",        category: "ETF" },
  { symbol: "QQQ",   name: "Invesco NASDAQ 100 ETF",  category: "ETF" },
  { symbol: "VTI",   name: "Vanguard Total Market ETF",category: "ETF" },
  { symbol: "VOO",   name: "Vanguard S&P 500 ETF",    category: "ETF" },
  { symbol: "IWM",   name: "iShares Russell 2000 ETF",category: "ETF" },
  { symbol: "DIA",   name: "SPDR Dow Jones ETF",      category: "ETF" },
  { symbol: "GLD",   name: "SPDR Gold Shares ETF",    category: "ETF" },
  { symbol: "SLV",   name: "iShares Silver Trust ETF",category: "ETF" },
  { symbol: "TLT",   name: "iShares 20yr Treasury ETF",category: "ETF" },
  { symbol: "HYG",   name: "iShares High Yield Bond ETF",category: "ETF" },
  { symbol: "XLF",   name: "Financial Select SPDR",   category: "ETF" },
  { symbol: "XLK",   name: "Technology Select SPDR",  category: "ETF" },
  { symbol: "XLE",   name: "Energy Select SPDR",      category: "ETF" },
  { symbol: "ARKK",  name: "ARK Innovation ETF",      category: "ETF" },
  { symbol: "VNQ",   name: "Vanguard Real Estate ETF",category: "ETF" },
  // BONDS / FIXED INCOME
  { symbol: "^TNX",  name: "10-Year Treasury Yield",  category: "Bond" },
  { symbol: "^TYX",  name: "30-Year Treasury Yield",  category: "Bond" },
  { symbol: "^IRX",  name: "13-Week Treasury Bill",   category: "Bond" },
  { symbol: "BND",   name: "Vanguard Total Bond ETF", category: "Bond" },
  { symbol: "AGG",   name: "iShares Core US Bond ETF",category: "Bond" },
  { symbol: "LQD",   name: "iShares Investment Grade Bond",category: "Bond" },
  // COMMODITIES / FUTURES
  { symbol: "GC=F",  name: "Gold Futures",            category: "Commodity" },
  { symbol: "SI=F",  name: "Silver Futures",          category: "Commodity" },
  { symbol: "CL=F",  name: "Crude Oil Futures",       category: "Commodity" },
  { symbol: "NG=F",  name: "Natural Gas Futures",     category: "Commodity" },
  { symbol: "ZC=F",  name: "Corn Futures",            category: "Commodity" },
  { symbol: "ZW=F",  name: "Wheat Futures",           category: "Commodity" },
  // CRYPTO
  { symbol: "BTC-USD", name: "Bitcoin",               category: "Crypto" },
  { symbol: "ETH-USD", name: "Ethereum",              category: "Crypto" },
  { symbol: "SOL-USD", name: "Solana",                category: "Crypto" },
  { symbol: "BNB-USD", name: "Binance Coin",          category: "Crypto" },
  { symbol: "XRP-USD", name: "XRP",                   category: "Crypto" },
  { symbol: "DOGE-USD",name: "Dogecoin",              category: "Crypto" },
];

const CATEGORIES = ["All", "Index", "Technology", "Finance", "Healthcare", "Energy", "Consumer", "Media", "ETF", "Bond", "Commodity", "Crypto"];

const CATEGORY_COLORS = {
  Index: "#a78bfa", Technology: "#38bdf8", Finance: "#4ade80",
  Healthcare: "#fb923c", Energy: "#fbbf24", Consumer: "#f472b6",
  Media: "#e879f9", ETF: "#34d399", Bond: "#94a3b8",
  Commodity: "#fcd34d", Crypto: "#f97316",
};

const STARTING_CASH = 10000;
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.allorigins.win/raw?url=",
];

// Fallback simulated prices if Yahoo is rate-limited
const FALLBACK_PRICES = {
  "^GSPC":5120,"^DJI":38900,"^IXIC":16200,"^RUT":2050,"^VIX":15.2,
  "AAPL":189,"MSFT":415,"NVDA":875,"GOOGL":166,"META":512,"AMZN":179,
  "TSLA":243,"AVGO":1380,"ORCL":128,"CRM":298,"AMD":174,"INTC":31,
  "QCOM":168,"TXN":189,"ADBE":476,"NOW":785,"UBER":72,"ABNB":145,
  "SHOP":71,"NET":98,"SNOW":145,"JPM":199,"BAC":38,"WFC":58,"GS":452,
  "MS":104,"BRK-B":364,"V":279,"MA":488,"PYPL":64,"AXP":237,"C":64,
  "BLK":876,"JNJ":147,"UNH":524,"PFE":27,"ABBV":175,"MRK":127,
  "LLY":789,"TMO":556,"ABT":110,"XOM":118,"CVX":156,"COP":121,
  "SLB":46,"OXY":58,"WMT":68,"COST":738,"HD":378,"MCD":293,
  "SBUX":75,"NKE":96,"PG":165,"KO":62,"PEP":173,"NFLX":629,
  "DIS":112,"SPOT":323,"PARA":11,"SPY":512,"QQQ":444,"VTI":248,
  "VOO":469,"IWM":205,"DIA":389,"GLD":186,"SLV":22,"TLT":96,
  "HYG":77,"XLF":42,"XLK":211,"XLE":92,"ARKK":48,"VNQ":87,
  "^TNX":4.28,"^TYX":4.45,"^IRX":5.11,"BND":73,"AGG":96,"LQD":107,
  "GC=F":2340,"SI=F":28,"CL=F":78,"NG=F":1.9,"ZC=F":440,"ZW=F":530,
  "BTC-USD":68000,"ETH-USD":3400,"SOL-USD":145,"BNB-USD":570,
  "XRP-USD":0.52,"DOGE-USD":0.12,"^FTSE":8200,"^N225":38500,"^STOXX50E":4980,
  // New Healthcare
  "ISRG":395,"DHR":235,"BSX":82,"MDT":79,"CVS":58,"CI":320,"HUM":365,
  "MRNA":105,"GILD":68,"AMGN":285,"BIIB":215,"REGN":1050,"VRTX":462,
  "ZTS":188,"SYK":342,"EW":88,
  // New Energy
  "EOG":128,"PXD":242,"MPC":178,"VLO":158,"PSX":148,"KMI":18,
  "WMB":36,"HAL":38,"DVN":45,"FANG":175,
  // New Finance
  "SCHW":76,"USB":44,"PNC":155,"TFC":38,"COF":148,"CB":258,
  "MMC":212,"AON":318,"ICE":148,"CME":225,"SPGI":448,"MCO":395,
  "FIS":62,"FISV":162,"SQ":72,"COIN":225,
  // New Consumer
  "TGT":148,"LOW":225,"TJX":112,"MO":42,"PM":98,"CL":98,
  "GIS":65,"K":56,"YUM":138,"CMG":3200,"LULU":332,"MDLZ":68,
  // New Media
  "CMCSA":42,"WBD":8,"TTD":112,
};

async function fetchYahooPrice(symbol) {
  const encoded = encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=5d`);
  for (const proxy of CORS_PROXIES) {
    try {
      const res = await fetch(proxy + encoded, { signal: AbortSignal.timeout(5000) });
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      if (!result) continue;
      const meta = result.meta;
      const price = meta.regularMarketPrice ?? meta.previousClose;
      const prev = meta.previousClose ?? meta.chartPreviousClose;
      const change = prev ? ((price - prev) / prev * 100) : 0;
      const closes = result.indicators?.quote?.[0]?.close?.filter(Boolean) ?? [];
      return { price: parseFloat(price?.toFixed(4) ?? 0), changePct: parseFloat(change.toFixed(2)), history: closes };
    } catch { continue; }
  }
  return null;
}

function sparkPath(history, w = 80, h = 32) {
  if (!history || history.length < 2) return "";
  const min = Math.min(...history), max = Math.max(...history);
  const range = max - min || 1;
  return history.map((v, i) => {
    const x = (i / (history.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function BigChartSVG({ history, color, symbol }) {
  if (!history || history.length < 2) return <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "#334" }}>Loading chart…</div>;
  const w = 500, h = 120, pad = 10;
  const min = Math.min(...history), max = Math.max(...history);
  const range = max - min || 1;
  const pts = history.map((v, i) => {
    const x = pad + (i / (history.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const linePts = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const fillPts = `${pts[0][0]},${h - pad} ` + linePts + ` ${pts[pts.length - 1][0]},${h - pad}`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`g${symbol}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#g${symbol})`} />
      <polyline points={linePts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function fmt(n) { return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }); }
function fmtPrice(n) {
  if (n >= 1000) return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 1) return Number(n).toFixed(2);
  return Number(n).toFixed(4);
}

const PRESET_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 1000000];

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [startingCash, setStartingCash] = useState(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [watchlist, setWatchlist] = useState(
    TICKER_LIBRARY.map(t => ({ ...t, price: FALLBACK_PRICES[t.symbol] ?? 100, changePct: 0, history: [], loading: true, error: false }))
  );
  const [cash, setCash] = useState(10000);
  const [portfolio, setPortfolio] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("market");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [qty, setQty] = useState("");
  const [notification, setNotification] = useState(null);
  const [addSearch, setAddSearch] = useState("");
  const [addResults, setAddResults] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [forecasting, setForecasting] = useState(false);
  const fetchQueue = useRef([]);
  const isFetching = useRef(false);

  const startGame = (amount) => {
    const a = parseFloat(amount);
    if (!a || a < 100) return;
    setStartingCash(a);
    setCash(a);
    setPortfolio({});
    setTransactions([]);
    setGameStarted(true);
  };

  const resetGame = () => {
    setCash(startingCash);
    setPortfolio({});
    setTransactions([]);
    setSelected(null);
    setShowReset(false);
    notify("Portfolio reset! Starting fresh.");
  };

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const runForecast = async () => {
    if (forecasting) return;
    setForecasting(true);
    setForecast(null);
    setTab("forecast");

    const positions = Object.entries(portfolio).map(([sym, h]) => {
      const st = watchlist.find(s => s.symbol === sym);
      const val = st ? st.price * h.shares : h.costBasis;
      const gain = val - h.costBasis;
      const gainPct = ((gain / h.costBasis) * 100).toFixed(2);
      const changePct = st?.changePct ?? 0;
      return `${sym} (${st?.name ?? sym}): ${h.shares.toFixed(4)} shares @ avg $${(h.costBasis/h.shares).toFixed(2)}, current $${st ? st.price.toFixed(2) : "?"}, unrealized P&L: ${gain >= 0 ? "+" : ""}$${Math.abs(gain).toFixed(2)} (${gainPct}%), today: ${changePct >= 0 ? "+" : ""}${changePct}%, category: ${st?.category ?? "?"}`;
    });

    const totalVal = cash + Object.entries(portfolio).reduce((s,[sym,h]) => {
      const st = watchlist.find(x => x.symbol === sym);
      return s + (st ? st.price * h.shares : h.costBasis);
    }, 0);
    const totalInv = Object.values(portfolio).reduce((s,h) => s + h.costBasis, 0);
    const totalGainAmt = totalVal - startingCash;
    const totalGainPctVal = ((totalGainAmt / startingCash) * 100).toFixed(2);
    const numTrades = transactions.length;
    const buys = transactions.filter(t => t.type === "BUY").length;
    const sells = transactions.filter(t => t.type === "SELL").length;

    const prompt = `You are a financial analyst AI for a virtual stock trading simulator called PaperMoney. Analyze this user's portfolio and provide a detailed, engaging forecast. Be specific, use numbers, and make it feel like a real analyst report. Use plain text only — no markdown, no asterisks, no bullet dashes, just clean sections with ALL CAPS headers.

PORTFOLIO SNAPSHOT:
- Starting capital: $${startingCash.toLocaleString()}
- Current net worth: $${totalVal.toFixed(2)}
- Cash on hand: $${cash.toFixed(2)}
- Total invested: $${totalInv.toFixed(2)}
- Overall gain/loss: ${totalGainAmt >= 0 ? "+" : ""}$${Math.abs(totalGainAmt).toFixed(2)} (${totalGainPctVal}%)
- Total trades made: ${numTrades} (${buys} buys, ${sells} sells)

CURRENT POSITIONS:
${positions.length > 0 ? positions.join("\n") : "No open positions — all cash."}

Please provide:

PORTFOLIO HEALTH SCORE
Give a score out of 100 and explain why.

DIVERSIFICATION ANALYSIS
Analyze how spread out the portfolio is across sectors and asset types. Is it too concentrated?

30-DAY FORECAST
Based on current holdings and market trends, predict realistic portfolio value in 30 days with a low, base, and high scenario in dollars.

90-DAY FORECAST
Same but for 90 days.

1-YEAR FORECAST
Project 1 year out with low/base/high scenarios.

BIGGEST RISKS
What are the top 3 risks in this portfolio right now?

TOP OPPORTUNITIES
What are 3 specific moves the user could make to improve their portfolio? Name specific stocks or ETFs.

ANALYST VERDICT
A 2-3 sentence overall verdict on this portfolio. Be honest — if it's bad, say so constructively.

Remember: this is a simulator, so be educational and engaging. Use real financial reasoning.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data?.content?.[0]?.text ?? "Could not generate forecast. Please try again.";
      setForecast(text);
    } catch (e) {
      setForecast("Network error — please try again.");
    }
    setForecasting(false);
  };

  // Queue-based fetcher to avoid rate limits
  const processQueue = useCallback(async () => {
    if (isFetching.current || fetchQueue.current.length === 0) return;
    isFetching.current = true;
    while (fetchQueue.current.length > 0) {
      const symbol = fetchQueue.current.shift();
      const data = await fetchYahooPrice(symbol);
      setWatchlist(prev => prev.map(t => {
        if (t.symbol !== symbol) return t;
        if (data) {
          return { ...t, price: data.price, changePct: data.changePct, history: data.history.length > 1 ? data.history : t.history, loading: false, error: false };
        } else {
          // Use fallback with small random walk
          const fb = FALLBACK_PRICES[symbol] ?? t.price;
          const walk = fb * (1 + (Math.random() - 0.5) * 0.002);
          return { ...t, price: parseFloat(walk.toFixed(4)), loading: false, error: true };
        }
      }));
      await new Promise(r => setTimeout(r, 350)); // rate limit spacing
    }
    isFetching.current = false;
  }, []);

  // Initial load
  useEffect(() => {
    fetchQueue.current = watchlist.map(t => t.symbol);
    processQueue();
  }, []);

  // Refresh prices every 60 seconds
  useEffect(() => {
    const id = setInterval(() => {
      fetchQueue.current = [...new Set([...fetchQueue.current, ...watchlist.map(t => t.symbol)])];
      processQueue();
    }, 60000);
    return () => clearInterval(id);
  }, [watchlist, processQueue]);

  // Simulate small price ticks for live feel between fetches
  useEffect(() => {
    const id = setInterval(() => {
      setWatchlist(prev => prev.map(t => {
        if (t.loading) return t;
        const nudge = t.price * (1 + (Math.random() - 0.5) * 0.0008);
        const newPrice = parseFloat(nudge.toFixed(4));
        const newHistory = t.history.length > 0 ? [...t.history.slice(-99), newPrice] : [newPrice];
        return { ...t, price: newPrice, history: newHistory };
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Add ticker search
  useEffect(() => {
    if (!addSearch.trim()) { setAddResults([]); return; }
    const q = addSearch.toLowerCase();
    const results = TICKER_LIBRARY.filter(t =>
      t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
    ).slice(0, 8);
    setAddResults(results);
  }, [addSearch]);

  const addToWatchlist = async (ticker) => {
    if (watchlist.find(t => t.symbol === ticker.symbol)) {
      notify(`${ticker.symbol} is already in your watchlist`, "error");
      return;
    }
    setLoadingAdd(true);
    const newTicker = { ...ticker, price: FALLBACK_PRICES[ticker.symbol] ?? 100, changePct: 0, history: [], loading: true, error: false };
    setWatchlist(prev => [...prev, newTicker]);
    fetchQueue.current.push(ticker.symbol);
    processQueue();
    setAddSearch(""); setAddResults([]); setLoadingAdd(false);
    notify(`Added ${ticker.symbol} to watchlist`);
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(prev => prev.filter(t => t.symbol !== symbol));
    if (selected?.symbol === symbol) setSelected(null);
  };

  const buy = () => {
    const n = parseFloat(qty);
    if (!selected || !n || n <= 0) return notify("Enter a valid quantity", "error");
    const stock = watchlist.find(s => s.symbol === selected.symbol);
    const cost = stock.price * n;
    if (cost > cash) return notify("Insufficient funds!", "error");
    setCash(c => parseFloat((c - cost).toFixed(4)));
    setPortfolio(p => {
      const ex = p[stock.symbol] || { shares: 0, costBasis: 0 };
      return { ...p, [stock.symbol]: { shares: parseFloat((ex.shares + n).toFixed(6)), costBasis: parseFloat((ex.costBasis + cost).toFixed(4)) } };
    });
    setTransactions(t => [{ type: "BUY", symbol: stock.symbol, name: stock.name, shares: n, price: stock.price, total: cost, time: new Date().toLocaleTimeString() }, ...t.slice(0, 99)]);
    notify(`✓ Bought ${n} share${n !== 1 ? "s" : ""} of ${stock.symbol} · $${fmtPrice(cost)}`);
    setQty("");
  };

  const sell = () => {
    const n = parseFloat(qty);
    if (!selected || !n || n <= 0) return notify("Enter a valid quantity", "error");
    const stock = watchlist.find(s => s.symbol === selected.symbol);
    const holding = portfolio[stock.symbol];
    if (!holding || holding.shares < n) return notify("Not enough shares!", "error");
    const revenue = stock.price * n;
    setCash(c => parseFloat((c + revenue).toFixed(4)));
    setPortfolio(p => {
      const newShares = parseFloat((holding.shares - n).toFixed(6));
      if (newShares < 0.000001) { const { [stock.symbol]: _, ...rest } = p; return rest; }
      const pct = n / holding.shares;
      return { ...p, [stock.symbol]: { shares: newShares, costBasis: parseFloat((holding.costBasis * (1 - pct)).toFixed(4)) } };
    });
    setTransactions(t => [{ type: "SELL", symbol: stock.symbol, name: stock.name, shares: n, price: stock.price, total: revenue, time: new Date().toLocaleTimeString() }, ...t.slice(0, 99)]);
    notify(`✓ Sold ${n} share${n !== 1 ? "s" : ""} of ${stock.symbol} · +$${fmtPrice(revenue)}`);
    setQty("");
  };

  const filteredWatchlist = watchlist.filter(t => {
    const matchCat = category === "All" || t.category === category;
    const matchSearch = search === "" || t.symbol.toLowerCase().includes(search.toLowerCase()) || t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectedStock = selected ? watchlist.find(s => s.symbol === selected.symbol) : null;
  const selectedHolding = selectedStock ? portfolio[selectedStock.symbol] : null;
  const totalPortfolioValue = watchlist.reduce((sum, s) => {
    const h = portfolio[s.symbol];
    return h ? sum + h.shares * s.price : sum;
  }, 0);
  const totalInvested = Object.values(portfolio).reduce((s, h) => s + h.costBasis, 0);
  const totalValue = cash + totalPortfolioValue;
  const totalGain = totalValue - startingCash;
  const totalGainPct = startingCash > 0 ? ((totalGain / startingCash) * 100) : 0;
  const todayGain = transactions
    .filter(tx => tx.time && tx.day === new Date().toDateString())
    .reduce((s, tx) => tx.type === "SELL" ? s + (tx.price - tx.avgCost) * tx.shares : s, 0);

  const catColor = (cat) => CATEGORY_COLORS[cat] || "#888";

  if (!gameStarted) {
    return (
      <div style={{ minHeight:"100vh", background:"#07090f", color:"#dde1ed", fontFamily:"'IBM Plex Mono', monospace", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Bebas+Neue&display=swap'); *{box-sizing:border-box;margin:0;padding:0} .preset:hover{background:#131a2a!important;border-color:#38bdf8!important;color:#38bdf8!important}`}</style>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:64, letterSpacing:".1em", color:"#38bdf8", lineHeight:1 }}>PAPERMONEY</div>
          <div style={{ fontSize:12, color:"#334", letterSpacing:".2em", marginTop:6 }}>VIRTUAL STOCK TRADING SIMULATOR</div>
        </div>
        <div style={{ background:"#0d1018", border:"1px solid #1a2030", borderRadius:6, padding:32, width:480, maxWidth:"90vw" }}>
          <div style={{ fontSize:11, color:"#445", letterSpacing:".12em", marginBottom:20, textAlign:"center" }}>HOW MUCH VIRTUAL CASH DO YOU WANT TO START WITH?</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:20 }}>
            {PRESET_AMOUNTS.map(amt => (
              <button key={amt} className="preset" onClick={() => setStartingCash(amt)}
                style={{ background: startingCash===amt ? "#0e1f35" : "#07090f", border:`1px solid ${startingCash===amt ? "#38bdf8" : "#1a2030"}`, color: startingCash===amt ? "#38bdf8" : "#556", padding:"10px 4px", borderRadius:4, cursor:"pointer", fontFamily:"'IBM Plex Mono', monospace", fontSize:11, transition:"all .15s" }}>
                {amt >= 1000000 ? "$1M" : amt >= 1000 ? `$${amt/1000}K` : `$${amt}`}
              </button>
            ))}
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:10, color:"#334", marginBottom:8, letterSpacing:".1em" }}>OR ENTER A CUSTOM AMOUNT</div>
            <input type="number" value={customAmount} onChange={e => { setCustomAmount(e.target.value); if(e.target.value) setStartingCash(parseFloat(e.target.value)); }}
              placeholder="e.g. 75000"
              style={{ width:"100%", background:"#07090f", border:"1px solid #1a2030", borderRadius:3, padding:"10px 12px", color:"#dde1ed", fontFamily:"inherit", fontSize:14 }} />
          </div>
          <div style={{ background:"#07090f", border:"1px solid #1a2030", borderRadius:4, padding:"14px 16px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ color:"#445", fontSize:11 }}>Starting Balance</span>
            <span style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:24, color:"#38bdf8", letterSpacing:".04em" }}>
              ${startingCash >= 1000000 ? (startingCash/1000000).toFixed(startingCash%1000000===0?0:2)+"M" : startingCash.toLocaleString("en-US")}
            </span>
          </div>
          <button onClick={() => startGame(startingCash)}
            style={{ width:"100%", background:"#38bdf8", color:"#07090f", border:"none", borderRadius:4, padding:"14px", fontFamily:"Bebas Neue, sans-serif", fontSize:18, letterSpacing:".1em", cursor:"pointer", transition:"background .15s" }}
            onMouseEnter={e=>e.currentTarget.style.background="#7dd3fc"}
            onMouseLeave={e=>e.currentTarget.style.background="#38bdf8"}>
            START TRADING →
          </button>
          <div style={{ marginTop:14, fontSize:10, color:"#223", textAlign:"center" }}>All money is virtual. No real money involved.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#07090f", color: "#dde1ed", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:#07090f}
        ::-webkit-scrollbar-thumb{background:#1e2535;border-radius:2px}
        input{outline:none}
        input[type=number]{-moz-appearance:textfield}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
        .row{display:grid;grid-template-columns:56px 1fr 72px 62px 72px 28px;align-items:center;gap:6px;padding:9px 14px;border-bottom:1px solid #0d1018;cursor:pointer;transition:background .12s}
        .row:hover{background:#0d1220}
        .row.active{background:#0e1425;border-left:2px solid #38bdf8}
        .tab{background:none;border:none;cursor:pointer;font-family:inherit;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:8px 14px;color:#334;border-bottom:2px solid transparent;transition:all .2s}
        .tab.on{color:#38bdf8;border-bottom-color:#38bdf8}
        .tab:not(.on):hover{color:#778}
        .btn{border:none;cursor:pointer;font-family:inherit;letter-spacing:.06em;font-size:11px;padding:10px 0;border-radius:3px;font-weight:600;transition:all .15s;width:100%}
        .btn-b{background:#38bdf8;color:#07090f}
        .btn-b:hover{background:#7dd3fc}
        .btn-s{background:transparent;color:#f87171;border:1px solid #f87171}
        .btn-s:hover{background:#f8717118}
        .pill{display:inline-block;padding:1px 7px;border-radius:20px;font-size:10px;font-weight:500}
        .catbtn{background:none;border:1px solid #1a2030;cursor:pointer;font-family:inherit;font-size:10px;padding:4px 10px;border-radius:20px;color:#445;transition:all .15s;white-space:nowrap}
        .catbtn.on{border-color:currentColor}
        .catbtn:not(.on):hover{border-color:#2a3045;color:#667}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .notif{animation:fadeUp .2s ease}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin 1s linear infinite;display:inline-block}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .live{animation:blink 2s infinite}
        .modal-overlay{position:fixed;inset:0;background:#000000aa;z-index:1000;display:flex;align-items:center;justify-content:center}
      `}</style>

      {/* Reset confirm modal */}
      {showReset && (
        <div className="modal-overlay" onClick={()=>setShowReset(false)}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#0d1018", border:"1px solid #1a2030", borderRadius:6, padding:28, width:360, textAlign:"center" }}>
            <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:22, color:"#f87171", letterSpacing:".06em", marginBottom:10 }}>RESET PORTFOLIO?</div>
            <div style={{ color:"#445", fontSize:12, marginBottom:24, lineHeight:1.7 }}>This will clear all your positions and transactions and reset your cash back to <span style={{color:"#38bdf8"}}>${startingCash.toLocaleString()}</span>.</div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setShowReset(false)} style={{ flex:1, background:"none", border:"1px solid #1a2030", color:"#556", padding:"10px", borderRadius:3, cursor:"pointer", fontFamily:"inherit", fontSize:12 }}>CANCEL</button>
              <button onClick={resetGame} style={{ flex:1, background:"#f87171", color:"#07090f", border:"none", padding:"10px", borderRadius:3, cursor:"pointer", fontFamily:"Bebas Neue, sans-serif", fontSize:16, letterSpacing:".06em" }}>RESET</button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="notif" style={{ position:"fixed", bottom:20, right:20, zIndex:9999, background: notification.type==="error" ? "#1a0a0a" : "#0a1a14", border:`1px solid ${notification.type==="error" ? "#f87171" : "#34d399"}`, color: notification.type==="error" ? "#f87171" : "#34d399", padding:"11px 18px", borderRadius:4, maxWidth:320, backdropFilter:"blur(8px)", fontSize:12 }}>
          {notification.msg}
        </div>
      )}

      {/* HEADER */}
      <div style={{ background:"#07090f", borderBottom:"1px solid #0d1018", padding:"8px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:24, letterSpacing:".1em", color:"#38bdf8", lineHeight:1 }}>PAPERMONEY</div>
        </div>

        {/* Stats bar */}
        <div style={{ display:"flex", gap:0, alignItems:"stretch", background:"#0d1018", border:"1px solid #1a2030", borderRadius:4, overflow:"hidden" }}>
          {[
            { label:"CASH", value:`$${Number(cash).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, color:"#dde1ed" },
            { label:"INVESTED", value:`$${Number(totalInvested).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, color:"#dde1ed" },
            { label:"NET WORTH", value:`$${Number(totalValue).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, color:"#dde1ed" },
            { label:"TOTAL GAIN/LOSS", value:`${totalGain>=0?"+":""}$${Math.abs(totalGain).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, sub:`${totalGainPct>=0?"+":""}${totalGainPct.toFixed(2)}%`, color: totalGain>=0?"#34d399":"#f87171" },
            { label:"UNREALIZED P&L", value:`${totalPortfolioValue-totalInvested>=0?"+":""}$${Math.abs(totalPortfolioValue-totalInvested).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, color: totalPortfolioValue-totalInvested>=0?"#34d399":"#f87171" },
          ].map((s,i) => (
            <div key={s.label} style={{ padding:"6px 14px", borderRight:"1px solid #1a2030", minWidth:130 }}>
              <div style={{ fontSize:9, color:"#334", letterSpacing:".1em" }}>{s.label}</div>
              <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:16, color:s.color, letterSpacing:".04em", lineHeight:1.2 }}>{s.value}</div>
              {s.sub && <div style={{ fontSize:10, color:s.color, opacity:.7 }}>{s.sub}</div>}
            </div>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div className="live" style={{ width:6, height:6, borderRadius:"50%", background:"#34d399" }} />
            <span style={{ fontSize:9, color:"#34d399", letterSpacing:".12em" }}>LIVE</span>
          </div>
          <button onClick={()=>setShowReset(true)} style={{ background:"none", border:"1px solid #2a1a1a", color:"#554", borderRadius:3, padding:"5px 10px", cursor:"pointer", fontFamily:"inherit", fontSize:10, letterSpacing:".08em", transition:"all .15s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#f87171";e.currentTarget.style.color="#f87171"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a1a1a";e.currentTarget.style.color="#554"}}>
            RESET
          </button>
          <button onClick={()=>{ setGameStarted(false); setCustomAmount(""); }} style={{ background:"none", border:"1px solid #1a2030", color:"#445", borderRadius:3, padding:"5px 10px", cursor:"pointer", fontFamily:"inherit", fontSize:10, letterSpacing:".08em", transition:"all .15s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#38bdf8";e.currentTarget.style.color="#38bdf8"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a2030";e.currentTarget.style.color="#445"}}>
            NEW GAME
          </button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", height:"calc(100vh - 53px)" }}>

        {/* LEFT */}
        <div style={{ display:"flex", flexDirection:"column", overflow:"hidden", borderRight:"1px solid #0d1018" }}>

          {/* Tabs */}
          <div style={{ borderBottom:"1px solid #0d1018", padding:"0 12px", display:"flex", gap:2, flexShrink:0 }}>
            {["market","portfolio","history","forecast"].map(t => <button key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={t==="forecast"?{color:tab==="forecast"?"#a78bfa":"#445",borderBottomColor:tab==="forecast"?"#a78bfa":"transparent"}:{}}>{t==="forecast"?"🤖 AI FORECAST":t}</button>)}
          </div>

          {tab === "market" && (
            <>
              {/* Search + Add */}
              <div style={{ padding:"10px 14px", borderBottom:"1px solid #0d1018", display:"flex", gap:8, flexShrink:0 }}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search watchlist..." style={{ flex:1, background:"#0d1018", border:"1px solid #1a2030", borderRadius:3, padding:"7px 10px", color:"#dde1ed", fontFamily:"inherit", fontSize:12 }} />
                <div style={{ position:"relative" }}>
                  <input value={addSearch} onChange={e=>setAddSearch(e.target.value)} placeholder="+ Add ticker..." style={{ width:140, background:"#0d1018", border:"1px solid #1a2030", borderRadius:3, padding:"7px 10px", color:"#38bdf8", fontFamily:"inherit", fontSize:12 }} />
                  {addResults.length > 0 && (
                    <div style={{ position:"absolute", top:"100%", left:0, right:0, background:"#0d1220", border:"1px solid #1a2535", borderRadius:3, zIndex:500, marginTop:2 }}>
                      {addResults.map(r => (
                        <div key={r.symbol} onClick={()=>addToWatchlist(r)} style={{ padding:"8px 12px", cursor:"pointer", borderBottom:"1px solid #0d1018", display:"flex", justifyContent:"space-between", alignItems:"center" }}
                          onMouseEnter={e=>e.currentTarget.style.background="#131a2a"}
                          onMouseLeave={e=>e.currentTarget.style.background=""}>
                          <div>
                            <span style={{ color:"#38bdf8", fontWeight:600 }}>{r.symbol}</span>
                            <span style={{ color:"#445", marginLeft:8, fontSize:11 }}>{r.name.slice(0,22)}</span>
                          </div>
                          <span style={{ fontSize:10, color: catColor(r.category) }}>{r.category}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Category filter */}
              <div style={{ padding:"8px 14px", borderBottom:"1px solid #0d1018", display:"flex", gap:6, overflowX:"auto", flexShrink:0 }}>
                {CATEGORIES.map(c => (
                  <button key={c} className={`catbtn ${category===c?"on":""}`}
                    style={{ color: category===c ? catColor(c) : undefined }}
                    onClick={()=>setCategory(c)}>{c}</button>
                ))}
              </div>

              {/* Table header */}
              <div className="row" style={{ color:"#334", fontSize:10, letterSpacing:".1em", cursor:"default", paddingTop:6, paddingBottom:6 }}>
                <div>SYM</div><div>NAME</div><div style={{textAlign:"right"}}>PRICE</div><div style={{textAlign:"right"}}>CHG%</div><div style={{textAlign:"right"}}>TREND</div><div/>
              </div>

              {/* Rows */}
              <div style={{ flex:1, overflowY:"auto" }}>
                {filteredWatchlist.length === 0 && (
                  <div style={{ padding:40, textAlign:"center", color:"#223" }}>No results.</div>
                )}
                {filteredWatchlist.map(s => (
                  <div key={s.symbol} className={`row ${selected?.symbol===s.symbol?"active":""}`} onClick={()=>setSelected(s)}>
                    <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:14, color: selected?.symbol===s.symbol ? "#38bdf8" : catColor(s.category), letterSpacing:".04em" }}>{s.symbol.replace("^","")}</div>
                    <div style={{ color:"#556", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</div>
                    <div style={{ textAlign:"right", fontWeight:500, color: s.loading ? "#334" : "#dde1ed" }}>
                      {s.loading ? <span className="spin">◌</span> : `$${fmtPrice(s.price)}`}
                    </div>
                    <div style={{ textAlign:"right" }}>
                      {!s.loading && (
                        <span className="pill" style={{ background: s.changePct >= 0 ? "#34d39915" : "#f8717115", color: s.changePct >= 0 ? "#34d399" : "#f87171" }}>
                          {s.changePct >= 0 ? "+" : ""}{s.changePct}%
                        </span>
                      )}
                    </div>
                    <div style={{ display:"flex", justifyContent:"flex-end" }}>
                      {s.history.length > 1 && (
                        <svg width="72" height="28">
                          <path d={sparkPath(s.history.slice(-20), 72, 28)} fill="none" stroke={s.changePct >= 0 ? "#34d399" : "#f87171"} strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>
                    <div onClick={e=>{e.stopPropagation();removeFromWatchlist(s.symbol)}} style={{ color:"#223", cursor:"pointer", textAlign:"center", fontSize:14 }}
                      onMouseEnter={e=>e.currentTarget.style.color="#f87171"}
                      onMouseLeave={e=>e.currentTarget.style.color="#223"}>×</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "portfolio" && (
            <div style={{ flex:1, overflowY:"auto" }}>
              {/* Big P&L banner */}
              <div style={{ padding:"20px", background: totalGain >= 0 ? "#0a1a0f" : "#1a0a0a", borderBottom:"1px solid #0d1018", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:10, color:"#334", letterSpacing:".1em", marginBottom:4 }}>TOTAL RETURN vs STARTING ${startingCash.toLocaleString()}</div>
                  <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:40, letterSpacing:".04em", color: totalGain>=0?"#34d399":"#f87171", lineHeight:1 }}>
                    {totalGain>=0?"+":"−"}${Math.abs(totalGain).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
                  </div>
                  <div style={{ fontSize:14, color: totalGain>=0?"#34d39988":"#f8717188", marginTop:2 }}>
                    {totalGainPct>=0?"+":""}{totalGainPct.toFixed(2)}% overall
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:10, color:"#334", letterSpacing:".1em", marginBottom:4 }}>UNREALIZED P&L</div>
                  <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:28, color: totalPortfolioValue-totalInvested>=0?"#34d399":"#f87171" }}>
                    {totalPortfolioValue-totalInvested>=0?"+":"−"}${Math.abs(totalPortfolioValue-totalInvested).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
                  </div>
                  <div style={{ fontSize:11, color:"#445", marginTop:2 }}>on open positions</div>
                </div>
              </div>
              {/* Summary cards */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"#0d1018" }}>
                {[
                  { l:"CASH", v:`$${Number(cash).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, c:"#dde1ed" },
                  { l:"INVESTED", v:`$${Number(totalInvested).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, c:"#dde1ed" },
                  { l:"NET WORTH", v:`$${Number(totalValue).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, c:"#38bdf8" },
                ].map(card => (
                  <div key={card.l} style={{ background:"#07090f", padding:"12px 16px" }}>
                    <div style={{ fontSize:9, color:"#334", letterSpacing:".1em", marginBottom:4 }}>{card.l}</div>
                    <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:18, color:card.c, letterSpacing:".04em" }}>{card.v}</div>
                  </div>
                ))}
              </div>
              {Object.keys(portfolio).length === 0 ? (
                <div style={{ padding:40, textAlign:"center", color:"#223" }}>
                  <div style={{ fontSize:36, marginBottom:10 }}>📊</div>
                  <div>No positions yet. Go buy some stocks!</div>
                </div>
              ) : (
                <>
                  <div style={{ display:"grid", gridTemplateColumns:"64px 1fr 64px 72px 72px 80px", gap:6, padding:"7px 14px", color:"#334", fontSize:10, letterSpacing:".1em", borderBottom:"1px solid #0d1018" }}>
                    <div>SYMBOL</div><div>NAME</div><div style={{textAlign:"right"}}>SHARES</div><div style={{textAlign:"right"}}>AVG COST</div><div style={{textAlign:"right"}}>VALUE</div><div style={{textAlign:"right"}}>GAIN/LOSS</div>
                  </div>
                  {Object.entries(portfolio).map(([sym, h]) => {
                    const st = watchlist.find(s => s.symbol === sym);
                    if (!st) return null;
                    const val = st.price * h.shares;
                    const gain = val - h.costBasis;
                    const gainPct = ((gain / h.costBasis) * 100).toFixed(2);
                    return (
                      <div key={sym} onClick={()=>{setSelected(st);setTab("market")}}
                        style={{ display:"grid", gridTemplateColumns:"64px 1fr 64px 72px 72px 80px", gap:6, padding:"10px 14px", borderBottom:"1px solid #0d1018", cursor:"pointer", alignItems:"center" }}
                        onMouseEnter={e=>e.currentTarget.style.background="#0d1018"}
                        onMouseLeave={e=>e.currentTarget.style.background=""}>
                        <div style={{ fontFamily:"Bebas Neue, sans-serif", color: catColor(st.category), fontSize:13 }}>{sym.replace("^","")}</div>
                        <div style={{ color:"#556", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{st.name}</div>
                        <div style={{ textAlign:"right" }}>{h.shares.toFixed(4)}</div>
                        <div style={{ textAlign:"right", color:"#556" }}>${fmtPrice(h.costBasis/h.shares)}</div>
                        <div style={{ textAlign:"right" }}>${fmtPrice(val)}</div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ color: gain >= 0 ? "#34d399" : "#f87171", fontWeight:500 }}>{gain>=0?"+":"−"}${fmtPrice(Math.abs(gain))}</div>
                          <div style={{ fontSize:10, color: gain >= 0 ? "#34d39966" : "#f8717166" }}>{gain>=0?"+":""}{gainPct}%</div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {tab === "history" && (
            <div style={{ flex:1, overflowY:"auto" }}>
              {transactions.length === 0 ? (
                <div style={{ padding:40, textAlign:"center", color:"#223" }}>
                  <div style={{ fontSize:36, marginBottom:10 }}>📋</div>
                  <div>No transactions yet.</div>
                </div>
              ) : (
                <>
                  <div style={{ display:"grid", gridTemplateColumns:"42px 56px 1fr 60px 68px 72px", gap:6, padding:"7px 14px", color:"#334", fontSize:10, letterSpacing:".1em", borderBottom:"1px solid #0d1018" }}>
                    <div>TYPE</div><div>SYM</div><div>NAME</div><div style={{textAlign:"right"}}>SHARES</div><div style={{textAlign:"right"}}>PRICE</div><div style={{textAlign:"right"}}>TIME</div>
                  </div>
                  {transactions.map((tx, i) => (
                    <div key={i} style={{ display:"grid", gridTemplateColumns:"42px 56px 1fr 60px 68px 72px", gap:6, padding:"9px 14px", borderBottom:"1px solid #0d1018", alignItems:"center" }}>
                      <div><span className="pill" style={{ background: tx.type==="BUY" ? "#34d39915" : "#f8717115", color: tx.type==="BUY" ? "#34d399" : "#f87171" }}>{tx.type}</span></div>
                      <div style={{ fontFamily:"Bebas Neue, sans-serif", color:"#38bdf8", fontSize:13 }}>{tx.symbol.replace("^","")}</div>
                      <div style={{ color:"#445", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{tx.name}</div>
                      <div style={{ textAlign:"right" }}>{tx.shares}</div>
                      <div style={{ textAlign:"right", color:"#778" }}>${fmtPrice(tx.price)}</div>
                      <div style={{ textAlign:"right", color:"#334" }}>{tx.time}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {tab === "forecast" && (
            <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}>
              {/* Header */}
              <div style={{ padding:"20px", background:"#0d0a1a", borderBottom:"1px solid #1a1030" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div>
                    <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:22, color:"#a78bfa", letterSpacing:".08em" }}>🤖 AI PORTFOLIO FORECAST</div>
                    <div style={{ fontSize:11, color:"#445", marginTop:2 }}>Powered by Claude AI · Analyzes your actual holdings</div>
                  </div>
                  <button onClick={runForecast} disabled={forecasting}
                    style={{ background: forecasting ? "#1a1030" : "#a78bfa", color: forecasting ? "#445" : "#07090f", border:"none", borderRadius:4, padding:"10px 20px", fontFamily:"Bebas Neue, sans-serif", fontSize:15, letterSpacing:".08em", cursor: forecasting ? "not-allowed" : "pointer", transition:"all .2s", minWidth:140 }}>
                    {forecasting ? "ANALYZING..." : forecast ? "RE-ANALYZE" : "RUN FORECAST"}
                  </button>
                </div>
                {/* What it analyzes */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginTop:12 }}>
                  {[
                    { icon:"📊", label:"Portfolio Health", desc:"Score out of 100" },
                    { icon:"📈", label:"30/90/365 Day", desc:"Price scenarios" },
                    { icon:"⚠️", label:"Risk Analysis", desc:"Top threats identified" },
                    { icon:"💡", label:"AI Suggestions", desc:"Specific stock picks" },
                  ].map(c => (
                    <div key={c.label} style={{ background:"#07090f", border:"1px solid #1a1030", borderRadius:4, padding:"10px 12px" }}>
                      <div style={{ fontSize:16, marginBottom:4 }}>{c.icon}</div>
                      <div style={{ fontSize:11, color:"#a78bfa", fontWeight:500 }}>{c.label}</div>
                      <div style={{ fontSize:10, color:"#334", marginTop:2 }}>{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loading state */}
              {forecasting && (
                <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:40 }}>
                  <div style={{ width:48, height:48, border:"3px solid #1a1030", borderTop:"3px solid #a78bfa", borderRadius:"50%", animation:"spin 1s linear infinite" }} />
                  <div style={{ color:"#a78bfa", fontSize:13, letterSpacing:".1em" }}>ANALYZING YOUR PORTFOLIO...</div>
                  <div style={{ color:"#334", fontSize:11, textAlign:"center", maxWidth:280, lineHeight:1.8 }}>
                    Claude is reviewing your positions, diversification, risk exposure, and market trends to generate your forecast.
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!forecasting && !forecast && (
                <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, padding:40, color:"#1a1030" }}>
                  <div style={{ fontSize:52 }}>🔮</div>
                  <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:24, color:"#2a1a4a", letterSpacing:".08em" }}>YOUR FORECAST AWAITS</div>
                  <div style={{ color:"#2a2040", textAlign:"center", maxWidth:300, lineHeight:1.7, fontSize:12 }}>
                    {Object.keys(portfolio).length === 0
                      ? "Buy some stocks first, then come back here to get your AI forecast."
                      : "Click RUN FORECAST above to get a full AI analysis of your portfolio including growth predictions, risk assessment, and personalized recommendations."}
                  </div>
                </div>
              )}

              {/* Forecast result */}
              {!forecasting && forecast && (() => {
                // Parse sections from the AI response
                const sections = [];
                const lines = forecast.split("\n");
                let current = null;
                for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed) continue;
                  // Detect ALL CAPS headers
                  if (trimmed === trimmed.toUpperCase() && trimmed.length > 4 && /^[A-Z0-9 /&-]+$/.test(trimmed)) {
                    if (current) sections.push(current);
                    current = { header: trimmed, lines: [] };
                  } else if (current) {
                    current.lines.push(trimmed);
                  } else {
                    sections.push({ header: null, lines: [trimmed] });
                  }
                }
                if (current) sections.push(current);

                const sectionIcons = {
                  "PORTFOLIO HEALTH SCORE": "💯",
                  "DIVERSIFICATION ANALYSIS": "🥧",
                  "30-DAY FORECAST": "📅",
                  "90-DAY FORECAST": "🗓️",
                  "1-YEAR FORECAST": "📆",
                  "BIGGEST RISKS": "⚠️",
                  "TOP OPPORTUNITIES": "💡",
                  "ANALYST VERDICT": "🎯",
                };
                const sectionColors = {
                  "PORTFOLIO HEALTH SCORE": "#38bdf8",
                  "DIVERSIFICATION ANALYSIS": "#f472b6",
                  "30-DAY FORECAST": "#34d399",
                  "90-DAY FORECAST": "#34d399",
                  "1-YEAR FORECAST": "#34d399",
                  "BIGGEST RISKS": "#f87171",
                  "TOP OPPORTUNITIES": "#fbbf24",
                  "ANALYST VERDICT": "#a78bfa",
                };

                return (
                  <div style={{ padding:20, display:"flex", flexDirection:"column", gap:14 }}>
                    <div style={{ fontSize:10, color:"#334", letterSpacing:".1em", marginBottom:4 }}>
                      ANALYSIS GENERATED {new Date().toLocaleDateString()} · FOR EDUCATIONAL PURPOSES ONLY
                    </div>
                    {sections.map((sec, i) => (
                      <div key={i} style={{ background:"#0a0c14", border:`1px solid ${sectionColors[sec.header] ? sectionColors[sec.header]+"22" : "#1a2030"}`, borderRadius:4, padding:"14px 16px", borderLeft:`3px solid ${sectionColors[sec.header] ?? "#334"}` }}>
                        {sec.header && (
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                            <span style={{ fontSize:16 }}>{sectionIcons[sec.header] ?? "📌"}</span>
                            <span style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:14, color: sectionColors[sec.header] ?? "#778", letterSpacing:".08em" }}>{sec.header}</span>
                          </div>
                        )}
                        <div style={{ color:"#aab", fontSize:12, lineHeight:1.8 }}>
                          {sec.lines.map((l, j) => <div key={j}>{l}</div>)}
                        </div>
                      </div>
                    ))}
                    <div style={{ fontSize:10, color:"#223", textAlign:"center", padding:"8px 0 4px" }}>
                      ⚠️ AI forecasts are for simulation purposes only. Not real financial advice.
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* RIGHT — Trade Panel */}
        <div style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {selectedStock ? (
            <>
              {/* Stock info */}
              <div style={{ padding:"16px 18px", borderBottom:"1px solid #0d1018", flexShrink:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                  <div>
                    <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:28, color: catColor(selectedStock.category), letterSpacing:".06em", lineHeight:1 }}>{selectedStock.symbol.replace("^","")}</div>
                    <div style={{ color:"#445", marginTop:2, fontSize:11 }}>{selectedStock.name}</div>
                    <div style={{ marginTop:6, display:"flex", gap:6, alignItems:"center" }}>
                      <span className="pill" style={{ background: catColor(selectedStock.category)+"18", color: catColor(selectedStock.category) }}>{selectedStock.category}</span>
                      {selectedStock.error && <span style={{ fontSize:10, color:"#445" }}>· simulated</span>}
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:28, letterSpacing:".04em" }}>${fmtPrice(selectedStock.price)}</div>
                    <div style={{ color: selectedStock.changePct >= 0 ? "#34d399" : "#f87171", fontSize:13 }}>
                      {selectedStock.changePct >= 0 ? "▲" : "▼"} {Math.abs(selectedStock.changePct)}%
                    </div>
                  </div>
                </div>
                <div style={{ marginTop:10 }}>
                  <BigChartSVG history={selectedStock.history} color={selectedStock.changePct >= 0 ? "#34d399" : "#f87171"} symbol={selectedStock.symbol} />
                </div>
                {selectedStock.history.length > 1 && (
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:4, color:"#334", fontSize:10 }}>
                    <span>Low ${fmtPrice(Math.min(...selectedStock.history))}</span>
                    <span>High ${fmtPrice(Math.max(...selectedStock.history))}</span>
                  </div>
                )}
              </div>

              {/* Holding */}
              {selectedHolding && (
                <div style={{ padding:"10px 18px", background: (selectedStock.price*selectedHolding.shares - selectedHolding.costBasis) >= 0 ? "#0a1a0f" : "#1a0a0a", borderBottom:"1px solid #0d1018", flexShrink:0 }}>
                  <div style={{ fontSize:9, color:"#334", letterSpacing:".1em", marginBottom:8 }}>YOUR POSITION</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {[
                      { l:"Shares", v: selectedHolding.shares.toFixed(6) },
                      { l:"Mkt Value", v:`$${fmtPrice(selectedStock.price * selectedHolding.shares)}` },
                      { l:"Cost Basis", v:`$${fmtPrice(selectedHolding.costBasis)}` },
                      { l:"Gain / Loss", v:`${(selectedStock.price*selectedHolding.shares-selectedHolding.costBasis)>=0?"+":"−"}$${fmtPrice(Math.abs(selectedStock.price*selectedHolding.shares-selectedHolding.costBasis))}  (${(((selectedStock.price*selectedHolding.shares-selectedHolding.costBasis)/selectedHolding.costBasis)*100).toFixed(2)}%)`, c: (selectedStock.price*selectedHolding.shares-selectedHolding.costBasis)>=0?"#34d399":"#f87171" },
                    ].map(it => (
                      <div key={it.l}>
                        <div style={{ color:"#334", fontSize:10 }}>{it.l}</div>
                        <div style={{ color: it.c || "#dde1ed", fontSize:12, fontWeight:500 }}>{it.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trade */}
              <div style={{ padding:"16px 18px", flex:1, overflowY:"auto" }}>
                <div style={{ fontSize:9, color:"#334", letterSpacing:".1em", marginBottom:10 }}>PLACE ORDER</div>
                <div style={{ marginBottom:10 }}>
                  <div style={{ fontSize:10, color:"#445", marginBottom:5 }}>Number of Shares</div>
                  <input type="number" min="0.0001" step="1" value={qty} onChange={e=>setQty(e.target.value)} placeholder="0"
                    style={{ width:"100%", background:"#0d1018", border:"1px solid #1a2030", borderRadius:3, padding:"10px 12px", color:"#dde1ed", fontFamily:"inherit", fontSize:15 }} />
                </div>
                {qty && parseFloat(qty) > 0 && (
                  <div style={{ background:"#0a0c14", padding:"8px 12px", borderRadius:3, marginBottom:12, display:"flex", justifyContent:"space-between", fontSize:12 }}>
                    <span style={{ color:"#445" }}>Est. Total</span>
                    <span>${fmtPrice(selectedStock.price * parseFloat(qty))}</span>
                  </div>
                )}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                  <button className="btn btn-b" onClick={buy}>BUY</button>
                  <button className="btn btn-s" onClick={sell}>SELL</button>
                </div>
                <div style={{ background:"#0a0c14", padding:"10px 12px", borderRadius:3, marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ color:"#334", fontSize:10 }}>Cash Available</span>
                    <span style={{ color:"#34d399" }}>${Number(cash).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ color:"#334", fontSize:10 }}>Max Shares You Can Buy</span>
                    <span>{Math.floor(cash / selectedStock.price).toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ fontSize:9, color:"#223", letterSpacing:".1em", marginBottom:7 }}>QUICK BUY</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:5 }}>
                  {[100,500,1000,5000].filter(amt => amt <= cash * 1.1).map(amt => (
                    <button key={amt} onClick={()=>setQty((amt/selectedStock.price).toFixed(6))}
                      style={{ background:"#0d1018", border:"1px solid #1a2030", color:"#556", padding:"7px 4px", borderRadius:3, cursor:"pointer", fontFamily:"inherit", fontSize:10, transition:"all .15s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor="#38bdf844"; e.currentTarget.style.color="#38bdf8"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor="#1a2030"; e.currentTarget.style.color="#556"; }}>
                      ${amt >= 1000 ? amt/1000+"k" : amt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", color:"#1a2030", gap:10 }}>
              <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:48, color:"#1a2535", letterSpacing:".1em" }}>TRADE</div>
              <div style={{ color:"#223", textAlign:"center", maxWidth:180, lineHeight:1.6 }}>Select any asset from the market list to view its chart and place trades</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}