let amount = document.getElementById("amount");
let category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const type = document.getElementById("type");
const btn = document.getElementById("btn");
const container = document.getElementById("container");
const main_container = document.getElementById("main-comtainer");

let src = "https://opentdb.com/api.php?";

async function fetchData(url) {
    try {
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        // document.querySelector('form').style.display='none';

        let currentQuestionIndex = 0;
        let score = 0;
        const totalQuestions = amount.value;
        const container = document.querySelector('#container');

        function displayQuestion(index) {
            container.innerHTML = ''; // Clear previous question and options

            if (index < totalQuestions) {
                const question = document.createElement('p');
                question.innerHTML = data.results[index].question;
                container.appendChild(question);

                let array = [];
                let incorrect_arr = data.results[index].incorrect_answers;
                let correct_arr = data.results[index].correct_answer;

                array.push(...incorrect_arr, correct_arr);
                let final_arr = shuffleArray(array);

                final_arr.forEach((answer) => {
                    const option = document.createElement('button');
                    container.appendChild(option);
                    option.classList.add('option_button');
                    option.innerText = answer;

                    option.addEventListener('click', (e) => {
                        if (e.target.innerHTML === correct_arr) {
                        
                           e.target.classList.add('correct');
                            score++;
                        
                            
                            console.log("Correct");
                        } else {
                            e.target.classList.add('incorrect');
                            console.log("Incorrect");
                        }
                        Array.from(container.children).forEach((button)=>{
                            if(button.innerHTML===correct_arr){
                                button.classList.add('correct');
                            }
                            button.disabled = true;
                        })

                        const next = document.createElement('button')
                        next.innerHTML = 'Next';
                        next.id = 'next';
                        container.appendChild(next);
                        // btn.style.display = 'block';
                        next.addEventListener('click',()=>{
                           currentQuestionIndex++;
                           displayQuestion(currentQuestionIndex)
                        })
                       
                    });
                });
            } else {
                const endMessage = document.createElement('p');
                endMessage.innerText = `Quiz Completed! You have scored ${score} out of ${totalQuestions}`;
                container.appendChild(endMessage);
               

            }
        }

        displayQuestion(currentQuestionIndex);
    

    
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function resetAll() {
  btn.style.display = "none";
  while (container.firstChild) {
    container.removeChild(container.firstChild);
   
  }
}

btn.addEventListener("click", (e) => {
  
 
    resetAll();
  submit();
  fetchData(
    src +
      `amount=${amount.value}` +
      `&category=${category.value}` +
      `&difficulty=${difficulty.value}` +
      `&type=${type.value}`
  );

});

function submit() {
  console.log("Submitted");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

