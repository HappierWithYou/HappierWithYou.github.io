let password = document.getElementById("password");
let inputPass = "";
let correctPass = "0 5 0 5";
let currentClick = 0;

function writeAtype(type){
    if (type == 10){
        password.innerHTML = "Enter Our Password";
        display = "";
        inputPass = "";
        currentClick = 0;

    }
    else{
        currentClick++;
        if (inputPass.length<4){
            inputPass += type;
        }
        
        let display = inputPass.split("");

        while(display.length < 4){
            display.push("_");
        }
        password.innerText = display.join(" "); 
    }
    console.log(inputPass)
    if(password.innerText == correctPass){
        setTimeout(()=>{nextPage(2);},200)
    }
    else if(currentClick == 4){
        setTimeout(()=>{
            password.innerHTML = "Enter Our Password";
            display = "";
            inputPass = "";
            currentClick = 0;
        },200)
    }
}

function nextPage(page){
    document.getElementById(`page${page-1}`).style.display = "none";
    document.getElementById(`page${page}`).style.display = "flex";
}