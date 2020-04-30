$(document).ready(function(){
  const Form = document.querySelector("#register");
  Form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData = {
      name  : $('#name').val(),
      dateOfBirth : $('#dateOfBirth').val(),
      phone : $('#phone').val(),
      program : $('#program').val(),
      programDuration : $('input[name="programDuration"]:checked').val()
    }
    // console.log(formData);
  });
});
