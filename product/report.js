const renderReport = () => {
  const rows = [];
  let hM1 = 0;
  let kas = 15000000;
  for(let i = 0; i<report.length;i++){
    const {tanggal, pendapatan, belanja} = report[i];
    rows.push(
      `<tr>
        <td>${tanggal}</td>
        <td>${formatIDR(pendapatan)}</td>
        <td>${formatIDR(belanja)}</td>
        <td>${formatIDR(kas)}</td>
        <td></td>
      </tr>`
    );
    kas += (pendapatan-belanja);
    hM1 = pendapatan;
  }
  $('#reportList').html(rows);
}
