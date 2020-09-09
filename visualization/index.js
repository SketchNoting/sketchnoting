// var data = [

//    {"id_": 1, "type": "experience", "Condition":"VR", 'say':'I didnt have much to say'},
//    {"id_": 2, "type": "experience", "Condition":"VR", 'say':'hello'},
//    {"id_": 3, "type": "experience", "Condition":"VR", 'say':'hihihihi'},
//    {"id_": 4, "type": "experience", "Condition":"VR", 'say':'hello'},
//    {"id_": 1, "type": "experience", "Condition":"2D", 'say':'hello'},
//    {"id_": 2, "type": "experience", "Condition":"2D", 'say':'hello'},

//    {"id_": 3, "type": "experience", "Condition":"2D"},
//    {"id_": 4, "type": "experience", "Condition":"2D"},
//    {"id_": 5, "type": "experience", "Condition":"2D"},
//    {"id_": 6, "type": "experience", "Condition":"2D"},
//    {"id_": 7, "type": "experience", "Condition":"2D"},
//    {"id_": 8, "type": "experience", "Condition":"2D"},
//    {"id_": 9, "type": "experience", "Condition":"2D"},

//    {"id_": 1, "type": "memory", "Condition":"VR"},
//    {"id_": 2, "type": "memory", "Condition":"VR"},
//    {"id_": 3, "type": "memory", "Condition":"VR"},
//    {"id_": 4, "type": "memory", "Condition":"VR"},
//    {"id_": 5, "type": "memory", "Condition":"VR"},
//    {"id_": 6, "type": "memory", "Condition":"VR"},

