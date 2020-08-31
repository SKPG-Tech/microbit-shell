![Build status badge](https://github.com/skpg-tech/microbit-shell/workflows/MakeCode/badge.svg)
# What is this?
**microbit-shell** is a shell that runs on a __micro:bit__. We know sounds _**crazy**_ to do such things on a micro:bit. This project is here to show what a *simple* and *small* device can do and that it is for anybody who wants to get started coding. The shell is about **200** lines of code. The shell is suffering from a few issues due to the `limits` being almost reached. _This project was made in the Makecode editor using Javascript / TypeScript_.

## How to use this project
**This project _only supports PuTTY_. Use of other serial clients may give different results, in the case of that make an "Issue"**.
  - Stuff you need
    - A BBC micro:bit
    - A USB cable
    - A simple PC or laptop with Internet
    
1. Download PuTTY from their [official website](https://www.putty.org/).
2. Install PuTTY.
3. Open the Makecode [website](https://makecode.microbit.org/).
4. Import this project to the Makecode editor (more info below) or alternatively you can download the .hex file from our Releases, then skip to step 6.
5. When you are in the project press the download button.
6. Once you have the hex file, plug in your BBC micro:bit into your computer.
7. Open the MICROBIT drive in File Explorer.
8. Drag the hex file you downloaded to the drive (after that your micro:bit's small yellow LED will start flashing, wait until it stops and wait until it remounts itself too).
9. Open PuTTY.
10. Select serial in the connection type.
11. Open device manager and find the micro:bit's COM port.
12. In PuTTY type in the COM port in the serial line.
13. And set the speed to 115200.

#### DONE, Enjoy the project.

Press ';' to run the command. (Enter doesn't work)

## How to import this project

To edit this repository in MakeCode.
**There are two ways you can import this project**
   1. Using import from URL
      - open [https://makecode.microbit.org/](https://makecode.microbit.org/)
      - click on **Import** then click on **Import URL**
      - paste **https://github.com/skpg-tech/microbit-shell** and click import
   2. Using your GitHub account
      - fork this repository
      - open [https://makecode.microbit.org/](https://makecode.microbit.org/)
      - click on **Import** then click on **Your GitHub repo**
      - it may ask you to log in to your GitHub account
      - select this repo from the list
