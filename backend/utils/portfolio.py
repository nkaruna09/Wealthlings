from datetime import datetime
from .stock_utils import get_stock_data, assign_personality, calculate_creature_level, check_market_storm, calculate_diversification_shield

creatures_db = {}
user_portfolios = {}


def create_or_update_creature(user_id, ticker, stock_data):
    creature_id = f"{user_id}_{ticker}"
    personality = assign_personality(stock_data['sector'], stock_data['market_cap'])

    if creature_id in creatures_db:
        creature = creatures_db[creature_id]
        creature['scan_count'] += 1
        creature['confidence'] = stock_data['confidence']
        creature['level'] = calculate_creature_level(creature['scan_count'], creature['confidence'])
        creature['last_scanned'] = datetime.now().isoformat()
        is_new = False
    else:
        creature = {
            'id': creature_id,
            'ticker': ticker,
            'name': stock_data['company_name'].split()[0][:15],
            'company_name': stock_data['company_name'],
            'sector': stock_data['sector'],
            'personality': personality,
            'personality_emoji': personality,  # placeholder
            'confidence': stock_data['confidence'],
            'level': 1,
            'scan_count': 1,
            'created_at': datetime.now().isoformat(),
            'last_scanned': datetime.now().isoformat(),
            'current_price': stock_data['current_price'],
            'change_percent': stock_data['change_percent']
        }
        creatures_db[creature_id] = creature
        is_new = True

    if user_id not in user_portfolios:
        user_portfolios[user_id] = {}
    user_portfolios[user_id][creature_id] = creature
    return creature, is_new


def heal_creature(creature_id):
    if creature_id not in creatures_db:
        return None
    creature = creatures_db[creature_id]
    creature['confidence'] = min(100, creature['confidence'] + 10)
    creature['last_healed'] = datetime.now().isoformat()
    return creature


def sell_creature(creature_id):
    if creature_id not in creatures_db:
        return None, None, None
    creature = creatures_db[creature_id]
    is_storm, severity = check_market_storm(creature['sector'])
    penalty = creature['level'] * 10 if is_storm else 0
    value = max(0, creature['scan_count'] * 100 - penalty)
    warning = f"⚠️ Selling during Market Storm! You'll lose {penalty} XP." if is_storm else None

    user_id = creature_id.split('_')[0]
    del creatures_db[creature_id]
    if user_id in user_portfolios and creature_id in user_portfolios[user_id]:
        del user_portfolios[user_id][creature_id]

    return creature, value, warning
