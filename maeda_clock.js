// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {
  // YOUR MAIN CLOCK CODE GOES HERE
  background(60, 72, 98); //  dark blue
  //number matrix
  let numberList = [
  [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],
  [1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  [[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],
  [0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],
  [0,0,1,1,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],
  [0,0,1,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  [[0,0,0,1,0],[0,0,1,1,0],[0,1,0,1,0],
  [1,0,0,1,0],[1,1,1,1,1],[0,0,0,1,0],[0,0,0,1,0]],
  [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],
  [0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  [[0,1,1,1,0],[1,0,0,0,0],[1,1,1,1,0],
  [1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],
  [0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],
  [0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],
  [0,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0]]];

//set time number
  x = nf(obj.seconds,2,0);
  y = nf(obj.minutes,2,0);
  z = nf(obj.hours,2,0);

  secondsTen = floor(x/10);
  secondsOne = x % 10;

  minutesTen = floor(y/10);
  minutesOne = y % 10;

  hoursTen = floor(z/10);
  hoursOne = z % 10;

  //
  unit = 12.5;
  xposition = 16.9*unit;
  yposition = 16*unit;

  for (let i = 0; i < 7; i++){
    for (let j = 0; j < 5; j++){

      noStroke();
      fill(204,232,247);

      if (numberList[hoursTen][i][j] == 1) {
        rect(xposition+(unit*j),yposition+(unit*i),unit,unit);
      }
      if (numberList[hoursOne][i][j] == 1) {
        rect(xposition+(unit*(j+6)),yposition+(unit*i),unit,unit);
      }
      if (numberList[minutesTen][i][j] == 1) {
        rect(xposition+(unit*(j+16)),yposition+(unit*i),unit,unit);
      }
      if (numberList[minutesOne][i][j] == 1) {
        rect(xposition+(unit*(j+22)),yposition+(unit*i),unit,unit);
      }
      if (numberList[secondsTen][i][j] == 1) {
        rect(xposition+(unit*(j+32)),yposition+(unit*i),unit,unit);
      }
      if (numberList[secondsOne][i][j] == 1) {
        rect(xposition+(unit*(j+38)),yposition+(unit*i),unit,unit);
      }
    }
  }

  //colon
  fill(204,232,247);
  rect(xposition+unit*13,yposition+(unit*2),unit,unit);
  rect(xposition+unit*13,yposition+(unit*4),unit,unit);
  rect(xposition+unit*29,yposition+(unit*2),unit,unit);
  rect(xposition+unit*29,yposition+(unit*4),unit,unit);

  //draw frame
  rect(180,175,600,1.5);
  rect(180,325,600,1.5);
  rect(180,175,1.5,150);
  rect(780,175,1.5,150);
}







