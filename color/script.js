$(document).ready(function(){
  const colors = [
    {
      hex :"#2980b9",
      name: "#2980b9"
    },
    {
      hex :"#2c3e50",
      name: "#2c3e50"
    },
    {
      hex :"#27ae60",
      name: "#27ae60"
    },
    {
      hex :"#8e44ad",
      name: "#8e44ad"
    },
    {
      hex :"#cf000f",
      name: "#cf000f"
    },
    {
      hex :"#64ddbb",
      name: "#64ddbb"
    },
    {
      hex :"#f04903",
      name: "#f04903"
    },
    {
      hex :"#e01931",
      name: "#e01931"
    },
    {
      hex :"#3d8eb9",
      name: "#3d8eb9"
    },
    {
      hex :"#d2d7d3",
      name: "#d2d7d3"
    },
    {
      hex :"#282830",
      name: "#282830"
    },
    {
      hex :"#249991",
      name: "#249991"
    },
    {
      hex :"#e67e22",
      name: "#e67e22"
    },
    {
      hex :"#8e44ad",
      name: "#8e44ad"
    },
    {
      hex :"#d35400",
      name: "#d35400"
    },
    {
      hex :"#f1c40f",
      name: "#f1c40f"
    },
    {
      name:"fb",
      hex:"#3b5998",
    },
    {
      name:"wa",
      hex:"#64d448",
    },
    {
      name:"khan academy",
      hex:"#9cb443",
    },
    {
      name:"twitter",
      hex:"#00aced",
    },
    {
      name:"google+",
      hex:"#dd4b39",
    },
    {
      name:"linkedin",
      hex:"#007bb6",
    },
    {
      name:"learncodeonline",
      hex:"#6cdf58",
    },
    {
      name:"youtube",
      hex:"#bb0000",
    },
    {
      name:"pinterest",
      hex:"#cb2027",
    },
    {
      name:"vine",
      hex:"#00bf8f",
    },
    {
      name:"github",
      hex:"#171516",
    },
    {
      name: "snapchat",
      hex : "#fffa37"
    }
  ];
  const renderColors = () => {
    let cards = '';
    for (let i=0; i<colors.length; i++){
      const {name, hex} = colors[i];
      cards += `
      <div style="background-color:${hex};" class="col-3 color d-flex align-items-center justify-content-center">
        <span class="color-button">${name} ${name===hex?'':hex}</span>
      </div>`
    }
    $('#rows').html(cards);
  }
  renderColors();
});
