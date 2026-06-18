
document.addEventListener("DOMContentLoaded",()=>{
$save=document.getElementById("save_reg");
$save.addEventListener("click",(e)=>{
e.preventDefault();
$name=document.getElementById("name_reg").value;
$email=document.getElementById("email_reg").value;
$pass=document.getElementById("password_reg").value;


fetch("register.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: $name,
    email: $email,
    password: $pass
  })
})
.then(res => res.json())
.then(data => {
  console.log(data);
  if (data.status==="registered") {
  window.location.href="tapout.html";
}
})
.catch(err => console.error(err));

});});
