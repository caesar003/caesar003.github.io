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
                  <td>${ss?TradeList.getScreenshot(ss):'-'}</td>
                </tr>`
      } else {
        let decimalPoints = 0;
        let nToMultiply = 0;
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
                  <td class="number">${profit}</td>
                  <td>${comment}</td>
                  <td class="number">${balance + profit + swap}</td>
                  <td class="number">${(((profit + swap) / balance) * 100).toFixed(2)}</td>
                  <td>${ss?TradeList.getScreenshot(ss):'-'}</td>
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
    "calculateDrawdown": () => {},
    "getScreenshot": (arr) => {
      let links = '';
      for(let i=0; i<arr.length; i++){
        links += `<a href="${arr[i]}" class="pict_link">p${i}</a> `;
      }
      return links;
    },
  }
  const renderTrades = () => {
  }

  // renderTrades();
  TradeList.render();

  $('#tradeTable').DataTable();

  const getData = () => {
    const arr = [];
    let balance = 0;
    for(let i=0; i<Trades.length; i++){
      const {profit, swap} = Trades[i];
      arr.push(balance + profit + swap);
      balance = balance + profit + swap;
    }
    return arr;
  }

  const renderChart = () => {
    const data = getData();
    const lineChart = document.getElementById("lineChart");
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    const topLine = 200;
    const bottomLine = 0;
    const rangeBetweenDots = 480/data.length;

    let html = '';
    for(let i=0; i<data.length; i++){
      const yAxis = (((data[i] - minValue) / range) * (topLine - bottomLine)) + bottomLine;
      const xAxis = (i+1) * rangeBetweenDots;
      const nextYAxis = ((data[i+1] - minValue) / range) * topLine;
      const difference = yAxis < nextYAxis? nextYAxis - yAxis : yAxis - nextYAxis;
      const hypotenuse = Math.sqrt( (difference*difference) + (rangeBetweenDots*rangeBetweenDots));
      const angle = Math.asin(difference/hypotenuse) * (180/Math.PI);
      html += `<li title="${Number(data[i]).toFixed(2)}" style="--y: ${yAxis}px; --x: ${xAxis}px;">
                <div class="data-point" data-value="${data[i]}"></div>
                <div class="line-segment" style="--hypotenuse:${hypotenuse}; --angle:${yAxis < nextYAxis ? '-' : ''}${angle};">
              </li>`;
    }
    // console.log(html);
    //lineChart.innerHTML = html;
    $('#lineChart').html(html);
  };
  renderChart();

});
