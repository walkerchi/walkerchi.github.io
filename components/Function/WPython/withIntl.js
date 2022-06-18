import {useTranslations} from 'next-intl'
import React from 'react';
export default function withIntl(Component,lang){
    return function ComponentWrapper(props){
        let el = React.useRef(null) 
        React.useEffect(()=>{
            if(props.onLoad){
                el.current.onLoad()
            }
        },[props.onLoad])
        return <Component ref={el} {...props} t={useTranslations(lang)}/>;
      };
}