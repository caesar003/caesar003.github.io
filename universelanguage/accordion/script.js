const getCourses = () => {
  let cards = '';
  for(let i=0; i<Courses.length; i++){
    cards +=
      `<div class="col-10 col-sm-6 col-md-4 mb-3">
        <div class="card text-white">
          <img src="./placeholder.png" class="card-img" alt="...">
          <div class="card-img-overlay d-flex flex-column align-items-start justify-content-end">
            <h5 class="card-title">${Courses[i].title}</h5>
            <a title="Lihat informasi detil" href="course.html#${Courses[i].title}" class="btn viewmore"><i class="fas fa-angle-double-right"></i></a>
          </div>
        </div>
      </div>`;
  }
  const div = document.querySelector("#course");
  div.innerHTML = cards;
}

getCourses();
