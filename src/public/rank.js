const followBtn = document.querySelectorAll(".follow");
const cancelBtn = document.querySelectorAll(".cancel");
const userId = document.querySelector(".user-id");
const $test = document.querySelector(".test");

followBtn.forEach(tag => {
  tag.addEventListener("click", e => {
    if (userId) {
      const youtuberId = tag.parentNode.parentNode.querySelector(".youtuber-id").value;
      if (youtuberId) {
        axios.post(`/user/${youtuberId}/follow`)
          .then(res => {
            location.href = "/rank";
          })
          .catch(err => console.error(err));
      }
    }
  });
});

cancelBtn.forEach(el => {
  el.addEventListener("click", e => {
    if (userId) {
      const youtuberId = el.parentNode.parentNode.querySelector(".youtuber-id").value;
      if (youtuberId) {
        axios.post(`/user/${youtuberId}/unfollow`)
        .then(res => {
          location.href = "/rank";
        })
        .catch(err => console.error(err));
      }
    }
  });
});

$test.addEventListener("click", e => {
  axios.get("/user/test")
    .then(res => {
      const data = res.data;
    })
    .catch(err => console.error(err));
});