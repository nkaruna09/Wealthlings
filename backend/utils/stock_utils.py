import yfinance as yf
from datetime import datetime

# Creature personalities and sector mappings
CREATURE_PERSONALITIES = {
    'Steady Guardian': {'emoji': '🐢', 'volatility': 0.3, 'resilience': 0.9},
    'Trend Chaser': {'emoji': '🦊', 'volatility': 0.8, 'resilience': 0.4},
    'Giant': {'emoji': '🐘', 'volatility': 0.2, 'resilience': 0.95},
    'Sprinter': {'emoji': '🐦', 'volatility': 0.9, 'resilience': 0.3},
    'Diversifier': {'emoji': '🐙', 'volatility': 0.4, 'resilience': 0.7}
}

SECTOR_PERSONALITY_MAP = {
    'Consumer Defensive': 'Steady Guardian',
    'Utilities': 'Steady Guardian',
    'Healthcare': 'Steady Guardian',
    'Technology': 'Sprinter',
    'Communication Services': 'Trend Chaser',
    'Consumer Cyclical': 'Sprinter',
    'Financial Services': 'Giant',
    'Energy': 'Giant',
    'Basic Materials': 'Giant',
    'Industrials': 'Giant',
    'Real Estate': 'Steady Guardian'
}

# Brand to ticker mapping
BRAND_TICKER_MAP = {
    # Tech
    'Apple': 'AAPL',
    'Microsoft': 'MSFT',
    'Google': 'GOOGL',
    'Alphabet': 'GOOGL',
    'Amazon': 'AMZN',
    'Meta': 'META',
    'Facebook': 'META',
    'Netflix': 'NFLX',
    'Tesla': 'TSLA',
    'Sony': 'SONY',
    'Nintendo': 'NTDOY',
    'Samsung': 'SSNLF',
    'Intel': 'INTC',
    'AMD': 'AMD',
    'NVIDIA': 'NVDA',
    'Nvidia': 'NVDA',
    
    # Gaming
    'Roblox': 'RBLX',
    'Electronic Arts': 'EA',
    'EA': 'EA',
    'Activision': 'ATVI',
    'Unity': 'U',
    
    # Streaming & Entertainment
    'Spotify': 'SPOT',
    'Disney': 'DIS',
    'Warner Bros': 'WBD',
    'Paramount': 'PARA',
    
    # Food & Beverage
    'McDonald\'s': 'MCD',
    'McDonalds': 'MCD',
    'Coca-Cola': 'KO',
    'Coca Cola': 'KO',
    'Pepsi': 'PEP',
    'PepsiCo': 'PEP',
    'Starbucks': 'SBUX',
    'Chipotle': 'CMG',
    'Yum Brands': 'YUM',
    'Domino\'s': 'DPZ',
    'Dominos': 'DPZ',
    'Doritos': 'PEP',
    'Wendy\'s': 'WEN',
    'General Mills': 'GIS',
    'Kellogg': 'K',
    'Kraft Heinz': 'KHC',
    'Mondelez': 'MDLZ',
    'Nestle': 'NSRGY',
    
    # Retail
    'Walmart': 'WMT',
    'Target': 'TGT',
    'Costco': 'COST',
    'Home Depot': 'HD',
    'Lowe\'s': 'LOW',
    'Best Buy': 'BBY',
    
    # Apparel & Fashion
    'Nike': 'NKE',
    'Adidas': 'ADDYY',
    'Lululemon': 'LULU',
    'Gap': 'GPS',
    'Ralph Lauren': 'RL',
    'Under Armour': 'UAA',
    
    # Automotive
    'Ford': 'F',
    'General Motors': 'GM',
    'GM': 'GM',
    'Toyota': 'TM',
    'Honda': 'HMC',
    
    # Other
    'LEGO': 'LEGO.CO',  # May need special handling
    'Mattel': 'MAT',
    'Hasbro': 'HAS',
    'Johnson & Johnson': 'JNJ',
    'Procter & Gamble': 'PG',
    'P&G': 'PG',
    'Visa': 'V',
    'Mastercard': 'MA',
    'PayPal': 'PYPL',
    'Square': 'SQ'
}


def get_stock_ticker(brand_name: str):
    for brand, ticker in BRAND_TICKER_MAP.items():
        if brand.lower() in brand_name.lower():
            return ticker
    try:
        ticker_obj = yf.Ticker(brand_name.upper())
        info = ticker_obj.info
        if 'symbol' in info:
            return info['symbol']
    except:
        pass
    return None


def get_stock_data(ticker: str):
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        hist = stock.history(period="1mo")
        if hist.empty:
            raise Exception("No historical data available")

        start_price = hist['Close'].iloc[0]
        current_price = hist['Close'].iloc[-1]
        change_percent = ((current_price - start_price) / start_price) * 100
        volatility = hist['Close'].pct_change().std() * 100
        confidence = min(100, max(0, 50 + change_percent * 2))
        sector = info.get('sector', 'Unknown')

        return {
            'ticker': ticker,
            'company_name': info.get('longName', ticker),
            'sector': sector,
            'current_price': current_price,
            'change_percent': change_percent,
            'confidence': round(confidence, 1),
            'volatility': round(volatility, 2),
            'market_cap': info.get('marketCap', 0)
        }
    except Exception as e:
        raise Exception(f"Error fetching stock data: {str(e)}")


def assign_personality(sector, market_cap):
    personality = SECTOR_PERSONALITY_MAP.get(sector, 'Trend Chaser')
    if market_cap and market_cap > 500_000_000_000:
        personality = 'Giant'
    return personality


def calculate_creature_level(scan_count, confidence):
    base_level = min(scan_count, 20)
    confidence_bonus = confidence / 20
    level = int(base_level + confidence_bonus)
    return max(1, min(level, 50))


def check_market_storm(sector):
    sector_etf_map = {
        'Technology': 'XLK',
        'Healthcare': 'XLV',
        'Financial Services': 'XLF',
        'Consumer Cyclical': 'XLY',
        'Consumer Defensive': 'XLP',
        'Energy': 'XLE',
        'Utilities': 'XLU',
        'Real Estate': 'XLRE',
        'Basic Materials': 'XLB',
        'Communication Services': 'XLC',
        'Industrials': 'XLI'
    }
    try:
        etf_ticker = sector_etf_map.get(sector)
        if not etf_ticker:
            return False, 0

        etf = yf.Ticker(etf_ticker)
        hist = etf.history(period="2d")
        if len(hist) < 2:
            return False, 0

        today_close = hist['Close'].iloc[-1]
        yesterday_close = hist['Close'].iloc[-2]
        change = ((today_close - yesterday_close) / yesterday_close) * 100
        is_storm = change < -1
        return is_storm, round(abs(change) if is_storm else 0, 2)
    except:
        return False, 0


def calculate_diversification_shield(user_creatures):
    if len(user_creatures) <= 1:
        return 0
    sectors = set([c['sector'] for c in user_creatures.values()])
    return round(min(100, (len(sectors) / 5) * 100), 1)
