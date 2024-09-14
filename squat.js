let tibiaLength;
let thighLength;
let torsoLength;
let heelPosition;
let ankleAngle;
let kneeAngle;
let hipAngle;

const setValues = () => {
    tibiaLength = document.getElementById('tibiaLength') ?? 100
    thighLength = document.getElementById('thighLength') ?? 100
    torsoLength = document.getElementById('torsoLength') ?? 175
    ankleAngle = document.getElementById('ankleAngle') * (Math.PI/180) ?? 1
    kneeAngle = document.getElementById('kneeAngle') * (Math.PI/180) ?? 2
    hipAngle = document.getElementById('hipAngle') * (Math.PI/180) ?? Math.PI/2
    heelPosition = {x: 250, y: 500}
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

    const kneePosition = calculatePosition(tibiaLength, ankleAngle, heelPosition)
    const waistPosition = calculatePosition(thighLength, kneeAngle, kneePosition)
    const neckPosition = calculatePosition(torsoLength, hipAngle, waistPosition)

    ctx.beginPath()
    ctx.moveTo(heelPosition.x, heelPosition.y)
    ctx.lineTo(kneePosition.x, kneePosition.y)
    ctx.lineTo(waistPosition.x, waistPosition.y)
    ctx.lineTo(neckPosition.x, neckPosition.y)

    ctx.stroke()
}

const calculatePosition = (length, angle, startingPosition) => {
    return {
        x: startingPosition.x + length*Math.cos(angle),
        y: startingPosition.y - length*Math.sin(angle)
    }
}

// Given lengths of these three lines, figure out angles to ensure top
// is directly above the bottom at different angles of the middle section
//
// have a trivial result at all being straight but it becomes harder after that
const calculateAngles = (tibiaLength, thighLength, torsoLength, thighAngle) => {
    console.error("Not implemented")
}

window.addEventListener('load', drawSquat);