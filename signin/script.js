$(document).ready(function(){

  const Users = [
    {
      name : "John Doe",
      email : "jdoe@mail.com",
      password : "secret",
    },
    {
      name : "Tom Smith",
      email : "toms@yahoo.com",
      password : "supersecret",
    },
    {
      name : "Alice Morton",
      email : "amorton@alice.co",
      password : "banana",
    }
  ];

  const Reg = (u) => {
    return Users.name === u || Users.email === u;
  }

  $('#register').on('submit', function(e){
    e.preventDefault();
    const name = $('#email').val();
    const password = $('#password').val();
    if(!name||!password){
      console.log('Please fill out all login credentials!');
    } else {
      if(Reg(name)){
        console.log('name exists');
      } else {
        console.log('user doesn\'t exists');
        console.log(name);
        for(let i=0;i<Users.length;i++){
          console.log(Users[i].email);
        }
      }
    }
    $('#form-feedback').fadeIn('slow');
  });
});
