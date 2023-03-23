let txt2img_gallery1, img2img_gallery1, modal1 = undefined;


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

function onExporter() {
  const data = gradioInterface.inputs;
    exportData(JSON.stringify(data));
}

onUiUpdate(function(){
   console.log("==========");
  const actionsColumn = gradioApp().querySelector("#txt2img_actions_column");
  const nai2local = gradioApp().querySelector("#nai2local");


  if (!actionsColumn || nai2local) return;
 console.log("==========1111");
 

  const nai2LocalArea = document.createElement("div");
  nai2LocalArea.id = "nai2local";
  nai2LocalArea.className = "overflow-hidden flex col gap-4";
  nai2LocalArea.style = "padding: 0.4em 0em";

  const convertBtn = createButton(
    "exporter",
    "exporter",
    onExporter
  );

  nai2LocalArea.appendChild(convertBtn);

  actionsColumn.append(nai2LocalArea);



  if (!txt2img_gallery1) {
    txt2img_gallery1 = attachGalleryListeners1("txt2img")
  }
  if (!img2img_gallery1) {
    img2img_gallery1 = attachGalleryListeners1("img2img")
  }
  // if (!modal1) {
  //   modal1 = gradioApp().getElementById('lightboxModal')
  //   modalObserver1.observe(modal1,  { attributes : true, attributeFilter : ['style'] });
  // }
});

// let modalObserver1 = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutationRecord) {
//     let selectedTab = gradioApp().querySelector('#tabs div button.bg-white')?.innerText
//     if (mutationRecord.target.style.display === 'none' && selectedTab === 'txt2img' || selectedTab === 'img2img')
//       gradioApp().getElementById(selectedTab+"_exporter_button").click()
//   });
// });

function attachGalleryListeners1(tab_name) {
  gallery = gradioApp().querySelector('#'+tab_name+'_gallery')
  gallery?.addEventListener('click', () => gradioApp().getElementById(tab_name+"_exporter_button").click());
  gallery?.addEventListener('keydown', (e) => {
    if (e.keyCode == 37 || e.keyCode == 39) // left or right arrow
      gradioApp().getElementById(tab_name+"_exporter_button").click()
  });
  // 创建导出按钮
  // const exporterButton = document.createElement("button");
  // exporterButton.innerHTML = "Export";
  // exporterButton.id = tab_name+"_exporter_button";
  // exporterButton.style.display = "none";
  // exporterButton.addEventListener("click", () => {
  //   const data = gradioInterface.inputs;
  //   exportData(JSON.stringify(data));
  // });
  
  // exporterButton.className = "gr-button gr-button-lg gr-button-secondary";
  // exporterButton.style = `padding-left: 0.1em; padding-right: 0em; margin: 0.1em 0;max-height: 2em; max-width: 6em`;

  // const nai2LocalArea = document.createElement("div");
  // nai2LocalArea.id = "nai2local";
  // nai2LocalArea.className = "overflow-hidden flex col gap-4";
  // nai2LocalArea.style = "padding: 0.4em 0em";
  // nai2LocalArea.appendChild(exporterButton);


  // const actionsColumn = gradioApp().querySelector(`#${tab_name}_actions_column`);

  // 添加导出按钮
  // const toolbar = gradioApp().querySelector(`#${tab_name}_generation_info_toolbar`);
  // toolbar.appendChild(exporterButton);

  
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
