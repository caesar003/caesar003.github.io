$(document).ready(function(){
  let TradingRecord = [];
  const fetchData = () => {
    $.ajax({
      "url": "./assets/js/trades.json",
      "type": "get",
      "async": false,
      "dataType": "json",
      "success": data => {
        TradingRecord = data;
      }
    });
  }
  fetchData();
  const TradeList = {
    "render": () => {
      let trs = '';
      let balance = 0;
      for(let i=0; i<TradingRecord.length; i++){
        const {date, pair, type, setup, volume, entry, sl, tp, exitDate, exitPrice,
              profit, swap, comment, ss} = TradingRecord[i];
          trs += TradeList.getTR(TradingRecord[i], balance);
          balance = balance + profit + swap;
      }
      $('#tradeList').html(trs);
    },
    "getTR": (object, balance) => {
      const {date, pair, type, setup, volume, entry, sl, tp, exitDate, exitPrice,
            profit, swap, comment, ss} = object;
      let trs = '';
      if(type === 'deposit'){
        trs = `<tr>
                  <td>${date}</td>
                  <td>${pair}</td>
                  <td>${setup}</td>
                  <td>${type}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>${exitDate}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>${comment}</td>
                  <td class="number">${(balance + profit + swap).toFixed(2)}</td>
                  <td>-</td>
                </tr>`
      } else {
        let decimalPoints = 0;
        let multiplier = 0;
        switch (pair) {
          case "xauusd":
            decimalPoints = 2;
            multiplier = 100;
            break;
          case "usdjpy":
            decimalPoints = 3;
            multiplier = 1000;
            break;
          default:
            decimalPoints = 5;
            multiplier = 100000;
        }
        trs = `<tr>
                  <td>${date}</td>
                  <td>${pair}</td>
                  <td>${setup}</td>
                  <td>${type}</td>
                  <td class="number">${volume}</td>
                  <td class="number">${entry.toFixed(decimalPoints)}</td>
                  <td class="number">${sl.toFixed(decimalPoints)}</td>
                  <td class="number">${tp.toFixed(decimalPoints)}</td>
                  <td class="number">${TradeList.calculateRisk(balance, type, pair, entry, sl, volume)}</td>
                  <td>${exitDate}</td>
                  <td class="number">${exitPrice.toFixed(decimalPoints)}</td>
                  <td class="number">${profit.toFixed(2)}</td>
                  <td>${comment}</td>
                  <td class="number">${(balance + profit + swap).toFixed(2)}</td>
                  <td class="number">${(((profit + swap) / balance) * 100).toFixed(2)}</td>
                </tr>`;
      }
      return trs;
    },
    "calculateRisk": (balance, type, pair, entry, sl, volume) => {
      let decimalPoints = 0;
      let nToMultiply = 0;
      let slPts = 0;
      switch (pair) {
        case "xauusd":
          decimalPoints = 2;
          nToMultiply = 100;
          break;
        case "usdjpy":
          decimalPoints = 3;
          nToMultiply = 1000;
          break;
        default:
          decimalPoints = 5;
          nToMultiply = 100000;
      }
      if(type === 'long'){
        slPts = (entry - sl).toFixed(decimalPoints) * nToMultiply;
      } else {
        slPts = ((sl - entry).toFixed(decimalPoints)) * nToMultiply;
      }
      return (((slPts * volume).toFixed(2) / balance) * 100).toFixed(2);
    },
    "getScreenshot": (arr) => {
      let links = '';
      for(let i=0; i<arr.length; i++){
        links += `<a href="${arr[i]}" class="pict_link">p${i}</a> `;
      }
      return links;
    },
  }

  const Chart = {
    "getPopoverTitle": (pair, type, volume) => {
      return `${pair} ${type} ${volume}`;
    },
    "getPopoverContent": (obj) => {
      const {type, date, exitDate, profit, balance } = obj;
      let string = '';
      if(type === 'deposit'){
        string += `<span style='font-size:0.43m;'>${$.format.date(date, "dd/MM/yy H:mm")}, ${profit>0?'$':'-$'}${profit > 0 ? profit : Math.sqrt(profit * profit)}</span>`;
      } else {
        string += `<span style='font-size:0.4em;'> ${$.format.date(date, "dd/MM/yy H:mm")} => ${$.format.date(exitDate, "dd/MM/yy H:mm")}, <br /> profit: ${profit>0?'$':'-$'}${profit > 0 ? profit : Math.sqrt(profit*profit)}, <br />balance: $${balance.toFixed(2)} </span>`;
      }
      return string;
    },
    "populateBalance": () => {
      const balance = [];
      let currentBalance = 0;
      for(let i=0; i<TradingRecord.length; i++){
        const {profit, swap} = TradingRecord[i];
        balance.push(currentBalance + profit + swap);
        currentBalance += (profit + swap);
      }
      return balance;
    },
    "populateY": (min, max) => {
      const range = max - min;
      const percentage = [1, 0.75, 0.50, 0.25, 0];
      const elementHeight = 240;
      const obj = [];
      for( let i=0; i<percentage.length; i++ ){
        obj.push({
          position: percentage[i] * elementHeight,
          value: ((percentage[i] * range) + min).toFixed(2),
        });
      }
      return obj;
    },
    "populateX": (data, options) => {
      const allObj = [];
      const obj = [];
      const {elWidth} = options;
      const interval = elWidth / data.length;
      const pointSkipped = Math.floor(data.length / 6);
      for(let i=0; i<data.length; i++){
        allObj.push({
          position: (i+1) * interval,
          value: data[i].date,
        });
      }
      for(let j=0; j<allObj.length; j+=pointSkipped){
        obj.push(allObj[j]);
      }
      return obj;
    },
    "constructNewObject": (Balance, options) => {
      const obj = [];
      const {elHeight, elWidth, xInterval, maxValue, minValue, range} = options;
      for(let i=0; i<TradingRecord.length; i++){
        const { date, type, pair, setup, volume, entry, sl, tp, exitDate, exitPrice, profit, swap, comment } = TradingRecord[i];
        const x = (i+1) * xInterval;
        const y = ((Balance[i] - minValue) / range) * elHeight;
        const yNext = ((Balance[i+1] - minValue) / range) * elHeight;
        const hypotenuse = Math.sqrt( ((y - yNext) ** 2) + (xInterval ** 2) );
        obj.push({
          "balance": Balance[i],
          "x": x,
          "y": y,
          "hypotenuse": hypotenuse,
          "angle": Math.asin( (y-yNext) / hypotenuse ) * (180 / Math.PI),
          "date": date,
          "exitDate": exitDate,
          "pair": pair,
          "type": type,
          "volume": volume,
          "profit": profit,
          "swap": swap,
        })
      }
      return obj;
    },
    "render": () => {
      const Balance = Chart.populateBalance();
      const options = {
        elHeight: 240,
        elWidth: 640,
        xInterval: 640 / Balance.length,
        maxValue: Math.max(...Balance),
        minValue: Math.min(...Balance),
        range: Math.max(...Balance) - Math.min(...Balance),
      };
      const data = Chart.constructNewObject(Balance, options);
      const {elHeight, elWidth, xInterval, maxValue, minValue, range} = options;
      const Ys = Chart.populateY(minValue, maxValue);
      const Xs = Chart.populateX(data, options);

      let lineChart = '';
      let yLabel = '';
      let xLabel = '';

      for(let i=0; i<data.length; i++){
        const {balance, x, y, hypotenuse, angle, type, pair, volume, profit, date, exitDate} = data[i];
        lineChart += `<li style="--y:${y}px; --x:${x}px;" data-profit="${profit}">
          <div
            class="data-point"
            data-profit=${profit}
            data-value="${balance}"
            data-html="true"
            data-toggle="popover"
            title="${type === 'deposit' ? 'Deposit' : Chart.getPopoverTitle(pair, type, volume)}"
            data-content="${Chart.getPopoverContent(data[i])}"
            data-placement="bottom"></div>
          <div class="line-segment" style="--hypotenuse:${hypotenuse}; --angle:${angle};"></div>
        </li>`;
      }
      for(let j=0; j<Ys.length; j++){
        const {position, value} = Ys[j];
        yLabel += `<li class="yDataLabel" style="--y:${position}px;">${value}</li>`;
      }
      for(let k=0; k<Xs.length; k++){
        const { position, value } = Xs[k];
        xLabel += `<li class="xDataLabel" style="--x:${position}px">${$.format.date(value, "dd/MMM")}</li>`;
      }
      $('#lineChart').html(lineChart);
      $('#yAxis').html(yLabel);
      $('#xAxis').html(xLabel);
    }
  };

  const Summary = {

    "render": () => {
      let html = '';
      const totalTrades = Summary.calc.totalTrades(TradingRecord);
      const {
        grossProfit,
        profitTrades,
        largestProfit,
      } = Summary.calc.Profits(TradingRecord);
      const {
        grossLoss,
        lossTradingRecord,
        largestLost,
      } = Summary.calc.Losses(TradingRecord);
      const netProfit = grossProfit + grossLoss;
      html += `<tr>
                <th> Total net profit:</th>
                <td>${netProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <th> Gross Profit: </th>
                <td>${grossProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <th> Gross Loss:</th>
                <td> ${grossLoss.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Total Trades:</th>
                <td> ${totalTrades}</td>
              </tr>
              <tr>
                <th>Profit Trades(%):</th>
                <td> ${profitTrades}(${((profitTrades / totalTrades) * 100).toFixed(2)}%)</td>
              </tr>
              <tr>
                <th>Loss Trades(%): </th>
                <td> ${lossTradingRecord}(${((lossTradingRecord / totalTrades) * 100).toFixed(2)}%)</td>
              </tr>
              <tr class="profits" id="largestProfit" data-profit="${largestProfit}">
                <th>Largest Profit:</th>
                <td>${largestProfit.toFixed(2)}</td>
              </tr>
              <tr class="profits" id="largestLost" data-profit="${largestLost}">
                <th>Largest Loss:</th>
                <td>${largestLost.toFixed(2)}</td>
              </tr>`;
        $('#accountSummary').html(html);
    },
    "calc": {
      "totalTrades": (arr) => {
        let tradeCounts = 0;
        for(let i=0; i<arr.length; i++){
          const { type } = arr[i];
          if(type !== 'deposit') tradeCounts++;
        }
        return tradeCounts;
      },
      "Profits": (arr) => {
        const profits = [];
        const obj = {
          grossProfit: 0,
          profitTrades: 0,
          largestProfit: 0,
        }
        for(let i=0; i<arr.length; i++){
          const { profit, type } = arr[i];
          if(profit > 0 && type !== 'deposit') {
            obj.grossProfit += arr[i].profit;
            obj.profitTrades++;
            profits.push(profit);
          }
        }
        obj.largestProfit = Math.max(...profits);
        return obj;
      },
      "Losses": (arr) => {
        const losses = [];
        const obj = {
          grossLoss: 0,
          lossTradingRecord: 0,
          largestLost: 0,
        };
        for(let i=0; i<arr.length; i++){
          const { profit, type } = arr[i];
          if(profit < 0 && type != 'deposit') {
            obj.grossLoss += profit;
            obj.lossTradingRecord++;
            losses.push(profit);
          }
        }
        obj.largestLost = Math.min(...losses);
        return obj;
      },
    }
  }
  Summary.render();
  Chart.render();
  TradeList.render();

  $('#tradeTable').DataTable();

  $( ".data-point" ).hover(
    function() {
      $(this).popover('show')
    }, function() {
      $(this).popover('hide')
    }
  );
});
