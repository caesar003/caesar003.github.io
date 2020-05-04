$(document).ready(function(){
  const Books = [];
  const fetchDb = () => {
    $.ajax({
      url : './books.json',
      dataType : 'json',
      async : !1,
      success : function(data){
        for(let i = 0; i<data.length; i++){
          Books.push(data[i]);
        }
      }
    });
  }
  const Categories = ["Authors", "Tags"];
  const getLetters = (cat) => {
    const allLetters = [];
    for(let i=0; i<Books.length; i++){
      if(cat.toLowerCase() ==='authors'){
        allLetters.push(Books[i].author[0]);
      } else {
        allLetters.push(Books[i].tags[0]);
      }
    }
    const Letters = [...new Set(allLetters)].sort();
    return Letters;
  }
  const getItems = (cat, letter) => {
    const allItems = [];
    for(let i=0; i<Books.length; i++){
      if(cat === 'Authors'){
        if(Books[i].author[0].toLowerCase() === letter.toLowerCase()){
          allItems.push(Books[i].author);
        }
      } else {
        if(Books[i].tags[0].toLowerCase() === letter){
          allItems.push(Books[i].tags);
        }
      }
    }
    const Items = [...new Set(allItems)].sort();
    return Items;
  }
  const getNav = () => {
    let returned = '';
    for(let i=0; i<Categories.length; i++){
      const Letters = getLetters(Categories[i]);
      returned +=
      `<details>
        <summary>${Categories[i]}</summary>
        <ul>`;
        for(let j=0;j<Letters.length;j++){
          const Items = getItems(Categories[i], Letters[j]);
          returned +=
            `<details>
              <summary>${Letters[j]}</summary>
              <ul>`;
              for(let k=0; k<Items.length; k++){
                returned += `<li class="nav-item" data-item="${Items[k]}">${Items[k]}</li>`;
              }
              returned += `</ul>
            </details>`;
        }
          returned +=
          `</ul>
      </details>`
    }
    $('#nav').html(returned);
  }
  const myBookList =  $('#books').DataTable({
    'language' : {
      'search' : "_INPUT_",
      'searchPlaceholder' : 'Find books...'
    },
    'paging': false,
    'info' : false,
    'ajax': {
      'url' : './books.json',
      'dataSrc' : ""
    },
    "columns" : [
      {
        "data" : {id: "id", title:"title", author:"author"},
        "render" : function (data, type, row){
          return `<span class="book-title" data-author="${data.author}" data-title="${data.title}" data-id="${Number(data.id)-1}">${data.id}</span>`
        }
      },
      {
        "data" : {title:"title", author:"author", id:"id"},
        "render": function(data,type,row){
          return `<span class="book-title" data-author="${data.author}" data-title="${data.title}" data-id="${Number(data.id)-1}">${data.title}</span>`
        }
      },
      {
        "data" : {title:"title", author:"author", id:"id"},
        "render": function(data,type,row){
          return `<span class="book-title" data-author="${data.author}" data-title="${data.title}" data-id="${Number(data.id)-1}">${data.author}</span>`
        }
      },
      {
        "data" : {descr: "descr", title:"title", author:"author", id:"id"},
        "render" : function(data, type, row){
          return `<span  class="book-title" data-author="${data.author}" data-title="${data.title}" data-id="${Number(data.id)-1}">${data.descr.length>50?data.descr.substr(0,48):data.descr}</span>`
        }
      },
      {
        "data" : {tags:"size",title:"title", author:"author", id:"id"},
        "render" : function(data, type, row){
          return `<span  class="book-title" data-author="${data.author}" data-title="${data.title}" data-id="${Number(data.id)-1}">${data.size} mb</span>`
        }
      },
      {
        "data" : {tags:"tags",title:"title", author:"author", id:"id"},
        "render" : function(data, type, row){
          return `<span  class="book-title" data-author="${data.author}" data-title="${data.title}" data-id="${Number(data.id)-1}">${data.tags}</span>`
        }
      }
    ]
  });

  const getCovers = (arr=Books) => {
    let p = '';
    let Title = '';
    let Author = '';
    for (let i = 0; i< arr.length; i++){
      if(i===0){Title=arr[i].title;Author=arr[i].author}
      p+= `<img
        class="cover ${i===0?'active':''} index_${i}"
        data-title="${arr[i].title}"
        data-author="${arr[i].author}"
        data-index="${i}"
        width="120px"
        src="books/${arr[i].author}/${arr[i].title}.jpg">`;
    }
    $('#cover').css('display','none');
    $('#cover').html(p);
    $('#cover').fadeIn('slow');
    showTitle(Title, Author);
  }
  const showTitle = (title, author) => {
    const Title =
    `<p class="lead">
      <a href="books/${author}/${title}.pdf" class="btn btn-success btn-sm">
        <i class="fas fa-book-open"></i>
        Read
      </a>
      <a title="Add to favorite" href="#" class="btn btn-outline-danger btn-sm">
        <i class="fas fa-heart"></i>
      </a>
      ${title} - ${author}</p>`;
    $('#book-title').html(Title);
  }
  const scrollCover = (n) => {
    $('#cover').animate({scrollLeft:Number(n)*129}, 200);
  }
  const giveClass = (i) => {
    const el = $('#cover').find(`.index_${i}`);
    el.siblings().removeClass('active');
    el.addClass('active');
  }
  const readBook = (path) => {
    const currentPage = location.href;
    location = currentPage+path;
  }

  $('#cover').on('click', '.cover', function(){
    const index = $(this).data('index');
    const title = $(this).data('title');
    const author = $(this).data('author');
    showTitle(title, author);
    scrollCover(index);
    giveClass(index);
  });

  $('#nav').on('click', '.nav-item', function(){
    const item = $(this).data('item');
    $('#search-books').val(item);
    const covers = [];
    for(let i=0;i<Books.length;i++){
      if(Books[i].author === item || Books[i].tags === item){
        covers.push(Books[i]);
      }
    }
    getCovers(covers);
    myBookList.search(item).draw();
  });

  $('#books').on('click', '.book-title', function(){
    const id = $(this).data('id');
    const title = $(this).data('title');
    const author = $(this).data('author');
    showTitle(title, author);
    scrollCover(id);
    giveClass(id);
  });

  $('#books').on('dblclick', '.book-title', function(){
    const author = $(this).data('author');
    const title = $(this).data('title');
    const path = `books/${author}/${title}.pdf`
    readBook(path);
  });

  $('#cover').on('dblclick', '.cover', function(){
    const author = $(this).data('author');
    const title = $(this).data('title');
    const path = `books/${author}/${title}.pdf`
    readBook(path);
  });

  $('#search-books').on('keyup', function(e){
    e.preventDefault();
    const item = $(this).val();
    myBookList.search(item).draw();
  });

  $('#search-books').on('search', function(e){
    myBookList.search('').draw();
    getCovers();
  });

  fetchDb();
  getNav();
  getCovers();
});
