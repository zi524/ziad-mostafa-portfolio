document.addEventListener("DOMContentLoaded", () => {
    const nameElem = document.getElementById("name");
    if (nameElem) {
        const username = sessionStorage.getItem("username");
        console.log(username);
        if (username) nameElem.textContent = username;
    }

   // const emailElem = "ziadmostafazaki67@gmail.com";//document.getElementById("email");
    /*console.log(emailElem);        
    if (emailElem) {
        const email = "ziadmostafazaki67@gmail.com"//sessionStorage.getItem("email");
        console.log(email);
        if (email) emailElem.textContent = email;

    } */ 
console.log(nameElem.textContent);    
//console.log(emailElem);        
    $submit=document.getElementById("submit");
    $submit.addEventListener("click",(e)=>{
    e.preventDefault();        
    $linked=document.getElementById("linked").value;
    $face=document.getElementById("face").value;
    $AI = document.getElementById("AI").checked ? 1 : 0;
    $PCB = document.getElementById("PCB").checked ? 1 : 0;
    $Embedded = document.getElementById("Embedded").checked ? 1 : 0;
    console.log("PCB:", document.getElementById("PCB").checked);
console.log("AI:", document.getElementById("AI").checked);
console.log("Embedded:", document.getElementById("Embedded").checked);
    
    
fetch("project.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
    email: "zi@gmail.com",
    PCB: ($PCB) ,
    ai: ($AI) ,
    Embedded: ($Embedded) ,
    facebook: $face,
    linkedIn: $linked
})

})
.then(res => res.json())
.then(data => {
  console.log(data);
  if (data.status==="updated") {
    window.location.href="happy_end.html";
}
 //else window.location.href="error.html";
})
.catch(err => console.error(err));
});});