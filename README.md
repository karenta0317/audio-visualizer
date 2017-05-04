#ES Lab Project2 Audio Visulizer

##Introduction
Simple audio visualizer that detects the ambient sound level and then triggers built-in LED lights on the Tessel2 board. There are four sound levels and each triggers one LED light. This project also features real-time special camera lens rendering the video stream with fireworks synchronous with LED lights. 

##Get Started
###Module Requirements
-tessel-ambient module
-USB plug-in camera
###Installation
```
git clone https://github.com/karenta0317/audio-visualizer.git
cd audio-visualizer
npm install
```
###Setup
-Make sure the tessel-ambient module is plugged into **part A** of the Tessel board.
-Make sure your Tessel and computer are connected to **the same Wifi network**. For details about the setup of the camera, please check [this website](http://tessel.github.io/t2-start/modules/camera.html).

###Build
```
t2 run index.js
```
Open your web browser and go to `http://{tessel board name}.local:4000`
Play your favorite music and enjoy 

