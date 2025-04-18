import { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage('java', java);

export default function CodeHL({ codeString = "", title, language }: { codeString: string; title: string; language: string }): ReactNode {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            console.log('Highlighting element:', codeRef.current);
            hljs.highlightElement(codeRef.current);
        } else {
            console.error('codeRef is null');
        }
    }, [language, codeString, title]);

    return (
        <>
            <div className="language-python codeBlockContainer_Ckt0 theme-code-block" style={{color: "#393A34", backgroundColor: "#f6f8fa"}}>
            <div className="codeBlockTitle_Ktv7">{language}</div>
                <div className="codeBlockContent_biex">
            <pre>
                <code ref={codeRef} className={clsx(hljs.getLanguage(language) ? `language-${language}` : '')}>
                    {codeString}
                </code>
            </pre>
            </div>
            </div>
        </>
    );
}