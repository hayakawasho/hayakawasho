precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;uniform float uEnterProgress;uniform float uLeaveProgress;void main(){vUv=uv;vec3 newPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(newPosition,1.0);}
