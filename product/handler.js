const formatIDR = (number) => {
  return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

const displayError = (el, msg) => {
  el.addClass('feedback');
  el.html(msg);
  el.fadeIn("fast");
  el.fadeOut(3000);
}

const formatTodoDate = (d) => {
  const H = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",]
  const D = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const M = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "December"
  ];
  return `${D[d.getDay()]}, ${M[d.getMonth()]}, ${d.getDate()} ${d.getFullYear()} - <strong>${d.getHours()<10?H[d.getHours()]:d.getHours()}: ${d.getMinutes()<10?H[d.getMinutes()]:d.getMinutes()}</strong>`;
}
