$(document).ready(function(){
  const Books = [
    {
      "id":"1",
      "title":"Better English Pronunciation",
      "author":"J.D O'Connor",
      "descr":"",
      "size":"5.3",
      "tags":"pronunciation"
    },
    {
      "id":"2",
      "title":"English Phonetics and Phonology 4th Edition",
      "author":"Peter Roach",
      "descr":"",
      "size":"9.2",
      "tags":"pronunciation"
    },
    {
      "id":"3",
      "title":"English Phonetics and Phonology",
      "author":"Philip Carr",
      "descr":"",
      "size":"2.3",
      "tags":"pronunciation"
    },
    {
      "id":"4",
      "title":"English Pronunciation in Use - Elementary",
      "author":"Jonathan Marks",
      "descr":"",
      "size":"42.7",
      "tags":"pronunciation"
    },
    {
      "id":"5",
      "title":"A Glossary of Phonology",
      "author":"Philip Carr",
      "descr":"",
      "size":"0.8",
      "tags":"pronunciation"
    },
    {
      "id":"6",
      "title":"The Wheel of Time",
      "author":"Robert Jordan",
      "descr":"",
      "size":"14.1",
      "tags":"fiction"
    },
    {
      "id":"7",
      "title":"Veronika Decides to Die",
      "author":"Paulo Coelho",
      "descr":"",
      "size":"20.0",
      "tags":"fiction"
    },
    {
      "id":"8",
      "title":"Full-Stack Web Development with Vue and Node",
      "author":"Aneeta Sharma",
      "descr":"",
      "size":"17.6",
      "tags":"programming"
    },
    {
      "id":"9",
      "title":"The Secrets of People Who Never Get Sick",
      "author":"Gene Stone",
      "descr":"Written by Gene Stone, a bestselling health-savvy journalist who's investigated, firsthand, virtually every form of regimen, diagnostic test, therapy, and fad, The Secrets of People Who Never Get Sick, a fascinating and original book of science, tells the stories of 25 people who each possess a different secret of excellent health—and shows how we can all use these insights to change our lives for the better",
      "size":"1.8",
      "tags":"health"
    },
    {
      "id":"10",
      "title":"Present Over Perfect",
      "author":"Shauna Niequist",
      "descr":"",
      "size":"1.5",
      "tags":"self improvement"
    },
    {
      "id":"11",
      "title":"The Open Games with Black",
      "author":"Martin Lokander",
      "descr":"",
      "size":"0.2",
      "tags":"chess"
    },
    {
      "id":"12",
      "title":"The Whole Brain Child",
      "author":"Daniel J. Siegel",
      "descr":"In this pioneering, practical book, Daniel J. Siegel, neuropsychiatrist and author of the bestselling Mindsight, and parenting expert Tina Payne Bryson offer a revolutionary approach to child rearing with twelve key strategies that foster healthy brain development, leading to calmer, happier children. The authors explain--and make accessible--the new science of how a child's brain is wired and how it matures. The \"upstairs brain,\" which makes decisions and balances... ",
      "size":"3.3",
      "tags":"kid education"
    },
    {
      "id":"13"
      ,"title":"How to Talk so People Listen",
      "author":"Bob Liebau",
      "descr":"",
      "size":"0.9",
      "tags":"self improvement"
    },
    {
      "id":"14"
      ,"title":"Teaching What You Don't Know",
      "author":"Therese Huston",
      "descr":"",
      "size":"0.9",
      "tags":"self improvement"
    },
    {
      "id":"15",
      "title":"The glass castle - A Memoir of Jeannette Walls",
      "author":"Jeannette Walls",
      "descr":"Jeannette Walls grew up with parents whose ideals and stubborn nonconformity were both their curse and their salvation. Rex and Rose Mary Walls had four children. In the beginning, they lived like nomads, moving among Southwest desert towns, camping in the mountains. Rex was a charismatic, brilliant man who, when sober, captured his children's imagination, teaching them physics, geology, and above all, how to embrace life fearlessly. Rose Mary, who painted and wrote and couldn't stand the responsibility of providing for her family, called herself an \"excitement addict.\" Cooking a meal that would be consumed in fifteen minutes had no appeal when she could make a painting that might last forever. Later, when the money ran out, or the romance of the wandering life faded, the Walls retreated to the dismal West Virginia mining town -- and the family -- Rex Walls had done everything he could to escape. He drank. He stole the grocery money and disappeared for days. As the dysfunction of the family escalated, Jeannette and her brother and sisters had to fend for themselves, supporting one another as they weathered their parents' betrayals and, finally, found the resources and will to leave home.What is so astonishing about Jeannette Walls is not just that she had the guts and tenacity and intelligence to get out, but that she describes her parents with such deep affection and generosity. Hers is a story of triumph against all odds, but also a tender, moving tale of unconditional love in a family that despite its profound flaws gave her the fiery determination to carve out a successful life on her own terms.For two decades, Jeannette Walls hid her roots. Now she tells her own story. A regular contributor to MSNBC.com, she lives in New York and Long Island and is married to the writer John",
      "size":"1.1",
      "tags":"biography"
    }
  ];

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
    // $(this).siblings().removeClass('active');
    // $(this).addClass('active');
    // console.log($(this));
    // console.log($(this).data())
    // giveClass($(this));
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
    // const id = $(this).data('id');
    // const path = $(this).data('path');
    const author = $(this).data('author');
    const title = $(this).data('title');
    const path = `books/${author}/${title}.pdf`
    readBook(path);
    // const currentPage = location.href;
    // location = currentPage+path;
    // console.log(currentPage, path);
  });
  $('#cover').on('dblclick', '.cover', function(){
    const author = $(this).data('author');
    const title = $(this).data('title');
    const path = `books/${author}/${title}.pdf`
    readBook(path);
  });
  // $('#books').on('click', '.book-title', function(){
  //   const author = $(this).data('author');
  //   const title = $(this).data('title');
  //   console.log(title, author);
  //   const el = `<img height="240px" src="./books/${author}/${title}.jpg">`;
  //   $('#cover').html(el);
  // });
  // var trs = document.getElementsByTagName('tr');
  //console.log(trs);
  // var span = document.getElementsByClassName('book-title')[0];
  // console.log(span);
  // const span = $('.book-title');
  // console.log(span);
  // console.log(typeof(span));
});
