$(document).ready(function(){
  const posts = [
    {
      title : "Post title 2019-09-22",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2019-09-22",
      month : "September",
      year : 2020,
    },
    {
      title : "Post title 2019-09-15",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2019-09-15",
      month : "September",
      year : 2020,
    },
    {
      title : "Post title 2 2019-08-12",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2019-08-12",
      month : "August",
      year : 2020,
    },
    {
      title : "Post title 3",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2019-07-18",
      month : "July",
      year : 2020,
    },
    {
      title : "Post title 4 2020-05-10",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2020-05-10",
      month : "May",
      year : 2020,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2019-08-10",
      month : "August",
      year : 2019,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2019-07-10",
      month : "July",
      year : 2019,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2019-06-10",
      month : "June",
      year : 2019,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2019-05-10",
      month : "May",
      year : 2019,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2018-08-10",
      month : "August",
      year : 2018,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2018-07-10",
      month : "July",
      year : 2018,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2018-06-10",
      month : "June",
      year : 2018,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2018-05-10",
      month : "May",
      year : 2018,
    },
    {
      title : "Post title 5",
      content : "the quick brown fox jumps over the lazy dog",
      posted_date : "2018-04-10",
      month : "April",
      year : 2018,
    },
  ];

  const filterPosts = (year, month) => {
    const filteredPosts = [];
    for (let i = 0; i<posts.length; i++){
      if(posts[i].year==year&&posts[i].month==month){
        filteredPosts.push(posts[i].title);
      }
    }
    return filteredPosts;
  }

  const filterMonths = (year) => {
    const months = [];
    for(let i = 0; i<posts.length; i++){
      if(posts[i].year == year){
        months.push(posts[i].month);
      }
    }
    const filteredMonths = [...new Set(months)];
    return filteredMonths;
  }

  const renderSideBar = () => {
    const allYears = [];
    for (let i=0; i<posts.length; i++){
      allYears.push(posts[i].year);
    }
    const filteredYears = [...new Set(allYears)];
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
  }
  renderSideBar();
});
