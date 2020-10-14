$(document).ready(function(){
  const TradeList = {
    "render": () => {
      let trs = '';
      let balance = 0;
      for(let i=0; i<Trades.length; i++){
        const {date, pair, type, setup, volume, entry, sl, tp, exitDate, exitPrice,
              profit, swap, comment, ss} = Trades[i];
          trs += TradeList.getTR(Trades[i], balance);
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
    "populateBalance": () => {
      const balance = [];
      let currentBalance = 0;
      for(let i=0; i<Trades.length; i++){
        const {profit, swap} = Trades[i];
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
      const obj = [];
      const {elWidth} = options;
      const interval = elWidth / data.length;
      for(let i=0; i<data.length; i++){
        obj.push({
          position: (i+1) * interval,
          value: data[i].date,
        })
      }
      return obj;
    },
    "constructNewObject": (Balance, options) => {
      const obj = [];
      const {elHeight, elWidth, xInterval, maxValue, minValue, range} = options;
      for(let i=0; i<Trades.length; i++){
        const { date, type, pair, setup, volume, entry, sl, tp, exitDate, exitPrice, profit, swap, comment } = Trades[i];
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
        const {balance, x, y, hypotenuse, angle, type, pair, volume, profit} = data[i];
        lineChart += `<li style="--y:${y}px; --x:${x}px;">
          <div
            class="data-point"
            data-value="${balance}"
            data-toggle="popover"
            title="${type === 'deposit'?'Deposit': Chart.getPopoverTitle(pair, type, volume)}"
            data-content="${profit>0?'$':'-$'}${profit>0?profit:Math.sqrt(profit*profit)}, balance: $${balance.toFixed(2)}"
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
  Chart.render();

  $( ".data-point" ).hover(
    function() {
      $(this).popover('show')
    }, function() {
      $(this).popover('hide')
    }
  );

  // const Chart = {
  //   "data": {
  //     "labels": ["Su", "Mo", "Tue", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tue", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tue", "We", "Th", "Fr", "Sa"],
  //     "series": [
  //       [12, 12.2, 13, 18, 21, 22.70, 21.9, 22, 24, 23, 26, 27, 28, 30, 31, 33, 36, 34, 35]
  //     ]
  //   },
  //   "options": {
  //     "height": 240,
  //   },
  // };

  // new Chartist.Line('.ct-chart', Chart.data, Chart.options);

  // const Chart = {
  //   "render": () => {
  //     const data = Chart.populateData(),
  //           balances = [];
  //     for(let i=0; i<data.length; i++){
  //       balances.push(data[i].balance);
  //     }
  //     const maxValue = Math.max(...balances),
  //           minValue = Math.min(...balances),
  //           range = maxValue - minValue,
  //           topLine = 200,
  //           bottomLine = 0,
  //           rangeBetweenDots = 640/balances.length,
  //           yLabel = Chart.getYLabel(maxValue, minValue),
  //           xLabel = Chart.getXLabel(balances.length, rangeBetweenDots),
  //           popoverPlacements = ["top", "left", "right", "bottom"];
  //
  //     let lis = '';
  //     for(let i=0; i<balances.length; i++){
  //       const yAxis = (((balances[i] - minValue) / range) * (topLine - bottomLine)) + bottomLine,
  //             xAxis = (i+1) * rangeBetweenDots,
  //             nextYAxis = ((balances[i+1] - minValue) / range) * topLine,
  //             difference = yAxis - nextYAxis,
  //             hypotenuse = Math.sqrt( (difference*difference) + (rangeBetweenDots*rangeBetweenDots)),
  //             angle = Math.asin(difference/hypotenuse) * (180/Math.PI);
  //       lis += `<li title="${Number(balances[i]).toFixed(2)}" style="--y: ${yAxis}px; --x: ${xAxis}px;">
  //                 <div
  //                   class="data-point"
  //                   data-value="${balances[i]}"
  //                   data-toggle="popover"
  //                   title="${data[i].type === 'deposit'?'Deposit': Chart.getPopoverTitle(data[i].pair, data[i].type, data[i].volume)}"
  //                   data-content="${data[i].profit>0?'$':'-$'}${data[i].profit>0?data[i].profit:Math.sqrt(data[i].profit*data[i].profit)}, balance: $${data[i].balance.toFixed(2)}"
  //                   data-placement="${popoverPlacements[Math.floor(Math.random() * 4)]}"
  //                 ></div>
  //                 <div class="line-segment" style="--hypotenuse:${hypotenuse}; --angle:${angle};"></div>
  //               </li>`;
  //     }
  //
  //     $('#lineChart').html(lis);
  //     $('#chartYLabel').html(yLabel);
  //     $('#chartXLabel').html(xLabel);
  //   },
  //   "populateData": () => {
  //     const arr = [];
  //     let balance = 0;
  //     for(let i=0; i<Trades.length; i++){
  //       const {pair, type, volume, profit, swap} = Trades[i];
  //       arr.push({
  //         pair: pair,
  //         type: type,
  //         volume: volume,
  //         profit: profit,
  //         balance: balance + profit + swap,
  //       });
  //       balance = balance + profit + swap;
  //     }
  //     return arr;
  //   },
  //   "getYLabel": (max, min) => {
  //     let label = '';
  //     const points = [max.toFixed(2)];
  //     const multipliers = [0.75, 0.50, 0.25];
  //     const positions = [200, 150, 100, 50, 0]
  //     const range = max - min; // 60
  //     for(let i=0; i<multipliers.length; i++){
  //       points.push( ((range * multipliers[i]) + min).toFixed(2) )
  //     }
  //     points.push(min.toFixed(2));
  //
  //     for(let i=0; i<points.length; i++){
  //       label += `<li class="YLabel" style="--y:${positions[i]}px;">
  //                   <div class="dataYLabel">${points[i]}</div>
  //                 </li>`;
  //     }
  //     return label;
  //   },
  //   "getXLabel": (n, space) => {
  //     let label = '';
  //     const positions = [];
  //     const filteredPos = [];
  //     const interval = Math.floor(n / 6);
  //     for(let i=0; i<n; i++){
  //       positions.push({
  //         value: i+1,
  //         position: space * (i+1),
  //       });
  //     }
  //     for(let x=0; x<positions.length; x+=interval){
  //       filteredPos.push(positions[x]);
  //     }
  //     for(let y=0; y<filteredPos.length; y++){
  //       const {value, position} = filteredPos[y];
  //       label += `<li class="XLabel" style="--x:${position}px;">
  //                   <div class="dataXLabel">${value}</div>
  //                 </li>`
  //     }
  //     return label;
  //   },
  //   "getPopoverTitle": (pair, type, volume) => {
  //     return `${pair} ${type} ${volume}`;
  //   },
  // };
  TradeList.render();
  // Chart.render();
  $('#tradeTable').DataTable();
  // $( ".data-point" ).hover(
  //   function() {
  //     $(this).popover('show')
  //   }, function() {
  //     $(this).popover('hide')
  //   }
  // );
  // $('[data-toggle="popover"]').popover();
});