//    {"id_": 1, "type": "memory", "Condition":"2D"},
//    {"id_": 2, "type": "memory", "Condition":"2D"},
//    {"id_": 3, "type": "memory", "Condition":"2D"},
//    {"id_": 4, "type": "memory", "Condition":"2D"},
//    {"id_": 1, "type": "memory2", "Condition":"VR"},
//    {"id_": 2, "type": "memory2", "Condition":"VR"},
//    {"id_": 3, "type": "memory2", "Condition":"VR"},
//    {"id_": 4, "type": "memory2", "Condition":"VR"},
//    {"id_": 5, "type": "memory2", "Condition":"VR"},
//    {"id_": 1, "type": "memory2", "Condition":"2D"},
//    {"id_": 2, "type": "memory2", "Condition":"2D"},
//    {"id_": 3, "type": "memory2", "Condition":"2D"},
//    {"id_": 4, "type": "memory2", "Condition":"2D"}
//  ]
console.log('COUCOU')
var data_ = []; 
var idArray = {};
var globalArray = {};
var typearray = [];
 d3.csv("visualization/new.csv", function(dataCSV){
   // console.log(dataCSV)
   // d3.csv("data - Copy - Copy.csv", function(dataCSV){
   // delete dataCSV['2D First'];
   // delete dataCSV['Order']

   // console.log(JSON.stringify(dataCSV))
   // console.log(dataCSV)
   var Participant = dataCSV['Sketchnotes']   
   var arrayCoding = [];
   for (var property in dataCSV){
      if (dataCSV[property] == "" || dataCSV[property] == "?"){
         delete dataCSV[property]
      } else if (dataCSV[property] == "x" ){
         arrayCoding.push(property);
         delete dataCSV[property]
      }
      
   }

   // console.log(Participant)

   for (var coding in arrayCoding){
   //    console.log(arrayCoding, coding)
      var objectToCreate = JSON.parse(JSON.stringify(dataCSV));
      var concat = arrayCoding[coding]//+'_'+objectToCreate['Condition'].split('-')[0]


        
      if (idArray[concat] != undefined) {
         idArray[concat]++;
      }
      else {
         idArray[concat] = 1;
         globalArray[concat] = []
      }


      objectToCreate['type'] = arrayCoding[coding];
      // objectToCreate['concat'] = concat;
      objectToCreate['id_'] = idArray[concat];
   //    // objectToCreate['Condition'] = 0//objectToCreate['Condition'].split('-')[0];
      objectToCreate['part'] = parseInt(objectToCreate['Sketchnotes'])

      
   //    // // data_.push(objectToCreate);
      globalArray[concat].push(objectToCreate)


      objectToCreate['Sketchnotes'] = parseInt(objectToCreate['Sketchnotes'])
      // if (typearray.indexOf(arrayCoding[coding]) == -1) typearray.push(arrayCoding[coding]);

   }
}).then(()=>{
   console.log(globalArray)

   // console.log('HELLO', globalArray)
   for (var i in globalArray){

      var array = globalArray[i];
      // console.log(i)

      var arraySorted = array.sort(function(a, b) {
         return a.part - b.part;
     });
     for (var k = 0; k<arraySorted.length; k++){
         // console.log(k)
         arraySorted[k]['id_'] = k+1;
      }

     data_ = data_.concat(arraySorted)
   //   j++
   //   break;
   //   console.log(arraySorted)
   }
   // console.log(globalArray)

   launchViz(data_);
   console.log('HELLO', data_)
});
// launchViz(data);
function launchViz(data){


   data.sort(function(a, b) {
      return d3.ascending(a.type, b.type)
   })
      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 300},
         width = 3000 - margin.left - margin.right,
         height = 1300 - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleLinear()
               .range([0, width])
               
      var y = d3.scaleBand()
               .range([height, 0])
               .padding(0.001)
               


      // var colorParticipant = d3.scaleOrdinal(d3.schemeSet3);
      var colorParticipant  = d3.scaleLinear()
      // .interpolate(d3.interpolateHcl) 
      .range(["#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9", "#c203c8", "#fd9b39", "#888593", "#906407", "#98ba7f", "#fe6794", "#10b0ff", "#ac7bff", "#fee7c0", "#964c63", "#1da49c", "#0ad811", "#bbd9fd", "#fe6cfe", "#297192", "#d1a09c", "#78579e", "#81ffad", "#739400", "#ca6949", "#d9bf01", "#646a58", "#d5097e", "#bb73a9", "#ccf6e9", "#9cb4b6", "#b6a7d4", "#9e8c62", "#6e83c8", "#01af64", "#a71afd", "#cfe589", "#d4ccd1", "#fd4109", "#bf8f0e", "#2f786e", "#4ed1a5", "#d8bb7d", "#a54509", "#6a9276", "#a4777a", "#fc12c9", "#606f15", "#3cc4d9", "#f31c4e", "#73616f", "#f097c6", "#fc8772", "#92a6fe", "#875b44", "#699ab3", "#94bc19", "#7d5bf0", "#d24dfe", "#c85b74", "#68ff57", "#b62347", "#994b91", "#646b8c", "#977ab4", "#d694fd", "#c4d5b5", "#fdc4bd", "#1cae05", "#7bd972", "#e9700a", "#d08f5d", "#8bb9e1", "#fde945", "#a29d98", "#1682fb", "#9ad9e0", "#d6cafe", "#8d8328", "#b091a7", "#647579", "#1f8d11", "#e7eafd", "#b9660b", "#a4a644", "#fec24c", "#b1168c", "#188cc1", "#7ab297", "#4468ae", "#c949a6", "#d48295", "#eb6dc2", "#d5b0cb", "#ff9ffb", "#fdb082", "#af4d44", "#a759c4", "#a9e03a", "#0d906b", "#9ee3bd", "#5b8846", "#0d8995", "#f25c58", "#70ae4f", "#847f74", "#9094bb", "#ffe2f1", "#a67149", "#936c8e", "#d04907", "#c3b8a6", "#cef8c4", "#7a9293", "#fda2ab", "#2ef6c5", "#807242", "#cb94cc", "#b6bdd0", "#b5c75d", "#fde189", "#b7ff80", "#fa2d8e", "#839a5f", "#28c2b5", "#e5e9e1", "#bc79d8", "#7ed8fe", "#9f20c3", "#4f7a5b", "#f511fd", "#09c959", "#bcd0ce", "#8685fd", "#98fcff", "#afbff9", "#6d69b4", "#5f99fd", "#aaa87e", "#b59dfb", "#5d809d", "#d9a742", "#ac5c86", "#9468d5", "#a4a2b2", "#b1376e", "#d43f3d", "#05a9d1", "#c38375", "#24b58e", "#6eabaf", "#66bf7f", "#92cbbb", "#ddb1ee", "#1be895", "#c7ecf9", "#a6baa6", "#8045cd", "#5f70f1", "#a9d796", "#ce62cb", "#0e954d", "#a97d2f", "#fcb8d3", "#9bfee3", "#4e8d84", "#fc6d3f", "#7b9fd4", "#8c6165", "#72805e", "#d53762", "#f00a1b", "#de5c97", "#8ea28b", "#fccd95", "#ba9c57", "#b79a82", "#7c5a82", "#7d7ca4", "#958ad6", "#cd8126", "#bdb0b7", "#10e0f8", "#dccc69", "#d6de0f", "#616d3d", "#985a25", "#30c7fd", "#0aeb65", "#e3cdb4", "#bd1bee", "#ad665d", "#d77070", "#8ea5b8", "#5b5ad0", "#76655e", "#598100", "#86757e", "#5ea068", "#a590b8", "#c1a707", "#85c0cd", "#e2cde9", "#dcd79c", "#d8a882", "#b256f9", "#b13323", "#519b3b", "#dd80de", "#f1884b", "#74b2fe", "#a0acd2", "#d199b0", "#f68392", "#8ccaa0", "#64d6cb", "#e0f86a", "#42707a", "#75671b", "#796e87", "#6d8075", "#9b8a8d", "#f04c71", "#61bd29", "#bcc18f", "#fecd0f", "#1e7ac9", "#927261", "#dc27cf", "#979605", "#ec9c88", "#8c48a3", "#676769", "#546e64", "#8f63a2", "#b35b2d", "#7b8ca2", "#b87188", "#4a9bda", "#eb7dab", "#f6a602", "#cab3fe", "#ddb8bb", "#107959", "#885973", "#5e858e", "#b15bad", "#e107a7", "#2f9dad", "#4b9e83", "#b992dc", "#6bb0cb", "#bdb363", "#ccd6e4", "#a3ee94", "#9ef718", "#fbe1d9", "#a428a5", "#93514c", "#487434", "#e8f1b6", "#d00938", "#fb50e1", "#fa85e1", "#7cd40a", "#f1ade1", "#b1485d", "#7f76d6", "#d186b3", "#90c25e", "#b8c813", "#a8c9de", "#7d30fe", "#815f2d", "#737f3b", "#c84486", "#946cfe", "#e55432", "#a88674", "#c17a47", "#b98b91", "#fc4bb3", "#da7f5f", "#df920b", "#b7bbba", "#99e6d9", "#a36170", "#c742d8", "#947f9d", "#a37d93", "#889072", "#9b924c", "#23b4bc", "#e6a25f", "#86df9c", "#a7da6c", "#3fee03", "#eec9d8", "#aafdcb", "#7b9139", "#92979c", "#72788a", "#994cff", "#c85956", "#7baa1a", "#de72fe", "#c7bad8", "#85ebfe", "#6e6089", "#9b4d31", "#297a1d", "#9052c0", "#5c75a5", "#698eba", "#d46222", "#6da095", "#b483bb", "#04d183", "#9bcdfe", "#2ffe8c", "#9d4279", "#c909aa", "#826cae", "#77787c", "#a96fb7", "#858f87", "#fd3b40", "#7fab7b", "#9e9edd", "#bba3be", "#f8b96c", "#7be553", "#c0e1ce", "#516e88", "#be0e5f", "#757c09", "#4b8d5f", "#38b448", "#df8780", "#ebb3a0", "#ced759", "#f0ed7c", "#e0eef1", "#0969d2", "#756446", "#488ea8", "#888450", "#61979c", "#a37ad6", "#b48a54", "#8193e5", "#dd6d89", "#8aa29d", "#c679fe", "#a4ac12", "#75bbb3", "#6ae2c1", "#c4fda7", "#606877", "#b2409d", "#5874c7", "#bf492c", "#4b88cd", "#e14ec0", "#b39da2", "#fb8300", "#d1b845", "#c2d083", "#c3caef", "#967500", "#c56399", "#ed5a05", "#aadff6", "#6685f4", "#1da16f", "#f28bff", "#c9c9bf", "#c7e2a9", "#5bfce4", "#e0e0bf", "#e8e2e8", "#ddf2d8", "#9108f8", "#932dd2", "#c03500", "#aa3fbc", "#547c79", "#9f6045", "#04897b", "#966f32", "#d83212", "#039f27", "#df4280", "#ef206e", "#0095f7", "#a5890d", "#9a8f7f", "#bc839e", "#88a23b", "#e55aed", "#51af9e", "#5eaf82", "#9e91fa", "#f76c79", "#99a869", "#d2957d", "#a2aca6", "#e3959e", "#adaefc", "#5bd14e", "#df9ceb", "#fe8fb1", "#87ca80", "#fc986d", "#2ad3d9", "#e8a8bb", "#a7c79c", "#a5c7cc", "#7befb7", "#b7e2e0", "#85f57b", "#f5d95b", "#dbdbff", "#fddcff", "#6e56bb", "#226fa8", "#5b659c", "#58a10f", "#e46c52", "#62abe2", "#c4aa77", "#b60e74", "#087983", "#a95703", "#2a6efb", "#427d92", "#78735c", "#c13c4b", "#437dae", "#9f5f95", "#51886f", "#74838a", "#8e7c5c", "#6e8f60", "#ae7764", "#e6409e", "#be7376", "#9790a8", "#da763c", "#d178c0", "#cf9641", "#66c466", "#94b0ec", "#9db6c6", "#72c2e4", "#70c3ff", "#94ce44", "#bcb8e8", "#73d1e5", "#accbb9", "#ddbb99", "#eeb91b", "#1efcaf", "#bef255", "#926b7c", "#fe6ab0", "#76e4e6", "#ebf219", "#5b4aff", "#bd61dc", "#9e969f", "#bda441", "#e18bcc", "#a9b0b8", "#fc81c6", "#eecc7d", "#eac6fc", "#fecfb3", "#5e7a4e", "#c3268c", "#8d6b48", "#3a8639", "#a66b09", "#877cbd", "#a579a4", "#e74654", "#b97901", "#d772a9", "#25bf83", "#8db15d", "#17bae3", "#e48e3a", "#5abea2", "#b0a892", "#d39e02", "#5cc2c5", "#caa3ed", "#d9a0c8", "#cda9b5", "#a9bfe3", "#ccc9dd", "#6fec8d", "#e9cdc9", "#b2ecb0", "#aa3a41", "#68716c", "#a43fd1", "#0b81a5", "#b34487", "#bc4f03", "#86719c", "#e00251", "#7a70fa", "#a76d8f", "#937b79", "#898687", "#e008ff", "#9388b5", "#709d4f", "#af8e3c", "#81a0a7", "#bc8c6d", "#fd563a", "#5ab166", "#93b391", "#91b5a8", "#b5b43c", "#c9a7d4", "#18d4b9", "#2ddb73", "#ccbdcc", "#e2bc5f", "#cac7a7", "#e5bde3", "#f8b4fc", "#d5d8d8", "#b9f5f4", "#ba1f2e", "#98557f", "#807002", "#825cd0", "#048953", "#b65076", "#7077b0", "#b35b64", "#aa672c", "#c040b9", "#6e81a7", "#249494", "#6a8d84", "#9e7e4b", "#6891d8", "#848bc6", "#d27010", "#a48acb", "#829ab9", "#8e97a9", "#76a285", "#98996c", "#fb7161", "#fd7a2c", "#c0a8a1", "#a7b762", "#b2aec8", "#a5ca79", "#aed8b2", "#cfe5fc", "#b2f1d7", "#6a6475", "#647761", "#358182", "#996abb", "#169987", "#3e99c2", "#ac928c", "#b68bf4", "#f1ac49", "#c1c6cd", "#1ce7ce", "#895391", "#4865db", "#45804c", "#597d2a", "#9c54a9", "#6c6bd3", "#83752e", "#9e52e2", "#b5569a", "#e31c34", "#848b12", "#ac6adc", "#948493", "#1aa34a", "#957be4", "#c664b1", "#dc596a", "#bf76c4", "#ab9927", "#be8cb4", "#a39bc8", "#e76cda", "#12c131", "#84aacb", "#c39a6b", "#84afbd", "#e38ead", "#84bb8b", "#6dce94", "#83cccc", "#fda4c4", "#30e5af", "#ffb1a8", "#b5d5e0", "#e2d037", "#38f1fd", "#beec77", "#9cf65e", "#e6e593", "#ebdff5", "#d9f892", "#6a5e9e", "#3d745f", "#4c7509", "#706c9c", "#83677e", "#be345f", "#695dfa", "#5c7987", "#797170", "#966459", "#d40c62", "#628564", "#b65c45", "#528b2c", "#b76e4c", "#e93d30", "#6f909f", "#7e9989", "#7f9a77", "#f615e0", "#53a5bc", "#f2528f", "#fd4a5e", "#9c9e83", "#bf9186", "#c786d3", "#2abd68", "#a3a3a7", "#8ab340", "#e48f6c", "#b2aeab", "#f4908c", "#b5b697", "#6fcbb6", "#14d1f5", "#e9a5a3", "#d5b0a1", "#f799df", "#c7bdbb", "#8ad5b5", "#f2b6bc", "#dcc99b", "#f4bd97", "#a8dcca", "#8beecd", "#d1dbcb", "#bfea08", "#e2d9d0", "#cfe3de", "#c7e8c4", "#e2e64f", "#acefff", "#5efdfb", "#f2e4a9", "#4a6b95", "#a1388c", "#6e51dc", "#a04a51", "#9a617d", "#d0533b", "#e8148f", "#7d8b4f", "#c16833", "#b8742c", "#a566fa", "#ad815e", "#c57561", "#919434", "#e25aad", "#3da2fd", "#ce70dd", "#e17d04", "#af9c6d", "#7eaca5", "#cc8d8e", "#cd83ec", "#b897bf", "#ada561", "#ae9cde", "#7fbb6f", "#c4a98b", "#acb47a", "#d2a55d", "#a5c141", "#92cee7", "#cdc47c", "#85e508", "#08fd6a", "#63fd10", "#feceeb", "#d5f4aa", "#5a61b2", "#88537f", "#556c76", "#4b6f6f", "#795f64", "#8c5560", "#805d55", "#566f4f", "#6f6838", "#a6422b", "#905806", "#b203cc", "#776d79", "#33816b", "#547a6b", "#71744d", "#c72d29", "#856c6d", "#3f79dc", "#c54962", "#d5324b", "#86778b", "#2c9436", "#6d881c", "#b24be3", "#9770a1", "#827c96", "#b5617a", "#c7592b", "#967b30", "#4b940b", "#7a8672", "#4e944f", "#e54702", "#4b8cf0", "#8588a5", "#7d8db4", "#848e98", "#4f9c91", "#c8688a", "#dd40e2", "#6c9f32", "#c3749c", "#1da890", "#c563fe", "#a888aa", "#4fa4a8", "#e66635", "#659fca", "#6ca3ef", "#11b3cc", "#a898af", "#93a57c", "#9aa0bd", "#95a4ab", "#ea7977", "#ff5acc", "#be97a5", "#f07d5a", "#64b6c4", "#6bbd92", "#fe6ce4", "#83c1a8", "#8fbfbf", "#c1b805", "#d8ae02", "#a9bcb6", "#eca27a", "#8ec0fe", "#bbb8c4", "#c9b78f", "#fc9e5c", "#a0cc02", "#c9b2e7", "#e3b178", "#c8c544", "#e4b7c9", "#73dead", "#b7d349", "#bbd19b", "#6feada", "#e6d5e2", "#eed7ad", "#e7d6fe", "#fcd6dc", "#73ffce", "#a8fbb3", "#9eff99", "#c9f8d7", "#f3ead6", "#a9307b", "#a3405f", "#34774d", "#8a40f0", "#7e6297", "#b815ad", "#c90a4c", "#856926", "#727223", "#825eb5", "#816c58", "#627694", "#39845f", "#cf3574", "#4f8bb4", "#468f9b", "#7b8483", "#8185da", "#dd5c51", "#a78485", "#de5a80", "#ff2e6a", "#bd8739", "#2fa8e2", "#929c93", "#8c9ad3", "#21b3aa", "#fe6616", "#fc4dfc", "#46b8f3", "#a3ad98", "#80c03e", "#a5b0c5", "#68d17e", "#aebdc5", "#99dc87", "#bccee6", "#ebc74d", "#b5e18b", "#dedd74", "#a44c73", "#6c7ad7", "#ec2f05", "#bd5bc6", "#549772", "#b57c87", "#ab7dc6", "#f823ae", "#929d51", "#73a966", "#61af32", "#d48543", "#43c808", "#fb7ca1", "#e49c3d", "#f69704", "#97c0a2", "#b3c27b", "#b9bfae", "#c5c062", "#48e246", "#d6c0b4", "#b7cdfe", "#d7c3ec", "#c7e24f", "#a0ebed", "#c9e0e6", "#ae390e", "#607435", "#943ce1", "#a809e8", "#6c6e78", "#8d5f8e", "#84698d", "#99653a", "#7f6ac3", "#c24944", "#577eba", "#698080", "#9f696a", "#cd03e8", "#a36e7e", "#3c9179", "#5a82da", "#987b86", "#ca5686", "#bf675b", "#de2fb7", "#cf51be", "#c97485", "#6ca1ae", "#7d9cfe", "#ec6c9c", "#e57fbe", "#b0a5b2", "#ca96df", "#abaee3", "#a5b992", "#e0a7e0", "#e2a7fe", "#0cdfd9", "#a2d1cc", "#8ad7ca", "#dabafd", "#eac0b1", "#9ce96c", "#fed46d", "#f1e106", "#96409b", "#5d6a6c", "#915533", "#8756a0", "#826170", "#6d6c64", "#a35123", "#0e7d93", "#6d6d83", "#9c5660", "#3f8000", "#4f61ff", "#097cb0", "#4c779a", "#a54d89", "#c12876", "#a45751", "#af4f2f", "#73776c", "#db0118", "#6c834f", "#0685df", "#8668df", "#028daa", "#a164a6", "#6a8193", "#4c7aff", "#d23699", "#93758a", "#d14856", "#c55c05", "#9172c2", "#b0659a", "#858367", "#a8753a", "#0c90d9", "#93816e", "#6d914b", "#c53cfe", "#668eaa", "#d05198", "#5d9481", "#c3666c", "#3a9d5f", "#f61236", "#b76bb2", "#9a884d", "#4ea456", "#45a634", "#b4841a", "#cf5ae2", "#a58895", "#92918e", "#869d02", "#b572f6", "#7e99ab", "#a285e5", "#e553d6", "#d867c1", "#33af78", "#a89275", "#b382df", "#5faa90", "#f06082", "#cf7e82", "#7ea695", "#8fa2ca", "#ca8d9f", "#e47c90", "#5cb5b3", "#07bea3", "#c099b5", "#96ad9b", "#a3a0fa", "#a0b33f", "#c496f7", "#07c99d", "#e7945b", "#83b9d2", "#0ad13c", "#7dc513", "#baabec", "#e992e4", "#18cfc7", "#b0b6d7", "#c2b1c6", "#ef9ab1", "#c2b87b", "#d1b361", "#82cd5b"]);
      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("#resultsGraph").append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
      .append("g")
         .attr("transform", 
               "translate(" + margin.left + "," + margin.top + ")");

      // get the data

      //   if (error) throw error;

      // format the data

      // Scale the range of the data in the domains
      y.domain(data.map(function(d) { return d.type; }));



      // var scaleX = d3.scaleLinea();

      // append the rectangles for the bar chart
      var place = svg.selectAll(".bar")
            .data(data)
            .enter().append('g').attr('class', 'bar')
            .style('cursor', 'pointer')
            .attr("transform", function(d) {
               // console.log(y(d.type))
               return "translate(-15, " +  (y(d.type)+5)+")"; 
            })
            .on("mouseover", function(d) {	
               
               // console.log(d)
               var BB = d3.select(this).node().getBoundingClientRect();
               // console.log(BB)
               div.transition()		
                  .duration(0)		
                  .style("opacity", .9);		
               // div.html(d.Sketchnotes)	
               //    .style("left", (BB.x +10) + "px")		
               //    .style("top", (window.scrollY + BB.y - 35) + "px");
               // console.log('<img src=Viz/image '+d.Sketchnotes+'.jpg>')	
               div.html('<img src="visualization/Viz/image ('+d.part+').jpg">')	
                  .style("left", (BB.x +10) + "px")		
                  .style("top", (window.scrollY + BB.y - 35) + "px");	
               })					
               .on("mouseout", function(d) {		
                     div.transition()		
                        .duration(0)		
                        .style("opacity", 0);	
               });


         // MY BAR ==> GROUP OF BARS
            var g = place.append('g')
            .attr("transform", function(d) {
               // if (d.type == "Personal - Making it personal" && d.Condition == "VR") console.log(d)

               var y = 0//y1(d.Condition);
               var x = (Math.ceil (d.id_));
               var y2 = (d.id_ - x) * 25; 
               return "translate("+(x*38)+","+(y2)+")"; 
            
            })
            
         g.append("rect")
            .attr("class", "bar")
            .attr("x", -1)
            .attr("width", 35)
            .attr("y", -2)
            .attr("height",28)
            // .attr("fill",function(d,i){ 
            //    if (d.part == 13) return 'red'
            // })
            .attr('stroke', 'black')
            .attr("fill",function(d,i){ 
               // if (d.type == "Personal - Making it personal" && d.id_ == 1) return 'red'
               // else  
               return 'white';//colorParticipant(d.part) 
            });//console.log(dParticipant)})

         g.append('text')
         .text(function(d){
            return '#' + d.part
         })
         .attr('dy', 15)
         .attr('dx', 15)
         .attr('text-anchor', 'middle')
         // g.append("svg:image")
         // .attr('x', 0)
         // .attr('y', 0)
         // .attr('width', 20)
         // .attr('height', 20)
         // .attr("xlink:href", function(d,i){
         //    // console.log(d.type.split('-')[0])
         //    // if (d.type == "Not Enjoy - any verbal expression/word of non-enjoyment (sigh, frustration, dislike, uncomfort)")  return  "visualization/images/unejoy.png";
         //    // if (d.type == "Personal - Making it personal")  return  "visualization/images/personnal.png";
         //    // if (d.type == "World - Reference to the Real World") return  "visualization/images/earth.png";
         //    // if (d.type.split('-')[0] == "Enjoy ") return "visualization/images/enjoy.png";
         //    // if (d.type.split('-')[0] == "Challenging ") return "visualization/images/challenging.png";
         //    // if (d.type.split('-')[0] == "Aesthetics") return "visualization/images/aesthetic.png";


         //    // if (d.type == "Perception - about different ways they perceive the pictograph or shape or 2d or vr") return "visualization/images/perception.png";
         //    // if (d.type == "Senses - Referece to Physical Senses") return "visualization/images/senses.png";
         //    return  "visualization/images/avatar.png";
         //    // console.log(d)
            

         // })
         // // .attr("xlink:href", "visualization/avatar.png")
         // .attr('class', 'svgimg')

      // add the x Axis
//   svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x));

// add the y Axis
svg.append("g").call(d3.axisLeft(y));

// console.log(d3.axisLeft(y))

      var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);



            
           
     
};