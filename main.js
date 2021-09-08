song1="";
song2="";

function preload() {
    song1=loadSound("music1.mp3");
    song2=loadSound("music2.mp3");
}

function play() {
    song1.volume(1);
    song1.rate(1);

    song2.volume(1);
    song2.rate(1);
}

function stop() {
    song1.pause();
    song2.pause();
}

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function  setup() {
    canvas=createCanvas(500,400);
    canvas.center();
    canvas.position(440,200);
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
		
  }
}

function draw() {
    image(video,0,0,500,400);
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX,leftWristY,20); 

    if (leftWristY>0 && leftWristY<=500) {
        song.play(song1);
    }else if(rightWristY>0 && rightWristY<=500)
    {
        song.play(song2);
    }
    
    
}