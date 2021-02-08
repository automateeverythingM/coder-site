import React from "react";

function SVG({ svg: SVGComponent, size, ...rest }) {
    return <SVGComponent height={size} width={size} />;
}

export default SVG;
