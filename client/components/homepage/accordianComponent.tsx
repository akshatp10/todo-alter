"use client";

import { useState } from "react";

export default function AccordianComponent() {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setOpen(!open)}>
                {open ? "Hide Details" : "Show Details"}
            </button>

            {open && (
                <div>
                    <p>This is the body</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime eveniet animi commodi, cupiditate illum iste consequuntur quam perspiciatis labore vero.</p>
                </div>
            )}
        </div>
    );
}