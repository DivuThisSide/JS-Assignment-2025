//                 PAGE-1 CODE
const cars_op = document.querySelectorAll(".cars");
cars_op.forEach((car) => {
    car.addEventListener("click", () => {
        localStorage.setItem("selectedCar", car.src);
        window.location.href = "page2.html";
    });
});


//                  PAGE-2 CODE BEGINS
const score = document.querySelector("#score");
const car_pos = document.querySelector("#my-car");
const area = document.querySelector("#area");
const opponents=[];

//        choosing my car
car_pos.src = localStorage.getItem("selectedCar");

//         timer operation
let points = 0;
let scoreboard = setInterval(()=>{
    points++;
    score.textContent=`Score:${points}`;
},1000)

// moving car forward
let lf=2;
car_pos.style.left=lf+"%";
function car_forward(){
    if(lf<=96){
        lf+=2;
        car_pos.style.left=lf+"%";
    }
};

// moving car backward
function car_backward(){
    if(lf>2){
        lf-=2;
        car_pos.style.left=lf+"%";
    }
};

//         movement of the car
const lanes = ["10vh","40vh","70vh"];
let lane=1;
car_pos.style.bottom=lanes[lane];
window.addEventListener("keydown",(e)=>{
    if((e.key=="ArrowUp" || e.key=="W") && lane<2){
        lane++;
        car_pos.style.bottom=lanes[lane];
    }
    else if((e.key=="ArrowDown" || e.key=="S")&&lane>0){
        lane--;
        car_pos.style.bottom=lanes[lane];
    }
    else if(e.key=="ArrowRight" || e.key=="D"){
        car_forward();
    }
    else if(e.key=="ArrowLeft" || e.key=="A"){
        car_backward();
    }
});

// opponent production
const opp_car_options = [
    "./opponent-cars/car1.png",
    "./opponent-cars/car2.png",
    "./opponent-cars/car3.png",
    "./opponent-cars/car4.png",
    "./opponent-cars/car5.png",
    "./opponent-cars/car6.png",
    "./opponent-cars/car7.png",
    "./opponent-cars/stone.png",
    "./opponent-cars/wood.png",
];

function opp_car() {
    const opponent = document.createElement("img");
    opponent.className+='opponent-car';
    const opp_car_img = opp_car_options[Math.floor(Math.random() * opp_car_options.length)];
    opponent.src = opp_car_img;
    area.appendChild(opponent);
    const lane = Math.floor(Math.random() * 3);
    opponent.style.bottom = lanes[lane];
    opponent.style.right = "0";
    area.appendChild(opponent);
    opponents.push(opponent);

    let rt = 0;
    const move = setInterval(() => {
        rt += 0.5;
        opponent.style.right = rt + "%";
        if (rt > 100) {
            const idx = opponents.indexOf(opponent);
            if (idx > -1) opponents.splice(idx, 1);
            opponent.remove();
            clearInterval(move);
        }
    }, 16);
}

// function-collision
function collide(car1,car2){
    let a = car1.getBoundingClientRect();
    let b = car2.getBoundingClientRect();
    
    return !(a.bottom<b.top || a.top>b.bottom || a.right<b.left || a.left>b.right);
}

const cars = setInterval(()=>{
    opp_car();
},1000)

// detecting collision of cars
const game = setInterval(()=>{
    opponents.forEach((opp_car)=>{
        if(collide(car_pos,opp_car)){
            clearInterval(scoreboard);
            clearInterval(game);
            clearInterval(cars);
            localStorage.setItem("score",points);
            const high_score = parseInt(localStorage.getItem("high-score"));
            if(points>high_score){
                localStorage.setItem("high-score",points);
            }
            opponents.forEach((opp)=>{opp.remove();})
            opponents.length=0;

            window.location.href = "page3.html";
        }
    })
}, 16);