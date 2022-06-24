import educationIcon from '../../public/icons/education.svg'
import dnaIcon from '../../public/icons/dna.svg'
import intershipIcon from '../../public/icons/internship.svg'

export const LIGHT_PALETTE={
    bg:'#eee',
    font:'#345'
}
export const DARK_PALETTE = {
    bg:'hsl(200,75%,20%)',
    font:'#fdfdfd'
}

export const data = {
    title:'title',
    present:'present',
    timeline:[
        {
            img:'logos/ETHz.png',
            icon:educationIcon,
            title:'ethz.title',
            subtitle:'ethz.subtitle',
            content:'ethz.content',
            startTime:'2022-09',
            palette:'light'
        },
        {
            img:'logos/RWTHAachen.png',
            icon:educationIcon,
            title:'rwth.title',
            subtitle:'rwth.subtitle',
            content:'rwth.content',
            startTime:'2021-10',
            endTime:'2022-06',
            palette:'dark'
        },
        {
            img:'logos/Tencent.png',
            icon:intershipIcon,
            title:"tencent.title",
            subtitle:'tencent.subtitle',
            content:'tencent.content',
            startTime:'2021-07',
            endTime:'2021-09',
            palette:'light'
        },
        {
            img:'logos/UdeM.png',
            icon:dnaIcon,
            title:'udem.title',
            subtitle:'udem.subtitle',
            content:'udem.content',
            startTime:'2021-04',
            endTime:'2021-09',
            palette:'light'
        },
        {
            img:'logos/HUST.png',
            icon:educationIcon,
            title:'hust.title',
            subtitle:'hust.subtitle',
            content:'hust.content',
            startTime:'2018-09',
            endTime:'2022-06',
            palette:'light'
        }
    ],
    palette:{
        icon:{
            bg:new Map([
                [educationIcon,'hsl(201,100%,40%)'],
                [intershipIcon,'hsl(30,100%,30%)'],
                [dnaIcon,'hsl(95,100%,30%)'],
            ]),
            font:'#f5f5f5'
        },
        item:{
            bg:'rgb(33, 150, 243)',
            font:'#fdfdfd'
        }
    }
}