precision highp float;

uniform float iTime;
uniform vec2 iMouse;
uniform vec2 iResolution;

uniform sampler2D tSceneDom;
uniform float uSceneType;
uniform float uScrollEffect;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
	vUv = uv;
	vec3 pos = position;
	gl_Position = vec4(position, 1.0);
}
