let txt2img_gallery1, img2img_gallery1, modal1 = undefined;

onUiUpdate(function(){
  if (!txt2img_gallery1) {
    txt2img_gallery = attachGalleryListeners1("txt2img")
  }
  if (!img2img_gallery1) {
    img2img_gallery = attachGalleryListeners1("img2img")
  }
  if (!modal1) {
    modal1 = gradioApp().getElementById('lightboxModal')
    modalObserver.observe(modal1,  { attributes : true, attributeFilter : ['style'] });
  }
});

let modalObserver1 = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutationRecord) {
    let selectedTab = gradioApp().querySelector('#tabs div button.bg-white')?.innerText
    if (mutationRecord.target.style.display === 'none' && selectedTab === 'txt2img' || selectedTab === 'img2img')
      gradioApp().getElementById(selectedTab+"_exporter_info_button").click()
  });
});

function attachGalleryListeners1(tab_name) {
  gallery = gradioApp().querySelector('#'+tab_name+'_gallery')
  gallery?.addEventListener('click', () => gradioApp().getElementById(tab_name+"_exporter_info_button").click());
  gallery?.addEventListener('keydown', (e) => {
    if (e.keyCode == 37 || e.keyCode == 39) // left or right arrow
      gradioApp().getElementById(tab_name+"_exporter_info_button").click()
  });
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

gradio.callbacks.push({
  on_export: function() {
    const data = gradioInterface.inputs;
    exportData(JSON.stringify(data));
  }
});
