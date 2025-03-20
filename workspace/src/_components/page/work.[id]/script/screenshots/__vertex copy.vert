precision highp float;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

varying vec2  vUv;
uniform int   u_type;
uniform float pw;
const float curvePower = 5.0;  // Z軸方向の変化を強調

void main() {
    vUv = uv;

    if(u_type == 1) {
        float normalizedX = position.x / 1.0; // 左端を基準に正規化
        float tz = pw * curvePower * normalizedX; // カーブの変位量を計算
        vec3  newPosition = vec3(position.x, position.y, tz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
}
