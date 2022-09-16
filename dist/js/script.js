const controls = document.querySelectorAll(".controls");

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
