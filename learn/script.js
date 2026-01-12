const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // 1️⃣ remove "active" from all tabs
    tabs.forEach(t => t.classList.toggle("active", t === tab));

    // 2️⃣ add "active" to clicked tab
    // tab.classList.add("active");

    // 3️⃣ get the tab key from data-tab
    const tabKey = tab.dataset.tab;

    // 4️⃣ hide all panels
    panels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === tabKey));

    // 5️⃣ show the panel with matching data-panel
    // panels.forEach(panel => {
    //     panel.classList.toggle("active", panel.dataset.panel === tabKey);
    // })
  });
});
