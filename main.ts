enum ShellEnvironment {
    HOME,
    RADIO,
    PINS,
    LEDS,
    SOUND
}

let letter: string = ""
let command: string = ""
let receivedString2: string = ""
let name2: string = ""
let env = ShellEnvironment.HOME
let value2: number = 0
let radiogroup = 0
let receivedNumber2 = 0
let alive = true
let getdata = false
let gotdata = false

radio.setGroup(radiogroup)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
new_command()
basic.forever(() => {
    letter = serial.readString()
    //let buf: Buffer = serial.readBuffer(1)
    //serial.writeString(JSON.stringify(buf.toArray(NumberFormat.UInt8LE)))
    //serial.writeString(JSON.stringify(letter.split("").map(x => isNaN(x.charCodeAt(0)) ? "" : x.charCodeAt(0))))
    switch (letter) {
        // Carriage return (ENTER key)
        case "\r":
            serial.writeString(letter)
            letter = ""
            break
        // UP key
        case "\x1B[A":
            serial.writeString("UP")
            letter = ""
            break
        // DOWN key
        case "\x1B[B":
            serial.writeString("DOWN")
            letter = ""
            break
        // RIGHT key
        case "\x1B[C":
            serial.writeString("RIGHT")
            letter = ""
            break
        // LEFT key
        case "\x1B[D":
            serial.writeString("LEFT")
            letter = ""
            break
        // DEL (127) ASCII char (BACKSPACE key)
        case "\u007F":
            if (command.length > 0) {
                command = command.slice(0, -1)
                serial.writeString(letter)
            }
            else letter = ""
            break
        default:
            serial.writeString(letter)
            command = command + letter
            letter = ""
            break
    }
})
function new_command() {
    switch (env) {
        case ShellEnvironment.HOME:
            serial.writeString(`\r\n\r\n[${control.deviceName()}/home] -> `)
            break
        case ShellEnvironment.RADIO:
            serial.writeString(`\r\n\r\n[${control.deviceName()}/radio] -> `)
            break
        case ShellEnvironment.PINS:
            serial.writeString(`\r\n\r\n[${control.deviceName()}/pins] -> `)
            break
        case ShellEnvironment.LEDS:
            serial.writeString(`\r\n\r\n[${control.deviceName()}/leds] -> `)
            break
        case ShellEnvironment.SOUND:
            serial.writeString(`\r\n\r\n[${control.deviceName()}/sound] -> `)
            break
    }
}
radio.onReceivedString((receivedString: string) => {
    if (getdata) {
        gotdata = true
        receivedString2 = receivedString
    } else {

    }
})
radio.onReceivedNumber((receivedNumber: number) => {
    if (getdata) {
        gotdata = true
        receivedNumber2 = receivedNumber
    } else {

    }
})

serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), () => {
    pause(100)
    let nocase = command
    command = command.toLowerCase()
    switch (env) {
        case ShellEnvironment.HOME:
            switch (command) {
                case "help":
                    serial.writeString("\r\n" +
                        "\r\nList of commands:" +
                        "\r\nhelp - shows a list of commands" +
                        "\r\ninfo - shows info about this device" +
                        "\r\nreset - restarts the device" +
                        "\r\necho - [message] - repeats your message - ex: 'echo Hello World!;'" +
                        "\r\necho-screen - [message] - repeats your message in the micro:bit screen - ex: 'echo-screen Hello World!;'" +
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
                        `\r\nTime Elapsed Since Boot: ${control.millis() / 1000} s` +
                        `\r\nDevice Temperature: ${input.temperature()}C, ${(input.temperature() * 1.8 + 32)}F`)
                    break
                case "reset":
                    serial.writeString(("\r\n\r\nTHE MICRO:BIT WILL RESET DON'T TOUCH ANYTHING\r\n\r\n"))
                    control.reset()
                    break
                case "radio":
                    env = ShellEnvironment.RADIO
                    break
                case "pins":
                    env = ShellEnvironment.PINS
                    break
                case "":
                    serial.writeString("")
                    break
                default:
                    if (command.includes("pin-read ")) {
                        let pin: number = parseInt(command.replace("pin-read ", ""))
                        serial.writeString("\r\n")
                        serial.writeString(`\r\nAnalog / Digital Value on PIN0: ${pins.analogReadPin(AnalogPin.P0 as number + pin)} / ${pins.digitalReadPin(DigitalPin.P0 as number + pin)}`)
                    } else if (command.includes("echo ")) {
                        let message = nocase.slice(5)
                        serial.writeString(`\r\n\r\n${message}`)
                    } else if (command.includes("echo-screen ")) {
                        let message = nocase.slice(12)
                        basic.showString(message)
                    } else {
                        serial.writeString(`\r\n\r\nError: command ${JSON.stringify(command)} not found!`)
                    }
                    break
            }
            break
        case ShellEnvironment.RADIO:
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
                    env = ShellEnvironment.HOME
                    break
                case "scan":
                    serial.writeString("\r\n\r\nStarting radio group checking..." +
                        "\r\nThis test will go through groups 0 - 255" +
                        "\r\nThis test should take around 30 seconds. \r\n")
                    pause(3000)
                    let dataList: any = {}
                    for (let i = 0; i <= 255; i++) {
                        radio.setGroup(i)
                        getdata = true
                        pause(100)
                        if (gotdata) {
                            getdata = false
                            gotdata = false
                            dataList[i.toString()] = { str: receivedString2, int: receivedNumber2 }
                            serial.writeString("*")
                            //serial.writeLine(`Got Data On Group ${i}: String = ${receivedString2}, Number = ${receivedNumber2}`)
                        } else {
                            serial.writeString(".")
                        }
                        receivedString2 = ""
                        receivedNumber2 = 0
                        name2 = ""
                        value2 = 0
                    }
                    serial.writeString(`All groups that sent data: ${JSON.stringify(dataList)}`)
                    break
                case "receive":
                    getdata = true
                    alive = true
                    serial.writeString("\r\n\r\nReceiving data on group " + radiogroup +
                        "\r\n\r\n")
                    while (alive) {
                        pause(100)
                        serial.writeString(".")
                        if (input.buttonIsPressed(Button.AB)) {
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
        case ShellEnvironment.PINS:
            break
        case ShellEnvironment.LEDS:
            break
        case ShellEnvironment.SOUND:
            break
    }
    command = ""
    new_command()
})