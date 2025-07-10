const res1 = document.querySelector("#line1");
const res2 = document.querySelector("#line2");
res1.textContent=`Your Score : ${localStorage.getItem("score")}`;
res2.textContent=`Best Score : ${localStorage.getItem("high-score")}`;

// play again button
const but1 = document.querySelector("#again");
but1.addEventListener("click",()=>{
    window.location.href = "page1.html";
})