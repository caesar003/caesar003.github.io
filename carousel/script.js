$(document).ready(function(){
  const renderCover = () => {
    const displayedCover = [];
    displayedCover.push(`
      <div class="carousel-item active">
        <img src="../assets/img/${productCover[0].img_link}.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>${productCover[0].title}</h5>
          <p>${productCover[0].description} .</p>
        </div>
      </div>`
    );

    for (let i =1; i<productCover.length;i++){
      displayedCover.push(`
        <div class="carousel-item">
          <img src="../assets/img/${productCover[i].img_link}.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>${productCover[i].title}</h5>
            <p>${productCover[i].description} .</p>
          </div>
        </div>`
      )
    }
    $('#cover').html(displayedCover);
  }
  renderCover();
  const renderProduct1 = () => {
    const displayedProduct1 = [];
    displayedProduct1.push(
      `<div class="carousel-item active">
        <div class="card ${bg[4]}">
          <div class="card-body">
            <h5 class="card-title">${product1[0].title} </h5>
            <p class="card-text">${product1[0].description}.</p>
            <p class="card-text">${product1[0].price} </p>
          </div>
          <div class="card-footer">
            <a href="#" class="btn btn-success">Order now</a>
          </div>
        </div>
      </div>`
    );
    for (let i = 1; i<product1.length; i++){
      displayedProduct1.push(
        `<div class="carousel-item">
          <div class="card ${bg[i]}">
            <div class="card-body">
              <h5 class="card-title">${product1[i].title} </h5>
              <p class="card-text">${product1[i].description}.</p>
              <p class="card-text">${product1[i].price} </p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-success">Order now</a>
            </div>
          </div>
        </div>`
      )
    }
    $('#product1').html(displayedProduct1);
  }
  renderProduct1();
})
