let tibiaLength;
let thighLength;
let torsoLength;
let heelPosition;
let ankleAngle = 90;
let kneeAngle = 180;
let hipAngle;
const height = width = 500;
let canvas;

const setValues = () => {
    tibiaLength = document.getElementById('tibiaLength').value != "" ? document.getElementById('tibiaLength').value : 100
    thighLength = document.getElementById('thighLength').value != "" ? document.getElementById('thighLength').value : 100
    torsoLength = document.getElementById('torsoLength').value != "" ? document.getElementById('torsoLength').value : 125
    heelPosition = {x: 0, y: 0}
    calculateAngles()
}

window.onload = () => {
    const inputs = [document.getElementById('tibiaLength'),
        document.getElementById('thighLength'),
        document.getElementById('torsoLength')]
    
    inputs.forEach(i => i.addEventListener('change', _ => setValues()))
    canvas = document.getElementById("tutorial");
    canvas.onmousemove = calculateAngles;
    setValues();
    fadeOut();
}

const drawSquat = () => {
    const ctx = canvas.getContext("2d");   

    const kneePosition = calculateKneePosition()
    const hipPosition = calculateHipPosition()
    const neckPosition = calculateNeckPosition(hipPosition)

    updateAngleDisplay()

    ctx.beginPath()
    ctx.strokeStyle = hipPosition.x < 0 ? 'black' : 'red'
    ctx.moveTo(heelPosition.x+250, 400-heelPosition.y)
    ctx.lineTo(kneePosition.x+250, 400-kneePosition.y)
    ctx.lineTo(hipPosition.x+250, 400-hipPosition.y)
    ctx.lineTo(neckPosition.x+250, 400-neckPosition.y)
    drawFace(ctx, neckPosition)
    drawFeet(ctx)

    ctx.stroke()
}

const calculateKneePosition = () => {
    return {
        x: tibiaLength*Math.cos(ankleAngle),
        y: tibiaLength*Math.sin(ankleAngle)
    }
}

const calculateHipPosition = () => {
    const x = tibiaLength*Math.cos(ankleAngle) - thighLength*Math.cos(kneeAngle-ankleAngle)
    const y = tibiaLength*Math.sin(ankleAngle) + thighLength*Math.sin(kneeAngle-ankleAngle)
    return {
        x: x,
        y: y
    }
}

const calculateNeckPosition = (torsoPosition) => {
    const epsilon = Math.sqrt(torsoLength**2 - torsoPosition.x**2)
    return {
        x: 0,
        y: torsoPosition.y + epsilon
    }
}

const calculateAngles = (e) => {
    
    if(e == null){
        ankleAngle = 45 * (Math.PI/180)
        kneeAngle = 89 * (Math.PI/180)
    }
    else{
        const rect = canvas.getBoundingClientRect();
        mouseX = width - (e.clientX - rect.left);
        mouseY = height - (e.clientY - rect.top);
        kneeAngle = (mouseY / 2.7) * (Math.PI/180)
        ankleAngle = (mouseX / 5.5) * (Math.PI/180)
    }
    // knee and ankle angle are defined, but we need to calculate the resulting hip angle
    const innerBracket = (thighLength * Math.cos(kneeAngle - ankleAngle) - tibiaLength * Math.cos(ankleAngle)) / torsoLength
    hipAngle = (kneeAngle - ankleAngle) + Math.acos(innerBracket)
    drawSquat();
}

const updateAngleDisplay = () => {
    document.getElementById('ankleAngle').innerText = (ankleAngle * (180/Math.PI))?.toFixed(2)
    document.getElementById('kneeAngle').innerText = (kneeAngle * (180/Math.PI))?.toFixed(2)
    document.getElementById('hipAngle').innerText = (hipAngle * (180/Math.PI))?.toFixed(2)
}



const fadeOut = () => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(0, 0, width, height);
    drawSquat();
    setTimeout(fadeOut,50);
}

const drawFace = (ctx, neckPosition) =>{
    // need to stick circle on end of neck. So need to extend neck a bit to find centre
    // to do that need angle of hip
    radius = 20
    const angle = hipAngle - (kneeAngle - ankleAngle)
    const x = 250 + neckPosition.x + radius * Math.cos(angle)
    const y = 400 - (neckPosition.y + radius * Math.sin(angle))
    ctx.moveTo(x,y)
    ctx.arc(x, y, 20, 0, 2* Math.PI)
    ctx.stroke()
} 

const drawFeet = (ctx) => {
    const shoeSize = 20
    ctx.moveTo(250,400)
    ctx.lineTo(shoeSize+250,400)
    ctx.stroke()
}
