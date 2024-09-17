let tibiaLength;
let thighLength;
let torsoLength;
let heelPosition;
let ankleAngle;
let kneeAngle;
let hipAngle;

const setValues = () => {
    tibiaLength = document.getElementById('tibiaLength').value != "" ? document.getElementById('tibiaLength').value : 100
    thighLength = document.getElementById('thighLength').value != "" ? document.getElementById('tibiaLength').value : 100
    torsoLength = document.getElementById('torsoLength').value != "" ? document.getElementById('tibiaLength').value : 200
    ankleAngle = document.getElementById('ankleAngle').value != "" ? document.getElementById('tibiaLength').value * (Math.PI/180) : Math.PI/4
    kneeAngle = document.getElementById('kneeAngle').value != "" ? document.getElementById('tibiaLength').value * (Math.PI/180) : Math.PI/2
    hipAngle = document.getElementById('hipAngle').value != "" ? document.getElementById('tibiaLength').value * (Math.PI/180) : (Math.PI*3)/4
    heelPosition = {x: 0, y: 0}
}

const inputs = [document.getElementById('tibiaLength'),
    document.getElementById('thighLength'),
    document.getElementById('torsoLength'),
    document.getElementById('ankleAngle'),
    document.getElementById('kneeAngle'),
    document.getElementById('hipAngle')]

inputs.forEach(i => i?.addEventListener('change', _ => setValues()))

const draw = () => {
    const canvas = document.getElementById("tutorial");
    const ctx = canvas.getContext("2d");

    // ctx.fillStyle = 'rgb(200 0 0)'
    // ctx.fillRect(10, 10, 50, 50);

    // ctx.fillStyle = 'rgb(0 0 200 / 50%)';
    // ctx.fillRect(30, 30, 50, 50);

    ctx.beginPath();
    ctx.arc(100,150, 25, 0, Math.PI * 2, true);
    ctx.stroke();

    // 3 lines
    ctx.beginPath();
    ctx.moveTo(100,10);
    ctx.lineTo(10,100);
    ctx.lineTo(150,100);
    ctx.lineTo(100,150);
    ctx.stroke();
}

const drawSquat = () => {
    const canvas = document.getElementById("tutorial");
    const ctx = canvas.getContext("2d");

    // const kneePosition = calculatePosition(tibiaLength, ankleAngle, heelPosition)
    // const waistPosition = calculatePosition(thighLength, kneeAngle, kneePosition)
    // const neckPosition = calculatePosition(torsoLength, hipAngle, waistPosition)

    const kneePosition = calculateKneePosition()
    const hipPosition = calculateHipPosition()
    const neckPosition = calculateNeckPosition(hipPosition)

    ctx.beginPath()
    ctx.moveTo(heelPosition.x+250, 400-heelPosition.y)
    ctx.lineTo(kneePosition.x+250, 400-kneePosition.y)
    ctx.lineTo(hipPosition.x+250, 400-hipPosition.y)
    ctx.lineTo(neckPosition.x+250, 400-neckPosition.y)

    ctx.stroke()
}

const calculatePosition = (length, angle, startingPosition) => {
    return {
        x: startingPosition.x + length*Math.cos(angle),
        y: startingPosition.y - length*Math.sin(angle)
    }
}

const calculateKneePosition = () => {
    // if we know all values apart from phi in the explanation diagram then knee position is 
    // simple trigonometry
    return {
        x: tibiaLength*Math.cos(ankleAngle),
        y: tibiaLength*Math.sin(ankleAngle)
    }
}

const calculateHipPosition = () => {
    // Looking at the diagram this requires the cos rule to establish sigmaPrime (the length oposite sigma).
    // Then using the sine rule we can establish yPrime, the angle opposite y.
    // Then since a straight line is 180 degrees its just a little subtraction to calculate the missing angle.
    // From this we can use trig much like finding out the knee position
    const sigmaPrime = Math.sqrt(tibiaLength**2 + thighLength**2 - 2*tibiaLength*thighLength*Math.cos(kneeAngle))
    const yPrime = Math.asin((thighLength*Math.sin(kneeAngle))/ sigmaPrime)
    const omega = 180 - yPrime - ankleAngle

    return {
        x: sigmaPrime*Math.cos(omega),
        y: sigmaPrime*Math.sin(omega)
    }
}

const calculateNeckPosition = (torsoPosition) => {
    // To figure out the neck position we use the knowledge of the hip postion
    // along with the knowledge of the torso length AND the fact that the neck 
    // will be directly above the heel meaning we know the adjacent line 
    // now we just need to do pythagoras
    const epsilon = Math.sqrt(torsoLength**2 - torsoPosition.x**2)
    return {
        x: 0,
        y: torsoPosition.y + epsilon
    }
}

// Given lengths of these three lines, figure out angles to ensure top
// is directly above the bottom at different angles of the middle section
//
// have a trivial result at all being straight but it becomes harder after that
const calculateAngles = (tibiaLength, thighLength, torsoLength, thighAngle) => {
    console.error("Not implemented")
}

window.addEventListener('load', () => {
    setValues();
    drawSquat();
});