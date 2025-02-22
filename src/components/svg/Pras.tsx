import Svg, {G, Path} from "react-native-svg";
import {SvgType} from "@/src/core/types";
import React from "react";

const PRAS: SvgType = ({ ...props }) => {
  return (
    <Svg
      viewBox="0 0 367 114"
      width="367"
      height="114"
      fill={"#fff"}
      {...props}
    >
      <Path d="m361 5h-63c0 0-17.3 2-18 23 0 0-1.1 17.8 18.1 22h35.9c0 0 5 1.7 5 7 0 0 0.7 5.9-6 7h-42l-9 17h55c0 0 22-1.8 22-26 0 0-0.6-20.2-19.2-21.1l-35.8 0.1c0 0-4.5-0.7-5-6 0 0-0.5-6.2 5-7h49z" />
      <G>
        <Path d="m187.6 4.9l8.4 16.1h34l26 51c0 0 2 4.7 11 6l13 1-37-72c0 0-0.9-2.1-4-2z" />
        <Path d="m187 73l20-37c0 0 2.1-2.6 4-2h14l12 23c0 0 0.8 2.8-2 3l-15-1c0 0-3.7-0.9-6 2l-7 12z" />
      </G>
      <Path d="m102 77h17v-56h33c0 0 4.9 1.1 5 6 0 0 1.3 7.3-7 9h-21l27 37h23l-18-22c0 0 13.7-4.2 14-22 0 0 1.7-18.6-19-24h-54z" />
      <Path d="m17 35v75l17-8v-24h25c0 0 29.1-2.6 32-36 0 0 0.1-33.1-30-37h-55l8 16h43c0 0 14.4 2 16 19 0 0 0.6 17.7-18 21h-21v-26z" />
    </Svg>
  );
};

export default PRAS;
