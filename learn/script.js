const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.toggle("active", t === tab));

    const tabKey = tab.dataset.tab;

    panels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === tabKey));
  });
});
