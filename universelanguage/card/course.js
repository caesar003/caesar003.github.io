const param = location.hash.slice(1).replace(/%20/gi, " ");

const thisCourse = Courses.find(course => course.title === param);
const convertIDR = (int) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR' }).format(int)
}

const renderThisCourse = () => {
  const Cover = `
  <h3>${thisCourse.title}</h3>
  <p>${thisCourse.description}</p>`;
  const cover = document.querySelector('#cover');
  cover.innerHTML = Cover;
}

const renderPrice = () => {
  let section = '';
  const price = document.querySelector('#price');
  for(let i=0; i<thisCourse.programOptions.length; i++){
    section += `
    <div class="container mt-3">
      <h3 class="text-center">${thisCourse.programOptions[i].meetingCount} Pertemuan - ${thisCourse.programOptions[i].meetingDuration} Bulan </h3>
      <div class="row justify-content-center ${thisCourse.programOptions[i].prices.length===3?'justify-content-sm-start':''}">`;
      for(let j=0; j<thisCourse.programOptions[i].prices.length; j++){
        const {name, price, disc, moreInfo} = thisCourse.programOptions[i].prices[j];
        section += `
          <div class="col-9 ${thisCourse.programOptions[i].prices.length===3?'col-md-4':'col-md-5'} col-sm-6 mb-3">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text price">${convertIDR(price)}</p>
                <p class="card-text">${convertIDR(disc)}</p>
                <p class="card-text moreInfo">${moreInfo?moreInfo:''}</p>
              </div>
              <div class="card-footer">
                <a href="../register.html" class="card-link btn btn-outline-warning">Daftar <i class="fas fa-angle-double-right"></i></a>
              </div>
            </div>
          </div>`;
      }
      section +=
      `</div>
    </div>`;
  }
  price.innerHTML = section;
}
renderThisCourse();
renderPrice();
