import {ReactNode} from 'react';
import clsx from 'clsx';
import hljs from 'highlight.js';
import MDXComponents from '@theme-original/MDXComponents';


export default function CodeHL({language, codeString}:{language: string, codeString: string}): ReactNode {
    return (
    <><pre><code
        className={clsx(hljs.getLanguage(language) ? `language-${language}` : '')}
        dangerouslySetInnerHTML={{__html: codeString}}
        >
        </code>
    </pre></>);
}