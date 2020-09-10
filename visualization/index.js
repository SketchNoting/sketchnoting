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
      var margin = {top: 20, right: 20, bottom: 30, left: 450},
         width = 4500 - margin.left - margin.right,
         height = 1100 - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleLinear()
               .range([0, width])
               
      var y = d3.scaleBand()
               .range([height, 0])
               .padding(0.001)
               


      // var colorParticipant = d3.scaleOrdinal(d3.schemeSet3);
      var colorParticipant  = d3.scaleLinear();

      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("#resultsGraph").append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
      .append("g")
         .attr("transform", 
               "translate(" + margin.left + "," + margin.top + ")");



      var max = width;  
      var minX = -320

      addBG(svg, minX, max,0, 300, 'red');   
      addBG(svg, minX, max,300, 240, 'green');     
      addBG(svg, minX, max,540, 120, 'blue');     
      addBG(svg, minX, max,660, 120, 'red'); 
      addBG(svg, minX, max,780, 270, 'green'); 
      // addBG(svg, max,300, 180, 'red');      

      // var path = makeCurlyBrace(100, 100, 100, 400, 1, 1)
      var X = -190
      appendBracket(svg, X, 0, X, 150, 'Color', 10, 0.6);
      appendBracket(svg, X, 150, X, 240, 'Font', 5, 0.6)
      appendBracket(svg, X, 240, X, 300, 'Border', 5, 0.6)
      appendBracket(svg, X, 300, X, 360, 'Separator', 5, 0.6)

      appendBracket(svg, X, 360, X, 470, 'Grouping', 5, 0.6)
      appendBracket(svg, X, 470, X, 540, 'Connector', 5, 0.6)

      appendBracket(svg, X, 540, X, 660, 'Layout', 5, 0.6)
      appendBracket(svg, X, 660, X, 780, 'Digital/Analog', 5, 0.6)
      appendBracket(svg, X, 780, X, 900, 'Text', 5, 0.6)
      appendBracket(svg, X, 900, X, 1050, 'Image', 5, 0.6)


      var X = -320
      appendBracket(svg, X, 0, X, 300, 'Visual Style', 10, 0.6)
      appendBracket(svg, X, 300, X, 540, 'Structure', 10, 0.6)
      appendBracket(svg, X, 540, X, 660, 'Layout', 10, 0.6)
      appendBracket(svg, X, 660, X, 780, 'Digital/Analog', 10, 0.6)
      appendBracket(svg, X, 780, X, 1050, 'Content', 10, 0.6)
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
                  .style("opacity", 1);		
               // div.html(d.Sketchnotes)	
               //    .style("left", (BB.x +10) + "px")		
               //    .style("top", (window.scrollY + BB.y - 35) + "px");
               // console.log('<img src=Viz/image '+d.Sketchnotes+'.jpg>')	
               div.html('<img src="visualization/Viz/image ('+d.part+').jpg">')	
                  .style("left", (BB.x + 50) + "px")		
                  .style("width", "400px")		
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
               return "translate("+(x*30)+","+(y2)+")"; 
            
            })
            
         g.append("rect")
            .attr("class", "bar")
            // .attr("x", -1)
            .attr("width", 25)
            // .attr("y", -2)
            .attr("height", 25)
            // .attr("fill",function(d,i){ 
            //    if (d.part == 13) return 'red'
            // })
            .attr('stroke', 'black')
            .attr("fill",function(d,i){ 
               // if (d.type == "Personal - Making it personal" && d.id_ == 1) return 'red'
               // else  
               return 'white';//colorParticipant(d.part) 
            });//console.log(dParticipant)})

         // g.append('text')
         // .text(function(d){
         //    return '#' + d.part
         // })
         // .attr('dy', 15)
         // .attr('dx', 15)
         // .attr('text-anchor', 'middle')
         g.append("image")
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 25)
            .attr('height', 25)
            .attr('class', 'imageThumbnail')
            .attr("xlink:href", function(d,i){
               // return  "visualization/images/avatar.png";
               return  "visualization/Viz/image ("+d.part+")Cropped.jpg";
            })
            


svg.append("g").call(d3.axisLeft(y));

// console.log(d3.axisLeft(y))

      var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);



        

};
function appendBracket(svg, x1, y1, x2, y2, txt, p1, p2){
   bracket = svg.append("path").attr("class","curlyBrace");
   bracket.attr("d", function(d) { return makeCurlyBrace(x1, y1+5, x2, y2-5, p1, p2); });
   bracket.attr('fill', 'none')
   bracket.attr('stroke-width', '2px')
   bracket.attr('stroke', 'black')

   svg.append("text")
   .attr('dx', (x1+x2)/2 - 20)
   .attr('dy', (y1+y2)/2 + 5)
   .attr('text-anchor', 'end')
   .text(txt)
}
function addBG(svg, minX, max, where, height, color){
   var redBox = svg.append("rect")
   .attr("x", minX)
   .attr("y", where)
   .attr("width", max)
   .attr("height", height)
   .attr("fill", color)
   .attr("opacity", 0.1);
}

function makeCurlyBrace(x1,y1,x2,y2,w,q){
			//Calculate unit vector
			var dx = x1-x2;
			var dy = y1-y2;
			var len = Math.sqrt(dx*dx + dy*dy);
			dx = dx / len;
			dy = dy / len;

			//Calculate Control Points of path,
			var qx1 = x1 + q*w*dy;
			var qy1 = y1 - q*w*dx;
			var qx2 = (x1 - .25*len*dx) + (1-q)*w*dy;
			var qy2 = (y1 - .25*len*dy) - (1-q)*w*dx;
			var tx1 = (x1 -  .5*len*dx) + w*dy;
			var ty1 = (y1 -  .5*len*dy) - w*dx;
			var qx3 = x2 + q*w*dy;
			var qy3 = y2 - q*w*dx;
			var qx4 = (x1 - .75*len*dx) + (1-q)*w*dy;
			var qy4 = (y1 - .75*len*dy) - (1-q)*w*dx;

    	return ( "M " +  x1 + " " +  y1 +
         		" Q " + qx1 + " " + qy1 + " " + qx2 + " " + qy2 + 
          		" T " + tx1 + " " + ty1 +
          		" M " +  x2 + " " +  y2 +
          		" Q " + qx3 + " " + qy3 + " " + qx4 + " " + qy4 + 
          		" T " + tx1 + " " + ty1 );
		}