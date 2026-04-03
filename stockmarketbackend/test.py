import yfinance as yf
data = yf.download("IBM", period="5d", interval="1d")
print(data)
