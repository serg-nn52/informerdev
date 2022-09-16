const controls = document.querySelectorAll(".controls");
const accept = document.querySelector("#accept");
const ok = document.querySelector("#ok");
const okWrapper = document.querySelector(".ok");
const send = document.querySelector("#send");
const form = document.querySelector(".form");
const popupTitle = document.querySelector(".popup__title");
const popup = document.querySelector(".popup");
const contactUs = document.querySelector(".footer__contact");
const closePopup = document.querySelector(".popup__close");

const removeValues = () => {
  form.name.value = form.email.value = form.message.value = null;
  ok.style.display = "none";
  accept.checked = false;
};

const removeErrors = () => {
  const errors = [...document.querySelectorAll(".error")];
  console.log(errors);
  errors.forEach((el) => el.classList.remove("error"));
};

for (let i = 0; i < controls.length; i++) {
  const slider = tns({
    container: `.slider__list${i}`,
    items: 4,
    autoplay: true,
    nav: false,
    autoplayButtonOutput: false,
    controlsContainer: [...controls][i],
    preventScrollOnTouch: "auto",
    controls: false,
    items: 2,
    responsive: {
      576: {
        items: 3,
      },
      768: {
        controls: true,
        items: 4,
      },
      1120: {},
    },
  });
}

accept.addEventListener("input", () => {
  accept.checked ? (ok.style.display = "block") : (ok.style.display = "none");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const sendData = {
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message"),
    accept: data.get("accept"),
  };

  sendData.name.trim().length < 2
    ? form.name.classList.add("error")
    : form.name.classList.remove("error");
  sendData.message.trim().length < 10
    ? form.message.classList.add("error")
    : form.message.classList.remove("error");

  !/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(sendData.email)
    ? form.email.classList.add("error")
    : form.email.classList.remove("error");

  !sendData.accept
    ? okWrapper.classList.add("error")
    : okWrapper.classList.remove("error");

  if (!document.querySelectorAll(".error").length) {
    removeValues();
    popupTitle.innerText = "Sending!";
    popupTitle.style.color = "#b71c1c";
    popupTitle.style.textAlign = "center";
  }
});

contactUs.addEventListener("click", () => {
  popup.classList.add("popup_enable");
  document.body.classList.add("freeze");
});

popup.addEventListener("click", (e) => {
  if (e.target === e.currentTarget || e.target === closePopup) {
    popup.classList.remove("popup_enable");
    document.body.classList.remove("freeze");
    removeValues();
    removeErrors();
  }
});
