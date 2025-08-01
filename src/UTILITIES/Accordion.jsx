import { useState } from "react";
import { Clickable } from "./Clickable";

export function Accordion({ top, bottom }) {
    const [showBottom, setShowBottom] = useState(false);
    return <div className="">
        <Clickable onPress={() => {
            setShowBottom(!showBottom)
        }}>
            <div>
                {top}
            </div>
        </Clickable>
        {showBottom && <div>
            {bottom}
        </div>}
    </div>
}