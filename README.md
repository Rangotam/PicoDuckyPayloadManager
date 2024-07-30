<h1 align="center">Pico ducky payload manager</h1>

<div align="center">
  <strong>An application to make use of the wireless functionalities of the Pico-DuckyW</strong>
</div>

## Prerequisites

A working Pico-Ducky W (stress on the W).
You can make one following dbisu's repo: https://github.com/dbisu/pico-ducky
## Quick start
You don't need that much to use this app.
1. Download the latest release of the apk
2. Paste or set up the the necessary payloads for the app to work. You can find a blank template in the Payloads folder.
3. Connect your Pico-Ducky to a computer and connect to its Wi-Fi.

not all payloads are *actually needed*, keep in mind though that if you don't provide all of them obviously the relative sections in the app won't work.


## Using PicoDuckyPayloadManager

There are 3 main features:

### 1. Fixed payloads

Easily manage pre-defined payloads. These are meant to be your go-to payloads as you won't be able to change them (at least from this app).
Expand the payload by touching it to see a brief customizable description (see settings for more info), then click the rocket to execute them!

### 2. Editable payloads

Customize your payloads on the go. Choose between the 4 available editable payloads which one to modify. 
To do so:

1. Expand the box of the payload you want to edit
2. Click **import**, and you should see the content of your payload
3. Click **save** to save your changes and upload them to your pico-ducky
4. Click the rocket to execute your newly-modified payload!

editable payload example:
>GUI r
>DELAY 100
>STRING notepad.exe
>ENTER
>DELAY 500
>STRING hello world! - editable payload0

### 3. Linkable payloads

Similar to the editable payloads, but these ones are made with the intention of executing some code hosted somewhere else. 
Just pop in the link of the page where your code is written and these payloads will download the code from there and execute it! 
To do so:
1. Expand the box of the payload you want to edit
2. Click **import**, and you should see the link that is already inside of your payload
3. Click **save** to save your changes and upload them to your pico-ducky
4. Click the rocket to execute the code of a new link!

Just keep in mind that the payloads expect a **raw text page**. You can use whatever you want as long as it's just text, but for this purpose I suggest either github or pastebin.
Also, it may be trivial but you'll obviously need an internet connection on the computer you'll execute this code on in order to be able to download the code.

>Please note: in order to be able to modify payloads, you must have [USB mode](https://github.com/dbisu/pico-ducky?tab=readme-ov-file#usb-enabledisable-mode) disabled on your pico-ducky, otherwise it will crash.

# Settings
Within the settings page you'll find a few tweaking options.
1. A bunch of color palettes to change the theme of the application.
2. A table where you can store descriptions for each one of the payloads (so you don't go insane trying to remember what everything does).

As of now, all these settings require you to reload the application.
I know it's not very elegant but I've yet to figure out how to do that. :V
