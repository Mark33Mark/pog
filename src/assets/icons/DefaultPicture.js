/* eslint-disable max-len */
import React from "react";

const DefaultPicture = (props) => (
  <svg
    stroke={props.stroke}
    fill={props.fill}
    strokeWidth="0"
    viewBox="0 0 1024 1024"
    className={props.class}
    height={props.height}
    width={props.width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      style={{color:"#000000", display:"inline", fill:"#000000", strokeWidth:0, stroke:"none"}}
      d="M 928,160 H 96 c -17.7,0 -32,14.3 -32,32 v 640 c 0,17.7 14.3,32 32,32 h 832 c 17.7,0 32,-14.3 32,-32 V 192 c 0,-17.7 -14.3,-32 -32,-32 z M 888,792 H 136 V 232 h 752 z"
    />
    <path
      style={{ fill:"#000000", fillRule:"evenodd", stroke:"#000000", strokeWidth:0.8, strokeLinecap:"round", strokeMiterlimit:4, strokeDasharray:"none"}}
      d="m 768.29369,276.23406 c -41.13659,-5.4e-4 -74.48461,33.60981 -74.48437,75.07031 8.3e-4,41.45974 33.34853,75.0689 74.48437,75.06836 41.13508,-5.3e-4 74.4816,-33.60938 74.48243,-75.06836 2.4e-4,-41.45974 -33.3466,-75.06978 -74.48243,-75.07031 z m -0.48013,20.6925 c 26.2355,6.9e-4 56.2122,28.18739 56.21275,54.26094 5.4e-4,26.07432 -30.18383,54.05487 -56.4201,54.05555 -26.23703,3.8e-4 -53.31228,-28.60253 -53.31174,-54.67761 5.5e-4,-26.0743 27.28284,-53.63926 53.51909,-53.63888 z"
    />
    <path
      style={{ fill:"none", stroke:"#000000", strokeWidth:25, strokeLinecap:"butt", strokeLinejoin:"miter", strokeMiterlimit:4, strokeDasharray:"none", strokeOpacity:1}}
      d="m 343.55494,801.71585 c 0,0 281.64374,-247.46698 329.92823,-263.42696 24.80515,-8.19911 225.21967,160.44576 225.21967,160.44576"
    />
    <path
      style={{fill:"none", stroke:"#000000", strokeWidth:25, strokeLinecap:"butt", strokeLinejoin:"miter", strokeMiterlimit:4, strokeDasharray:"none", strokeOpacity:1}}
      d="m 569.27902,616.34209 c 0,0 -224.78407,-176.38228 -239.17274,-171.77685 -31.56211,10.10218 -203.15912,145.53844 -204.03554,145.97665"
    />
  </svg>
);

export default DefaultPicture;