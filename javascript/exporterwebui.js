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
    modalObserver1.observe(modal1,  { attributes : true, attributeFilter : ['style'] });
  }



});




function createButton(id, innerHTML, onClick) {
  const button = document.createElement("button");
  button.id = id;
  button.type = "button";
  button.innerHTML = innerHTML;
  button.className = "gr-button gr-button-lg gr-button-secondary";
  button.style = `padding-left: 0.1em; padding-right: 0em; margin: 0.1em 0;max-height: 2em; max-width: 6em`;
  button.addEventListener("click", onClick);
  return button;
}

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

        const generateBtn = gradioApp().querySelector("#txt2img_generate");
  const actionsColumn = gradioApp().querySelector("#txt2img_actions_column");
  const nai2local = gradioApp().querySelector("#nai2local");

  if (!generateBtn || !actionsColumn || nai2local) return;

  generateBtn.addEventListener("click", onClickGenerate);

  const nai2LocalArea = document.createElement("div");
  nai2LocalArea.id = "nai2local";
  nai2LocalArea.className = "overflow-hidden flex col gap-4";
  nai2LocalArea.style = "padding: 0.4em 0em";

  const convertBtn = createButton(
    "exporter",
    "exporter",
    onClickExporter
  );

  nai2LocalArea.appendChild(convertBtn);
  actionsColumn.append(nai2LocalArea);

  });
  return gallery;
}
function onClickExporter(){
    const data = gradioInterface.inputs;
    exportData(JSON.stringify(data));
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
