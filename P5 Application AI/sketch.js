class Node{
    constructor(clickX, clickY,nodeRad, fillColor) 
    {
        this.X = clickX;
        this.Y = clickY;
        this.rad = nodeRad;
        this.fillColor = fillColor;
    }

    drawNode(){
        fill(this.fillColor);
        stroke(100);
        strokeWeight(1);
        ellipse(this.X, this.Y, this.rad*2);
    }

    checkDistance(x,y){
        return(dist(x, y,this.X,this.Y));
    }

}
var  loadInpX, loadInpY, nodeOption, supportOptions, memberOptions;
function radioChilds()
{

    if (radio.value() == "Load")
    {
        loadInpX = createInput('0');
        loadInpY = createInput('0');
        loadInpX.attribute('placeholder', 'Load in x direction');
        loadInpY.attribute('placeholder', 'Load in y direction');
    }
    else if (typeof loadInpX !== "undefined")
    {
        loadInpX.remove();
        loadInpY.remove();
    }
    if (radio.value() == "Node")
    {
        nodeOption = createRadio("nodeOption");
        nodeOption.option("Add Node");
        //nodeOption.option("Delete Node");
        nodeOption.option("Edit Node");
        nodeOption._getInputChildrenArray()[0].checked = true;
    }
    else if (typeof nodeOption !== "undefined")
    {
        nodeOption.remove();
    }
    if (radio.value() == "Support")
    {
        supportOption = createRadio("supportOptions");
        supportOption.option("Roller");
        supportOption.option("Hinge");
        supportOption._getInputChildrenArray()[0].checked = true;
    }
    else if (typeof supportOption !== "undefined")
    {
        supportOption.remove();
    }
    /*if (radio.value() == "Member")
    {
        memberOption = createRadio("memberOptions");
        memberOption.option("Add Member");
        memberOption.option("Delete Memner");
        memberOption._getInputChildrenArray()[0].checked = true;
    }
    else if (typeof memberOption !== "undefined")
    {
        memberOption.remove();
    }*/
}
function preload() {
    img = loadImage('kiwi.svg');
}
var nodeCount = 0;
var canvas, canvasW = 500, canvasH = 500, X, Y, nodeRad = 5;
var nodes = [], members = [], nodeCoords = [], memberCoords = [];
var sliderVal;
var radio;
let N,num; //num is recording the key pressed value
var input;
function setup() {
    canvas = createCanvas(canvasW,canvasH);
    background(255);
    canvas.addClass("aiP5");

    radio = createRadio("Primary");
    radio.option('Node');
    radio.option('Member');
    radio.option('Load');
    radio.option('Support');
    //setting the node to be checked by deafult
    radio._getInputChildrenArray()[0].checked = true;
    radio.addClass("drawOptions");
    radioChilds();
    radio.input(radioChilds);
    //noLoop();
}
var firstPress = 1;
var distance = [];
var addNodePermit;
var testObj = [];//testing json
function mousePressed(){
    addNodePermit = true;
    var test = {};//testing json
    test['x'] =mouseX; 
    test['y'] =mouseY;
    testObj.push(test);
    console.log(testObj);
    if(radio.value()== "Node")
    {
        if (mouseButton=="left")
        {
            if(mouseX>0 && mouseX<500 && mouseY>0 && mouseY<500)
            {
                for (var i=0; i<nodes.length;i++)
                {
                    distance[i]=nodes[i].checkDistance(mouseX,mouseY);
                    if(distance[i]<=nodeRad)
                    {
                        addNodePermit = false;
                        break;
                    }
                }
                if (nodeOption.value() == "Add Node")
                {
                    if(addNodePermit == true)
                    {

                        nodeCoords[nodeCount] = [mouseX,mouseY];
                        //nodes[nodeCount++].drawNode();
                        nodeCount++;
                    }
                }
               
                /*if (nodeOption.value() == "Delete Node")
                {
                    console.log("Deleting node");
                    for (i=0; i<nodes.length;i++)
                    {
                        distance[i]=nodes[i].checkDistance(mouseX,mouseY);
                        if(distance[i]<=nodeRad)
                        {
                            addNodePermit = true;
                            break;
                        }
                        else
                        {                            
                            addNodePermit = false;                          
                        }
                    }

                    if(addNodePermit == true)
                    {
                        console.log(nodeCoords.length);
                        nodeCoords.splice(i,1);
                        nodes.splice(i,1);
                        console.log(nodeCoords);
                    }
                }*/
            }
        }
    }
   if(radio.value() == "Member")
   {
       if (mouseButton=="left")
       {
           for (i = 0; i<nodes.length; i++)
           {
                distance[i]=nodes[i].checkDistance(mouseX,mouseY);

                if(distance[i]<=nodeRad)
                {
                    //Drawing the member
    //                if (num==27)
    //                    firstPress = 1;
                    if (firstPress == 1) {
                        firstPress = 0;
                        x0 = nodes[i].X;
                        y0 = nodes[i].Y;
                    }
                    else if (firstPress == 0 && num!=27) {
                        firstPress = 1;
                        x = nodes[i].X;
                        y = nodes[i].Y;
                        memberCoords.push([x0, y0, x, y]);
                    }         

                }
           }
       }
   }
}
// Run when the mouse/touch is dragging.
function mouseDragged() {
	addNodePermit = true;
    if(radio.value()== "Node")
    {
        if (mouseButton=="left")
        {
            if(mouseX>0 && mouseX<500 && mouseY>0 && mouseY<500)
            {
                for (var i=0; i<nodes.length;i++)
                {
                    distance[i]=nodes[i].checkDistance(mouseX,mouseY);
                    if(distance[i]<=nodeRad)
                    {
                        addNodePermit = false;
                        break;
                    }
                }
                if (nodeOption.value() == "Edit Node")
                {                    
                    for (var j=0; j<nodes.length;j++)
                    {
                        if(addNodePermit == false)
                        {
                            console.log("Dragging Node: "+i);
                            nodeCoords[i][0] = mouseX;
                            nodeCoords[i][1] = mouseY;
                        }
                    }
                    console.log(mouseX," ", mouseY);
                }
            }
        }
    }
  // Prevent default functionality.
  return false;
}
//function mouseReleased() {
//  noLoop();
//}
//function keyPressed() {
//}
var els =  [], elsCount = 0;
function draw() {
    
    image(img, 0, 50);
    background(255);
    if (radio.value()=="Node" && nodeOption.value()=="Add Node")
        cursor(CROSS);
    else if (radio.value()=="Member")
    {
        for (i = 0; i<nodes.length; i++)
        {
            distance[i]=nodes[i].checkDistance(mouseX,mouseY);
            if(distance[i]<=nodeRad)
            {
                cursor(HAND);
                break;
            }
            else if(distance[i]>=nodeRad){
                cursor(ARROW)
            }
        }
    }
for (var i=0; i<nodeCoords.length;i++)
{
    nodes[i] = new Node(nodeCoords[i][0],nodeCoords[i][1],nodeRad, 180);
    nodes[i].drawNode();

}
stroke(0);
strokeWeight(2);
for (var i=0; i<memberCoords.length;i++)
{
    line(memberCoords[i][0],memberCoords[i][1],memberCoords[i][2],memberCoords[i][3]);
}
    
}


