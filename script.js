window.onload = () => {
  // navigation stuff
  window.articles = Array.from(document.querySelectorAll("article"));
  if (location.hash) {
    setArticle(location.hash.slice(1));
  } else {
    setArticle("home");
  }

  // animate on scroll into view
  document.querySelectorAll(".onview").forEach((element) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);
  });
  // padding
  document.querySelector("main").style.paddingTop = `${
    document.querySelector("header").offsetHeight
  }px`;

  let navbar = document.querySelector("header");
  window.onscroll = () => {
    if (window.scrollY * 1.25 > navbar.offsetHeight) {
      navbar.style.top = -navbar.offsetHeight + "px";
    } else if (window.scrollY < navbar.offsetHeight) {
      navbar.style.top = 0;
    }
  };
};

function setArticle(id) {
  if (!articles.map((e) => e.id).includes(id)) {
    id = "home";
  }
  articles.forEach((article) => {
    if (article.id == id) {
      article.removeAttribute("hidden");
    } else {
      article.setAttribute("hidden", "");
    }
  });
}

window.addEventListener("hashchange", () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => setArticle(location.hash.slice(1)));
  } else {
    setArticle(location.hash.slice(1));
  }
});
