document.getElementById('calculateBtn').addEventListener('click', function() {
    const answers = {
      colerico: 0,
      sanguineo: 0,
      melancolico: 0,
      fleumatico: 0
    };
  
    const questions = document.querySelectorAll('.question');
  
    questions.forEach(question => {
      const selectedOption = question.querySelector('input:checked').value;
  
      switch (selectedOption) {
        case 'C':
          answers.colerico++;
          break;
        case 'S':
          answers.sanguineo++;
          break;
        case 'M':
          answers.melancolico++;
          break;
        case 'F':
          answers.fleumatico++;
          break;    
        default:
          break;
      }
    });
  
    // Exibir resultados
    alert(`Resultados:
  Colérico: ${answers.colerico}
  Sanguíneo: ${answers.sanguineo}
  Melancólico: ${answers.melancolico}
  Fleumático: ${answers.fleumatico}`);
  });
  