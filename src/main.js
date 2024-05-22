import "./style/index.css";
let info = document.getElementById("info");
let infoloader = document.getElementById("loader");
infoloader.style.display = "none";
let nouserfound = document.getElementById("nouserfound");
nouserfound.style.display = "none";

const btn1 = document.getElementById("btn");

function getUserInformationFetch() {
  nouserfound.style.display = "none";
  infoloader.style.display = "block";
  info.style.display = "none";
  const inputText = document.getElementById("gitusername");
  const gitUserName = inputText.value;
  const requstUrl = `https://api.github.com/users/${gitUserName}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", requstUrl);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const data = JSON.parse(this.responseText);
      console.log("data", data);
      const avatarPhoto = data.avatar_url;
      const userRepo = data.public_repos;
      const userFollower = data.followers;
      const userFollowing = data.following;
      const userName = data.name;
      const userBio = data.bio;
      const userCompany = data.company ? data.company : "@No company yet";

      document.getElementById("avatars").src = avatarPhoto;
      document.getElementById("repo").innerHTML = userRepo;
      document.getElementById("followers").innerHTML = userFollower;
      document.getElementById("following").innerHTML = userFollowing;
      document.getElementById("name").innerHTML = userName;
      document.getElementById("bio").innerHTML = userBio;
      if (data?.message?.includes("Not Found")) {
        nouserfound.style.display = "block";
        infoloader.style.display = "none";
        info.style.display = "none";
      } else {
        nouserfound.style.display = "none";
        document.getElementById("company").innerHTML = userCompany;
        infoloader.style.display = "none";
        info.style.display = "block";
      }
    }
  };
  xhr.send();
}
const inputValue = document.getElementById("gitusername");
inputValue.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    getUserInformationFetch();
  }
});
btn1.addEventListener("click", getUserInformationFetch);
