from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from datetime import datetime

import yfinance as yf
from apscheduler.schedulers.background import BackgroundScheduler
import atexit

from dotenv import load_dotenv
load_dotenv()
# -------------------- Local modules -------------------- #
from utils.logo_detector import detect_logo
from utils.stock_utils import (
    get_stock_ticker,
    get_stock_data,
    assign_personality,
    calculate_creature_level,
    check_market_storm,
    calculate_diversification_shield,
    CREATURE_PERSONALITIES
)



app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------------------- In-memory storage -------------------- #
creatures_db = {}
user_portfolios = {}

# -------------------- Helper functions -------------------- #
def save_image(file):
    """Save uploaded image to the uploads folder"""
    filename = secure_filename(file.filename)
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(image_path)
    return image_path

# -------------------- API Endpoints -------------------- #

@app.route('/api/scan', methods=['POST'])
def scan_brand():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files["image"]
    if image_file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    user_id = request.form.get("user_id", "default_user")
    image_path = save_image(image_file)

    # Detect logo
    result_data = detect_logo(image_path)
    brand_name = result_data.get("logo") if isinstance(result_data, dict) else result_data
    if not brand_name or brand_name == "NO_LOGO":
        return jsonify({"error": "No logo detected"}), 404

    # Get stock ticker
    ticker = get_stock_ticker(brand_name)
    if not ticker:
        return jsonify({"error": f"Could not find stock ticker for {brand_name}"}), 404

    # Get stock data
    stock_data = get_stock_data(ticker)
    personality = assign_personality(stock_data['sector'], stock_data['market_cap'])
    creature_id = f"{user_id}_{ticker}"

    # Create or update creature
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
            'name': stock_data['company_name'].split(',')[0][:15],
            'company_name': stock_data['company_name'],
            'sector': stock_data['sector'],
            'personality': personality,
            'personality_emoji': CREATURE_PERSONALITIES[personality]['emoji'],
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

    # Add to user portfolio
    if user_id not in user_portfolios:
        user_portfolios[user_id] = {}
    user_portfolios[user_id][creature_id] = creature

    # Check for market storm
    is_storm, storm_severity = check_market_storm(stock_data['sector'])

    return jsonify({
        'success': True,
        'is_new': bool(is_new),
        'creature': creature,
        'market_storm': {
            'active': bool(is_storm),
            'severity': storm_severity,
            'affected_sector': stock_data['sector']
        },
        'scan_animation': 'dna_extraction'
    })


@app.route('/api/portfolio/<user_id>', methods=['GET'])
def get_portfolio(user_id):
    if user_id not in user_portfolios:
        return jsonify({'creatures': [], 'total_value': 0})

    creatures = list(user_portfolios[user_id].values())

    # Calculate diversification shield
    shield = calculate_diversification_shield(user_portfolios[user_id])

    # Calculate total portfolio value
    total_value = sum(c['scan_count'] * 100 for c in creatures)

    return jsonify({
        'creatures': creatures,
        'total_value': total_value,
        'diversification_shield': shield,
        'total_creatures': len(creatures)
    })


@app.route('/api/creature/<creature_id>', methods=['GET'])
def get_creature(creature_id):
    if creature_id not in creatures_db:
        return jsonify({'error': 'Creature not found'}), 404

    creature = creatures_db[creature_id]
    personality_info = CREATURE_PERSONALITIES[creature['personality']]
    is_storm, severity = check_market_storm(creature['sector'])

    return jsonify({
        'creature': creature,
        'personality_traits': {
            'volatility': personality_info['volatility'],
            'resilience': personality_info['resilience']
        },
        'market_storm': {
            'active': is_storm,
            'severity': severity
        },
        'stock_info': {
            'ticker': creature['ticker'],
            'company_name': creature['company_name'],
            'current_price': creature['current_price'],
            'change_percent': creature['change_percent'],
            'confidence': creature['confidence']
        }
    })


@app.route('/api/creature/<creature_id>/heal', methods=['POST'])
def heal_creature(creature_id):
    if creature_id not in creatures_db:
        return jsonify({'error': 'Creature not found'}), 404

    creature = creatures_db[creature_id]
    creature['confidence'] = min(100, creature['confidence'] + 10)
    creature['last_healed'] = datetime.now().isoformat()

    return jsonify({'success': True, 'creature': creature, 'message': f"{creature['name']} feels better!"})


@app.route('/api/creature/<creature_id>/sell', methods=['POST'])
def sell_creature(creature_id):
    if creature_id not in creatures_db:
        return jsonify({'error': 'Creature not found'}), 404

    creature = creatures_db[creature_id]
    is_storm, severity = check_market_storm(creature['sector'])

    penalty = creature['level'] * 10 if is_storm else 0
    warning = f"⚠️ Selling during Market Storm! You'll lose {penalty} XP." if is_storm else None
    value = max(0, creature['scan_count'] * 100 - penalty)

    user_id = creature_id.split('_')[0]
    del creatures_db[creature_id]
    if user_id in user_portfolios:
        user_portfolios[user_id].pop(creature_id, None)

    return jsonify({'success': True, 'value': value, 'penalty': penalty, 'warning': warning, 'message': f"{creature['name']} has been released."})


@app.route('/api/market/sectors', methods=['GET'])
def get_sector_status():
    sector_etf_map = {
        'Technology': 'XLK',
        'Healthcare': 'XLV',
        'Financial Services': 'XLF',
        'Consumer Cyclical': 'XLY',
        'Energy': 'XLE',
        'Utilities': 'XLU'
    }

    sectors_status = []
    for sector, etf in sector_etf_map.items():
        try:
            stock_data = get_stock_data(etf)
            is_storm, severity = check_market_storm(sector)
            sectors_status.append({
                'sector': sector,
                'change_percent': stock_data['change_percent'],
                'confidence': stock_data['confidence'],
                'has_storm': is_storm,
                'storm_severity': severity
            })
        except:
            pass

    return jsonify({'sectors': sectors_status})


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})


# -------------------- Background Scheduler -------------------- #
def update_creatures_market():
    """Update all creatures with latest stock info and check market storms"""
    for creature_id, creature in creatures_db.items():
        try:
            stock_data = get_stock_data(creature['ticker'])
            creature['confidence'] = stock_data['confidence']
            creature['current_price'] = stock_data['current_price']
            creature['change_percent'] = stock_data['change_percent']

            is_storm, severity = check_market_storm(creature['sector'])
            creature['market_storm_active'] = is_storm
            creature['storm_severity'] = severity
        except Exception as e:
            print(f"[Background Update Error] {creature_id}: {e}")

scheduler = BackgroundScheduler()
scheduler.add_job(update_creatures_market, 'interval', minutes=1)
scheduler.start()
atexit.register(lambda: scheduler.shutdown())

# -------------------- Run Flask -------------------- #
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)
