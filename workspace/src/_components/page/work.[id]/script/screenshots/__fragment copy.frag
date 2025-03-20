precision highp float;

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;

varying vec2 vUv;
uniform sampler2D noise;
uniform sampler2D tA;
uniform float hoverN;
uniform int f_type;
uniform bool u_isHovered;  // ホバーされているかどうか
uniform vec2 vUvScale;     // UVスケール
uniform float opacityN;    // 不透明度  //⚡️
uniform float scrollPow;   // スクロールの影響度
uniform float u_time;      // 時間
uniform vec2 uMouse;       // マウスのUV座標
uniform float radius;      // マウス周辺の影響範囲
uniform vec2 u_res;        // マウスのUV座標
uniform float mode;        //mode


void main() {
    if(f_type == 1) {
          //Texture
        vec2 uv = (vUv - 0.5) * vUvScale + 0.5;
        if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) { discard; }

          // 歪んだUV座標を計算
        vec2 distortedUv = uv + vec2(
            sin(uv.y * 50.0 + u_time) * 0.001,   // Y方向の歪み
            cos(uv.x * 50.0 + u_time) * 0.001    // X方向の歪み
        );

          //Texture
        vec4  color       = texture2D(tA, uv);
        float gray        = (color.r + color.g + color.b) / 3.0;
        float opacity     = u_isHovered ? color.a : opacityN;
        vec4  colorD      = texture2D(tA, distortedUv);//full
              colorD.rgb += 0.01;                                 // RGB成分を少し増やして明るくする
        vec4  colorC      = texture2D(tA, distortedUv);//grid
              colorC.rgb += 0.05;                                  // RGB成分を少し増やして明るくする

        gl_FragColor      = color;
    }
}
