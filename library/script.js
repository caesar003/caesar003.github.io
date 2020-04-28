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
  fetchDb();

  const getAlphabet = (arg) => {
    const allNames = [];
    const allAlph = [];
    for(let i = 0; i< Books.length;i++){
      arg === 'author'?
      allNames.push(Books[i].author)
      : allNames.push(Books[i].tags);
    }
    for(let j = 0; j< allNames.length; j++){
      allAlph.push(allNames[j][0]);
    }
    const Alphabet = [...new Set(allAlph)].sort();
    return Alphabet;
  }

  const getAuthors = (letter) => {
    const allAuthors = [];
    for(let i=0; i<Books.length; i++){
      if(Books[i].author[0].toLowerCase()===letter.toLowerCase()){
        allAuthors.push(Books[i].author);
      }
    }
    const Authors = [...new Set(allAuthors)].sort();
    return Authors;
  }
  const getTags = (letter) => {
    const allTags = [];
    for(let i=0; i<Books.length; i++){
      if(Books[i].tags[0].toLowerCase()===letter.toLowerCase()){
        allTags.push(Books[i].tags);
      }
    }
    const Tags = [...new Set(allTags)].sort();
    return Tags;
  }

  const getNav = () => {
    const allAuthors = getAlphabet('author');
    const allTags = getAlphabet();
    let renderedNav =
      `<details>
        <summary>Authors</summary>
        <ul>`;
        for(let i = 0; i< allAuthors.length; i++){
          const authors = getAuthors(allAuthors[i]);
          renderedNav +=
            `<details>
              <summary>${allAuthors[i]}</summary>
              <ul>`
              for (let j=0; j<authors.length; j++){
                renderedNav += `<li class="nav-item" data-item="${authors[j]}">${authors[j]}</li>`
              }
              renderedNav += `</ul>
            </details>`
        }
        renderedNav+=
        `</ul>
      </details>
      <details>
        <summary>Tags</summary>
        <ul>`;
        for(let k = 0; k<allTags.length; k++){
          const tags = getTags(allTags[k]);
          renderedNav +=
          `<details>
            <summary>${allTags[k]}</summary>
            <ul>`;
              for(let l = 0; l< tags.length; l++){
                renderedNav += `<li class="nav-item" data-item="${tags[l]}">${tags[l]}</li>`
              }
            renderedNav+=`</ul>
          </details>`
        }
        renderedNav+= `</ul>
      </details>`;
    $('#nav').html(renderedNav);
  }
  getNav();

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
  $('#nav').on('click', '.nav-item', function(){
    const item = $(this).data('item');
    myBookList.search(item).draw();
  });
  const getCovers = () => {
    let p = '';
    for (let i = 0; i< Books.length; i++){
      p+= `<img
        class="cover ${i===0?'active':''} index_${i}"
        data-title="${Books[i].title}"
        data-author="${Books[i].author}"
        data-index="${i}" width="120px"
        src="books/${Books[i].author}/${Books[i].title}.jpg">
      `;
    }
    $('#cover').html(p);
  }
  getCovers();
  const scrollCover = (n) => {
    $('#cover').animate({scrollLeft:Number(n)*100}, 200);
  }
  const giveClass = (i) => {
    const el = $('#cover').find(`.index_${i}`);
    el.siblings().removeClass('active');
    el.addClass('active');
  }
  $('#cover').on('click', '.cover', function(){
    const index = $(this).data('index');
    scrollCover(index);
    giveClass(index);
  });

  $('#books').on('click', '.book-title', function(){
    const id = $(this).data('id');
    scrollCover(id);
    giveClass(id);
  });
  const readBook = (path) => {
    const currentPage = location.href;
    location = currentPage+path;
  }
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
    const item = $(this).val();
    myBookList.search(item).draw();
  });
});
