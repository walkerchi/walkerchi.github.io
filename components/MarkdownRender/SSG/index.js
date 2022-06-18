import fs from 'fs'
import {unified} from 'unified'
import {visit} from 'unist-util-visit'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkGemoji from 'remark-gemoji'
import rehypeStringify from 'rehype-stringify'
import rehypeMathJax from 'rehype-mathjax'
import rehypeSlug from 'rehype-slug'
import rehypeToc from "@jsdevtools/rehype-toc"
import { remarkMermaid } from 'remark-mermaidjs'
import {getPlaiceholder} from 'plaiceholder'
import rehypeParse from 'rehype-parse'
import {minify} from 'html-minifier';


const STRINGIFY_CONFIG = {
    closeSelfClosing:true,
    closeEmptyElements:true,
    tightSelfClosing:true,
    tightCommaSeparatedLists:true,
    tightAttributes:true,
    allowDangerousCharacters:true,
    allowDangerousHtml:true,
}
const MINIFY_CONFIG = {
    useShortDoctype: true,
    collapseWhitespace: true
}

async function rehypeASTBlurImage(AST){
    let nodes = []
    visit(AST, (node) => {
        if(node.tagName === 'img'){
            nodes.push(node)
        }else if(node.type === 'raw'){
            nodes.push(node)
        }
    })
    for(let node of nodes){
        if(node.tagName == 'img'){
            let {img,base64} = await getPlaiceholder(node.properties.src)
            node.properties = {
                ...node.properties,
                ...img,
                blurDataURL:base64
            }
        }else{
            let ast = unified()
                        .use(rehypeParse)
                        .parse(node.value)
            ast = await rehypeASTBlurImage(ast)
            node.value = String(unified()
                        .use(rehypeStringify)
                        .stringify(ast,STRINGIFY_CONFIG))
            node.value = node.value.slice("<html><head></head><body>".length,-"</body></html>".length)
        }       
    }
    return AST
}

const MarkdownToRemarkAST =  unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            
const RemarkASTToRehypeAST = unified()
            .use(remarkRehype,{allowDangerousHtml: true})
const RemarkASTProcess = unified()
            .use(remarkGemoji)
            .use(remarkMermaid)   
// const RehypeASTProcess = unified()
//             .use(rehypeMathJax)
// const RehypeASTAddToc = unified()
//             .use(rehypeSlug)
//             .use(rehypeToc)
// const CombineProcess = unified()
//             .use(remarkParse)
//             .use(remarkMermaid)
//             .use(remarkGfm)
//             .use(remarkMath)
//             .use(remarkGemoji)    
//             .use(remarkRehype,{allowDangerousHtml: true})
//             .use(rehypeMathJax)
//             .use(rehypeStringify,STRINGIFY_CONFIG)

const RehypeASTToString = unified()
            .use(rehypeStringify,STRINGIFY_CONFIG)
/**
 * 
 * @param {string} markdown 
 * @param {boolean} toc
 * @returns React Component
 */
async function MarkdownSSGRender({markdown,toc}){
    let AST,content
    AST = MarkdownToRemarkAST.parse(markdown)

    AST = await RemarkASTProcess.run(AST)
    AST = await RemarkASTToRehypeAST.run(AST)
    // AST = await RehypeASTProcess.run(AST)
    AST = await rehypeASTBlurImage(AST)

    content   = RehypeASTToString.stringify(AST)

    // content = await CombineProcess.process(markdown)
    content = String(content)
    content = minify(content,MINIFY_CONFIG)
    // content = pako.gzip(content,{to:'string'})
    // console.log(content)
    return content
}

export default MarkdownSSGRender