import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkGemoji from 'remark-gemoji'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeMathJax from 'rehype-mathjax'
import rehypeStringify from 'rehype-stringify'
export function uuid(){
    let x = "uuid"
    for(let i=0;i<3;++i){
        x = x+Math.random().toString(36).slice(2)
    }
    return x
}
export async function renderMarkdown(content){
    let ret = await  unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkGemoji)
            .use(remarkRehype,{allowDangerousHtml: true})
            .use(rehypeHighlight)
            .use(rehypeMathJax)
            .use(rehypeStringify)
            .process(content)
    return String(ret)
}
