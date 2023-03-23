let txt2img_gallery1, img2img_gallery1, modal1 = undefined;

onUiUpdate(function(){
  if (!txt2img_gallery1) {
    txt2img_gallery1 = attachGalleryListeners1("txt2img")
  }
  if (!img2img_gallery1) {
    img2img_gallery1 = attachGalleryListeners1("img2img")
  }1
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
  gallery?.addEventListener('keydown', (e) => {
    if (e.keyCode == 37 || e.keyCode == 39) // left or right arrow
      gradioApp().getElementById(tab_name+"_exporter_button").click()
  });
  
  // 创建导出按钮
  const exporterButton = document.createElement("button");
  exporterButton.innerHTML = "Export";
  exporterButton.id = tab_name+"_exporter_button";
  exporterButton.style.display = "none";
  exporterButton.addEventListener("click", () => {
    const data = gradioInterface.inputs;
    exportData(JSON.stringify(data));
  });
  
  // 添加导出按钮
  const toolbar = gradioApp().querySelector(`#${tab_name}_generation_info_toolbar`);
  toolbar.appendChild(exporterButton);
    // 调整按钮样式
  exporterButton.style.backgroundColor = "red";
  exporterButton.style.color = "white";
  exporterButton.style.padding = "10px";
  exporterButton.style.border = "none";
  exporterButton.style.borderRadius = "5px";
  exporterButton.style.cursor = "pointer";
  exporterButton.style.marginLeft = "10px";
  
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
