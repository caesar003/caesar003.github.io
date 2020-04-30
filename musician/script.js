const DateSuffix = ["st", "nd", "rd", "th", "th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st", "nd", "rd", "th", "th","th","th","th","th","th","th",];
const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Schedules = [
  {
    city : "Medan",
    tourDate : "2020-06-12",
    available : true,
  },
  {
    city : "Surabaya",
    tourDate : "2020-08-21",
    available : false,
  },
  {
    city : "Balikpapan",
    tourDate : "2020-11-04",
    available : true,
  },
  {
    city : "Makassar",
    tourDate : "2021-02-25",
    available : true,
  }
];

const FormatDate = (d) => {
  const day = Days[d.getDay()];
  const month = Months[d.getMonth()];
  const date = d.getDate();
  const suffix = DateSuffix[date];
  const year = d.getFullYear();
  return `${day}, ${month} ${date}<sup>${suffix}</sup> ${year}`;
}

const showTickets = () => {
  let tickets = '';
  for(let i=0;i<Schedules.length; i++){
    const {city, tourDate, available} = Schedules[i];
    tickets += `
      <div class="col-10 col-sm-6 col-md-3">
        <div class="card mb-2">
          <div class="card-body d-flex flex-column justify-content-start align-items-center">
            <h5 class="card-title mt-4">${city} </h5>
            <h6 class="card-subtitle mb-2 text-muted">${FormatDate(new Date(tourDate))}</h6>
            ${!available?'<span class="text-right badge badge-warning">Sold out</span>':''}
          </div>
          <div class="card-footer text-center">
            <a href="#" class="card-link btn btn-outline-info btn-sm ${!available?'disabled':''}"><i class="fas fa-cart-arrow-down"></i> Order now</a>
          </div>
        </div>
      </div>`;
  }
  document.getElementById('tickets').innerHTML = tickets;
}

showTickets();
