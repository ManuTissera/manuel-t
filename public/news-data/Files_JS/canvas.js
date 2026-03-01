const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// Ajustar las dimensiones del canvas
canvas.width = 500;
canvas.height = 400;

// Dibujar el rectangulo
ctx.strokeRect(50, 50, 400, 300);

ctx.beginPath();

ctx.moveTo(50,300);
ctx.lineTo(100,200);
ctx.lineTo(125,250);
ctx.lineTo(130,190);
ctx.lineTo(125,250);
ctx.lineTo(125,250);
ctx.lineTo(125,250);
ctx.stroke();