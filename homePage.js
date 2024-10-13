const baseUrl = "https://tarmeezacademy.com/api/v1";

function getPosts() {
  const myElement = document.getElementById("post");
  axios.get(`${baseUrl}/posts?limit=50`).then((res) => {
    myElement.innerHTML = "";
    res.data.data.forEach((post) => {
      let tags = "";
      post.tags.forEach((tag) => {
        tags += `<a
                href="#"
                class="btn btn-secondary disabled mx-1"
                tabindex="-1"
                aria-disabled="true"
                >${tag.name}</a
              >`;
      });

      myElement.innerHTML += `
      <div class="card mt-5">
          <div class="card-header">
            <img
              class="rounded-circle border border-2"
              src="${post.author.profile_image}"
              alt=""
              style="width: 50px; height: 50px"
            />
            <b>@${post.author.username}</b>
          </div>
          <div class="card-body">
            <img class="w-100" src="${post.image}" alt="" />

            <h6 style="color: rgb(193, 193, 193)" class="mt-1">${post.created_at}</h6>

            <h5>${post.title}</h5>

            <p>
              ${post.body}
            </p>
            <hr />
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pen"
                viewBox="0 0 16 16"
              >
                <path
                  d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                />
              </svg>

              <span> (${post.comments_count}) Comments </span>
              ${tags}
            </div>
          </div>
        </div>`;
    });
  });
}

function loginBtn() {
  const username = document.getElementById("recipient-name").value;
  const password = document.getElementById("recipient-password").value;

  axios
    .post(`${baseUrl}/login`, {
      username: username,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      window.location.href = "home.html";
    });
}

function isLogin() {
  if (!localStorage.getItem("token")) return false;

  document.getElementById("login").innerHTML = `
  <button
    type="button"
    class="btn btn-primary"
    onclick="logOutBtn()"
  >
    Logout
  </button>
  `;
}

function logOutBtn() {
  localStorage.removeItem("token");
  window.location.href = "home.html";
}

function addPostBtn() {
  document.getElementById("addPostBtn").innerHTML = `
      <div style="cursor: pointer; position: fixed; bottom: 150px; right: 150px;" class="btn btn-primary">Add Post</div>
  `;
}

getPosts();
isLogin();
addPostBtn();
