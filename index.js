const axios = require('axios');
const fs = require('fs');

const fetchDataUsingAxios = async () => {
  const url = 'https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY'; // Replace with the actual URL

  const config = {
    headers: {
        'accept-encoding': 'gzip',
        'content-type': 'application/json', 
        'referer': 'https://www.nseindia.com/option-chain',
        'accept': '*/*',
        'user-agent': 'PostmanRuntime/7.32.3',
        'cookie': 'bm_sv=D12EF0AC5F17C11603239C36476F24DC~YAAQxfY3F0mQRVWNAQAACFs8ZBYpb5VMbtujxHewfx7r8iKujO5NOiBvmQihFKcg9+yUhLXl39Ru8Xr0Q9TrLZAQxV+9wxoOsWgqy4UEpxnk/PZSO2LOWmVWvzPYz4J+3xGGKLNo790A2oWKzJD4zDRybIX+SIlHBOMCvATUup5TQm/GVKPKipQVAB4noD2eCFI19MbCz2xTiJqgbBZxkg7QnXPHg2C49MPbP2+3mQnjbnIapFxyk+fcgHb8CGc8XempVA==~1; Domain=.nseindia.com; Path=/; Expires=Thu, 01 Feb 2024 11:17:20 GMT; Max-Age=2547; Secure'
    },
  };

  try {
    const response = await axios.get(url, config);

    // Extracting the 'data' section from 'filtered'
    const filteredData = response.data.filtered.data;

    // Creating CSV content
    const csvContent = `updatedOn,strikePrice,expiryDate,CE_strikePrice,CE_expiryDate,CE_underlying,CE_identifier,CE_openInterest,CE_changeinOpenInterest,CE_pchangeinOpenInterest,CE_totalTradedVolume,CE_impliedVolatility,CE_lastPrice,CE_change,CE_pChange,CE_totalBuyQuantity,CE_totalSellQuantity,CE_bidQty,CE_bidprice,CE_askQty,CE_askPrice,CE_underlyingValue,PE_strikePrice,PE_expiryDate,PE_underlying,PE_identifier,PE_openInterest,PE_changeinOpenInterest,PE_pchangeinOpenInterest,PE_totalTradedVolume,PE_impliedVolatility,PE_lastPrice,PE_change,PE_pChange,PE_totalBuyQuantity,PE_totalSellQuantity,PE_bidQty,PE_bidprice,PE_askQty,PE_askPrice,PE_underlyingValue\n`;

    const currentDate = new Date();
    const formattedDate = currentDate.toString();

    // Adding data rows to CSV content
    const csvRows = filteredData.map(item => {
        return `${formattedDate},${item.strikePrice},${item.expiryDate},${item.CE.strikePrice},${item.CE.expiryDate},${item.CE.underlying},${item.CE.identifier},${item.CE.openInterest},${item.CE.changeinOpenInterest},${item.CE.pchangeinOpenInterest},${item.CE.totalTradedVolume},${item.CE.impliedVolatility},${item.CE.lastPrice},${item.CE.change},${item.CE.pChange},${item.CE.totalBuyQuantity},${item.CE.totalSellQuantity},${item.CE.bidQty},${item.CE.bidprice},${item.CE.askQty},${item.CE.askPrice},${item.CE.underlyingValue},${item.PE.strikePrice},${item.PE.expiryDate},${item.PE.underlying},${item.PE.identifier},${item.PE.openInterest},${item.PE.changeinOpenInterest},${item.PE.pchangeinOpenInterest},${item.PE.totalTradedVolume},${item.PE.impliedVolatility},${item.PE.lastPrice},${item.PE.change},${item.PE.pChange},${item.PE.totalBuyQuantity},${item.PE.totalSellQuantity},${item.PE.bidQty},${item.PE.bidprice},${item.PE.askQty},${item.PE.askPrice},${item.PE.underlyingValue}\n`;
    });
        
    // Writing CSV content to a file
    console.log("Updating on :", formattedDate)
    fs.writeFileSync('option_chain_data.csv', csvContent + csvRows.join(''));

  } catch (error) {
    console.error('Error fetching data using axios:', error.message);
  }
};

setInterval(async () => {
  await fetchDataUsingAxios(); // Use await here to handle the Promise properly
}, 60000);

// Uncomment the method you want to use
// fetchDataUsingHttps();
