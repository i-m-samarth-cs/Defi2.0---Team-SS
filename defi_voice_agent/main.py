import os
import hmac
import hashlib
from fastapi import FastAPI, Request
from web3 import Web3
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

ELEVENLABS_API_KEY = os.getenv("HSX599KBPS7KJ7AYPPADGWYUUPU7VN2IE")
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")
RPC_URL = os.getenv("ETH_RPC_URL")
WALLET = os.getenv("WALLET_ADDRESS")

w3 = Web3(Web3.HTTPProvider(RPC_URL))

# Verify webhook signature (VERY IMPORTANT)
def verify_signature(raw_body, signature):
    computed = hmac.new(
        WEBHOOK_SECRET.encode(),
        raw_body,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(computed, signature)

# Send reply to ElevenLabs
def send_to_elevenlabs(conversation_id, text):
    url = f"https://api.elevenlabs.io/v1/convai/conversations/{conversation_id}/messages"
    headers = {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {"text": text}

    requests.post(url, headers=headers, json=payload)

# Check ETH balance
def get_eth_balance(addr):
    balance = w3.eth.get_balance(addr)
    return round(w3.from_wei(balance, 'ether'), 6)

def get_last_transaction(wallet):
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={wallet}&page=1&offset=1&sort=desc&apikey={ELEVENLABS_API_KEY}"
    res = requests.get(url).json()

    if res["status"] == "1" and len(res["result"]) > 0:
        tx = res["result"][0]
        value = Web3.from_wei(int(tx["value"]), 'ether')
        return f"Your last transaction was {value:.4f} ETH, hash ending with {tx['hash'][-6:]}."
    else:
        return "No transactions found."
    
def get_recent_transactions(wallet, count=5):
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={wallet}&page=1&offset={count}&sort=desc&apikey={ELEVENLABS_API_KEY}"
    res = requests.get(url).json()

    if res["status"] == "1":
        txs = res["result"]
        summary = []
        for tx in txs:
            eth = Web3.from_wei(int(tx["value"]), "ether")
            summary.append(f"{eth:.4f} ETH (hash {tx['hash'][-6:]})")

        return "Your recent transactions: " + ", ".join(summary)
    return "Unable to fetch recent transactions."

def get_pending_transactions(wallet):
    url = f"https://api.etherscan.io/api?module=account&action=txlistinternal&address={wallet}&sort=desc&apikey={ELEVENLABS_API_KEY}"
    res = requests.get(url).json()

    if res["status"] == "1" and len(res["result"]) > 0:
        return "You currently have pending transactions."
    else:
        return "No pending transactions."
    
def get_gas_price():
    url = "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" + ELEVENLABS_API_KEY
    res = requests.get(url).json()
    return res["result"]["FastGasPrice"]

def get_token_price(token_address):
    url = f"https://api.dexscreener.com/latest/dex/tokens/{token_address}"
    res = requests.get(url).json()

    if "pairs" in res and len(res["pairs"]) > 0:
        price = res["pairs"][0]["priceUsd"]
        return f"The token price is ${float(price):.4f}."
    return "Unable to fetch token price."

def get_portfolio_summary(wallet):
    # You can expand this later with a token list
    eth = get_eth_balance(wallet)
    return f"You currently hold {eth:.4f} ETH."

# MAIN WEBHOOK ENDPOINT
@app.post("/elevenlabs/webhook")
async def webhook(request: Request):
    raw_body = await request.body()
    data = await request.json()

    # Signature validation
    signature = request.headers.get("xi-signature")
    if not verify_signature(raw_body, signature):
        return {"error": "Invalid signature"}

    message = data.get("message", "").lower()
    conversation_id = data.get("conversation_id")

    # Intent detection

    if "eth balance" in message or "my balance" in message:
        balance = get_eth_balance(WALLET)
        send_to_elevenlabs(conversation_id, f"Your ETH balance is {balance} ETH.")
    
    elif "wallet" in message:
        send_to_elevenlabs(conversation_id, f"Your wallet address is {WALLET}")
    
    if "last transaction" in message:
        tx = get_last_transaction(WALLET)
        send_to_elevenlabs(conversation_id, tx)

    elif "recent transactions" in message:
        txs = get_recent_transactions(WALLET, 5)
        send_to_elevenlabs(conversation_id, txs)

    elif "pending" in message and "transaction" in message:
        pending = get_pending_transactions(WALLET)
        send_to_elevenlabs(conversation_id, pending)

    elif "gas price" in message:
        gas = get_gas_price()
        send_to_elevenlabs(conversation_id, f"Current gas price is {gas} gwei.")

    elif "token price" in message:
        # extract token from message
        ...

    elif "portfolio" in message:
        summary = get_portfolio_summary(WALLET)
        send_to_elevenlabs(conversation_id,summary)

    else:
        send_to_elevenlabs(conversation_id, "I did not fully understand. Please repeat your request.")

    
    return {"status": "ok"}
