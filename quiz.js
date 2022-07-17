
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

const option_list = document.querySelector(".option_list");


start_btn.onclick = () =>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = () =>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = () =>{
    window.location.reload();
}


next_btn.onclick = () =>{
    if(que_count < questions.length -1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        next_btn.style.display = "none";
    }else{
        showResultBox();
    }
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " +questions[index].question +'</span>';
    let option_tag = '<div class="option">'+questions[index].options[0]+'<span></span></div>'
                     +'<div class="option">'+questions[index].options[1] +'<span></span></div>'
                     +'<div class="option">'+questions[index].options[2] +'<span></span></div>'
                     +'<div class="option">'+questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
         option[i].setAttribute("onclick","optionSelected(this)");              
    }
}

let tickIcon = '<div class="icon tick"><ion-icon name="checkbox-outline"></ion-icon></div>';
let crossIcon = '<div class="icon cross"><ion-icon name="close-circle-outline"></ion-icon></div>';


function optionSelected(answer){
    let userAns = answer.textContent;
    let allOptions = option_list.children.length;
    let correctAns = questions[que_count].answer;
    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }else{
        answer.classList.add("wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);

        for (let i = 0; i < allOptions; i++) {
              if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");   
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
           
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
         option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span>You scored<p>'+ userScore +'</p>out of<p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag; 
}







