function getPlot(id) {

  d3.json("data/samples.json").then((data)=> {
    console.log(data)

    var wfreq = data.metadata.map(d => d.wfreq)
    console.log(`Washing Freq: ${wfreq}`)

    var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);

    var samplesvalues = samples.sample_values.slice(0,10).reverse();
    
    var OTU_top =(samples.otu_ids.slice(0,10)).reverse();
    
    var OTU_id = OTU_top.map(d => 'OTU' + d)

    var labels = samples.otu_labels.slice(0.10);

    var bartrace = {
        x: samplesvalues,
        y: OTU_id,
        text: labels,
        marker:{
          color: 'bgr(195,124,142)'},
        type: 'bar',
        orientation: 'h',
    };

    var bardata = [bartrace];

    var barlayout = {
      title: "Top 10 OTU",
      yaxis: {
        tickmode: 'linear',
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30
      }
    };

    Plotly.newPolt('bar', bardata, barlayout);

    var bubbletrace ={
      x: samples.otu_ids,
      y: samples.sample_values,
      mode: 'markers',
      marker:{
        size: samples.sample_values,
        color: samples.otu_ids
      },
      text : samples.otu_labels
    };

    var bubblelayout = {
      xaxis:{title: "OTU ID"},
      height: 600,
      width: 1000
    };

    var bubbledata = [bubbletrace];


    Plotly.newPolt("bubble", bubbledata, bubblelayout);

    var g_data =[ {
      domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Weekly Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "red" },
                    { range: [2, 4], color: "orange" },
                    { range: [4, 6], color: "yellow" },
                    { range: [6, 8], color: "lime" },
                    { range: [8, 9], color: "green" },
                   ]}

      }
    ];

    var guagelayout ={
      width: 700,
      height:600,
      margin: { t: 20, b: 40, l:100, r:100 }               
    };
    Plotly.newPlot("gauge", g_data, guagelayout);
  });
}

function getInfo(id) {

  d3.json("data/samples.json").then((data) => {

      var metdata = data.metadata;

      console.log(metdata)

      var result = metadata.filter(meta => meta.id.toString() ===  id)[0];

      var demographicInfo = d3.select("#sample-metadata");

      demographicInfo.html("");

      Object.entries(result).forEach((key) => {
            demographicInfo.append("h6").text(`${key}:${value}`);  
        });

      });

    }  

function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}


function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
      console.log(data)


      data.names.forEach(function(name) {
        dropdown
        .append("option")
        .text(name)
        .property("value");
    });

    getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();