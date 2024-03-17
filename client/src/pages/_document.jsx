import { Main, NextScript, Head, Html } from "next/document";

export default function Document(){
    return(
        <Html Lang="en">
            <Head />
            <body>
                <Main/>
                <NextScript />
                <div id="photo-picker-element"></div>
            </body>
        </Html>
    )
}