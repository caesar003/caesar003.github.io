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
    const {meetingCount, meetingDuration, prices} = thisCourse.programOptions[i];
    section += `
      <div class="container mt-3  text-center">
        <h3>${meetingCount} Pertemuah - ${meetingDuration} Bulan </h3>
        <div class="accordion" id="accordion${i}">`;
    for(let j=0; j<prices.length; j++){
      const {name, price, disc, moreInfo} = prices[j];
          section +=
          `<div class="card">
            <div class="card-header" id="heading${i}${j}">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}${j}" aria-expanded="true" aria-controls="collapse${i}${j}">
                  ${prices[j].name}
                </button>
              </h2>
            </div>

            <div id="collapse${i}${j}" class="collapse ${i==0&&j==0?'show':''}" aria-labelledby="heading${i}${j}" data-parent="#accordion${i}">
              <div class="card-body">
                <p> <span class="price">${convertIDR(price)}</span></p>
                <p>  ${convertIDR(disc)} </p>
                <p class="card-text moreInfo">${moreInfo?moreInfo:''}</p>
                <a href="../register.html" class="btn btn-secondary">Daftar</a>
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
