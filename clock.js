/*
 * use p5.js to draw a clock on a 960x500 canvas
 */ 
function draw_clock(obj) {
    // draw your own clock here based on the values of obj:
    //    obj.hours goes from 0-23
    //    obj.minutes goes from 0-59
    //    obj.seconds goes from 0-59
    //    obj.millis goes from 0-999
    //    obj.seconds_until_alarm is:
    //        < 0 if no alarm is set
    //        = 0 if the alarm is currently going off
    //        > 0 --> the number of seconds until alarm should go off

    // YOUR MAIN CLOCK CODE GOES HERE
    angleMode(DEGREES);
    background("#778da9"); //  beige
    let unit = 18;

    /////set alarm/////
    let alarm = obj.seconds_until_alarm;
    
    //draw the waves alarm//
    let a = 0.0;
    let inc = 360/95.0;
    if (alarm > 0){
        for (let i = 0; i < 180; i++){
        stroke("#134074");
        strokeWeight(2.5);
        noFill();
        push();
        translate(width/2,height/2);
            let yaxis1 = sq(165)-sq(-160+i*3.1);
            let yaxis = sqrt(yaxis1);            
            line(-160+i*3.1,15*sin(-a-frameCount)+40,-160+i*3.1,yaxis);
            a = a + inc;
        pop();    
        }
    } else if (alarm == 0){
        for (let i = 0; i < 180; i++){
        stroke("#bde0fe");
        strokeWeight(2.5);
        noFill();
        push();
        translate(width/2,height/2);
            let yaxis1 = sq(165)-sq(-160+i*3.1);
            let yaxis = sqrt(yaxis1);            
            line(-160+i*3.1,15*sin(-a-frameCount*5)+40,-160+i*3.1,yaxis);
            a = a + inc;
        pop();    
        }
    } else {
        for (let i = 0; i < 180; i++){
        stroke("#3d5a80");
        strokeWeight(2.5);
        noFill();
        push();
        translate(width/2,height/2);
            let yaxis1 = sq(165)-sq(-160+i*3.1);
            let yaxis = sqrt(yaxis1);            
            line(-160+i*3.1,15*sin(-a)+40,-160+i*3.1,yaxis);
            a = a + inc;
        pop();    
        }
    }
    

    /////the second rotate motion/////
    let secondsWithFraction = obj.seconds + (obj.millis / 1000.0);
    let circleRot = map(secondsWithFraction,0,60,0,360);
    let lineRot = map(secondsWithFraction,0,60,-90,271);
    
    //the second rotate line
    noFill();
    strokeWeight(3);
    stroke("#bde0fe");
    arc(width/2,height/2,unit*22.3,unit*22.3,-90,lineRot);
    
    //the second rotate circle
    push(); 
        translate(width/2, height/2);
        rotate(circleRot);
        noStroke();
        strokeWeight(5);
        fill("#bde0fe");
        ellipse(0,-11.2*unit,13,13);
    pop();
    
    //the waterdrop motion
    let millisWithFraction = obj.millis ;
    let millisBarWidthSmooth = map(millisWithFraction,0,999,106,263);
    waterDrop(480,millisBarWidthSmooth);

    ////draw the glass////
    push();
        translate(width/2, height/2);
        strokeWeight(1.5);
        stroke(255);
        noFill();
        ellipse(0,-unit*1,unit*1.5,unit*0.3);
        line(-unit*0.75,-unit*1,-unit*0.55,unit*1);
        line(unit*0.75,-unit*1,unit*0.55,unit*1);
        arc(0,unit*1,unit*1.1,unit*0.3,0,180);
    pop();

    ////draw the glass of water////
    push();
        translate(width/2, height/2);
        noStroke();
        fill(148,182,199); //dark blue 
        quad(-unit*0.65,0,unit*0.65,0,unit*0.55,unit,-unit*0.55,unit);
        ellipse(0,unit,unit*1.1,unit*0.3);
        fill(204,232,247); //light blue
        ellipse(0,0,unit*1.3,unit*0.3);
    pop();

    //set second alarm//
    noFill();
    stroke("#bdd5ea");
    strokeWeight(1);
    if (alarm > 0) {
        let millisBarSmoothA = map(millisWithFraction,0,999,0,60);
        let millisBarSmoothB = map(millisWithFraction,0,999,0,20);
        arc(width/2,height/2+5,millisBarSmoothA,millisBarSmoothB,-25,205);
    } else if (alarm == 0) {
        let millisBarSmoothA = map(millisWithFraction,0,999,0,60);
        let millisBarSmoothB = map(millisWithFraction,0,999,0,20);
        let millisBarSmoothC = map(millisWithFraction,0,999,40,100);
        let millisBarSmoothD = map(millisWithFraction,0,999,10,30);
        arc(width/2,height/2+5,millisBarSmoothA,millisBarSmoothB,-25,205);
        arc(width/2,height/2+5,millisBarSmoothC,millisBarSmoothD,-25,205);
    } else {
    };

    /////the minute motion/////
    noFill();
    strokeWeight(26);
    stroke(215,235,253,40);
    ellipse(width/2,height/2,unit*20.2,unit*20.2);

    let minuteLineRot = map(obj.minutes,0,59,-90,260); 
    stroke(215,235,253);
    arc(width/2,height/2,unit*20.2,unit*20.2,-90,minuteLineRot);

    push();
    translate(width/2-10,height/2+8);
    minuteRadius = unit*10.3;
    textSize(20);
    fill(6,31,75);
    strokeWeight(1.8);
    minuteNumber = obj.minutes*6;
    text(obj.minutes,minuteRadius*cos(minuteNumber+270),minuteRadius*sin(minuteNumber+270));
    pop();

    /////the hour motion////
    if (obj.hours > 12){
        let newHour = obj.hours - 12;
        let anglesA = newHour * 30;
        push();
            translate(width/2,height/2);
            noStroke();
            fill(0);
            rotate(anglesA);
            fill("#577399");
            ellipse(0,-164,60,8.5);
            triangle(-30,-163,30,-163,0,-145);
        pop();
        push();
            translate(width/2,height/2);
            noStroke();
            fill("#cae9ff");
            textSize(18);
            textAlign(CENTER);
            text("pm",158*cos(anglesA+270),158*sin(anglesA+270));
            text(newHour,140*cos(anglesA+270),140*sin(anglesA+270));
        pop();
    } else if (obj.hours == 12){
        push();
            translate(width/2,height/2);
            noStroke();
            fill("#577399");
            rotate(0);
            ellipse(0,-164,60,8.5);
            triangle(-30,-163,30,-163,0,-145);
            textSize(18);
            textAlign(CENTER);
            fill("#cae9ff");
            text(obj.hours,0,-135);
            text("pm",0,-155);
        pop();
    } else {
        let anglesB = obj.hours * 30;
        push();
            translate(width/2,height/2);
            noStroke();
            fill("#577399");
            rotate(anglesB);
            ellipse(0,-164,60,8.5);
            triangle(-30,-163,30,-163,0,-145);
        pop();
        push();
            translate(width/2,height/2);
            noStroke();
            fill("#cae9ff");
            textSize(18);
            textAlign(CENTER);
            text(obj.hours,140*cos(anglesB+270),140*sin(anglesB+270));
            text("am",158*cos(anglesB+270),158*sin(anglesB+270));
        pop();
    }

    ////add the particles////
    createParticles();
    for (let i = 0; i < particles.length; i++){
        particles[i].createParticle();
        particles[i].moveParticle();
    }
 }

//particles function//
 function createParticles(){
    if(particles.length == 0){
        for (let i = 0; i < width/20; i++){
            particles.push(new Particle());
        }
    }
 }

let particles = [];

//particles class//
class Particle{
    constructor(){
        this.xPosition = random(0,width);
        this.yPosition = random(0,height);
        this.rRadius = random(5,20);
        this.xSpeed = random(-1,1.5);
        this.ySpeed = random(-0.5,1);
    }
    createParticle(){
        noStroke();
        fill('rgba(202,240,248,0.5)');
        circle(this.xPosition,this.yPosition,this.rRadius);
    }
    moveParticle(){
        if(this.xPosition < 0 || this.xPosition > width)
            this.xSpeed *= -1;
        if(this.yPosition < 0 || this.yPosition > height)
            this.ySpeed *= -1;
        this.xPosition += this.xSpeed;
        this.yPosition += this.ySpeed;
    }
}

/////draw the water drop/////
function waterDrop(x,y){
    let unit = 18
    noStroke();
    fill(204,232,247);//light blue
    triangle(x,y-unit,x+unit*0.3,y+unit*0.1,x-unit*0.3,y+unit*0.1);
    ellipse(x,y+unit*0.13,unit*0.6,unit*0.54);
}

        
        

