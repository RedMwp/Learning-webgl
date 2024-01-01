var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

if(!gl){
  console.log(`sorry bro can't deal with the pain of webgl right now`);
} else {
  console.log(`okay lets do it!`)
}

var vertexData = [
  0,1,0,
  1,-1,0,
  -1,-1,0
  ]

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
var vertexShader = gl.createShader((gl.VERTEX_SHADER));
gl.shaderSource(vertexShader,`
attribute vec3 position;
void main(){
  gl_Position = vec4(position, 1);
}


`);
gl.compileShader(vertexShader);

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `

void main(){
  gl_FragColor = vec4(1,0,0,1);
}

`)
gl.compileShader(fragmentShader);

var program = gl.createProgram();
gl.attachShader(program,vertexShader);
gl.attachShader(program,fragmentShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program,'position');
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3 , gl.FLOAT, false, 0,0)
gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES,0,3);