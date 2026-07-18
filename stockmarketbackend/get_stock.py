import yfinance as yf
import pandas as pd

stock_ticker = "TCS.NS"
data = yf.download(stock_ticker, period="1mo", interval="1d")

print("Data shape:", data.shape)
print(data.head())

data.to_excel("stock_data.xlsx", engine="openpyxl")
print("File saved successfully!")