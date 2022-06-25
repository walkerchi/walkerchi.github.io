import { SiteLinksSearchBoxJsonLd } from "next-seo";

function copyWithTranslation(content){
    return (t)=>{
        if(document){
            let el = document.createElement('textarea')
            el.setAttribute('readonly', 'readonly')
            el.innerText = t(content)
            document.body.appendChild(el)
            el.select()
            document.execCommand("Copy")
            document.body.removeChild(el)
            window.alert(t('copy-success')) 
        }
    }
}
function newTab(url){
    return (t)=>{
        if(document){
            let link = document.createElement('a')
            link.setAttribute('target','_blank')
            link.href=url
            link.click()
        }
    }
}

export default{
    qrcode:'/image/website-qrcode.png',
    icons:[
        {
            name:"email",
            icon:"/icons/email.svg",
            onClick:copyWithTranslation('email')
        },
        {
            name:"github",
            icon:"/icons/github.svg",
            onClick:newTab("https://github.com/walkerchi")
        }
    ]
}