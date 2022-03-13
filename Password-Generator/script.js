const pwEL = document.getElementById("pw");
const copyEL = document.getElementById("copy");
const lengthEL = document.getElementById("length");
const numberEL = document.getElementById("number");
const lowerEL = document.getElementById("lower");
const upperEL = document.getElementById("upper");
const symbolEL = document.getElementById("symbol");
const generateEL = document.getElementById("generate");
const passwdEL = document.getElementById('passwd');
const upperletter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerletter = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = `!@#$%^&*()_+=-[]{};':".,<>/?~`;

function get_lowercase(){
     return upperletter[Math.floor(Math.random() * upperletter.length)]
}

function get_uppercase(){
     return lowerletter[Math.floor(Math.random() *  lowerletter.length)]

}

function get_numbers(){
     return numbers[Math.floor(Math.random() * numbers.length)]
}

function get_symbols(){
     return symbols[Math.floor(Math.random() * symbols.length)]
}

// alert(get_numbers());

function generate_passwd(){
     const len = lengthEL.value;
     password = ""; 
     for(let i=0 ; i<len; i++){
          const x = generateX();
          password += x;
     }

     // pwEL.innerText = password;
     // console.log(password);
     passwdEL.innerText = password;
}

function generateX(){
     const xs = [];
 if(upperEL.checked){
     xs.push(get_uppercase());
 }
 if(lowerEL.checked){
     xs.push(get_lowercase());
 }
 if(symbolEL.checked){
     xs.push(get_symbols());
 }
 if(numberEL.checked){
     xs.push(get_numbers());
 }
 if(xs.length === 0 ) return "";
 return xs[Math.floor(Math.random() * xs.length)];
}


generateEL.addEventListener('click', ()=>{
     generate_passwd();
});


copyEL.addEventListener('click', ()=>{
     const textarea  = passwdEL.innerText;
     if(textarea){
     navigator.clipboard.writeText(textarea);
     alert("Copied the text: " + textarea);
     }
})