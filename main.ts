let letter = ""
let command = ""
let receivedString2 = ""
let name2 = ""
let env = "home"
let value2 = 0
let radiogroup = 0
let receivedNumber2 = 0
let list = [1]
let num = false
let alive = true
let getdata = false
let gotdata = false
let wasoverheat = false
radio.setGroup(radiogroup)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
new_command()
basic.forever(function () {
    if(input.temperature() >= 40) {
        wasoverheat = true
        num = true
        serial.writeString("\r\n\r\nThe micro:bit is a bit warm. Let it cool down.")
        pause(20000)
    } else {
        if (wasoverheat) {
            new_command()
            wasoverheat = false
        } else {
            letter = serial.readString()
            serial.writeString(letter)
            if (letter == ";") {
                letter = ""
            } else {
                command = "" + command + letter
                letter = ""
            }
        }
    }
})
function new_command () {
    switch (env) {
        case "home":
            if (num) {
                serial.writeString("" + "\r\n\r\n[" + control.deviceName() + "/home] -> ")
            } else {
                serial.writeString("[" + control.deviceName() + "/home] -> ")
            }
            break
        case "radio":
            serial.writeString("" + "\r\n\r\n[" + control.deviceName() + "/radio] -> ")
            break
        case "pins":
            serial.writeString("" + "\r\n\r\n[" + control.deviceName() + "/pins] -> ")
            break
        case "leds":
            serial.writeString("" + "\r\n\r\n[" + control.deviceName() + "/leds] -> ")
            break
        case "sound":
            serial.writeString("" + "\r\n\r\n[" + control.deviceName() + "/sound] -> ")
            break
    }
}
radio.onReceivedString(function (receivedString: string) {
    if (getdata) {
        gotdata = true
        receivedString2 = receivedString
    } else {

    }
})
radio.onReceivedNumber(function (receivedNumber: number) {
    if (getdata) {
        gotdata = true
        receivedNumber2 = receivedNumber
    } else {

    }
})
serial.onDataReceived(serial.delimiters(Delimiters.SemiColon), function () {
    pause(100)
    num = true
    let nocase = command
    command = command.toLowerCase()
    switch (env) {
        case "home":
            switch (command) {
                case "help":
                    serial.writeString("\r\n" + 
                    "\r\nList of commands:" + 
                    "\r\nhelp - shows a list of commands" + 
                    "\r\ninfo - shows info about this device" + 
                    "\r\nreset - restarts the device" + 
                    "\r\necho - [message] - repeats your message - ex: 'echo Hello World!;'" + 
                    "\r\npins - goes to the pin program, where you can read and write analog and digital values to the pins" +
                    "\r\nradio - goes to the radio program, where you can use the radio functions" + 
                    "\r\n\r\nList of keybinds (on the micro:bit):" + 
                    "\r\nA + B (hold) - cancels a running command")
                    break
                case "info":
                    serial.writeString("\r\n" + 
                    "\r\nShell Version: v1.0.0-alpha.5" + 
                    "\r\nRadio Group: " + radiogroup +
                    "\r\nDevice Name: " + control.deviceName() + 
                    "\r\nDevice Serial Number: " + control.deviceSerialNumber() + 
                    "\r\nTime Elapsed Since Boot: " + control.millis() / 1000 + " s" + 
                    "\r\nDevice Temperature: " + input.temperature() + "C, " + (input.temperature() * 1.8 + 32) + "F")
                    break
                case "reset":
                    serial.writeString("" + ("\r\n\r\nTHE MICRO:BIT WILL RESET DON'T TOUCH ANYTHING\r\n\r\n"))
                    control.reset()
                    break
                case "radio":
                    env = "radio"
                    break
                case "pins":
                    env = "pins"
                    break
                default:
                    if (command.includes("pin-read ")) {
                        let pin: string = command.replace("pin-read ", "")
                        serial.writeString("\r\n")
                        switch (pin) {
                            case "0":
                                serial.writeString("\r\nAnalog / Digital Value on PIN0: " + pins.analogReadPin(AnalogPin.P0) + " / " + pins.digitalReadPin(DigitalPin.P0))
                                break
                            case "1":
                                serial.writeString("\r\nAnalog / Digital Value on PIN1: " + pins.analogReadPin(AnalogPin.P1) + " / " + pins.digitalReadPin(DigitalPin.P1))
                                break
                            case "2":
                                serial.writeString("\r\nAnalog / Digital Value on PIN2: " + pins.analogReadPin(AnalogPin.P2) + " / " + pins.digitalReadPin(DigitalPin.P2))
                                break
                            case "3":
                                serial.writeString("\r\nAnalog / Digital Value on PIN3: " + pins.analogReadPin(AnalogPin.P3) + " / " + pins.digitalReadPin(DigitalPin.P3))
                                break
                            case "4":
                                serial.writeString("\r\nAnalog / Digital Value on PIN4: " + pins.analogReadPin(AnalogPin.P4) + " / " + pins.digitalReadPin(DigitalPin.P4))
                                break
                            case "5":
                                serial.writeString("\r\nAnalog / Digital Value on PIN5: " + pins.analogReadPin(AnalogPin.P5) + " / " + pins.digitalReadPin(DigitalPin.P5))
                                break
                            case "6":
                                serial.writeString("\r\nAnalog / Digital Value on PIN6: " + pins.analogReadPin(AnalogPin.P6) + " / " + pins.digitalReadPin(DigitalPin.P6))
                                break
                            case "7":
                                serial.writeString("\r\nAnalog / Digital Value on PIN7: " + pins.analogReadPin(AnalogPin.P7) + " / " + pins.digitalReadPin(DigitalPin.P7))
                                break
                            case "8":
                                serial.writeString("\r\nAnalog / Digital Value on PIN8: " + pins.analogReadPin(AnalogPin.P8) + " / " + pins.digitalReadPin(DigitalPin.P8))
                                break
                            case "9":
                                serial.writeString("\r\nAnalog / Digital Value on PIN9: " + pins.analogReadPin(AnalogPin.P9) + " / " + pins.digitalReadPin(DigitalPin.P9))
                                break
                            case "10":
                                serial.writeString("\r\nAnalog / Digital Value on PIN10: " + pins.analogReadPin(AnalogPin.P10) + " / " + pins.digitalReadPin(DigitalPin.P10))
                                break
                            case "11":
                                serial.writeString("\r\nAnalog / Digital Value on PIN11: " + pins.analogReadPin(AnalogPin.P11) + " / " + pins.digitalReadPin(DigitalPin.P11))
                                break
                            case "12":
                                serial.writeString("\r\nAnalog / Digital Value on PIN12: " + pins.analogReadPin(AnalogPin.P12) + " / " + pins.digitalReadPin(DigitalPin.P12))
                                break
                            case "13":
                                serial.writeString("\r\nAnalog / Digital Value on PIN13: " + pins.analogReadPin(AnalogPin.P13) + " / " + pins.digitalReadPin(DigitalPin.P13))
                                break
                            case "14":
                                serial.writeString("\r\nAnalog / Digital Value on PIN14: " + pins.analogReadPin(AnalogPin.P14) + " / " + pins.digitalReadPin(DigitalPin.P14))
                                break
                            case "15":
                                serial.writeString("\r\nAnalog / Digital Value on PIN15: " + pins.analogReadPin(AnalogPin.P15) + " / " + pins.digitalReadPin(DigitalPin.P15))
                                break
                            case "16":
                                serial.writeString("\r\nAnalog / Digital Value on PIN16: " + pins.analogReadPin(AnalogPin.P16) + " / " + pins.digitalReadPin(DigitalPin.P16))
                                break
                            case "17":
                                serial.writeString("\r\nPIN17 is a 3V supply")
                                break
                            case "18":
                                serial.writeString("\r\nPIN18 is a 3V supply")
                                break
                            case "19":
                                serial.writeString("\r\nAnalog / Digital Value on PIN19: " + pins.analogReadPin(AnalogPin.P19) + " / " + pins.digitalReadPin(DigitalPin.P19))
                                break
                            case "20":
                                serial.writeString("\r\nAnalog / Digital Value on PIN20: " + pins.analogReadPin(AnalogPin.P20) + " / " + pins.digitalReadPin(DigitalPin.P20))
                                break
                            default:
                                serial.writeString("\r\nError: wrong pin number/index!")
                                break
                        }
                    } else if (command.includes("echo ")) {
                        let message = nocase.slice(5)
                        serial.writeString("\r\n\r\n" + message)
                    } else {
                        serial.writeString("" + "\r\n\r\nError: command '" + command + "' not found!")
                    }
                    break
            }
            break
        case "radio":
            switch (command) {
                case "help":
                    serial.writeString("\r\n" + 
                    "\r\nList of commands:" + 
                    "\r\nhelp - shows a list of radio commands" + 
                    "\r\nexit - go back the the home shell program" +
                    "\r\nscan - checks which radio groups send data (currently)" + 
                    "\r\nset-group - [groupNumber] - sets the radio group number - ex: 'set-group 5;'" +
                    "\r\nsend-string - [message] - sends a message (string) to the set group - ex: 'send-string Hi my name is " + control.deviceName() + ";'" + 
                    "\r\nsend-number - [number] - sends a number to the set group - ex: 'send-number 1234567890;'" + 
                    "\r\nreceive - receives data until you cancel the command")
                    break
                case "exit":
                    env = "home"
                    break
                case "scan":
                    serial.writeLine("\r\n\r\nStarting radio group checking...")
                    pause(3000)
                    serial.writeString("\r\nThis test will go through groups 0 - 255")
                    serial.writeLine("\r\nThis test will take 10-15 minutes (some types of data could be empty)\r\n")
                    pause(2000)
                    for (let i: number = 0; i <= 255; i++) {
                        if(input.buttonIsPressed(Button.AB)) {
                            i = 254
                        } else {
                            radio.setGroup(i)
                            getdata = true
                            pause(3000)
                            if (gotdata) {
                                getdata = false
                                gotdata = false
                                list.push(i)
                                serial.writeLine("Got Data On Group " + i + ":" + 
                                " String = " + receivedString2 + 
                                " Number = " + receivedNumber2)
                            } else {
                                serial.writeLine("Tested Group: " + i + " No Data")
                            }
                            receivedString2 = ""
                            receivedNumber2 = 0
                            name2 = ""
                            value2 = 0
                        }
                    }
                    serial.writeString("All groups that sent data: ")
                    for (let i: number = 1; i < list.length; i++) {
                        serial.writeString(list.get(i).toString() + ", ")
                    }
                    break
                case "receive":
                    getdata = true
                    alive = true
                    serial.writeString("\r\n\r\nReceiving data on group " + radiogroup +
                    "\r\n\r\n")
                    while (alive) {
                        pause(100)
                        if(input.buttonIsPressed(Button.AB)) {
                            getdata = false
                            alive = false
                        } else if (gotdata) {
                            gotdata = false
                            serial.writeLine("Got Data: String = " + receivedString2 + " Number = " + receivedNumber2)
                        }
                        receivedString2 = ""
                        receivedNumber2 = 0
                    }
                    break
                default:
                    if (command.includes("set-group ")) {
                        let gnumber: string = command.replace("set-group ", "")
                        let gstring: number = 0
                        gstring = (parseInt(gnumber))
                        radio.setGroup(gstring)
                        radiogroup = gstring
                        serial.writeString("\r\n\nThe radio group number was set to " + gstring)
                    } else if (command.includes("send-string ")) {
                        let messge: string = nocase.slice(12)
                        radio.sendString(messge)
                    } else if (command.includes("send-number ")) {
                        let stringws: string = nocase.slice(12)
                        let messge: number = parseInt(stringws)
                        radio.sendNumber(messge)
                    } else {
                        serial.writeString("\r\n\r\nError: command '" + command + "' not found!")
                    }
                    break
            }
            break
        case "pins":
            break
        case "leds":
            break
        case "sound":
            break
    }
    command = ""
    new_command()
})