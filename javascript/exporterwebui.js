let txt2img_gallery1, img2img_gallery1, modal1 = undefined;

onUiUpdate(function(){
  if (!txt2img_gallery1) {
    txt2img_gallery1 = attachGalleryListeners1("txt2img")
  }
  if (!img2img_gallery1) {
    img2img_gallery1 = attachGalleryListeners("img2img")
  }
  if (!modal1) {
    modal1 = gradioApp().getElementById('lightboxModal')
    modalObserver1.observe(modal1,  { attributes : true, attributeFilter : ['style'] });
  }
});

let modalObserver1 = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutationRecord) {
    let selectedTab = gradioApp().querySelector('#tabs div button.bg-white')?.innerText
    if (mutationRecord.target.style.display === 'none' && selectedTab === 'txt2img' || selectedTab === 'img2img')
      gradioApp().getElementById(selectedTab+"_exporter_button").click()
  });
});

function attachGalleryListeners1(tab_name) {
  gallery = gradioApp().querySelector('#'+tab_name+'_gallery')
  gallery?.addEventListener('click', () => gradioApp().getElementById(tab_name+"_exporter_button").click());
  // gallery?.addEventListener('keydown', (e) => {
  //   if (e.keyCode == 37 || e.keyCode == 39) // left or right arrow
  //     gradioApp().getElementById(tab_name+"_exporter_button").click()
  // });
  console.log("tab_name")
  console.log(tab_name)
  
  // 创建导出按钮
  const exporterButton = document.createElement("button");
  exporterButton.innerHTML = "Export";
  exporterButton.id = tab_name+"_exporter_button";
  exporterButton.style.display = "none";
exporterButton.onclick = function() {
  let formValues = gradioApp().getInputValues();
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formValues));
  let dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "form-data.json");
  dlAnchorElem.click();
}
  exporterButton.className = "gr-button gr-button-lg gr-button-secondary";
  exporterButton.style = `padding-left: 0.1em; padding-right: 0em; margin: 0.1em 0;max-height: 2em; max-width: 6em`;

  // 创建新的div
  // const actionsColumn = document.createElement("div");
  // actionsColumn.id = `${tab_name}_actions_column`;
  // actionsColumn.className = "flex-shrink-0 pl-3 pr-3 pt-2 pb-2 text-right overflow-hidden";
  // actionsColumn.appendChild(exporterButton);

  // // 将新创建的div添加到页面上
  // const parent = gradioApp().querySelector('#'+tab_name+'_gallery')
  // parent.insertBefore(actionsColumn, parent.firstChild);
gallery.appendChild(exporterButton);
  return gallery;

}

function exportData(data) {
  const blob = new Blob([data], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'data.json';
  link.href = url;
  link.click();
}
