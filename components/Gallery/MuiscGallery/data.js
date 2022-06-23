import path from 'path'
let data = {
    image:'https://s2.loli.net/2022/05/21/jwYgK3VZkXJ14i2.jpg',
    albums:{
        favorite:[
            {
                // url:"https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%211079&authkey=ADIAroxkDp6Uwgk",
                url:"/music/夜航星 (Night Voyager).mp3",
                name:"夜航星(Neight Voyager)",
                //cover:"https://bn1304files.storage.live.com/y4mdbVzhS2-uv_mT4OsfgPzyzlV8haUCVyJh8OJioCm-j-1dSz-bOIEDUbN8lwZglsi38qDAql7sGwbItzFPWwVvv1YeK88cqwj_pbjuFmzWAL4RFltJqzJ5g0d0Er0LM2FtuNwA02Mnp7xxbzbrNLI4E_cZK1blt3_5VODsaXcqt_V4FGtxe2UFFIcIeIQX7Xw?width=3200&height=1693&cropmode=none"
                cover:"/music/Cover/夜航星.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21984&authkey=AJmpx0kO3rsthEU',
                url:"/music/砂塵の彼方へ - Revo.mp3",
                name:'砂塵の彼方へ - Revo,梶浦由記',
                //cover:'https://s2.loli.net/2022/05/30/FVg8vatQJ2uETod.png'
                cover:"/music/Cover/砂之彼方.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21990&authkey=ABfS0sDd5XohHEQ',
                url:"/music/Rubia - 周深.mp3",
                name:'Rubia - 周深',
                //cover:'http://p1.music.126.net/eo1oYY1OQobITrvSNf_nrA==/109951165705882625.jpg'
                cover:"/music/Cover/honkai3.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21987&authkey=ADv74pHdJaieudg',
                url:"/music/白鹭之舞.mp3",
                name:'白鹭之舞 - Cartier',
                //cover:'https://s2.loli.net/2022/05/30/WJSm6uLMDPhfGoy.png'
                cover:"/music/Cover/神里绫华.middle.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21991&authkey=AGFEMQ-e8C53CZ8',
                url:"/music/Shirasagi Princess 风仪之舞 - HOYO-MiX.mp3",
                name:'Shirasagi Princess 风仪之舞 - HOYO-MiX',
                //cover:'https://s2.loli.net/2022/05/30/WJSm6uLMDPhfGoy.png'
                cover:"/music/Cover/神里绫华.middle.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21971&authkey=ABrv-t28LbpcZn4',
                url:"/music/21 grams ft. Fei Lin (Cikado) - Triodust.mp3",
                name:'21 grams ft. Fei Lin (Cikado) - Triodust',
                //cover:'https://s1.ax1x.com/2020/11/06/Bfng6H.jpg'
                cover:"/music/Cover/opus.jpg"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21976&authkey=AK_FomVJ91FHI2E',
                url:"/music/We Are Here - Triodust.mp3",
                name:'We Are Here - Triodust',
                //cover:'https://s1.ax1x.com/2020/11/06/Bfng6H.jpg'
                cover:"/music/Cover/opus.jpg"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21973&authkey=ANp1mkuqhzZiS3Y',
                url:"/music/Drifting Soul (Violin Version) - 工藤ともり.mp3",
                name:'Drifting Soul (Violin Version) - 工藤ともり',
                // cover:'http://p2.music.126.net/Y8uzZx4RMSHuyKIUVXm6Lg==/109951163312431204.jpg'
                cover:"/music/Cover/xenoblade2.jpg"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21975&authkey=AM053yBhoaWbW9A',
                url:"/music/Drifting Soul - Jen Bird.mp3",
                name:'Drifting Soul - Jen Bird',
                // cover:'http://p2.music.126.net/Y8uzZx4RMSHuyKIUVXm6Lg==/109951163312431204.jpg'
                cover:"/music/Cover/xenoblade2.jpg"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21980&authkey=AP4ndGoq4KpRyVs',
                url:"/music/君との未来 - 光田康典.mp3",
                name:'君との未来 - 光田康典',
                //cover:'http://p2.music.126.net/Y8uzZx4RMSHuyKIUVXm6Lg==/109951163312431204.jpg'
                cover:"/music/Cover/xenoblade2.jpg"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21986&authkey=AH42sW5cgXorDLE',
                url:"/music/星の願い - 末廣健一郎.mp3",
                name:'星の願い - 末廣健一郎',
                //cover:'http://p2.music.126.net/tzVom_L7jGA26odQg_Isww==/18660911347337159.jpg'
                cover:"/music/Cover/星愿.jpg"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21988&authkey=AFXFzMQTQZ8J_Oc',
                url:"/music/英雄のタクト - 末廣健一郎.mp3",
                name:'英雄のタクト - 末廣健一郎',
                cover:'https://s2.loli.net/2022/05/21/UIwmACv5OsgBa3R.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21989&authkey=ANR1JLNacFsLLdQ',
                url:"/music/英雄のタクト -起源- - 末廣健一郎.mp3",
                name:'英雄のタクト -起源- - 末廣健一郎',
                cover:'https://s2.loli.net/2022/05/21/UIwmACv5OsgBa3R.jpg'
            },
            {
                //url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21978&authkey=AJoU6yDqamRstf0',
                url:"/music/楚雨 - eigenTunes亦听.mp3",
                name:'楚雨 - eigenTunes亦听',
                //cover:'http://p2.music.126.net/MqknZLSJbbpNE6TsA5liFQ==/17717530370274639.jpg'
                cover:"/music/Cover/墨家神机.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21983&authkey=AEwEoevanaZ_0Mg',
                url:"/music/神韵.mp3",
                name:'神韵',
                //cover:'http://p2.music.126.net/MqknZLSJbbpNE6TsA5liFQ==/17717530370274639.jpg'
                cover:"/music/Cover/墨家神机.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21982&authkey=AAUTjomHCfj_Bb0',
                url:"/music/墨家神机.mp3",
                name:'墨家神机',
                //cover:'http://p2.music.126.net/MqknZLSJbbpNE6TsA5liFQ==/17717530370274639.jpg'
                cover:"/music/Cover/墨家神机.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21985&authkey=AE8HPyzUgZvrcvw',
                url:"/music/生命と生命 - 川井憲次.mp3",
                name:'生命と生命',
                cover:'https://s2.loli.net/2022/05/30/E9m3w18CSWaAQZz.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21745&authkey=ANOjSX-t7UyK6oo',
                url:"/music/eye-water.mp3",
                name:'eye-water',
                cover:'https://s2.loli.net/2022/05/30/Dn6VLKXofOlMjN4.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21754&authkey=AKRLrLowNL8Wwa0',
                url:"/music/Vogel im Kafig Vocal Cyua.mp3",
                name:'Vogel im Kafig Vocal Cyua',
                cover:'https://s2.loli.net/2022/05/30/Dn6VLKXofOlMjN4.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21768&authkey=ABl5oeR6AY75WmM',
                url:"/music/Call of Silence.mp3",
                name:'Call of Silence',
                cover:'https://s2.loli.net/2022/05/30/WhtO6BUmqHQl7VR.png'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21806&authkey=AFwsj02osI5q16Y',
                url:"/music/Call your name.mp3",
                name:'Call your name',
                cover:'https://s2.loli.net/2022/05/30/WhtO6BUmqHQl7VR.png'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21800&authkey=AKf5ETtEb5GAXww',
                url:"/music/Zero Eclipse.mp3",
                name:'Zero Eclipse',
                cover:'https://s2.loli.net/2022/05/30/V3ptNzQYv9dyTEc.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%211046&authkey=APQpPVxEmgpLvec',
                url:"/music/Name of Love.mp3",
                name:'Name of Love',
                cover:'https://s2.loli.net/2022/05/30/V3ptNzQYv9dyTEc.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21932&authkey=APd8MFA6PfBjyw0',
                url:"/music/飛空艇と冒険 - 加藤達也.mp3",
                name:'飛空艇と冒険',
                cover:'https://s2.loli.net/2022/05/30/Tiw8q6jVoDOtZk7.jpg'
            },
            {  
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21933&authkey=AFqv5yPAYLj_2Y4',
                url:"/music/旅立ち - 加藤達也.mp3",
                name:'旅立ち',
                cover:'https://s2.loli.net/2022/05/30/Tiw8q6jVoDOtZk7.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21948&authkey=AH89OnSjGNT8raI',
                url:"/music/高潔な志.mp3",
                name:'高潔な志',
                cover:'https://s2.loli.net/2022/05/30/Tiw8q6jVoDOtZk7.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21944&authkey=APggm-Dt966j_Oo',
                url:"/music/最終に向かって.mp3",
                name:'最終に向かって',
                cover:'https://s2.loli.net/2022/05/30/Tiw8q6jVoDOtZk7.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21903&authkey=AMGGXsenYKQ0YRk',
                url:"/music/Ever be my love.mp3",
                name:'Ever be my love',
                cover:'https://s2.loli.net/2022/05/30/Tiw8q6jVoDOtZk7.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21873&authkey=ABNBg7ObIotYrIk',
                url:"/music/ステイル・メイト - 最終決戦 -.mp3",
                name:'ステイル・メイト - 最終決戦',
                cover:'https://s2.loli.net/2022/05/30/Itb23PXAejdFqyw.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21880&authkey=AItYGPXdKNXoC5o',
                url:"/music/またゲームしようぜ ～ 新世界の光.mp3",
                name:'またゲームしようぜ ～ 新世界の光',
                cover:'https://s2.loli.net/2022/05/30/Itb23PXAejdFqyw.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21831&authkey=AMl2AKdMWmGj6es',
                url:"/music/敗色濃厚.mp3",
                name:'敗色濃厚',
                cover:'https://s2.loli.net/2022/05/30/kMer6YDQbJpPLlC.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21843&authkey=AC5in7Pj5Skci1w',
                url:"/music/姫様への想い.mp3",
                name:'姫様への想い',
                cover:'https://s2.loli.net/2022/05/30/kMer6YDQbJpPLlC.jpg'
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21821&authkey=APKg09-jOpxw8Qo',
                url:"/music/いつか見た夢.mp3",
                name:'いつか見た夢',
                cover:'https://s2.loli.net/2022/05/30/kMer6YDQbJpPLlC.jpg'
            }
        ],
        mohism:[
            {
                //url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21978&authkey=AJoU6yDqamRstf0',
                url:"/music/楚雨 - eigenTunes亦听.mp3",
                name:'楚雨 - eigenTunes亦听',
                //cover:'http://p2.music.126.net/MqknZLSJbbpNE6TsA5liFQ==/17717530370274639.jpg'
                cover:"/music/Cover/墨家神机.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21983&authkey=AEwEoevanaZ_0Mg',
                url:"/music/神韵.mp3",
                name:'神韵',
                //cover:'http://p2.music.126.net/MqknZLSJbbpNE6TsA5liFQ==/17717530370274639.jpg'
                cover:"/music/Cover/墨家神机.png"
            },
            {
                // url:'https://onedrive.live.com/download?cid=DEEBCA31F551DD62&resid=DEEBCA31F551DD62%21982&authkey=AAUTjomHCfj_Bb0',
                url:"/music/墨家神机.mp3",
                name:'墨家神机',
                //cover:'http://p2.music.126.net/MqknZLSJbbpNE6TsA5liFQ==/17717530370274639.jpg'
                cover:"/music/Cover/墨家神机.png"
            },
        ]
    }
}

// for(let album of Object.values(data.albums)){
//     for(let music of album){
//         if(!music.cover.startsWith('http')){
//             music.cover = path.resolve(__dirname,music.cover)
//         }
//         if(!music.url.startsWith('http')){
//             music.url = path.resolve(__dirname,music.url)
//             console.log(music.url)
//         }
//     }
// }

export default data