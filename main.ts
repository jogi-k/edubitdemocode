input.onButtonPressed(Button.A, function () {
    traffic_light_state = traffic_light_state - 1
    setTrafficLight()
    music.playTone(262, music.beat(BeatFraction.Quarter))
    music.playTone(392, music.beat(BeatFraction.Half))
})
input.onButtonPressed(Button.B, function () {
    traffic_light_state = traffic_light_state + 1
    setTrafficLight()
    music.playTone(392, music.beat(BeatFraction.Quarter))
    music.playTone(262, music.beat(BeatFraction.Half))
})
function setTrafficLight () {
    if (traffic_light_state == -1) {
        traffic_light_state = 2
    } else if (traffic_light_state == 3) {
        traffic_light_state = 0
    }
    if (traffic_light_state == 0) {
        edubitTrafficLightBit.setLed(LedColor.Red, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.On))
        edubitTrafficLightBit.setLed(LedColor.Yellow, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.Off))
        edubitTrafficLightBit.setLed(LedColor.Green, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.Off))
    } else if (traffic_light_state == 1) {
        edubitTrafficLightBit.setLed(LedColor.Red, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.Off))
        edubitTrafficLightBit.setLed(LedColor.Yellow, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.On))
        edubitTrafficLightBit.setLed(LedColor.Green, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.Off))
    } else if (traffic_light_state == 2) {
        edubitTrafficLightBit.setLed(LedColor.Red, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.Off))
        edubitTrafficLightBit.setLed(LedColor.Yellow, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.Off))
        edubitTrafficLightBit.setLed(LedColor.Green, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.On))
    }
}
let rgb_shift_delay = 0
let traffic_light_state = 0
music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
    `)
edubitRgbBit.showRainbow()
setTrafficLight()
if (edubit.i2cRead(REG_ADD_REVISION) == 0) {
    while (true) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . # # # .
            . . # . .
            . . . . .
            `)
        basic.pause(200)
        basic.showLeds(`
            . # . # .
            # # # # #
            # # # # #
            . # # # .
            . . # . .
            `)
        basic.pause(200)
    }
}
basic.pause(1000)
basic.forever(function () {
    led.plotBarGraph(
    edubitSoundBit.readSoundSensor(),
    1000
    )
    edubitRgbBit.setBrightness(edubitPotentioBit.readPotValue() / 12 + 5)
    if (!(edubitIrBit.isIrSensorTriggered())) {
        rgb_shift_delay = rgb_shift_delay + 1
        if (rgb_shift_delay >= 5) {
            rgb_shift_delay = 0
            edubitRgbBit.rotatePixels(1)
        }
    }
    while (!(edubitPower.isPowerOn())) {
        basic.clearScreen()
        edubitTrafficLightBit.setLed(LedColor.All, edubitTrafficLightBit.digitalStatePicker(DigitalIoState.Off))
        basic.pause(50)
    }
})
