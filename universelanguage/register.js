
  $('#register').on('submit', (e)=>{
    e.preventDefault();
    const formData = {
      name  : $('#name').val(),
      email : $('#email').val(),
      dateOfBirth : $('#dateOfBirth').val(),
      phone : $('#phone').val(),
      program : $('#program').val(),
      programDuration : $('input[name="programDuration"]:checked').val()
    }
    console.log(formData);
  });
  $('#program').on('change', () => {
    const selectedProgram = $('select[name="program"] option:selected').val();
    const thisCourse = Courses.find(course => course.title === selectedProgram);
    if(thisCourse){
      let options = '';
      for(let i=0; i<thisCourse.level.length; i++){
        const level = thisCourse.level[i];
        const x = 'level ';
        options += `<option value="">${isNaN(level)?level:x+ level}</option>`;
      }
      $('#programLevel').html(options);
    }
  });
