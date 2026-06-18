
document.addEventListener("DOMContentLoaded",()=>{
$login=document.getElementById("login");
if($login){
$login.addEventListener("click",(e)=>{
e.preventDefault();    
$email=document.getElementById("email").value;
$pass=document.getElementById("password").value;
fetch("login.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: $email,
    password: $pass
  })
})
.then(res => res.json())
.then(data => {
  console.log(data);
  if (data.login==="success") {
    sessionStorage.setItem("username", data.name);
    sessionStorage.setItem("email",data.email);
    window.location.href="project.html";
  }
 else window.location.href="error.html";
})
.catch(err => console.error(err));
});
}});