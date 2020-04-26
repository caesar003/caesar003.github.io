$(document).ready(function(){
  const getAllYears = () => {
    const allYears = [];
    for (let i=0; i<posts.length; i++){
      allYears.push(getYear(posts[i].posted_date));
    }
    const sortedYears = [...new Set(allYears)].sort();
    return sortedYears;
  }
  const getYear = (d) => {
    return new Date(d).getFullYear();
  }
  const getMonth = (d) => {
    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = new Date(d).getMonth();
    return Months[month];
  }
  const renderCover = () => {
    let renderedCovers = '';
    for (let i=0; i<4; i++){
      const {title, image_link, content, tag} = posts[i];
      renderedCovers += `
      <div class="col-6 col-md-3 cover-thumb" style="background:url('../assets/img/${image_link}.jpg');">
        <h3>${title}</h3>
        <p>${content.substr(0, 18)} ... </p>
        <div class="cover-post-tag">
          <i class="fas fa-tag fa-fw"></i>${tag}
        </div>
      </div>`;
    }
    $('#covers').html(renderedCovers);
  }
  const renderPosts = (n=0) => {
    let renderedPosts = '';
    for(let i = 0; i < posts.length; i++){
      const {title, content, posted_date, image_link} = posts[i];
      if(i % 2 !== 0){
        renderedPosts += `
        <div>
          <h3 class="text-left mb-0">${title}</h3>
          <p class="postedDate">${posted_date}</p>
          <hr>
          <div class="row mb-5">
            <div class="col-md-8  blog-content">
              <p>${content.substr(0, 120)} ... <a href="#">Read more <i class="fas fa-angle-double-right"></i> </a></p>
            </div>
            <div class="col-md-4 d-flex align-items-start justify-content-center mb-3">
              <img class="img-fluid" src="../assets/img/${image_link}.jpg" alt="${image_link}" />
            </div>
          </div>
        </div>`;
      } else {
        renderedPosts += `
        <div>
          <h3 class="text-left mb-0">${title}</h3>
          <p class="postedDate">${posted_date}</p>
          <hr>
          <div class="row mb-5">
            <div class="col-md-4 d-flex align-items-start justify-content-center">
              <img class="img-fluid" src="../assets/img/${image_link}.jpg" alt="${image_link}" />
            </div>
            <div class="col-md-8  blog-content">
              <p>${content.substr(0, 120)} ... <a href="#">Read more <i class="fas fa-angle-double-right"></i> </a> </p>
            </div>
          </div>
        </div>`;
      }
    }
    $('#recentPosts').html(renderedPosts);
  }

  const filterPosts = (year, month) => {
    const filteredPosts = [];
    for (let i = 0; i<posts.length; i++){
      if(getYear(posts[i].posted_date) == year && getMonth(posts[i].posted_date) == month){
        filteredPosts.push(posts[i].title);
      }
    }
    return filteredPosts;
  }

  const filterMonths = (year) => {
    const months = [];
    for(let i = 0; i<posts.length; i++){
      if(getYear(posts[i].posted_date) == year){
        months.push(getMonth(posts[i].posted_date));
      }
    }
    const filteredMonths = [...new Set(months)];
    return filteredMonths;
  }

  const renderSideBar = () => {
    filteredYears = getAllYears();
    let allPosts = '';
    for(let i = 0; i < filteredYears.length; i ++){
      let months = filterMonths(filteredYears[i]);
      allPosts += `
        <details>
          <summary>${filteredYears[i]}</summary>
          <ul>`;
        for(let x =0 ; x < months.length ; x ++){
          let selectedPosts = filterPosts(filteredYears[i], months[x]);
          allPosts += `
            <details>
              <summary>${months[x]}</summary>
              <ul>`;
                for(let z = 0 ; z<selectedPosts.length; z++){
                  allPosts+= `<li>${selectedPosts[z]}</li>`;
                }
            allPosts += `</ul>
            </details>`
        }
        allPosts += `</ul>
        </details>`
    }
    $('#allposts').html(allPosts);
    console.log(filteredYears);
    console.log(filteredYears.sort());
  }
  renderCover()
  renderPosts();
  renderSideBar();
});
